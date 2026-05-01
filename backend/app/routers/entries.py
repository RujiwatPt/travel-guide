from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.auth import require_api_key
from app.core.city_guard import ensure_supported_city
from app.repositories.entry_repo import EntryRepository
from app.schemas.entries import EntriesResponse, EntryOut
from app.services.status_engine import compute_open_status

router = APIRouter(prefix="/api/v1", tags=["entries"], dependencies=[Depends(require_api_key)])
repo = EntryRepository()


@router.get("/entries", response_model=EntriesResponse)
def list_entries(
    city: str = Query("nkp"),
    open_status: str | None = Query(None),
    category: str | None = Query(None),
    limit: int = Query(50, ge=1, le=200),
):
    city = ensure_supported_city(city)
    rows = repo.list_entries(city=city, category=category)
    if open_status:
        rows = [r for r in rows if compute_open_status(r.get("opening_hours_text")) == open_status]
    items = [EntryOut(**r) for r in rows[:limit]]
    return EntriesResponse(city=city, count=len(items), items=items)


@router.get("/entries/{entry_id}", response_model=EntryOut)
def get_entry(entry_id: str):
    row = repo.get_entry(entry_id)
    if not row:
        raise HTTPException(status_code=404, detail="entry not found")
    return EntryOut(**row)


# Backward-compatible aliases
@router.get("/places", response_model=EntriesResponse)
def list_places_alias(
    city: str = Query("nkp"),
    open_status: str | None = Query(None),
    category: str | None = Query(None),
    limit: int = Query(50, ge=1, le=200),
):
    return list_entries(city=city, open_status=open_status, category=category, limit=limit)


@router.get("/places/{entry_id}", response_model=EntryOut)
def get_place_alias(entry_id: str):
    return get_entry(entry_id)
