from pydantic import BaseModel


class EntryOut(BaseModel):
    id: str
    legacy_code: str
    city: str
    city_id: str
    type: str
    category: str
    name_en: str
    name_th: str
    lat: float
    lng: float
    opening_hours_text: str | None = None
    hours_confidence: str = 'unknown'
    hours_source_type: str = 'unknown'
    hours_last_checked_at: str | None = None
    contact_phone: str | None = None
    facebook_url: str | None = None
    intent_tags: list[str] = []
    search_text_blob: str = ''
    default_priority: float = 0.5


class EntriesResponse(BaseModel):
    city: str
    city_id: str
    count: int
    items: list[EntryOut]
