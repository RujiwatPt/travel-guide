import type { Entry } from '../types'

type Props = {
  entry: Entry
  /** e.g. "฿200+" or "$150.00" */
  price: string
  ctaLabel: string
  onCta?: (entry: Entry) => void
  onTap?: (entry: Entry) => void
}

export default function KitHeroBookingCard({ entry, price, ctaLabel, onCta, onTap }: Props) {
  return (
    <button
      onClick={() => onTap?.(entry)}
      className="snap-start shrink-0 w-[260px] mr-3 text-left rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] bg-white relative active:scale-[0.99] transition-transform"
    >
      <div
        className="w-full h-[220px] bg-kit-cream-1 relative"
        style={
          entry.photos?.[0]
            ? {
                backgroundImage: `linear-gradient(to top, rgba(3,29,44,0.78) 0%, rgba(3,29,44,0.15) 50%, transparent 80%), url(${entry.photos[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {/* Heart top-right */}
        <div className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-kit-pill bg-white/90 text-rose-500 text-sm shadow">
          ♡
        </div>
        {/* Bottom overlay text */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-[16px] font-extrabold tracking-tight leading-tight drop-shadow">
            {entry.name_en}
          </h3>
          <p className="text-[11px] font-semibold opacity-90 drop-shadow">
            {entry.name_th}
          </p>
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <span className="text-[15px] font-extrabold text-ink">{price}</span>
        <span
          onClick={(e) => {
            e.stopPropagation()
            onCta?.(entry)
          }}
          className="px-3 py-1.5 rounded-kit-pill bg-kit-gold-1 text-ink text-[12px] font-extrabold hover:brightness-95 transition cursor-pointer"
          role="button"
        >
          {ctaLabel}
        </span>
      </div>
    </button>
  )
}
