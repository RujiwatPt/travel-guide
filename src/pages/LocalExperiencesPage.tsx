import { Link } from 'react-router-dom'
import { ENTRIES } from '../data/seed'
import KitBottomNav from '../components/KitBottomNav'

/**
 * LocalExperiencesPage — kit "Local Experiences & Food (Explore)" pattern.
 * Wide photo cards highlighting food + cultural entries.
 */

export default function LocalExperiencesPage() {
  const food = ENTRIES.filter((e) => e.category === 'food' || e.category === 'cafe' || e.category === 'market')
  const cultural = ENTRIES.filter((e) => e.category === 'museum' || e.category === 'temple' || e.category === 'landmark').slice(0, 4)

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">Explore</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-5 pt-4">
        <h1 className="kit-h1 text-[24px] tracking-[-0.03em]">Local Gems Around You</h1>
        <p className="text-sm text-muted mt-1 font-bold">Feel the city's heartbeat through food & culture.</p>

        <div className="flex gap-2 overflow-x-auto pb-3 mt-4 -mx-5 px-5 scrollbar-none">
          <span className="kit-chip kit-chip-active">Street Food</span>
          <span className="kit-chip kit-chip-inactive">Cultural Sites</span>
          <span className="kit-chip kit-chip-inactive">DIY Local Tour</span>
          <span className="kit-chip kit-chip-inactive">Markets</span>
        </div>

        {/* Food cards — wide photo */}
        {food.map((entry) => (
          <Link key={entry.id} to={`/entry/${entry.id}`} className="block mb-5">
            <div
              className="w-full h-[160px] rounded-kit-hero shadow-kit-card overflow-hidden"
              style={{
                background: entry.photos?.[0]
                  ? `url(${entry.photos[0]})`
                  : 'linear-gradient(160deg, #ffbf75, #ffe5aa 45%, #ffd66a)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="mt-3 px-1">
              <h3 className="font-extrabold text-ink text-base tracking-tight">
                {entry.name_en} <span className="text-xs text-muted font-bold">({entry.name_th})</span>
              </h3>
              <p className="text-xs text-muted mt-1 line-clamp-2 font-medium leading-relaxed">{entry.why_visit_en}</p>
              <p className="text-[11px] text-muted mt-1 font-bold">📍 {entry.category} · ★ Local favourite</p>
            </div>
          </Link>
        ))}

        <p className="kit-eyebrow mt-2 mb-3">Cultural Stops</p>
        {cultural.map((entry) => (
          <Link key={entry.id} to={`/entry/${entry.id}`} className="block mb-3 kit-card flex items-center gap-3 p-3">
            <div
              className="w-[64px] h-[64px] rounded-kit-photo flex-shrink-0 grid place-items-center text-2xl bg-kit-cream-1"
              style={
                entry.photos?.[0]
                  ? { backgroundImage: `url(${entry.photos[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : undefined
              }
            >
              {entry.photos?.[0] ? '' : entry.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-ink text-sm">{entry.name_en}</p>
              <p className="text-xs text-muted mt-0.5 font-bold truncate">{entry.name_th}</p>
              <p className="text-[11px] text-muted mt-1 font-bold">📍 {entry.category}</p>
            </div>
          </Link>
        ))}
      </main>

      <KitBottomNav active="explore" />
    </div>
  )
}
