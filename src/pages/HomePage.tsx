import { Link } from 'react-router-dom'
import KitBottomNav from '../components/KitBottomNav'
import SplashOverlay from '../components/SplashOverlay'
import { NKP } from '../data/seed'
import { themesForCity } from '../data/themes'
import { useAppStore } from '../store/useAppStore'
import { isSignature } from '../lib/signatures'

/**
 * HomePage — kit "Home" pattern made 1:1 with NKP content.
 * Mirrors the Tokyo destination-card hub from /figma-9-screens but
 * shows our 4 NKP Themes as the destination cards.
 *
 * Structure copied from kit:
 * - Status bar + sky/gradient hero with "Ready to Explore" + city name
 * - Floating search pill
 * - AI Insights row (3 mini cards)
 * - "Locals by AI" — destination cards scrolled horizontally
 */

export default function HomePage() {
  const themes = themesForCity('nkp')
  const entries = useAppStore((s) => s.entries)
  const signatures = entries.filter(isSignature).slice(0, 4)

  const insights = [
    { icon: '🛕', label: 'Birthday\nStupa Route', tint: 'bg-white' },
    { icon: '🌅', label: 'Mekong\nSunset', tint: 'bg-blue-soft/30' },
    { icon: '🧵', label: 'OTOP\nTextiles', tint: 'bg-yellow/20' },
  ] as const

  return (
    <div className="min-h-[100dvh] bg-white relative pb-24">
      <SplashOverlay />
      {/* Sky gradient header — kit Home pattern */}
      <div className="bg-kit-sky pb-7 pt-11 px-7 text-center relative overflow-hidden rounded-b-[36px]">
        {/* Cloud accents (kit pattern) */}
        <div className="absolute w-14 h-6 rounded-full bg-white/55 top-16 left-16 pointer-events-none" />
        <div className="absolute w-14 h-6 rounded-full bg-white/45 top-28 right-12 pointer-events-none" />

        <p className="text-[15px] font-bold text-ink/85">Ready to Explore</p>
        <h1 className="kit-h1 text-[44px] mt-1 leading-[0.95] tracking-[-0.05em]">
          {NKP.name_en}!
        </h1>
        <p className="text-base text-ink/55 mt-1 font-bold">{NKP.name_th}</p>

        {/* Floating search pill */}
        <Link
          to="/app"
          className="kit-pill mt-7 mx-auto justify-start text-left"
        >
          <span className="text-base text-ink/60">⌕</span>
          <span className="flex-1 text-sm font-semibold text-muted">
            Find places, food, trips...
          </span>
          <span className="w-8 h-8 grid place-items-center rounded-kit-pill bg-ink/5 text-blue-strong text-base">
            ◉
          </span>
        </Link>
      </div>

      {/* AI Insights — 3 mini cards (kit "AI Insights Today" row) */}
      <section className="px-6 mt-6">
        <p className="kit-eyebrow mb-3">AI Insights Today</p>
        <div className="flex gap-2.5">
          {insights.map((insight) => (
            <div
              key={insight.label}
              className={`flex-1 kit-card p-4 grid place-items-center text-center min-h-[120px] ${insight.tint}`}
            >
              <span className="text-3xl">{insight.icon}</span>
              <span className="text-[11px] font-extrabold text-ink mt-2 leading-tight whitespace-pre-line">
                {insight.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Locals by AI — destination cards horizontal scroll (kit "Locals by AI" row) */}
      <section className="mt-7">
        <p className="kit-eyebrow px-6 mb-3">Locals by AI</p>
        <div className="flex gap-3 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scrollbar-none">
          {signatures.map((entry) => (
            <Link
              key={entry.id}
              to={`/entry/${entry.id}`}
              className="snap-start flex-shrink-0 w-[180px] h-[260px] rounded-kit-hero p-6 flex flex-col justify-end shadow-kit-card hover:shadow-kit-frame transition-all relative overflow-hidden"
              style={{
                background: entry.photos?.[0]
                  ? `linear-gradient(180deg, transparent 40%, rgba(6,28,34,0.85) 100%), url(${entry.photos[0]})`
                  : 'linear-gradient(160deg, #a7e6ff, #ffffff 45%, #93ebed)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-white font-extrabold text-[17px] leading-tight tracking-tight">
                {entry.name_en}
              </p>
              <p className="text-white/75 text-[11px] mt-1 font-bold">{entry.name_th}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Themes — 4 NKP Theme cards (Birthday Stupa, Mekong, Vietnamese-Thai, OTOP) */}
      <section className="px-6 mt-7">
        <p className="kit-eyebrow mb-3">What is Nakhon Phanom?</p>
        <div className="grid gap-3">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              to="/app"
              className="block rounded-kit-hero p-4 transition-all border-2 shadow-kit-card hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: `linear-gradient(135deg, ${theme.accent_color}25, ${theme.accent_color}08)`,
                borderColor: `${theme.accent_color}40`,
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{theme.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-ink text-[16px] leading-tight">
                    {theme.name_en}
                  </div>
                  <div className="text-[11px] text-muted mt-0.5 font-bold">{theme.name_th}</div>
                  <p className="text-[12px] text-ink/75 mt-1.5 line-clamp-2 leading-snug font-medium">
                    {theme.tagline_en}
                  </p>
                  <div className="text-[11px] text-muted mt-1.5 font-bold">
                    {theme.entry_ids.length === 0 ? 'Coming soon' : `${theme.entry_ids.length} places`}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <KitBottomNav active="home" />
    </div>
  )
}
