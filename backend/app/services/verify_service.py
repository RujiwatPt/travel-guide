from app.repositories.entry_repo import EntryRepository
from app.repositories.log_repo import LogRepository
from app.services.status_engine import compute_open_status


class VerifyService:
    def __init__(self):
        self.entries = EntryRepository()
        self.logs = LogRepository()

    def verify_hours(self, entry_id: str) -> tuple[str, str, str, bool, str]:
        row = self.entries.get_entry(entry_id)
        if not row:
            raise KeyError('entry not found')
        status = compute_open_status(row.get('opening_hours_text'))
        source_type = row.get('hours_source_type', 'unknown')
        source = f'mock_seed_rag:{source_type}'
        resolved_confidence = row.get('hours_confidence', 'unknown')
        conflict_flag = source_type in {'community'} and resolved_confidence in {'low', 'unknown'}
        provenance_note = self._provenance_note(source_type, resolved_confidence, conflict_flag)
        self.logs.insert(entry_id=entry_id, computed_open_status=status, source=source)
        return status, source, resolved_confidence, conflict_flag, provenance_note

    def _provenance_note(self, source_type: str, confidence: str, conflict_flag: bool) -> str:
        if conflict_flag:
            return f'conflict suspected: source={source_type}, confidence={confidence}'
        return f'source={source_type}, confidence={confidence}'
