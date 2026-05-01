from fastapi.testclient import TestClient

from app.main import app
from app.data.seed_data import ENTRIES

client = TestClient(app)
AUTH_HEADERS = {"x-api-key": "dev-local-key"}


def entry_id_by_legacy(code: str) -> str:
    row = next(e for e in ENTRIES if e["legacy_code"] == code)
    return row["id"]


def test_health_and_ready():
    r = client.get('/health')
    assert r.status_code == 200
    assert r.json()['ok'] is True

    r2 = client.get('/ready')
    assert r2.status_code == 200
    body = r2.json()
    assert body['ok'] is True
    assert body['city_default'] == 'nkp'


def test_entries_and_alias():
    r = client.get('/api/v1/entries', params={'city': 'nkp'}, headers=AUTH_HEADERS)
    assert r.status_code == 200
    body = r.json()
    assert body['count'] >= 1

    alias = client.get('/api/v1/places', params={'city': 'nkp'}, headers=AUTH_HEADERS)
    assert alias.status_code == 200
    assert alias.json()['count'] == body['count']


def test_search_intent_activity_excludes_food_leakage():
    q = 'อยากไปเที่ยวน้ำตก'
    r = client.get('/api/v1/search-intent', params={'city': 'nkp', 'q': q, 'top_k': 10}, headers=AUTH_HEADERS)
    assert r.status_code == 200
    body = r.json()
    assert body['entity_scope'] == 'activity_only'

    for row in body['results']:
        assert row['entity_type'] == 'activity'
        assert row['category'] != 'food'

    reasons = {x['reject_reason'] for x in body['excluded_candidates']}
    assert 'food_category_not_allowed_for_activity_only_scope' in reasons


def test_search_intent_mixed_allows_food_plus_activity():
    q = 'อยากไหว้พระแล้วหาร้านกินต่อ'
    r = client.get('/api/v1/search-intent', params={'city': 'nkp', 'q': q, 'top_k': 10}, headers=AUTH_HEADERS)
    assert r.status_code == 200
    body = r.json()
    assert body['entity_scope'] == 'mixed'

    categories = {x['category'] for x in body['results']}
    assert 'food' in categories
    assert any(c in categories for c in {'temple', 'landmark', 'museum', 'nature'})


def test_verify_hours_and_log_roundtrip():
    entry_id = entry_id_by_legacy('NP-ACT-001')
    r = client.post('/api/v1/ai/verify-hours', json={'entry_id': entry_id}, headers=AUTH_HEADERS)
    assert r.status_code == 200
    body = r.json()
    assert body['entry_id'] == entry_id
    assert body['computed_open_status'] in {'open_now', 'closing_soon', 'closed', 'unknown'}

    logs = client.get(f'/api/v1/verification-logs/{entry_id}', headers=AUTH_HEADERS)
    assert logs.status_code == 200
    arr = logs.json()
    assert len(arr) >= 1
    assert arr[0]['entry_id'] == entry_id


def test_api_key_required():
    r = client.get('/api/v1/entries', params={'city': 'nkp'})
    assert r.status_code == 401


def test_unknown_city_returns_404():
    r = client.get('/api/v1/entries', params={'city': 'bkk'}, headers=AUTH_HEADERS)
    assert r.status_code == 404

    r2 = client.get('/api/v1/search-intent', params={'city': 'bkk', 'q': 'อยากไปทำบุญที่วัด'}, headers=AUTH_HEADERS)
    assert r2.status_code == 404


def test_temple_query_is_place_focused():
    r = client.get('/api/v1/search-intent', params={'city': 'nkp', 'q': 'อยากไปทำบุญที่วัด', 'top_k': 10}, headers=AUTH_HEADERS)
    assert r.status_code == 200
    body = r.json()
    assert body['entity_scope'] == 'place_only'
    assert all(x['entity_type'] == 'place' for x in body['results'])
