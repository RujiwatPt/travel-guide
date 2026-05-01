import httpx

from app.core.config import Settings
from app.services.intent_gate import IntentGateService
from app.services.openrouter_intent import OpenRouterIntentService


class _FakeResponse:
    def __init__(self, body: dict):
        self._body = body

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict:
        return self._body


class _FakeClient:
    def __init__(self, responses=None, error: Exception | None = None, **_kwargs):
        self._responses = list(responses or [])
        self._error = error

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def post(self, *_args, **_kwargs):
        if self._error is not None:
            raise self._error
        return self._responses.pop(0)


def _settings(**overrides) -> Settings:
    values = {
        "llm_intent_enabled": True,
        "openrouter_api_key": "test-key",
        "openrouter_model_primary": "primary-model",
        "openrouter_model_fallback": "fallback-model",
    }
    values.update(overrides)
    return Settings(**values)


def test_openrouter_provider_disabled_without_api_key():
    service = OpenRouterIntentService(app_settings=_settings(openrouter_api_key=""))
    assert service.is_enabled() is False


def test_openrouter_provider_returns_structured_intent():
    response = _FakeResponse(
        {
            "choices": [
                {
                    "message": {
                        "content": """
                        {
                          "detected_intent": "activity_discovery",
                          "intent_confidence": "high",
                          "entity_scope": "activity_only",
                          "hard_filters": ["low_effort"],
                          "reason": "nature query"
                        }
                        """,
                    }
                }
            ]
        }
    )
    service = OpenRouterIntentService(
        app_settings=_settings(),
        client_factory=lambda **kwargs: _FakeClient(responses=[response], **kwargs),
    )

    out = service.classify("waterfall trip")
    assert out.detected_intent == "activity_discovery"
    assert out.entity_scope == "activity_only"
    assert out.hard_filters == ["low_effort"]


def test_intent_gate_falls_back_when_provider_returns_invalid_json():
    response = _FakeResponse({"choices": [{"message": {"content": "not-json"}}]})
    service = OpenRouterIntentService(
        app_settings=_settings(),
        client_factory=lambda **kwargs: _FakeClient(responses=[response], **kwargs),
    )
    gate = IntentGateService(llm_service=service)
    query = "à¸­à¸¢à¸²à¸à¹„à¸›à¹€à¸—à¸µà¹ˆà¸¢à¸§à¸™à¹‰à¸³à¸•à¸"
    expected = IntentGateService().classify(query)

    out = gate.classify(query)
    assert out == expected


def test_intent_gate_falls_back_when_provider_request_fails():
    service = OpenRouterIntentService(
        app_settings=_settings(),
        client_factory=lambda **kwargs: _FakeClient(
            error=httpx.RequestError("boom"),
            **kwargs,
        ),
    )
    gate = IntentGateService(llm_service=service)
    query = "à¸­à¸¢à¸²à¸à¹„à¸›à¹€à¸—à¸µà¹ˆà¸¢à¸§à¸™à¹‰à¸³à¸•à¸"
    expected = IntentGateService().classify(query)

    out = gate.classify(query)
    assert out == expected


def test_intent_gate_merges_successful_provider_result():
    response = _FakeResponse(
        {
            "choices": [
                {
                    "message": {
                        "content": """
                        {
                          "detected_intent": "activity_discovery",
                          "intent_confidence": "high",
                          "entity_scope": "activity_only",
                          "hard_filters": [],
                          "reason": "provider classified this as an activity query"
                        }
                        """,
                    }
                }
            ]
        }
    )
    service = OpenRouterIntentService(
        app_settings=_settings(),
        client_factory=lambda **kwargs: _FakeClient(responses=[response], **kwargs),
    )
    gate = IntentGateService(llm_service=service)

    out = gate.classify("random query")
    assert out.entity_scope == "activity_only"
    assert "llm=provider classified this as an activity query" in out.reason
