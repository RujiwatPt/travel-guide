from fastapi import APIRouter, Depends, HTTPException

from app.core.auth import require_api_key
from app.schemas.verify import VerifyHoursIn, VerifyHoursOut
from app.services.verify_service import VerifyService

router = APIRouter(prefix='/api/v1', tags=['ai'], dependencies=[Depends(require_api_key)])
service = VerifyService()


@router.post('/ai/verify-hours', response_model=VerifyHoursOut)
def verify_hours(payload: VerifyHoursIn):
    try:
        status, source = service.verify_hours(payload.entry_id)
    except KeyError:
        raise HTTPException(status_code=404, detail='entry not found')
    return VerifyHoursOut(entry_id=payload.entry_id, computed_open_status=status, verification_source=source)
