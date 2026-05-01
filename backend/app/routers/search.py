from fastapi import APIRouter, Depends, Query
from app.core.auth import require_api_key
from app.core.city_guard import ensure_supported_city
from app.repositories.entry_repo import EntryRepository
from app.schemas.intent import SearchIntentResponse
from app.services.intent_gate import IntentGateService
from app.services.retrieval import RetrievalService

router = APIRouter(prefix="/api/v1", tags=["search"], dependencies=[Depends(require_api_key)])
repo = EntryRepository()
intent_service = IntentGateService()
retrieval = RetrievalService()


@router.get("/search-intent", response_model=SearchIntentResponse)
def search_intent(
    city: str = Query("nkp"),
    q: str = Query(..., min_length=1),
    open_now_only: bool = Query(False),
    top_k: int = Query(10, ge=1, le=50),
):
    city = ensure_supported_city(city)
    gate = intent_service.classify(q)
    rows = repo.list_entries(city=city)
    results, excluded, debug = retrieval.search(
        rows=rows,
        query=q,
        entity_scope=gate.entity_scope,
        hard_filters=gate.hard_filters,
        open_now_only=open_now_only,
        top_k=top_k,
    )
    return SearchIntentResponse(
        query=q,
        city=city,
        matched_intent=gate.detected_intent,
        intent_confidence=gate.intent_confidence,
        entity_scope=gate.entity_scope,
        results=results,
        excluded_candidates=excluded,
        debug={**debug, "intent_reason": gate.reason},
    )
