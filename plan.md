# Travel Guide MVP Plan (Aligned)

## Scope
- Single **City** MVP: Nakhon Phanom
- Under-visited city positioning (not Bangkok/Chiang Mai)
- Concept frontend is static; backend/data contracts drive implementation

## Canonical Terms
- **Entry**: umbrella map/search object
- **Activity**: `type='activity'` (owner-managed/live)
- **Place**: `type='place'` (curated/static)
- Food normalization: `type='activity'` + `category='food'`

## Core Product Flow
1. Tourist opens city map and sees Entry pins
2. Tourist searches in Thai natural language intent
3. System runs **Intent Gate** (rule + LLM grading)
4. System applies **Scoped Retrieval** by `entity_scope`
5. System applies post-retrieval grading/rejection
6. Tourist opens Entry detail with opening-hour confidence
7. Tourist triggers AI verification when confidence is low/unknown

## Mandatory Retrieval Pipeline
1. Intent Gate output:
- `detected_intent`
- `intent_confidence`
- `entity_scope` (`activity_only|food_only|place_only|mixed`)
- `hard_filters`
- `reason`
2. Scoped retrieval rules:
- activity-first query excludes `category='food'` unless explicitly requested
- food-only query returns `type='activity' AND category='food'`
- mixed query may return activity + place (+ food-category activities)
3. Post-retrieval grading:
- reject out-of-scope candidates
- reject low intent-match candidates
- store `reject_reason` in debug logs

## API Contract (Canonical)
- `GET /api/v1/entries?city=&open_status=&category=`
- `GET /api/v1/entries/{id}`
- `GET /api/v1/recommendations?city=&top_k=5`
- `GET /api/v1/search-intent?city=&q=&open_now_only=&top_k=10`
- `POST /api/v1/ai/verify-hours`
- `GET /api/v1/verification-logs/{entry_id}`

Backward-compatible aliases:
- `GET /api/v1/places` -> `/api/v1/entries`
- `GET /api/v1/places/{id}` -> `/api/v1/entries/{id}`

## Data Model (Implementation-facing)
### entries
- `id` (UUID)
- `type` (`activity|place`)
- `city`
- `category`
- `name_th`, `name_en`
- `lat`, `lng`
- `opening_hours_text`, `open_close_rules_json`, `timezone`
- `hours_source_type`, `hours_last_checked_at`, `hours_confidence`, `hours_note`
- intent/ranking fields (`activity_intents`, `route_cluster`, `default_priority`, `data_confidence`, `search_text_blob`)

### verification_logs
- `id` (UUID)
- `entry_id` (UUID)
- `checked_at`
- `computed_open_status`
- `confidence`
- `source_summary`
- `raw_json`

### transport_hints
- `id` (UUID)
- `entry_id` (UUID)
- `access_note`, `nearest_stop`, `walking_minutes`, `caution_note`

## Demo Success Criteria
- User can find 3–5 relevant entries in under 30 seconds
- Every entry shown has opening-hour confidence label
- Activity-first query does not leak food unless explicitly requested
- AI verification returns valid structured JSON
