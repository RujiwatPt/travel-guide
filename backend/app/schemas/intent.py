from pydantic import BaseModel


class IntentGateOut(BaseModel):
    detected_intent: str
    intent_confidence: str
    entity_scope: str
    hard_filters: list[str]
    reason: str


class ExcludedCandidate(BaseModel):
    entry_id: str
    legacy_code: str
    reject_reason: str


class SearchResult(BaseModel):
    entry_id: str
    legacy_code: str
    entity_type: str
    category: str
    name: str
    matched_tags: list[str]
    why_matched: str
    open_status: str
    hours_confidence: str
    score: float


class SearchIntentResponse(BaseModel):
    query: str
    city: str
    matched_intent: str
    intent_confidence: str
    entity_scope: str
    results: list[SearchResult]
    excluded_candidates: list[ExcludedCandidate]
    debug: dict
