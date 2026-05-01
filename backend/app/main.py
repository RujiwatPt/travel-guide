from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers.entries import router as entries_router
from app.routers.search import router as search_router
from app.routers.ai import router as ai_router
from app.routers.logs import router as logs_router
from app.services.rag_retrieval import get_rag_service


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # Pre-load embedding model so the first search request isn't slow.
    get_rag_service().warm()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/health')
def health():
    return {'ok': True}


@app.get('/ready')
def ready():
    return {'ok': True, 'city_default': settings.city_default}


app.include_router(entries_router)
app.include_router(search_router)
app.include_router(ai_router)
app.include_router(logs_router)
