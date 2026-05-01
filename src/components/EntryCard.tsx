import { priceLabel } from '../lib/format'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR, STATUS_LABEL } from '../lib/statusDisplay'
import { relativeTime } from '../lib/time'
import type { Entry } from '../types'

type Props = {
  entry: Entry
  distanceKm?: number | null
  onTap?: (entry: Entry) => void
}

export default function EntryCard({ entry, distanceKm, onTap }: Props) {
  const updated = relativeTime(entry.status_updated)
  const status = isOpenNow(entry, new Date())
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
          <span className="inline-flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: STATUS_COLOR[status] }}
            />
            <span>{STATUS_LABEL[status]}</span>
          </span>
          <span>·</span>
          <span>{priceLabel(entry.price_band)}</span>
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
        {entry.type === 'activity' && entry.status_note && (
          <div className="text-[11px] text-ink/80 mt-1 italic truncate">
            "{entry.status_note}"
          </div>
        )}
      </div>
    </button>
  )
}
