from app.services.status_engine import compute_open_status
from app.schemas.intent import ExcludedCandidate
from app.services.rag_retrieval import MockRagService


class RetrievalService:
    FOOD_HINTS = ["ของกิน", "อาหาร", "คาเฟ่", "ร้าน", "เวียดนาม", "ลาบ", "ปากหม้อ", "กิน", "ส้มตำ", "somtum"]
    ACTIVITY_HINTS = ["น้ำตก", "ไหว้พระ", "ทำบุญ", "เดินเล่น", "ธรรมชาติ", "ประวัติศาสตร์", "เที่ยว"]
    WATERFALL_HINTS = ["น้ำตก", "waterfall", "falls"]

    def _intent_score(self, q: str, intent_tags: list[str]) -> float:
        if not intent_tags:
            return 0.0
        ql = q.lower()
        hits = sum(1 for t in intent_tags if t.lower() in ql)
        if hits > 0:
            # Strong boost for exact tag hit so specific intent dominates generic availability.
            return max(0.8, min(1.0, hits / max(1, len(intent_tags))))
        return 0.0

    def _open_status_score(self, status: str) -> float:
        return {"open_now": 1.0, "closing_soon": 0.7, "closed": 0.2, "unknown": 0.1}.get(status, 0.1)

    def _conf_score(self, c: str) -> float:
        return {"high": 1.0, "medium": 0.7, "low": 0.3, "unknown": 0.2}.get(c, 0.2)

    def search(
        self,
        rows: list[dict],
        query: str,
        entity_scope: str,
        hard_filters: list[str],
        open_now_only: bool,
        allowed_open_statuses: set[str] | None,
        top_k: int,
    ) -> tuple[list[dict], list[ExcludedCandidate], dict]:
        q = query.strip().lower()
        q_has_food = any(k in q for k in self.FOOD_HINTS)
        q_has_activity = any(k in q for k in self.ACTIVITY_HINTS)
        q_wants_waterfall = any(k in q for k in self.WATERFALL_HINTS)
        rag_hits = self.rag.retrieve(rows=rows, query=query, top_k=max(8, top_k))
        results: list[dict] = []
        excluded: list[ExcludedCandidate] = []

        for e in rows:
            # scope gating
            if entity_scope == "activity_only" and e["category"] == "food":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="food_category_not_allowed_for_activity_only_scope"))
                continue
            if entity_scope == "food_only" and not (e["type"] == "activity" and e["category"] == "food"):
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="not_food_scope"))
                continue
            if entity_scope == "place_only" and e["type"] != "place":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="not_place_scope"))
                continue
            if "low_effort" in hard_filters and self._effort_level(e) == "high":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="low_effort_filter_mismatch"))
                continue

            status = compute_open_status(e.get("opening_hours_text"))
            if open_now_only and status not in {"open_now", "closing_soon"}:
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="open_now_filter_mismatch"))
                continue
            if allowed_open_statuses and status not in allowed_open_statuses:
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="status_filter_mismatch"))
                continue

            intent_score = self._intent_score(q, e.get("intent_tags", []))
            # Heuristic boosters for deterministic hackathon behavior.
            if e["category"] == "food" and q_has_food:
                intent_score = max(intent_score, 0.6)
            if e["category"] in {"temple", "nature", "museum"} and q_has_activity:
                intent_score = max(intent_score, 0.2)
            # For waterfall intent, prefer nature heavily and demote non-nature activities.
            if q_wants_waterfall:
                if e["category"] == "nature":
                    intent_score = max(intent_score, 0.9)
                elif e["category"] == "landmark":
                    intent_score = min(intent_score, 0.1)
            rag_score = float(rag_hits.get(e["id"], {}).get("score", 0.0))
            if rag_score > 0:
                intent_score = max(intent_score, min(1.0, rag_score * 0.8))

            if intent_score < 0.05 and q:
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="intent_match_below_threshold"))
                continue

            score = (
                0.40 * intent_score
                + 0.20 * self._open_status_score(status)
                + 0.15 * self._conf_score(e.get("hours_confidence", "unknown"))
                + 0.10 * float(e.get("default_priority", 0.5))
                + 0.15 * 0.5  # fixed distance stub for deterministic demo simplicity
            )

            grade, grade_reason = self._post_grade(
                category=e["category"],
                open_status=status,
                hours_confidence=e.get("hours_confidence", "unknown"),
                query=q,
            )
            results.append(
                {
                    "entry_id": e["id"],
                    "legacy_code": e["legacy_code"],
                    "entity_type": e["type"],
                    "category": e["category"],
                    "name": e["name_en"],
                    "matched_tags": [t for t in e.get("intent_tags", []) if t.lower() in q],
                    "why_matched": self._why_matched(e=e, rag_hit=rag_hits.get(e["id"])),
                    "open_status": status,
                    "hours_confidence": e.get("hours_confidence", "unknown"),
                    "retrieval_grade": grade,
                    "grade_reason": grade_reason,
                    "score": round(score, 4),
                }
            )

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k], excluded, {"candidate_count": len(rows), "returned": min(len(results), top_k), "rag_hit_count": len(rag_hits)}

    def _post_grade(self, category: str, open_status: str, hours_confidence: str, query: str) -> tuple[str, str]:
        score = 0
        if open_status in {"open_now", "closing_soon"}:
            score += 1
        if hours_confidence in {"high", "medium"}:
            score += 1
        if "น้ำตก" in query and category == "nature":
            score += 1
        if score >= 3:
            return "high", "strong_intent_and_reliability"
        if score == 2:
            return "medium", "acceptable_intent_and_reliability"
        return "low", "weak_reliability_or_intent"

    def _effort_level(self, e: dict) -> str:
        category = e.get("category", "")
        tags = " ".join(e.get("intent_tags", [])).lower()
        if category == "nature" and any(x in tags for x in ["น้ำตก", "ปีน", "เดินป่า", "ภู", "ถ้ำ"]):
            return "high"
        if category in {"temple", "museum", "landmark", "food", "cafe"}:
            return "low"
        return "medium"

    def _why_matched(self, e: dict, rag_hit: dict | None) -> str:
        if not rag_hit:
            return "Matches requested intent with scope-safe filtering."
        snippets = ", ".join(rag_hit.get("snippets", [])[:2])
        if snippets:
            return f"Matched by RAG evidence ({snippets}) with scope-safe filtering."
        return "Matched by RAG evidence with scope-safe filtering."
    def __init__(self):
        self.rag = MockRagService()
