# Backend Deployment

This project supports deploying the FastAPI backend as a standalone API service. The preferred target is a Hugging Face Spaces Docker app, but the same container and environment model also works on Render or Railway.

## What gets deployed

- Backend app root: `backend/`
- Entrypoint: `uvicorn app.main:app --host 0.0.0.0 --port 7860`
- Health endpoints:
  - `GET /health`
  - `GET /ready`

The backend keeps deterministic intent classification available even when the AI provider is disabled, slow, or failing.

## Required backend environment variables

- `API_KEY`
- `CORS_ALLOW_ORIGINS`
- `CITY_DEFAULT`
- `ALLOWED_CITIES`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL_PRIMARY`
- `OPENROUTER_MODEL_FALLBACK`
- `AI_INTENT_TIMEOUT_SECONDS`

Recommended baseline values:

```env
API_KEY=replace-with-a-shared-api-key
CORS_ALLOW_ORIGINS=https://your-frontend.vercel.app
CITY_DEFAULT=nkp
ALLOWED_CITIES=nkp
OPENROUTER_API_KEY=replace-with-server-side-secret
OPENROUTER_MODEL_PRIMARY=inclusionai/ling-2.6-1t:free
OPENROUTER_MODEL_FALLBACK=openai/gpt-oss-120b:free
AI_INTENT_TIMEOUT_SECONDS=3.0
```

## Frontend environment variables

Set these in the frontend deployment platform, such as Vercel:

- `VITE_API_BASE_URL`
- `VITE_API_KEY`

Example:

```env
VITE_API_BASE_URL=https://your-backend-service.example.com
VITE_API_KEY=the-same-value-as-backend-API_KEY
```

Never place `OPENROUTER_API_KEY` in Vercel frontend environment variables. It must stay backend-side only.

## Hugging Face Spaces Docker

Recommended deployment modes:

A. Recommended: create a dedicated Hugging Face Space whose repo root contains the backend service contents directly, including `Dockerfile`, `requirements.txt`, and `app/`.

B. Alternative: use a platform, sync method, or Space workflow that explicitly supports `backend/` as the Docker build context.

Suggested flow:

1. Create a new Space and choose `Docker` as the SDK.
2. Either push a backend-only repo layout to the Space, or use a sync/deploy method that makes `backend/` the Docker build context.
3. Add the required backend environment variables in the Space Secrets or Variables UI.
4. Deploy and wait for the container to start on port `7860`.

Warning: if the entire monorepo is pushed to a Space without configuring build context, `backend/Dockerfile` may not be picked up automatically.

## Render and Railway

Render and Railway can use the same backend folder and environment settings.

- Root directory: `backend`
- Build/install: use the Dockerfile, or install from `requirements.txt`
- Start command if not using Docker:
  `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

If the platform injects a dynamic port, prefer a platform-specific start command over the fixed Docker command above. The checked-in Dockerfile stays on port `7860` for Hugging Face Spaces compatibility.

## Deployment checks

Use these after deploy:

Health:

```bash
curl https://your-backend-service.example.com/health
curl https://your-backend-service.example.com/ready
```

Search:

```bash
curl -H "x-api-key: your-api-key" "https://your-backend-service.example.com/api/v1/search-intent?city=nkp&q=ขอลูก&top_k=5"
```

## Troubleshooting

### CORS failure

- Symptom: browser requests fail even though the backend is up.
- Check that `CORS_ALLOW_ORIGINS` includes the exact frontend origin, including protocol and domain.

### Wrong API key

- Symptom: `/api/v1/*` responds with `401`.
- Check that frontend `VITE_API_KEY` matches backend `API_KEY`.

### Backend cold start

- Symptom: the first request after idle is slow.
- This is normal on some managed platforms and may be more noticeable on free tiers.

### `sentence-transformers` slow first request

- Symptom: the first semantic search request takes much longer than later ones.
- The backend warms the retrieval model on startup, but container cold starts can still make the first live request slower.

### Frontend still falling back to local/static flow

- Symptom: the app appears usable, but backend-powered search results do not show up.
- Check `VITE_API_BASE_URL`, `VITE_API_KEY`, and backend availability.
- Remember the frontend is intentionally resilient and may fall back to local or deterministic behavior when the backend is unavailable.
