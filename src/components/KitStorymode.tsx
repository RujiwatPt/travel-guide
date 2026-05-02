import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export type StoryItem = {
  /** Stable id for keying / deep-link */
  id: string
  /** Background photo (high-res preferred — fills viewport) */
  photo: string
  /** Pill text shown at top under the progress bar (e.g. day-of-week + district) */
  eyebrow: string
  /** Big title */
  title: string
  /** Smaller subtitle (e.g. Thai name) */
  subtitle?: string
  /** Body copy — kept under ~140 chars for readability */
  body: string
  /** Where tapping "Visit" goes */
  href?: string
  /** Optional CTA label (defaults to "Visit") */
  ctaLabel?: string
}

type Props = {
  items: StoryItem[]
  /** Initial slide index */
  startIndex?: number
  /** Auto-advance ms per slide. 0 = no auto-advance. Spec default 7000. */
  autoAdvanceMs?: number
  onClose: () => void
}

/** Preload 1 image ahead so progress bar doesn't visibly stall on swipe */
function preloadImage(src: string) {
  if (!src) return
  const img = new Image()
  img.src = src
}

/**
 * KitStorymode — Instagram-style full-screen story player.
 *
 * Patterns (per Storymode UX research):
 * - Tap LEFT half → previous; tap RIGHT half → next
 * - Long-press = pause progress (resumes on release)
 * - Swipe DOWN > 80px = dismiss
 * - Segmented progress bar at top (1 segment per item)
 * - Bottom CTA → navigate to entry detail
 * - Differs from Instagram: not ephemeral (it's an evergreen guided tour),
 *   user-paused by default (auto-advance off — pilgrims need time to read),
 *   no reply box, no DM.
 */
