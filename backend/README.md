# Backend MVP (FastAPI)

Implements the fastest reliable path from `api-plan.md`:
- deterministic intent gate
- scoped retrieval + ranking
- verify-hours endpoint
- verification logs (SQLite)
- health/readiness endpoints

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Environment

Backend reads `.env` from `backend/` (via `python-dotenv`).  
Start from [backend/.env.example](/Users/howlinglight/travel-guide/backend/.env.example).

Key vars:
- `API_KEY` (must match frontend `VITE_API_KEY`)
- `CORS_ALLOW_ORIGINS` (comma-separated FE origins)
- `CITY_DEFAULT`
- `ALLOWED_CITIES` (comma-separated, default `nkp`)
- `OPENROUTER_API_KEY` (optional now, required to enable LLM intent grading)
- `OPENROUTER_MODEL_PRIMARY` (`inclusionai/ling-2.6-1t:free`)
- `OPENROUTER_MODEL_FALLBACK` (`openai/gpt-oss-120b:free`)

If `OPENROUTER_API_KEY` is missing or model call fails, API automatically falls back to deterministic rule-based intent classification.
LLM timeout defaults to 3 seconds for demo reliability.

Default API key for local demo: `dev-local-key` via header `x-api-key` on all `/api/v1/*` routes.

## Test

```bash
cd backend
source .venv/bin/activate
pip install -r requirements-dev.txt
pytest -q
```

## Smoke

```bash
cd backend
source .venv/bin/activate
python smoke.py
```

## Endpoints
- `GET /api/v1/entries?city=nkp`
- `GET /api/v1/entries/{id}`
- `GET /api/v1/search-intent?city=nkp&q=...&open_now_only=false&top_k=10`
- `POST /api/v1/ai/verify-hours`
- `GET /api/v1/verification-logs/{entry_id}`
- `GET /health`
- `GET /ready`

All `/api/v1/*` routes require header:

```http
x-api-key: dev-local-key
```

Backward-compatible aliases:
- `GET /api/v1/places`
- `GET /api/v1/places/{id}`

## Notes
- Food is normalized as `type='activity' + category='food'`.
- LLM integration is intentionally deferred; deterministic-first behavior is implemented now.
