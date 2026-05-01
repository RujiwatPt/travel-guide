import type { Entry } from '../types'

type Props = {
  entry: Entry
  /** Optional small meta string shown after the location pin (e.g. "1.2k reviews") */
  metaRight?: string
  onTap?: (entry: Entry) => void
}

const CATEGORY_LOCATION_LABEL: Partial<Record<Entry['category'], string>> = {
  food: 'Mueang NKP',
  cafe: 'Mekong Riverfront',
  market: 'Indochina',
  landmark: 'That Phanom District',
  temple: 'NKP Province',
  museum: 'Mueang NKP',
  nature: 'Phu Langka NP',
}

export default function KitWidePhotoCard({ entry, metaRight, onTap }: Props) {
  const location = CATEGORY_LOCATION_LABEL[entry.category] ?? 'Nakhon Phanom'
  return (
    <button
      onClick={() => onTap?.(entry)}
      className="w-full text-left bg-white rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] mb-4 active:scale-[0.99] transition-transform hover:shadow-kit-frame"
    >
      {/* Photo */}
      <div
        className="w-full h-[190px] bg-kit-cream-1 grid place-items-center text-5xl"
        style={
          entry.photos?.[0]
            ? {
                backgroundImage: `url(${entry.photos[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {entry.photos?.[0] ? '' : entry.emoji}
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <h3 className="text-[16px] font-extrabold text-ink tracking-tight leading-tight">
          {entry.name_en}{' '}
          <span className="text-[14px] font-bold text-ink/55">({entry.name_th})</span>
        </h3>
        <p className="text-[13px] text-ink/55 mt-1 line-clamp-1 font-medium">
          {entry.why_visit_en}
        </p>
        <div className="flex items-center gap-3 mt-2 text-[12px] font-semibold">
          <span className="inline-flex items-center gap-1 text-blue-strong">
            <PinIcon />
            <span>{location}</span>
          </span>
          {metaRight && (
            <span className="inline-flex items-center gap-1 text-ink/55">
              <StarIcon />
              <span>{metaRight}</span>
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
