type Props = {
  photo?: string
  emoji?: string
  title: string
  meta: string
  ctaLabel: string
  onCta?: () => void
  onTap?: () => void
}

export default function KitEventRow({ photo, emoji, title, meta, ctaLabel, onCta, onTap }: Props) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left flex items-center gap-3 bg-white rounded-kit-photo p-2.5 mb-3 shadow-kit-card border border-ink/[0.04] active:scale-[0.99] transition-transform"
    >
      <div
        className="w-[64px] h-[64px] rounded-kit-photo flex-shrink-0 grid place-items-center text-2xl bg-kit-cream-1"
        style={
          photo
            ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        {photo ? '' : emoji ?? '📌'}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-extrabold text-ink tracking-tight truncate leading-tight">
          {title}
        </h4>
        <p className="text-[11px] text-ink/55 mt-0.5 font-semibold truncate flex items-center gap-1">
          <CalendarIcon /> {meta}
        </p>
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation()
          onCta?.()
        }}
        role="button"
        className="shrink-0 px-3 py-1.5 rounded-kit-pill bg-blue-soft/40 text-blue-strong text-[11px] font-extrabold hover:bg-blue-soft/60 transition cursor-pointer"
      >
        {ctaLabel}
      </span>
    </button>
  )
}

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
    </svg>
  )
}
