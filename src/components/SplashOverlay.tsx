import { useEffect, useState } from 'react'
import { NKP } from '../data/seed'

const VISITED_KEY = 'travel_guide_visited'

export default function SplashOverlay() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(VISITED_KEY) !== 'true'
  })
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!visible) return
    const fadeT = setTimeout(() => setFading(true), 1500)
    const removeT = setTimeout(() => {
      setVisible(false)
      localStorage.setItem(VISITED_KEY, 'true')
    }, 1800)
    return () => {
      clearTimeout(fadeT)
      clearTimeout(removeT)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center text-center"
      style={{
        background:
          'linear-gradient(155deg, #96cdf5 0%, #fef5df 50%, #ffda59 100%)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 300ms ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="px-6">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-ink text-white grid place-items-center text-3xl shadow-soft">
          🇹🇭
        </div>
        <p className="text-ink/70 text-base font-semibold tracking-wide mb-1">
          Welcome to
        </p>
        <h1 className="text-4xl font-extrabold text-ink leading-tight">
          {NKP.name_en}
        </h1>
        <p className="text-xl text-ink/70 mt-1">{NKP.name_th}</p>
        <p className="text-sm text-ink/60 mt-6 max-w-[280px] mx-auto">
          {NKP.tagline_en}
        </p>
        <div className="flex gap-1.5 justify-center mt-8">
          <span className="w-2 h-2 rounded-full bg-ink/60 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink/60 animate-pulse" style={{ animationDelay: '160ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink/60 animate-pulse" style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  )
}
