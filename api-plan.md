# FastAPI API Plan (Fastest Path for Demo Reliability)

## 1. Objective
Build a stable, demo-ready backend for the Nakhon Phanom MVP with deterministic behavior first, optional LLM enhancement second.

Primary goal:
- Correct intent-scoped results
- Reliable open/close status display
- Strict JSON contracts
- Minimal moving parts

## 2. Scope Lock
In scope:
- Single city only: `nkp`
- Seed-backed discovery (`activity|place`, with food as `activity + category=food`)
- Intent gate -> scoped retrieval -> post-retrieval grading
- Verify-hours endpoint with structured response
- Verification logs endpoint

Out of scope:
- Multi-city
- Real-time external scraping
- Auth system
- Full itinerary persistence

## 3. API Surface (Canonical)
1. `GET /api/v1/entries?city=&open_status=&category=&limit=`
2. `GET /api/v1/entries/{id}`
3. `GET /api/v1/search-intent?city=&q=&open_now_only=&top_k=`
4. `POST /api/v1/ai/verify-hours`
5. `GET /api/v1/verification-logs/{entry_id}`
6. `GET /health`
7. `GET /ready`

Backward-compatible aliases:
- `GET /api/v1/places` -> entries
- `GET /api/v1/places/{id}` -> entry by id

## 4. Architecture (Reliability First)
Request flow for search-intent:
1. Validate request (Pydantic)
2. Intent Gate (rule-based deterministic)
3. Scoped Retrieval from local seed store
4. Post-retrieval grading (scope + threshold)
5. Response formatter (strict schema)
6. Optional debug traces/log

Rule:
- Never depend on network for demo path.
- LLM usage is optional and non-blocking fallback only.

## 5. Data Strategy
Source of truth for demo:
- Local seed snapshot loaded at startup (JSON converted from seed content)

Storage:
- Option A (fastest): in-memory entries + SQLite for logs
- Option B: Postgres for entries + logs (if already available and stable)

Recommended for speed:
- In-memory entries
- SQLite verification log table

Required normalized fields per entry:
- `id` (UUID)
- `legacy_code`
- `type` (`activity|place`)
- `category` (includes `food`)
- `city_id`
- `name_th`, `name_en`
- `lat`, `lng`
- `intent_tags`, `search_text_blob`
- `opening_hours_text`
- `hours_confidence`
- `hours_source_type`
- `hours_last_checked_at`

## 6. Intent Gate Design
### 6.1 Output contract
- `detected_intent`
- `intent_confidence` (`high|medium|low`)
- `entity_scope` (`activity_only|food_only|place_only|mixed`)
- `hard_filters` (array)
- `reason`

### 6.2 Rule priority
1. Exact phrase dictionary (Thai-first)
2. Token-level keyword scoring
3. Fallback intent (`general_discovery`)

### 6.3 Scope rules
- Activity-first queries (waterfall/temple/history/walk) => `activity_only`
- Food queries => `food_only`
- Mixed queries (e.g. “ไหว้พระแล้วหาร้านกินต่อ”) => `mixed`

Normalization rule:
- `food_only` means `type='activity' AND category='food'`

## 7. Scoped Retrieval + Ranking
### 7.1 Candidate pool
Filter by:
- `city_id`
- scope rule (`type/category`)
- optional `open_now_only`

### 7.2 Ranking (deterministic)
`score =`
- `0.40 intent_match_score`
- `0.20 open_status_score`
- `0.15 hours_confidence_score`
- `0.15 distance_score`
- `0.10 default_priority_score`

### 7.3 Post-retrieval grading
Reject candidate when:
- scope mismatch
- `intent_match_score < threshold`

Return:
- `results[]`
- `excluded_candidates[]` with `reject_reason`

## 8. Open/Close Status Engine
Implement server utility mirroring frontend logic:
- live override wins
- all-day short-circuit
- weekday interval check
- overnight range handling (>24:00)
- timezone fixed to `Asia/Bangkok`

Output statuses:
- `open_now`
- `closing_soon`
- `closed`
- `unknown`

## 9. Verify-Hours Endpoint
## 9.1 Request
- `entry_id`
- optional existing fields (`existing_hours`, `existing_source_type`)

## 9.2 Response (strict)
- `entry_id`
- `computed_open_status`
- `opening_hours_text`
- `confidence`
- `hours_source_type`
- `needs_manual_check`
- `source_summary`
- `reason`

## 9.3 Reliability strategy
- Phase 1 deterministic merger from stored fields
- Optional LLM scorer for explanation/confidence refinement
- If LLM fails/timeout, return deterministic result (no endpoint failure)

## 10. Logging & Operational Safety
Structured logs per request:
- `request_id`
- endpoint
- latency_ms
- city_id
- intent
- entity_scope
- result_count
- excluded_count
- error_code (if any)

Health endpoints:
- `/health`: process alive
- `/ready`: seed loaded + db writable

Timeouts:
- LLM call timeout hard cap: 3s
- Fail open to deterministic response

## 11. Project Structure
`backend/app/`
- `main.py`
- `core/config.py`
- `core/logging.py`
- `schemas/entries.py`
- `schemas/intent.py`
- `schemas/verify.py`
- `routers/entries.py`
- `routers/search.py`
- `routers/ai.py`
- `routers/logs.py`
- `services/intent_gate.py`
- `services/retrieval.py`
- `services/status_engine.py`
- `services/verify_service.py`
- `repositories/entry_repo.py`
- `repositories/log_repo.py`
- `data/seed_loader.py`
- `db/sqlite.py`

## 12. Delivery Timeline (12–18h)
### Phase A: Foundations (2h)
- scaffold FastAPI project
- add schemas + health endpoints
- load seed snapshot into memory

### Phase B: Core Search (4h)
- implement intent gate
- implement scoped retrieval + ranking
- implement `/search-intent`

### Phase C: Entries APIs (2h)
- `/entries`
- `/entries/{id}`
- places aliases

### Phase D: Verification (3h)
- deterministic verify-hours
- verification logs persistence
- `/verification-logs/{entry_id}`

### Phase E: Hardening (3–7h)
- contract tests
- golden query tests
- latency checks
- fallback behavior validation

## 13. Test Plan (Minimum Viable)
### 13.1 Contract tests
- all endpoints return schema-valid JSON
- required fields always present

### 13.2 Golden query tests
- `อยากไปเที่ยวน้ำตก` -> no food-category leakage
- `อยากไปทำบุญที่วัด` -> temple-focused
- `อยากไหว้พระแล้วหาร้านกินต่อ` -> mixed results
- `ของกินเวียดนาม` -> food-only scoped
- `พาแม่ไปแบบไม่เดินเยอะ` -> low-effort filtered set

### 13.3 Failure tests
- unknown city -> clear 4xx
- missing query -> validation 422
- LLM timeout -> deterministic success response

## 14. Demo Runbook
Before demo:
1. Start API and verify `/ready`
2. Run smoke script for golden queries
3. Pin fixed dataset version hash
4. Warm search-intent with two sample requests

During demo:
1. Show wrong-case query prevention (activity query excluding food)
2. Show mixed-intent query including food where appropriate
3. Show verify-hours output + confidence
4. Show verification log retrieval

## 15. Non-Negotiable Rules
- Deterministic path must always work offline
- No endpoint should fail due to LLM dependency
- Always return strict typed JSON
- Always enforce scope rule before ranking
