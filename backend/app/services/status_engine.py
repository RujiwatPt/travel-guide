from datetime import datetime
from zoneinfo import ZoneInfo
import re


def _to_minutes(hhmm: str) -> int:
    h, m = [int(n) for n in hhmm.split(":")]
    return h * 60 + m


def _split_ranges(text: str) -> list[tuple[int, int]]:
    normalized = text.replace("–", "-").replace("—", "-").replace(" to ", "-")
    # Drop weekday prefixes like Mon-Fri: 08:00-17:00
    normalized = re.sub(r"(mon|tue|wed|thu|fri|sat|sun)[^0-9:]*", " ", normalized, flags=re.I)
    parts = [p.strip() for p in re.split(r"[,;/]|\\s{2,}", normalized) if p.strip()]
    ranges: list[tuple[int, int]] = []
    for part in parts:
        if "-" not in part:
            continue
        start, end = [x.strip() for x in part.split("-", 1)]
        s = _to_minutes(start)
        e = _to_minutes(end)
        if e <= s:
            e += 24 * 60  # overnight span
        ranges.append((s, e))
    return ranges


def compute_open_status(opening_hours_text: str | None, now: datetime | None = None) -> str:
    if not opening_hours_text:
        return "unknown"
    text = opening_hours_text.strip().lower()
    if text in {"open area", "24/7", "all day"}:
        return "open_now"
    ranges = _split_ranges(text)
    if not ranges:
        return "unknown"

    local_now = now.astimezone(ZoneInfo("Asia/Bangkok")) if now else datetime.now(ZoneInfo("Asia/Bangkok"))
    cur = local_now.hour * 60 + local_now.minute
    cur_candidates = [cur, cur + 24 * 60]

    for s, e in ranges:
        for c in cur_candidates:
            if s <= c < e:
                if e - c <= 30:
                    return "closing_soon"
                return "open_now"
    return "closed"