export default function KitStorymode({ items, startIndex = 0, autoAdvanceMs = 7000, onClose }: Props) {
  const [idx, setIdx] = useState(Math.max(0, Math.min(startIndex, items.length - 1)))
  const [progress, setProgress] = useState(0) // 0..1 for the current slide (only used if autoAdvanceMs > 0)
  const [paused, setPaused] = useState(false)
  const dragStartY = useRef<number | null>(null)
  const [dragOffsetY, setDragOffsetY] = useState(0)

  // ────── keyboard + history ──────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    // Lock body scroll while open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Browser back button → close storymode (rule: storymode-spec gotcha #5)
    const onPopState = () => onClose()
    window.history.pushState({ storymode: true }, '')
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('popstate', onPopState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ────── preload next image so progress doesn't stall ──────
  useEffect(() => {
    if (idx + 1 < items.length) preloadImage(items[idx + 1].photo)
  }, [idx, items])

  // ────── auto-advance ──────
  useEffect(() => {
    if (!autoAdvanceMs || paused) return
    setProgress(0)
    const startedAt = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const elapsed = now - startedAt
      const p = Math.min(1, elapsed / autoAdvanceMs)
      setProgress(p)
      if (p >= 1) {
        if (idx < items.length - 1) setIdx(idx + 1)
        else onClose()
      } else {
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [idx, paused, autoAdvanceMs, items.length, onClose])

  const goPrev = () => {
    setIdx((i) => Math.max(0, i - 1))
    setProgress(0)
  }
  const goNext = () => {
    setIdx((i) => {
      if (i >= items.length - 1) {
        onClose()
        return i
      }
      return i + 1
    })
    setProgress(0)
  }

  // ────── tap zones ──────
  const onTapZone = (side: 'left' | 'right') => {
    if (side === 'left') goPrev()
    else goNext()
  }

  // ────── swipe-down to dismiss ──────
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY
    setPaused(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartY.current == null) return
    const dy = Math.max(0, e.clientY - dragStartY.current)
    setDragOffsetY(dy)
  }
  const onPointerUp = () => {
    if (dragStartY.current == null) return
    if (dragOffsetY > 100) {
      onClose()
    } else {
      setDragOffsetY(0)
    }
    dragStartY.current = null
    setPaused(false)
  }

  if (items.length === 0) return null
  const item = items[idx]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Story view"
      className="fixed inset-0 z-kit-modal bg-black"
      style={{ transform: `translateY(${dragOffsetY}px)`, opacity: 1 - Math.min(dragOffsetY / 400, 0.5), transition: dragStartY.current == null ? 'transform 200ms cubic-bezier(0.2,0.8,0.4,1), opacity 200ms' : undefined }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Photo with subtle Ken Burns zoom (1.0 → 1.05 over the slide duration) */}
      <img
        key={item.id /* re-mount each slide so animation restarts */}
        src={item.photo}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        style={{
          animation: autoAdvanceMs && !paused
            ? `kit-storymode-kenburns ${autoAdvanceMs}ms linear forwards`
            : undefined,
        }}
      />
      <style>{`
        @keyframes kit-storymode-kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
      `}</style>
      {/* Bottom + top dark gradients for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85 pointer-events-none" />

      {/* Tap zones: left 30% = prev, right 70% = next (per spec — small back zone */}
      {/* avoids accidental rewinds; large forward zone matches Instagram pattern). */}
      <button
        type="button"
        aria-label="Previous slide"
        className="absolute top-0 left-0 h-full w-[30%] z-10"
        onClick={(e) => { e.stopPropagation(); onTapZone('left') }}
      />
      <button
        type="button"
        aria-label="Next slide"
        className="absolute top-0 right-0 h-full w-[70%] z-10"
        onClick={(e) => { e.stopPropagation(); onTapZone('right') }}
      />

      {/* Top: progress bar + close */}
      <div className="absolute top-0 inset-x-0 z-20 px-3 pt-3 pb-2 flex items-center gap-2">
        {/* Segmented progress bar */}
        <div className="flex-1 flex gap-1">
          {items.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: i < idx ? '100%' : i === idx ? `${(autoAdvanceMs ? progress : 0) * 100}%` : '0%',
                  transition: i === idx && !autoAdvanceMs ? 'width 200ms' : undefined,
                }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="w-9 h-9 grid place-items-center rounded-kit-pill text-white hover:bg-white/15 transition shrink-0"
        >
          <X size={20} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </div>

      {/* Bottom: content */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-10 pt-12 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-kit-pill">
            <MapPin size={12} strokeWidth={2.4} aria-hidden="true" />
            <span className="text-[11px] font-extrabold tracking-wide">{item.eyebrow}</span>
          </span>
          {/* Stop counter (e.g. "3 / 8") — spec card-model stop number badge */}
          <span className="bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-kit-pill text-[11px] font-extrabold tabular-nums">
            {idx + 1} / {items.length}
          </span>
        </div>
        <h2 className="text-[26px] font-extrabold tracking-tight leading-tight drop-shadow">
          {item.title}
        </h2>
        {item.subtitle && (
          <p className="text-[14px] font-bold opacity-95 mt-1 drop-shadow">{item.subtitle}</p>
        )}
        <p className="text-[14px] font-medium leading-snug opacity-95 mt-3 drop-shadow line-clamp-3">
          {item.body}
        </p>
        {item.href && (
          <Link
            to={item.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 mt-5 px-5 py-3 rounded-kit-pill bg-white text-ink text-[14px] font-extrabold shadow-kit-pill"
          >
            {item.ctaLabel ?? 'Visit place'}
            <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Subtle prev/next hints (only if multi-item) */}
      {items.length > 1 && (
        <>
          {idx > 0 && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2 z-15 text-white/40 pointer-events-none" aria-hidden="true">
              <ChevronLeft size={28} strokeWidth={2.2} />
            </div>
          )}
          {idx < items.length - 1 && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2 z-15 text-white/40 pointer-events-none" aria-hidden="true">
              <ChevronRight size={28} strokeWidth={2.2} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
