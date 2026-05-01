from __future__ import annotations

import re
import numpy as np
from sentence_transformers import SentenceTransformer


MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"
SIM_THRESHOLD = 0.20


class EmbeddingRagService:
    def __init__(self) -> None:
        self._model: SentenceTransformer | None = None
        self._embeddings: np.ndarray | None = None  # (n_entries, dim)
        self._entry_ids: list[str] = []
        self._rows_fingerprint: str = ""
        self._embedding_enabled: bool = True

    # ------------------------------------------------------------------
    # Model access
    # ------------------------------------------------------------------

    def _get_model(self) -> SentenceTransformer:
        if not self._embedding_enabled:
            raise RuntimeError("embedding disabled; using lexical fallback")
        if self._model is None:
            self._model = SentenceTransformer(MODEL_NAME)
        return self._model

    def warm(self) -> None:
        """Call once at startup to pre-load the model weights."""
        try:
            self._get_model()
        except Exception:
            # Demo reliability: keep API functional when model download/load fails.
            self._embedding_enabled = False

    # ------------------------------------------------------------------
    # Entry text
    # ------------------------------------------------------------------

    def _entry_text(self, e: dict) -> str:
        parts = [
            e.get("name_th", ""),
            e.get("name_en", ""),
            e.get("category", ""),
            " ".join(e.get("intent_tags", [])),
            e.get("search_text_blob", ""),
        ]
        return " ".join(p for p in parts if p)

    # ------------------------------------------------------------------
    # Embedding cache
    # ------------------------------------------------------------------

    def _rebuild_if_needed(self, rows: list[dict]) -> None:
        fingerprint = "|".join(
            f"{e.get('id','')}::{e.get('name_th','')}::{e.get('name_en','')}::{e.get('category','')}::"
            f"{','.join(e.get('intent_tags', []))}::{e.get('search_text_blob','')}"
            for e in rows
        )
        if fingerprint == self._rows_fingerprint:
            return
        model = self._get_model()
        texts = [self._entry_text(e) for e in rows]
        self._embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
        self._entry_ids = [e["id"] for e in rows]
        self._rows_fingerprint = fingerprint

    # ------------------------------------------------------------------
    # Public interface (same as MockRagService)
    # ------------------------------------------------------------------

    def retrieve(self, rows: list[dict], query: str, top_k: int = 8) -> dict[str, dict]:
        if not rows or not query.strip():
            return {}

        try:
            self._rebuild_if_needed(rows)
            model = self._get_model()
            q_emb = model.encode([query.strip()], normalize_embeddings=True)[0]
            sims = (self._embeddings @ q_emb).tolist()  # type: ignore[operator]

            scored: list[tuple[str, float]] = [
                (eid, sim)
                for eid, sim in zip(self._entry_ids, sims)
                if sim >= SIM_THRESHOLD
            ]
            scored.sort(key=lambda x: x[1], reverse=True)

            out: dict[str, dict] = {}
            for eid, score in scored[:top_k]:
                out[eid] = {
                    "score": round(score, 4),
                    "snippets": [f"embedding_sim:{score:.3f}"],
                }
            return out
        except Exception:
            # If embedding path fails, permanently disable and fallback to lexical retrieval.
            self._embedding_enabled = False
            return self._lexical_retrieve(rows, query, top_k)

    def _lexical_retrieve(self, rows: list[dict], query: str, top_k: int = 8) -> dict[str, dict]:
        q = query.strip().lower()
        q_tokens = [t for t in re.findall(r"[\w\u0E00-\u0E7F]+", q) if len(t) > 1]
        if not q_tokens:
            return {}
        scored: list[tuple[str, float, str]] = []
        for e in rows:
            text = self._entry_text(e).lower()
            terms = [str(e.get("name_th", "")).lower(), str(e.get("name_en", "")).lower(), str(e.get("category", "")).lower()]
            terms.extend([str(t).lower() for t in e.get("intent_tags", [])])
            hits = [t for t in q_tokens if t in text]
            # Thai queries often have no spaces; also match by entry terms appearing in query text.
            for term in terms:
                if len(term) >= 2 and term in q:
                    hits.append(term)
            if not hits:
                continue
            score = min(1.0, len(set(hits)) / max(2, len(set(q_tokens))))
            scored.append((e["id"], score, hits[0]))
        scored.sort(key=lambda x: x[1], reverse=True)
        out: dict[str, dict] = {}
        for eid, score, token in scored[:top_k]:
            out[eid] = {
                "score": round(score, 4),
                "snippets": [f"lexical_hit:{token}"],
            }
        return out


# Singleton reused across requests so the model is loaded once.
_service: EmbeddingRagService | None = None


def get_rag_service() -> EmbeddingRagService:
    global _service
    if _service is None:
        _service = EmbeddingRagService()
    return _service
