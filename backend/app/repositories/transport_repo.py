from typing import Any

from app.data.transport_hints import TRANSPORT_HINTS


class TransportRepository:
    def list_hints(self) -> list[dict[str, Any]]:
        return TRANSPORT_HINTS

    def list_hints_for_legacy(self, legacy_code: str) -> list[dict[str, Any]]:
        return [x for x in TRANSPORT_HINTS if x["entry_legacy_code"] == legacy_code]
