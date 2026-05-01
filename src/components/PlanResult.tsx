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
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setTyped(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speedMs)
      // Cleanup if unmounted while typing
      ;(start as unknown as { _interval?: ReturnType<typeof setInterval> })._interval = interval
    }, startDelayMs)
    return () => {
      clearTimeout(start)
      const interval = (start as unknown as { _interval?: ReturnType<typeof setInterval> })._interval
      if (interval) clearInterval(interval)
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
          'w-full text-left rounded-2xl border p-3 flex gap-3 mb-2 active:scale-[0.99] transition-transform ' +
          (optional
            ? 'bg-white border-dashed border-yellow/70 relative'
            : 'bg-white border-ink/5 shadow-sm')
        }
      >
        {/* Numbered + emoji thumb */}
        <div className="relative flex-shrink-0">
          <div
            className="w-[60px] h-[60px] rounded-xl grid place-items-center text-2xl bg-cream"
            style={
              summary.primary_photo_url
                ? { backgroundImage: `url(${summary.primary_photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : undefined
            }
          >
            {summary.primary_photo_url ? '' : stop.icon_emoji}
          </div>
          <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-blue-strong text-white text-[10px] font-bold grid place-items-center shadow">
            {stop.position}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span>{stop.icon_emoji}</span>
            <span className="font-bold text-ink">{stop.arrival_time}</span>
            {optional && (
              <span className="ml-auto text-[10px] tracking-wider font-bold text-yellow-700 bg-yellow/30 px-1.5 py-0.5 rounded-full">
                OPTIONAL
              </span>
            )}
          </div>
          <h4 className="text-[15px] font-bold text-ink truncate mt-0.5">{summary.name_en}</h4>
          <p className="text-[12px] text-muted truncate">{stop.why_en}</p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-muted">
            <span>{stop.duration_min} min</span>
            {summary.price_band && (
              <>
                <span>·</span>
                <span>{priceLabel(summary.price_band)}</span>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Connector */}
      {!isLast && stop.travel_min_to_next != null && (
        <div className="flex justify-center mb-2">
          <div className="text-[11px] text-muted bg-panel rounded-full px-3 py-1 border border-ink/5">
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
      {/* Rationale (typewriter) */}
      <div className="px-1 pb-3 text-sm italic text-ink/80 min-h-[3rem]">
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

      {/* Re-prompt pill */}
      <div className="sticky bottom-0 pt-3 pb-1 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={onClear}
          className="w-full text-sm text-muted py-2 rounded-full border border-ink/10 bg-white hover:bg-panel"
        >
          Not quite right? Ask again…
        </button>
      </div>
    </div>
  )
}
