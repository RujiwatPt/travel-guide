import type { Entry } from '../types'

type Props = {
  entry: Entry
  /** small text shown above the title (e.g. "Riverfront", "That Phanom District") */
  eyebrow?: string
  onTap?: (entry: Entry) => void
}

export default function KitSquarePhotoCard({ entry, eyebrow, onTap }: Props) {
  return (
    <button
      onClick={() => onTap?.(entry)}
      className="text-left rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] bg-white active:scale-[0.99] transition-transform"
    >
      <div
        className="w-full aspect-square bg-kit-cream-1 relative"
        style={
          entry.photos?.[0]
            ? {
                backgroundImage: `linear-gradient(to top, rgba(3,29,44,0.55) 0%, rgba(3,29,44,0) 55%), url(${entry.photos[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {/* Heart top-right */}
        <div className="absolute top-2 right-2 w-7 h-7 grid place-items-center rounded-kit-pill bg-white/85 text-rose-500 text-[11px] shadow">
          ♡
        </div>
        {/* Bottom title overlay */}
        <div className="absolute bottom-2 left-2 right-2 text-white">
          {eyebrow && (
            <p className="text-[10px] font-bold opacity-90 drop-shadow tracking-wide">{eyebrow}</p>
          )}
          <h4 className="text-[14px] font-extrabold tracking-tight leading-tight drop-shadow line-clamp-1">
            {entry.name_en}
          </h4>
        </div>
      </div>
    </button>
  )
}
