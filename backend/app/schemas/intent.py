from typing import Literal

from pydantic import BaseModel, Field


class IntentGateOut(BaseModel):
    detected_intent: str
    intent_confidence: str
    entity_scope: str
    hard_filters: list[str]
    reason: str


class IntentProviderOut(BaseModel):
    detected_intent: Literal[
        "activity_discovery",
        "food_trip",
        "place_discovery",
        "temple_merit_discovery",
        "mixed_activity_food",
        "general_discovery",
    ]
    intent_confidence: Literal["high", "medium", "low"]
    entity_scope: Literal["activity_only", "food_only", "place_only", "mixed"]
    hard_filters: list[str] = Field(default_factory=list)
    reason: str = "llm_classified"


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
    retrieval_grade: str
    grade_reason: str
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
