from fastapi import HTTPException

from app.core.config import settings


def ensure_supported_city(city: str) -> str:
    c = city.strip().lower()
    if c not in settings.allowed_cities:
        raise HTTPException(status_code=404, detail=f"unsupported city: {city}")
    return c
