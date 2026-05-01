import sqlite3
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[2] / 'verification_logs.db'
TABLE = 'verification_logs_v2'


class LogRepository:
    def __init__(self):
        self._init_db()

    def _conn(self):
        return sqlite3.connect(DB_PATH)

    def _init_db(self):
        with self._conn() as conn:
            conn.execute(
                f'''
                CREATE TABLE IF NOT EXISTS {TABLE} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    entry_id TEXT NOT NULL,
                    computed_open_status TEXT NOT NULL,
                    source TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
                '''
            )
            conn.commit()

    def insert(self, entry_id: str, computed_open_status: str, source: str) -> None:
        now_iso = datetime.now(timezone.utc).isoformat(timespec='seconds')
        with self._conn() as conn:
            conn.execute(
                f'INSERT INTO {TABLE} (entry_id, computed_open_status, source, created_at) VALUES (?, ?, ?, ?)',
                (entry_id, computed_open_status, source, now_iso),
            )
            conn.commit()

    def list_by_entry_id(self, entry_id: str) -> list[dict]:
        with self._conn() as conn:
            cur = conn.execute(
                f'SELECT entry_id, computed_open_status, source, created_at FROM {TABLE} WHERE entry_id = ? ORDER BY id DESC',
                (entry_id,),
            )
            rows = cur.fetchall()
        return [
            {
                'entry_id': row[0],
                'computed_open_status': row[1],
                'source': row[2],
                'created_at': row[3],
            }
            for row in rows
        ]
