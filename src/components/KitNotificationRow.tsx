type Tone = 'blue' | 'amber' | 'green' | 'rose' | 'violet' | 'sky'

const TONE_BG: Record<Tone, string> = {
  blue:   'bg-blue-soft/50 text-blue-strong',
  amber:  'bg-kit-cream-1 text-amber-700',
  green:  'bg-emerald-100 text-emerald-700',
  rose:   'bg-rose-100 text-rose-600',
  violet: 'bg-violet-100 text-violet-600',
  sky:    'bg-sky-100 text-sky-600',
}

type Props = {
  /** small icon string OR photo URL (photo takes precedence) */
  icon?: string
  photo?: string
  tone?: Tone
  title: string
  body?: string
  time: string
  onTap?: () => void
}

export default function KitNotificationRow({ icon, photo, tone = 'blue', title, body, time, onTap }: Props) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left flex items-start gap-3 px-5 py-3 hover:bg-ink/[0.02] transition active:scale-[0.99]"
    >
      <div
        className={`w-9 h-9 rounded-kit-pill grid place-items-center text-sm flex-shrink-0 ${TONE_BG[tone]}`}
        style={
          photo
            ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        {photo ? '' : icon ?? '•'}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-extrabold text-ink tracking-tight leading-tight truncate">
          {title}
        </h4>
        {body && (
          <p className="text-[12px] text-ink/55 mt-0.5 font-medium leading-snug line-clamp-2">
            {body}
          </p>
        )}
      </div>
      <span className="text-[11px] text-ink/45 font-bold flex-shrink-0 mt-0.5">{time}</span>
    </button>
  )
}
