import type { Entry } from '../types'

type Props = {
  entry: Entry
  distanceKm?: number | null
  onTap?: (entry: Entry) => void
}

const PRICE_LABEL: Record<string, string> = {
  free: 'Free',
  budget: '₿',
  mid: '₿₿',
  premium: '₿₿₿',
}

function relativeTime(iso: string | null): string | null {
  if (!iso) return null
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function EntryCard({ entry, distanceKm, onTap }: Props) {
  const updated = relativeTime(entry.status_updated)
  return (
    <button
      onClick={() => onTap?.(entry)}
      className="w-full text-left bg-white rounded-2xl shadow-soft/30 border border-ink/5 p-3 mb-3 flex gap-3 active:scale-[0.99] transition-transform"
    >
      {/* Thumbnail */}
      <div
        className="w-[64px] h-[64px] rounded-xl flex-shrink-0 grid place-items-center text-2xl bg-cream"
        style={
          entry.photos?.[0]
            ? { backgroundImage: `url(${entry.photos[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        {entry.photos?.[0] ? '' : entry.emoji}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-bold text-ink truncate">{entry.name_en}</h3>
          <span className="text-[12px] text-muted truncate">{entry.name_th}</span>
        </div>
        <p className="text-[12px] text-muted mt-0.5 line-clamp-1">{entry.why_visit_en}</p>
        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted">
          {/* Status placeholder dot — Slice 8 makes it dynamic */}
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-status-open inline-block" />
            <span>OPEN</span>
          </span>
          <span>·</span>
          <span>{PRICE_LABEL[entry.price_band ?? 'free']}</span>
          {distanceKm != null && (
            <>
              <span>·</span>
              <span>{distanceKm.toFixed(1)} km</span>
            </>
          )}
        </div>
        {entry.type === 'activity' && updated && (
          <div className="text-[11px] text-muted mt-1">
            • Updated {updated} <span className="text-blue-strong">✓</span>
          </div>
        )}
      </div>
    </button>
  )
}
