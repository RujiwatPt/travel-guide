import { ChevronRight } from 'lucide-react'
import type { ChatLanguage } from '../lib/chatGuard'
import { simplifyChatLabels } from '../lib/chatLabels'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR, STATUS_LABEL } from '../lib/statusDisplay'
import type { Entry } from '../types'

type Props = {
  entry: Entry
  score: number
  matchedReasons: string[]
  language?: ChatLanguage
  onTap?: (entry: Entry) => void
}

export default function ChatResultCard({
  entry,
  score,
  matchedReasons,
  language = 'en',
  onTap,
}: Props) {
  const status = isOpenNow(entry, new Date())
  const labels = simplifyChatLabels(matchedReasons, language)

  return (
    <button
      type="button"
      onClick={() => onTap?.(entry)}
      className="w-full rounded-kit-photo border border-ink/8 bg-white p-3 text-left shadow-kit-card transition hover:shadow-kit-frame"
    >
      <div className="flex items-start gap-3">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-kit-photo bg-kit-cream-1 text-2xl"
          style={
            entry.photos?.[0]
              ? { backgroundImage: `url(${entry.photos[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        >
          {entry.photos?.[0] ? '' : entry.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-extrabold tracking-tight text-ink">{entry.name_en}</h3>
              <p className="truncate text-[11px] font-semibold text-muted">{entry.name_th}</p>
            </div>
            <div className="rounded-kit-pill bg-blue-strong/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-strong">
              {score} pts
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-muted">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: STATUS_COLOR[status] }}
            />
            <span>{STATUS_LABEL[status]}</span>
            <span className="text-ink/20">/</span>
            <span className="capitalize">{entry.category}</span>
          </div>
          {labels.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {labels.map((reason) => (
                <span
                  key={reason}
                  className="rounded-kit-pill bg-panel px-2 py-1 text-[10px] font-bold text-ink/70"
                >
                  {reason}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={16} className="mt-1 shrink-0 text-blue-strong" aria-hidden="true" />
      </div>
    </button>
  )
}
