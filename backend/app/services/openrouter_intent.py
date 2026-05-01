import json
import httpx

from app.core.config import settings
from app.schemas.intent import IntentGateOut


_SYSTEM_PROMPT = """\
You are an intent classifier for a Thai city tourism app focused on Nakhon Phanom.

Classify the user query and return ONLY a JSON object with exactly these fields:
  detected_intent   – one of: activity_discovery | food_trip | place_discovery | temple_merit_discovery | mixed_activity_food | general_discovery
  intent_confidence – one of: high | medium | low
  entity_scope      – one of: activity_only | food_only | place_only | mixed
  hard_filters      – JSON array; include "low_effort" for accessibility-oriented queries, else []
  reason            – short English explanation (1 sentence)

Rules:
- Waterfall / nature / hiking / ธรรมชาติ / น้ำตก → activity_only
- Temple / merit / ไหว้พระ / ทำบุญ / วัด → activity_only (temple sub-intent)
- Food / restaurant / กิน / อาหาร / ร้าน → food_only
- Mixed queries with connectors (แล้ว, ต่อ, หลัง) → mixed
- Landmarks / viewpoints / ริมโขง → place_only
- Vague / general → mixed + general_discovery + low confidence
- NEVER return food_only scope for pure activity queries even if Thai text is ambiguous.

Return only valid JSON, no markdown, no extra text.
"""

_VALID_INTENTS = {
    "activity_discovery",
    "food_trip",
    "place_discovery",
    "temple_merit_discovery",
    "mixed_activity_food",
    "general_discovery",
}
_VALID_SCOPES = {"activity_only", "food_only", "place_only", "mixed"}
_VALID_CONFIDENCE = {"high", "medium", "low"}


class OpenRouterIntentService:
    def is_enabled(self) -> bool:
        return settings.llm_intent_enabled and bool(settings.openrouter_api_key)

    def classify(self, query: str) -> IntentGateOut:
        payload_base = {
            "messages": [
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user", "content": f"Query: {query}"},
            ],
            "temperature": 0.0,
            "max_tokens": 200,
        }
        models = [settings.openrouter_model_primary]
        if settings.openrouter_model_fallback and settings.openrouter_model_fallback != settings.openrouter_model_primary:
            models.append(settings.openrouter_model_fallback)

        last_err: Exception | None = None
        raw: str | None = None
        for model in models:
            payload = {**payload_base, "model": model}
            try:
                with httpx.Client(timeout=settings.openrouter_timeout_seconds) as client:
                    resp = client.post(
                        f"{settings.openrouter_base_url}/chat/completions",
                        headers={
                            "Authorization": f"Bearer {settings.openrouter_api_key}",
                            "Content-Type": "application/json",
                            "HTTP-Referer": "https://travel-guide.vercel.app",
                            "X-Title": "Regional Travel Guide",
                        },
                        json=payload,
                    )
                    resp.raise_for_status()
                body = resp.json()
                choices = body.get("choices")
                if not isinstance(choices, list) or not choices:
                    raise RuntimeError("OpenRouter returned no choices")
                message = choices[0].get("message", {})
                content = message.get("content")
                if not isinstance(content, str) or not content.strip():
                    raise RuntimeError("OpenRouter returned empty content")
                raw = content.strip()
                break
            except (httpx.TimeoutException, httpx.HTTPStatusError, httpx.RequestError, RuntimeError) as e:
                last_err = e
                continue

        if raw is None:
            raise RuntimeError(f"OpenRouter failed on all models: {last_err}")

        # Strip markdown code fences if the model wraps the JSON.
        if raw.startswith("```"):
            lines = raw.split("\n")
            raw = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"OpenRouter returned invalid JSON: {raw!r}") from e

        detected = data.get("detected_intent", "general_discovery")
        scope = data.get("entity_scope", "mixed")
        confidence = data.get("intent_confidence", "low")

        # Sanity-clamp unknown values to safe defaults.
        if detected not in _VALID_INTENTS:
            detected = "general_discovery"
        if scope not in _VALID_SCOPES:
            scope = "mixed"
        if confidence not in _VALID_CONFIDENCE:
            confidence = "low"

        return IntentGateOut(
            detected_intent=detected,
            intent_confidence=confidence,
            entity_scope=scope,
            hard_filters=[f for f in data.get("hard_filters", []) if isinstance(f, str)],
            reason=str(data.get("reason", "llm_classified")),
        )
