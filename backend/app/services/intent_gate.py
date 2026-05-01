import logging

from app.schemas.intent import IntentGateOut
from app.services.openrouter_intent import OpenRouterIntentService

logger = logging.getLogger(__name__)

ACTIVITY_HINTS = ["น้ำตก", "ไหว้พระ", "ทำบุญ", "เดินเล่น", "ธรรมชาติ", "ประวัติศาสตร์", "เที่ยว", "ป่า", "ถ้ำ", "ภู"]
FOOD_HINTS = [
    "ของกิน", "อาหาร", "คาเฟ่", "ร้าน", "เวียดนาม", "ลาบ", "ปากหม้อ", "ส้มตำ", "somtum",
    "กิน", "ทาน", "ก๋วยเตี๋ยว", "ข้าว", "ผัด", "ต้ม", "แกง", "หมู", "ไก่", "ปลา",
    "กาแฟ", "ชา", "บุฟเฟ่", "ร้านอาหาร", "หาร้าน",
]
MIXED_HINTS = ["แล้ว", "ต่อ", "หลังจาก", "และ", "กับ", "แล้วก็", "แวะ", "ด้วย"]
TEMPLE_HINTS = ["วัด", "ไหว้พระ", "ทำบุญ", "พระธาตุ", "สักการะ", "บูชา"]
LOW_EFFORT_HINTS = ["ไม่เดินเยอะ", "เดินน้อย", "ผู้สูงอายุ", "พาแม่", "wheelchair", "elderly", "เข็น", "นั่งรถ"]
PLACE_HINTS = ["แลนด์มาร์ก", "จุดถ่ายรูป", "วิว", "ริมโขง", "landmark", "viewpoint", "memorial", "statue", "ชมวิว", "สะพาน"]


class IntentGateService:
    def __init__(self, llm_service: OpenRouterIntentService | None = None):
        self.llm_service = llm_service or OpenRouterIntentService()

    def classify(self, query: str) -> IntentGateOut:
        base = self._classify_rules(query)

        # Deterministic-first: LLM is optional enhancement.
        try:
            if self.llm_service.is_enabled():
                llm_out = self.llm_service.classify(query)
                return self._merge_base_with_llm(base, llm_out, query)
        except Exception:
            # Fall back to deterministic rules for demo reliability.
            logger.warning(
                "Intent LLM classification failed; falling back to deterministic rules",
                exc_info=True,
            )
        return base

    def _merge_base_with_llm(self, base: IntentGateOut, llm_out: IntentGateOut, query: str) -> IntentGateOut:
        q = query.strip().lower()
        has_food_kw = any(k in q for k in FOOD_HINTS)
        # Keep hard deterministic guardrails for strict food scope;
        # allow LLM to refine non-strict scopes for better bilingual nuance.
        if base.entity_scope == "food_only" and base.intent_confidence == "high":
            scope = base.entity_scope
            detected_intent = base.detected_intent
            confidence = base.intent_confidence
        elif base.entity_scope == "activity_only" and llm_out.entity_scope == "food_only" and not has_food_kw:
            scope = base.entity_scope
            detected_intent = base.detected_intent
            confidence = base.intent_confidence
        elif base.entity_scope == "mixed" and llm_out.entity_scope == "food_only":
            scope = base.entity_scope
            detected_intent = base.detected_intent
            confidence = base.intent_confidence
        else:
            scope = llm_out.entity_scope
            detected_intent = llm_out.detected_intent
            confidence = llm_out.intent_confidence

        hard_filters = sorted(set(base.hard_filters + llm_out.hard_filters))
        return IntentGateOut(
            detected_intent=detected_intent,
            intent_confidence=confidence,
            entity_scope=scope,
            hard_filters=hard_filters,
            reason=f"merged(base={base.reason}; llm={llm_out.reason})",
        )

    def _classify_rules(self, query: str) -> IntentGateOut:
        q = query.strip().lower()
        has_activity = any(k in q for k in ACTIVITY_HINTS)
        has_food = any(k in q for k in FOOD_HINTS)
        has_mixed = any(k in q for k in MIXED_HINTS)
        has_temple = any(k in q for k in TEMPLE_HINTS)
        has_place = any(k in q for k in PLACE_HINTS)
        has_low_effort = any(k in q for k in LOW_EFFORT_HINTS)
        hard_filters = ["low_effort"] if has_low_effort else []
        token_count = len([t for t in q.split() if t.strip()])

        # Any combination of activity/temple/place + food signals → mixed.
        # The connector check is relaxed: if BOTH sides are present, intent is mixed
        # regardless of explicit connectors (user may omit them in Thai shorthand).
        # Avoid over-triggering mixed scope on very short/noisy queries.
        # Require either an explicit connector OR at least 3 tokens of content.
        if (has_activity or has_temple or has_place) and has_food and (has_mixed or token_count >= 3):
            return IntentGateOut(
                detected_intent="mixed_activity_food",
                intent_confidence="medium",
                entity_scope="mixed",
                hard_filters=hard_filters,
                reason="both activity/place and food cues detected",
            )
        if has_food:
            return IntentGateOut(
                detected_intent="food_trip",
                intent_confidence="high",
                entity_scope="food_only",
                hard_filters=hard_filters,
                reason="food keywords detected",
            )
        if has_place and not has_activity and not has_temple:
            return IntentGateOut(
                detected_intent="place_discovery",
                intent_confidence="medium",
                entity_scope="place_only",
                hard_filters=hard_filters,
                reason="place/landmark keywords detected",
            )
        if has_temple:
            return IntentGateOut(
                detected_intent="temple_merit_discovery",
                intent_confidence="medium",
                entity_scope="activity_only",
                hard_filters=hard_filters,
                reason="temple/merit keywords detected",
            )
        if has_activity:
            return IntentGateOut(
                detected_intent="activity_discovery",
                intent_confidence="medium",
                entity_scope="activity_only",
                hard_filters=hard_filters,
                reason="activity keywords detected",
            )
        return IntentGateOut(
            detected_intent="general_discovery",
            intent_confidence="low",
            entity_scope="mixed",
            hard_filters=hard_filters,
            reason="no strong keyword match",
        )
