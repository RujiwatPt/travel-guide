from app.repositories.entry_repo import EntryRepository
from app.repositories.log_repo import LogRepository
from app.services.status_engine import compute_open_status


class VerifyService:
    def __init__(self):
        self.entries = EntryRepository()
        self.logs = LogRepository()

    def verify_hours(self, entry_id: str) -> tuple[str, str]:
        row = self.entries.get_entry(entry_id)
        if not row:
            raise KeyError('entry not found')
        status = compute_open_status(row.get('opening_hours_text'))
        source = 'mock_seed_rag'
        self.logs.insert(entry_id=entry_id, computed_open_status=status, source=source)
        return status, source
