import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Plan, Stop } from '../lib/plan'

type Props = {
  plan: Plan
  onClear: () => void
}

import { priceLabel } from '../lib/format'

function useTypewriter(text: string, speedMs = 22, startDelayMs = 0): { typed: string; done: boolean } {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTyped('')
    setDone(false)
    let i = 0
    let interval: ReturnType<typeof setInterval> | null = null
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setTyped(text.slice(0, i))
        if (i >= text.length) {
          if (interval) {
            clearInterval(interval)
            interval = null
          }
          setDone(true)
        }
      }, speedMs)
    }, startDelayMs)
    return () => {
      clearTimeout(start)
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }
  }, [text, speedMs, startDelayMs])

  return { typed, done }
}

function StopRow({ stop, visible, isLast }: { stop: Stop; visible: boolean; isLast: boolean }) {
  const navigate = useNavigate()
  const summary = stop.entry_summary
  const optional = stop.optional

  return (
    <div
      className="transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      <button
        onClick={() => navigate(`/entry/${stop.entry_id}`)}
        className={
          'w-full text-left rounded-kit-photo border p-3.5 flex gap-3 mb-2 active:scale-[0.99] transition-transform ' +
          (optional
            ? 'bg-white border-dashed border-2 border-yellow relative shadow-sm'
            : 'kit-card shadow-kit-card hover:shadow-kit-frame')
        }
      >
        {/* Numbered + emoji thumb */}
        <div className="relative flex-shrink-0">
          <div
            className="w-[64px] h-[64px] rounded-kit-photo grid place-items-center text-2xl bg-kit-cream-1"
            style={
              summary.primary_photo_url
                ? { backgroundImage: `url(${summary.primary_photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : undefined
            }
          >
            {summary.primary_photo_url ? '' : stop.icon_emoji}
          </div>
          <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-kit-pill bg-blue-strong text-white text-[11px] font-extrabold grid place-items-center shadow-kit-card border-2 border-white">
            {stop.position}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span className="text-base">{stop.icon_emoji}</span>
            <span className="font-extrabold text-ink">{stop.arrival_time}</span>
            {optional && (
              <span className="ml-auto text-[10px] tracking-wider font-extrabold text-ink/70 bg-yellow/40 px-2 py-0.5 rounded-kit-pill">
                OPTIONAL
              </span>
            )}
          </div>
          <h4 className="text-[15px] font-extrabold text-ink truncate mt-0.5 tracking-tight">{summary.name_en}</h4>
          <p className="text-[11px] text-muted truncate font-bold mt-0.5">{summary.name_th}</p>
          <p className="text-[12px] text-ink/75 truncate mt-1 font-medium italic">{stop.why_en}</p>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted font-bold">
            <span>{stop.duration_min} min</span>
            {summary.price_band && (
              <>
                <span className="text-ink/20">·</span>
                <span>{priceLabel(summary.price_band)}</span>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Connector */}
      {!isLast && stop.travel_min_to_next != null && (
        <div className="flex justify-center mb-2">
          <div className="text-[11px] font-bold text-muted bg-panel rounded-kit-pill px-3 py-1 border border-ink/8">
            → {stop.travel_min_to_next} min {stop.travel_mode_to_next}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PlanResult({ plan, onClear }: Props) {
  const { typed: rationale, done: rationaleDone } = useTypewriter(plan.rationale_en, 22, 200)
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    if (!rationaleDone) return
    setRevealedCount(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    plan.stops.forEach((_, idx) => {
      const t = setTimeout(() => setRevealedCount(idx + 1), idx * 200)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [rationaleDone, plan.stops])

  return (
    <div>
      {/* Plan eyebrow */}
      <p className="kit-eyebrow mb-2">Your plan · {plan.stops.length} stops · {plan.total_duration_min} min</p>

      {/* Rationale (typewriter) */}
      <div className="px-1 pb-4 text-sm italic text-ink/85 min-h-[3rem] font-medium leading-relaxed">
        <span className="not-italic mr-1">✨</span>
        {rationale}
        {!rationaleDone && <span className="inline-block w-[2px] h-4 bg-ink/40 align-middle animate-pulse ml-0.5" />}
      </div>

      {/* Stop cards */}
      <div>
        {plan.stops.map((stop, idx) => (
          <StopRow
            key={stop.position}
            stop={stop}
            visible={idx < revealedCount}
            isLast={idx === plan.stops.length - 1}
          />
        ))}
      </div>

      {/* Re-prompt pill — kit CTA pattern */}
      <div className="sticky bottom-0 pt-3 pb-1 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={onClear}
          className="w-full text-sm font-bold text-muted py-3 rounded-kit-pill border border-ink/10 bg-white hover:bg-panel hover:text-ink transition shadow-kit-card"
        >
          Not quite right? Ask again…
        </button>
      </div>
    </div>
  )
}
