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
      className="fixed inset-0 z-50 grid place-items-center text-center bg-kit-sky"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 300ms ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Soft white glow behind the content (matches kit's hero pages) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -10%)',
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative px-6">
        {/* Logo block — kit-styled rounded-kit-hero with heavy shadow */}
        <div className="w-24 h-24 mx-auto mb-7 rounded-kit-hero bg-ink text-white grid place-items-center text-4xl shadow-kit-frame">
          🇹🇭
        </div>

        {/* Eyebrow */}
        <p className="kit-eyebrow mb-3">Welcome to</p>

        {/* Heavy-bold header — kit-style negative tracking */}
        <h1 className="kit-h1 text-[48px] leading-[0.94] tracking-[-0.07em]">
          {NKP.name_en}
        </h1>

        {/* Thai subtitle */}
        <p className="text-2xl text-ink/55 mt-2 font-bold">{NKP.name_th}</p>

        {/* Tagline */}
        <p className="text-[13px] font-semibold text-ink/65 mt-7 max-w-[280px] mx-auto leading-relaxed">
          {NKP.tagline_en}
        </p>

        {/* Loading dots */}
        <div className="flex gap-1.5 justify-center mt-9">
          <span className="w-2 h-2 rounded-full bg-ink/70 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink/70 animate-pulse" style={{ animationDelay: '160ms' }} />
          <span className="w-2 h-2 rounded-full bg-ink/70 animate-pulse" style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  )
}
