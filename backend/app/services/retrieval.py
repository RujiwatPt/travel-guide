from app.services.status_engine import compute_open_status
from app.schemas.intent import ExcludedCandidate


class RetrievalService:
    FOOD_HINTS = ["ของกิน", "อาหาร", "คาเฟ่", "ร้าน", "เวียดนาม", "ลาบ", "ปากหม้อ", "กิน", "ส้มตำ", "somtum"]
    ACTIVITY_HINTS = ["น้ำตก", "ไหว้พระ", "ทำบุญ", "เดินเล่น", "ธรรมชาติ", "ประวัติศาสตร์", "เที่ยว"]

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
        top_k: int,
    ) -> tuple[list[dict], list[ExcludedCandidate], dict]:
        q = query.strip().lower()
        q_has_food = any(k in q for k in self.FOOD_HINTS)
        q_has_activity = any(k in q for k in self.ACTIVITY_HINTS)
        results: list[dict] = []
        excluded: list[ExcludedCandidate] = []

        for e in rows:
            # scope gating
            if entity_scope == "activity_only" and e["type"] != "activity":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="entity_type_not_allowed"))
                continue
            if entity_scope == "activity_only" and e["category"] == "food":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="food_category_not_allowed_for_activity_only_scope"))
                continue
            if entity_scope == "food_only" and not (e["type"] == "activity" and e["category"] == "food"):
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="not_food_scope"))
                continue
            if entity_scope == "place_only" and e["type"] != "place":
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="not_place_scope"))
                continue
            if "low_effort" in hard_filters and float(e.get("default_priority", 0.5)) < 0.55:
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="low_effort_filter_mismatch"))
                continue

            status = compute_open_status(e.get("opening_hours_text"))
            if open_now_only and status not in {"open_now", "closing_soon"}:
                excluded.append(ExcludedCandidate(entry_id=e["id"], legacy_code=e["legacy_code"], reject_reason="open_now_filter_mismatch"))
                continue

            intent_score = self._intent_score(q, e.get("intent_tags", []))
            # Heuristic boosters for deterministic hackathon behavior.
            if e["category"] == "food" and q_has_food:
                intent_score = max(intent_score, 0.6)
            if e["category"] in {"temple", "nature", "museum", "landmark"} and q_has_activity:
                intent_score = max(intent_score, 0.2)

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

            results.append(
                {
                    "entry_id": e["id"],
                    "legacy_code": e["legacy_code"],
                    "entity_type": e["type"],
                    "category": e["category"],
                    "name": e["name_en"],
                    "matched_tags": [t for t in e.get("intent_tags", []) if t.lower() in q],
                    "why_matched": "Matches requested intent with scope-safe filtering.",
                    "open_status": status,
                    "hours_confidence": e.get("hours_confidence", "unknown"),
                    "score": round(score, 4),
                }
            )

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k], excluded, {"candidate_count": len(rows), "returned": min(len(results), top_k)}
