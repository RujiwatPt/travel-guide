/**
 * Single source for the "Updated 2h ago" badge timestamp formatting.
 * Was duplicated across EntryCard, EntryDetailPage, OwnerEditPage —
 * extracted here to prevent divergence.
 */
export function relativeTime(iso: string | null, now: Date = new Date()): string | null {
  if (!iso) return null
  const diffMs = now.getTime() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
