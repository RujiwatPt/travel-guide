import type { Entry } from '../types'

type Props = {
  entry: Entry
  /** subtitle line, e.g. "That Phanom District · Sunday" */
  subtitle: string
  /** location/distance hint, e.g. "50 km south of Mueang NKP" */
  locationHint: string
  /** small chip labels, e.g. ["Spiritual", "Iconic"] */
  tags?: string[]
  onTap?: (entry: Entry) => void
}

export default function KitJournalCard({
  entry,
  subtitle,
  locationHint,
  tags = [],
  onTap,
}: Props) {
  return (
    <button
      onClick={() => onTap?.(entry)}
      className="w-full text-left rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] bg-white mb-4 active:scale-[0.99] transition-transform"
    >
      {/* Photo */}
      <div
        className="w-full h-[200px] bg-kit-cream-1 relative"
        style={
          entry.photos?.[0]
            ? {
                backgroundImage: `linear-gradient(to top, rgba(3,29,44,0.55), transparent 55%), url(${entry.photos[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="absolute bottom-2 left-3 text-white">
          <h3 className="text-[20px] font-extrabold tracking-tight leading-tight drop-shadow">
            {entry.name_en}{' '}
            <span className="text-[12px] font-bold opacity-90">({entry.name_th})</span>
          </h3>
          <p className="text-[11px] font-semibold opacity-90 drop-shadow">{subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-ink/55 font-semibold flex items-center gap-1">
            <PinIcon /> {locationHint}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-kit-pill bg-blue-soft/40 text-blue-strong text-[10px] font-extrabold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <span
          className="w-9 h-9 grid place-items-center rounded-kit-pill bg-rose-50 text-rose-500 text-sm shrink-0"
          aria-hidden
        >
          ♡
        </span>
      </div>
    </button>
  )
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-blue-strong">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}
