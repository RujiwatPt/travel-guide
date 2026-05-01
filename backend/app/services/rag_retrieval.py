import re
from collections import defaultdict

TH_STOP = {"ที่", "และ", "หรือ", "กับ", "ของ", "ไป", "มา", "ใน", "ใกล้", "แบบ", "แล้ว", "ต่อ", "อยาก"}
EN_STOP = {"the", "and", "or", "to", "of", "in", "near", "want", "for", "a", "an"}


class MockRagService:
    def _tokens(self, text: str) -> list[str]:
        parts = re.findall(r"[\w\u0E00-\u0E7F]+", text.lower())
        out: list[str] = []
        for p in parts:
            if p in TH_STOP or p in EN_STOP:
                continue
            if len(p) < 2:
                continue
            out.append(p)
        return out

    def retrieve(self, rows: list[dict], query: str, top_k: int = 8) -> dict[str, dict]:
        q_raw = query.strip().lower()
        q_tokens = set(self._tokens(query))
        q_has_somtum = "ส้มตำ" in q_raw or "somtum" in q_raw
        if q_has_somtum:
            q_tokens.update({"อาหาร", "กิน", "food"})

        scored: list[tuple[str, float, list[str]]] = []
        for e in rows:
            terms: list[str] = []
            name_th = str(e.get("name_th", "")).lower()
            name_en = str(e.get("name_en", "")).lower()
            category = str(e.get("category", "")).lower()
            tags = [str(t).lower() for t in e.get("intent_tags", [])]
            terms.extend([name_th, name_en, category])
            terms.extend(tags)
            # Add English word-level terms from names
            terms.extend([x for x in re.findall(r"[a-z0-9]+", name_en) if len(x) >= 3])

            overlap: list[str] = []
            for term in terms:
                if len(term) < 2:
                    continue
                if term in q_raw or q_raw in term:
                    overlap.append(term)
            for tok in q_tokens:
                if any(tok in term for term in terms):
                    overlap.append(tok)
            if q_has_somtum and category == "food":
                overlap.append("somtum->food")
            if not overlap:
                continue
            uniq = list(dict.fromkeys(overlap))
            denom = max(3, len(q_tokens)) if q_tokens else 3
            score = min(1.0, len(uniq) / denom)
            snippets = []
            for tok in uniq[:3]:
                if tok in name_th or tok in name_en:
                    snippets.append(f"name:{tok}")
                elif tok in " ".join(tags):
                    snippets.append(f"tag:{tok}")
                else:
                    snippets.append(f"field:{tok}")
            scored.append((e["id"], min(1.0, score), snippets))

        scored.sort(key=lambda x: x[1], reverse=True)
        out: dict[str, dict] = {}
        for eid, s, snips in scored[:top_k]:
            out[eid] = {"score": s, "snippets": snips}
        return out
