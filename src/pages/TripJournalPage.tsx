import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ENTRIES } from '../data/seed'
import KitBottomNav from '../components/KitBottomNav'

/**
 * TripJournalPage — kit "Trip Journal" pattern.
 * Showcases the 8-stupa birthday pilgrimage circuit as a Timeline /
 * Storymode segmented view. The most distinctively-NKP "trip" possible.
 */

const WEEKDAY_BY_TAG: Record<string, string> = {
  'birthday-sunday': 'Sunday',
  'birthday-monday': 'Monday',
  'birthday-tuesday': 'Tuesday',
  'birthday-wednesday-day': 'Wednesday (day)',
  'birthday-wednesday-night': 'Wednesday (night)',
  'birthday-thursday': 'Thursday',
  'birthday-friday': 'Friday',
  'birthday-saturday': 'Saturday',
}

export default function TripJournalPage() {
  const [view, setView] = useState<'timeline' | 'storymode'>('timeline')
  const stupas = ENTRIES.filter((e) => e.vibe_tags.includes('birthday-stupa'))
    .sort((a, b) => {
      const ta = a.vibe_tags.find((t) => t.startsWith('birthday-')) ?? ''
      const tb = b.vibe_tags.find((t) => t.startsWith('birthday-')) ?? ''
      return ta.localeCompare(tb)
    })

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">Trip Journal</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-5 pt-4">
        <h1 className="kit-h1 text-[24px] tracking-[-0.03em]">Birthday-Stupa Pilgrimage</h1>
        <p className="text-sm text-muted mt-1 font-bold">
          Thailand's only province with all 8 weekday stupas.
        </p>

        {/* Segmented control — kit pattern */}
        <div className="flex justify-center gap-1.5 p-1.5 rounded-kit-hero bg-white shadow-kit-card mt-5 mb-5 border border-ink/5">
          <button
            onClick={() => setView('timeline')}
            className={
              'flex-1 py-3 rounded-kit-photo text-sm font-extrabold text-center transition ' +
              (view === 'timeline' ? 'bg-yellow text-ink' : 'bg-transparent text-muted hover:bg-ink/5')
            }
          >
            📜 Timeline
          </button>
          <button
            onClick={() => setView('storymode')}
            className={
              'flex-1 py-3 rounded-kit-photo text-sm font-extrabold text-center transition ' +
              (view === 'storymode' ? 'bg-yellow text-ink' : 'bg-transparent text-muted hover:bg-ink/5')
            }
          >
            🗺️ Storymode
          </button>
        </div>

        {/* Cards — kit journal-card pattern */}
        {stupas.map((entry, i) => {
          const dayTag = entry.vibe_tags.find((t) => t.startsWith('birthday-') && t !== 'birthday-stupa')
          const weekday = dayTag ? WEEKDAY_BY_TAG[dayTag] : ''
          return (
            <Link
              key={entry.id}
              to={`/entry/${entry.id}`}
              className="block relative mb-4 rounded-kit-hero overflow-hidden h-[260px] shadow-kit-card hover:shadow-kit-frame transition-all"
              style={{
                background: entry.photos?.[0]
                  ? `linear-gradient(to top, rgba(31,32,34,0.74), transparent 55%), url(${entry.photos[0]})`
                  : `linear-gradient(150deg, #ffb55d, #7b96ad 48%, #312c32)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute top-5 right-4 px-3 py-1 rounded-kit-pill bg-black/40 backdrop-blur text-white text-xs font-extrabold">
                +{i + 1}
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">
                  {weekday} stupa
                </p>
                <h3 className="font-extrabold text-lg mt-1 leading-tight tracking-tight">
                  {entry.name_en}
                </h3>
                <p className="text-xs text-white/85 mt-0.5 font-bold">{entry.name_th}</p>
                <p className="text-[11px] text-white/75 mt-1.5 font-bold">⌘ ~50 km from city</p>
              </div>
            </Link>
          )
        })}

        {view === 'storymode' && (
          <div className="kit-card p-4 mt-2 mb-2 text-center">
            <p className="text-xs text-muted font-bold">
              Storymode would show the route on a map. <Link to="/app" className="text-blue-strong">Open the map →</Link>
            </p>
          </div>
        )}
      </main>

      <KitBottomNav active="journal" />
    </div>
  )
}
