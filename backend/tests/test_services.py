from app.data.seed_data import ENTRIES
from app.services.intent_gate import IntentGateService
from app.services.retrieval import RetrievalService
from app.schemas.intent import IntentGateOut


def test_intent_gate_activity():
    gate = IntentGateService().classify('อยากไปเที่ยวน้ำตก')
    assert gate.entity_scope == 'activity_only'


def test_intent_gate_food():
    gate = IntentGateService().classify('หาร้านส้มตำใกล้ริมน้ำ')
    assert gate.entity_scope == 'food_only'


def test_retrieval_food_scope_normalized_to_activity_food_category():
    gate = IntentGateService().classify('หาร้านส้มตำใกล้ริมน้ำ')
    results, excluded, _ = RetrievalService().search(
        rows=ENTRIES,
        query='หาร้านส้มตำใกล้ริมน้ำ',
        entity_scope=gate.entity_scope,
        hard_filters=gate.hard_filters,
        open_now_only=False,
        allowed_open_statuses=None,
        top_k=10,
    )
    assert len(results) > 0
    assert all(r['entity_type'] == 'activity' and r['category'] == 'food' for r in results)
    assert len(excluded) > 0


def test_intent_gate_uses_llm_when_available():
    class FakeLLM:
        def is_enabled(self):
            return True

        def classify(self, _query: str):
            return IntentGateOut(
                detected_intent='activity_discovery',
                intent_confidence='high',
                entity_scope='activity_only',
                hard_filters=[],
                reason='llm-test',
            )

    gate = IntentGateService(llm_service=FakeLLM())
    out = gate.classify('random query')
    assert out.entity_scope == 'activity_only'
    assert 'llm=llm-test' in out.reason


def test_intent_gate_falls_back_when_llm_fails():
    class BrokenLLM:
        def is_enabled(self):
            return True

        def classify(self, _query: str):
            raise RuntimeError('boom')

    gate = IntentGateService(llm_service=BrokenLLM())
    out = gate.classify('อยากไปเที่ยวน้ำตก')
    assert out.entity_scope == 'activity_only'


def test_intent_gate_temple_query_prefers_place_scope():
    gate = IntentGateService().classify('อยากไปทำบุญที่วัด')
    assert gate.entity_scope == 'activity_only'


def test_low_effort_query_attaches_hard_filter():
    gate = IntentGateService().classify('พาแม่ไปแบบไม่เดินเยอะ')
    assert 'low_effort' in gate.hard_filters


def test_intent_gate_merges_llm_but_keeps_high_confidence_rule_scope():
    class ConflictingLLM:
        def is_enabled(self):
            return True

        def classify(self, _query: str):
            return IntentGateOut(
                detected_intent='food_trip',
                intent_confidence='high',
                entity_scope='food_only',
                hard_filters=[],
                reason='llm-conflict',
            )

    gate = IntentGateService(llm_service=ConflictingLLM())
    out = gate.classify('อยากไปเที่ยวน้ำตก')
    assert out.entity_scope == 'activity_only'
    assert out.detected_intent == 'activity_discovery'


def test_intent_gate_preserves_base_hard_filters_when_llm_omits_them():
    class EmptyFilterLLM:
        def is_enabled(self):
            return True

        def classify(self, _query: str):
            return IntentGateOut(
                detected_intent='general_discovery',
                intent_confidence='low',
                entity_scope='mixed',
                hard_filters=[],
                reason='llm-empty-filters',
            )

    gate = IntentGateService(llm_service=EmptyFilterLLM())
    out = gate.classify('พาแม่ไปแบบไม่เดินเยอะ')
    assert 'low_effort' in out.hard_filters


def test_retrieval_returns_rag_why_matched():
    gate = IntentGateService().classify('หาร้านส้มตำใกล้ริมน้ำ')
    results, _, debug = RetrievalService().search(
        rows=ENTRIES,
        query='หาร้านส้มตำใกล้ริมน้ำ',
        entity_scope=gate.entity_scope,
        hard_filters=gate.hard_filters,
        open_now_only=False,
        allowed_open_statuses=None,
        top_k=5,
    )
    assert len(results) > 0
    assert any('RAG evidence' in r['why_matched'] for r in results)
    assert debug.get('rag_hit_count', 0) >= 1


def test_waterfall_query_prioritizes_nature_over_landmark():
    gate = IntentGateService().classify('อยากไปเที่ยวน้ำตก')
    results, _, _ = RetrievalService().search(
        rows=ENTRIES,
        query='อยากไปเที่ยวน้ำตก',
        entity_scope=gate.entity_scope,
        hard_filters=gate.hard_filters,
        open_now_only=False,
        allowed_open_statuses=None,
        top_k=5,
    )
    assert len(results) > 0
    assert results[0]['category'] == 'nature'
