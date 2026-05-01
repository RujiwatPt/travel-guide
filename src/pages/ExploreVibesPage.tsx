import { Link } from 'react-router-dom'
import { ENTRIES } from '../data/seed'
import { themesForCity } from '../data/themes'
import { isSignature } from '../lib/signatures'
import KitBottomNav from '../components/KitBottomNav'

/**
 * ExploreVibesPage — kit "Explore new VIbes" pattern.
 * Top search + vibe chips + hero card + photo cards.
 * Uses NKP themes + signature entries.
 */

export default function ExploreVibesPage() {
  const themes = themesForCity('nkp')
  const heroTheme = themes[0]  // Birthday-Stupa Pilgrimage as the hero
  const signatures = ENTRIES.filter(isSignature)

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">Explore</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-5 pt-4">
        {/* Top search pill */}
        <Link to="/app" className="kit-pill">
          <span className="text-base text-ink/60">⌕</span>
          <span className="flex-1 text-sm font-semibold text-muted">
            Search by vibe, place, tag…
          </span>
          <span className="w-8 h-8 grid place-items-center rounded-kit-pill bg-ink/5 text-blue-strong text-base">
            ◉
          </span>
        </Link>

        {/* Vibe chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mt-4 -mx-5 px-5 scrollbar-none">
          <span className="kit-chip kit-chip-active">Must-See</span>
          <span className="kit-chip kit-chip-inactive">Hidden Gem</span>
          <span className="kit-chip kit-chip-inactive">Spiritual</span>
          <span className="kit-chip kit-chip-inactive">Sunset</span>
          <span className="kit-chip kit-chip-inactive">Photo-spot</span>
        </div>

        {/* Hero card — kit hero card pattern */}
        {heroTheme && (
          <Link
            to="/app"
            className="block relative h-[200px] rounded-kit-hero overflow-hidden mt-2 shadow-kit-frame"
            style={{
              background: `linear-gradient(135deg, ${heroTheme.accent_color}45, ${heroTheme.accent_color}15), linear-gradient(180deg, transparent 50%, rgba(6,28,34,0.8) 100%)`,
            }}
          >
            <span className="absolute top-3 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-kit-pill bg-white text-blue-strong text-[11px] font-extrabold">
              {heroTheme.emoji} Theme Tour
            </span>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h3 className="font-extrabold text-xl tracking-tight leading-tight">
                {heroTheme.name_en}
              </h3>
              <p className="text-sm text-white/85 mt-1 font-medium">
                {heroTheme.tagline_en}
              </p>
            </div>
          </Link>
        )}

        {/* Must-See Today — 2-card grid */}
        <div className="flex items-center justify-between mt-6 mb-3">
          <p className="kit-eyebrow">Must-See Today</p>
          <span className="text-xs text-blue-strong font-bold cursor-pointer">See All</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {signatures.slice(0, 2).map((entry) => (
            <Link
              key={entry.id}
              to={`/entry/${entry.id}`}
              className="relative h-[200px] rounded-kit-hero overflow-hidden shadow-kit-card"
              style={{
                background: entry.photos?.[0]
                  ? `linear-gradient(to top, rgba(12,35,47,0.66), transparent 56%), url(${entry.photos[0]})`
                  : 'linear-gradient(135deg, #a7e6ff, #93ebed)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <button className="absolute top-3 right-3 w-10 h-10 rounded-kit-pill bg-white/45 backdrop-blur grid place-items-center text-white">
                ♡
              </button>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] text-white/75 font-extrabold uppercase tracking-wider">
                  {entry.category}
                </p>
                <p className="font-extrabold text-base mt-0.5 tracking-tight leading-tight">
                  {entry.name_en}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Hidden Gems Nearby */}
        <div className="flex items-center justify-between mt-6 mb-3">
          <p className="kit-eyebrow">Hidden Gems Nearby</p>
          <span className="text-xs text-blue-strong font-bold cursor-pointer">See All</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {signatures.slice(2, 4).map((entry) => (
            <Link
              key={entry.id}
              to={`/entry/${entry.id}`}
              className="relative h-[200px] rounded-kit-hero overflow-hidden shadow-kit-card"
              style={{
                background: entry.photos?.[0]
                  ? `linear-gradient(to top, rgba(12,35,47,0.66), transparent 56%), url(${entry.photos[0]})`
                  : 'linear-gradient(135deg, #ffcad4, #9fcfe7 60%, #426e53)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <button className="absolute top-3 right-3 w-10 h-10 rounded-kit-pill bg-white/45 backdrop-blur grid place-items-center text-white">
                ♡
              </button>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] text-white/75 font-extrabold uppercase tracking-wider">
                  {entry.category}
                </p>
                <p className="font-extrabold text-base mt-0.5 tracking-tight leading-tight">
                  {entry.name_en}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <KitBottomNav active="explore" />
    </div>
  )
}
