import { useEffect, useRef, useState, type ReactNode } from 'react'

export type SheetState = 'peek' | 'half' | 'full'

type Props = {
  state: SheetState
  onStateChange: (next: SheetState) => void
  children: ReactNode
}

// Heights expressed as CSS top offsets. Smaller top = taller sheet.
// peek height bumped to 240px to fit ThemeStrip + chip row.
const PEEK_HEIGHT_PX = 240
const TOP_BY_STATE: Record<SheetState, string> = {
  peek: `calc(100dvh - ${PEEK_HEIGHT_PX}px)`,
  half: '55dvh',
  full: '8dvh',
}

// For snap calculation, work in pixels at runtime
function snapToNearest(currentTopPx: number, viewportH: number): SheetState {
  const peekPx = viewportH - PEEK_HEIGHT_PX
  const halfPx = viewportH * 0.55
  const fullPx = viewportH * 0.08
  const candidates: [SheetState, number][] = [
    ['peek', Math.abs(currentTopPx - peekPx)],
    ['half', Math.abs(currentTopPx - halfPx)],
    ['full', Math.abs(currentTopPx - fullPx)],
  ]
  candidates.sort((a, b) => a[1] - b[1])
  return candidates[0][0]
}

export default function BottomSheet({ state, onStateChange, children }: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{ startY: number; startTop: number } | null>(null)
  const [dragTop, setDragTop] = useState<number | null>(null)

  useEffect(() => {
    const handle = handleRef.current
    const sheet = sheetRef.current
    if (!handle || !sheet) return

    const onPointerDown = (e: PointerEvent) => {
      handle.setPointerCapture(e.pointerId)
      const rect = sheet.getBoundingClientRect()
      dragRef.current = { startY: e.clientY, startTop: rect.top }
      setDragTop(rect.top)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return
      const delta = e.clientY - dragRef.current.startY
      const next = Math.max(0, dragRef.current.startTop + delta)
      setDragTop(next)
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current) return
      try { handle.releasePointerCapture(e.pointerId) } catch {}
      const finalTop = dragTop ?? dragRef.current.startTop
      const snapped = snapToNearest(finalTop, window.innerHeight)
      dragRef.current = null
      setDragTop(null)
      onStateChange(snapped)
    }

    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    handle.addEventListener('pointercancel', onPointerUp)
    return () => {
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      handle.removeEventListener('pointercancel', onPointerUp)
    }
  }, [dragTop, onStateChange])

  const topStyle = dragTop != null ? `${dragTop}px` : TOP_BY_STATE[state]

  return (
    <div
      ref={sheetRef}
      className="absolute inset-x-0 bottom-0 z-kit-sheet bg-white rounded-t-[36px] shadow-sheet flex flex-col"
      style={{
        top: topStyle,
        transition: dragTop == null ? 'top 220ms ease-out' : undefined,
        touchAction: 'none',
      }}
    >
      <div
        ref={handleRef}
        className="w-full pt-3 pb-2 grid place-items-center cursor-grab active:cursor-grabbing"
        aria-label="Drag handle"
      >
        <div className="w-[44px] h-[5px] rounded-full bg-ink/25" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-8">{children}</div>
    </div>
  )
}
