from app.core.config import settings
from app.schemas.intent import IntentGateOut


class OpenRouterIntentService:
    def is_enabled(self) -> bool:
        return settings.llm_intent_enabled and bool(settings.openrouter_api_key)

    def classify(self, _query: str) -> IntentGateOut:
        raise RuntimeError('LLM disabled in offline/mock mode')
