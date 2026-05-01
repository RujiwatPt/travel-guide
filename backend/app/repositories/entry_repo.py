from app.data.seed_data import ENTRIES


class EntryRepository:
    def list_entries(self, city: str, category: str | None = None) -> list[dict]:
        rows = [r for r in ENTRIES if r.get('city') == city or r.get('city_id') == city]
        if category:
            rows = [r for r in rows if r['category'] == category]
        return rows

    def get_entry(self, entry_id: str) -> dict | None:
        for row in ENTRIES:
            if row['id'] == entry_id:
                return row
        return None
