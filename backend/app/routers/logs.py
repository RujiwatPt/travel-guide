from fastapi import APIRouter, Depends

from app.core.auth import require_api_key
from app.repositories.log_repo import LogRepository

router = APIRouter(prefix='/api/v1', tags=['logs'], dependencies=[Depends(require_api_key)])
repo = LogRepository()


@router.get('/verification-logs/{entry_id}')
def list_verification_logs(entry_id: str):
    return repo.list_by_entry_id(entry_id)
