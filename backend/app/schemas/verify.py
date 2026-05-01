from pydantic import BaseModel


class VerifyHoursIn(BaseModel):
    entry_id: str


class VerifyHoursOut(BaseModel):
    entry_id: str
    computed_open_status: str
    verification_source: str
