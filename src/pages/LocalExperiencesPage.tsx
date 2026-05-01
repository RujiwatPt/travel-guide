import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

/**
 * LocalExperiencesPage — adapted from Builder.io's Screen 7 (Explore Local):
 * page header + section title + 3-tab pill row + 2-col TravelCard grid +
 * Local Events callout. Tokyo content swapped for NKP.
 */

const TABS = [
  { id: 'curated', label: 'Curated' },
  { id: 'cheap',   label: 'Street Eats' },
  { id: 'offbeat', label: 'Off-Trail' },
]

function matchTab(tabId: string, e: Entry): boolean {
  if (tabId === 'curated') return e.category === 'food' || e.category === 'cafe' || e.id === 'indochina-walking-street'
  if (tabId === 'cheap')   return e.category === 'food' || e.category === 'market'
  if (tabId === 'offbeat') return e.vibe_tags.includes('hidden-gem') || e.vibe_tags.includes('quiet')
  return true
}

const LOCATION_LABEL: Partial<Record<Entry['category'], string>> = {
  food: 'Mueang NKP',
  cafe: 'Mekong Riverfront',
  market: 'Indochina Market',
  landmark: 'That Phanom',
  shop: 'Renu Nakhon',
  museum: 'Old Town',
}

type CardProps = {
  entry: Entry
  rating?: number
}

function TravelCard({ entry, rating }: CardProps) {
  return (
    <Link
      to={`/entry/${entry.id}`}
      className="block bg-white rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] active:scale-[0.99] transition-transform"
    >
      <div className="relative">
        <img
          src={entry.photos?.[0] ?? ''}
          alt={entry.name_en}
          className="w-full h-32 object-cover bg-kit-cream-1"
        />
        {rating != null && (
          <div className="absolute top-2 right-2 bg-white/95 rounded-kit-pill px-2 py-1 flex items-center gap-1 shadow-kit-pill">
            <span className="text-kit-gold-1 text-xs">★</span>
            <span className="text-[11px] font-extrabold text-ink">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-extrabold text-[14px] text-ink tracking-tight leading-tight truncate">
          {entry.name_en}
        </h3>
        <p className="text-[11px] text-ink/55 mt-0.5 font-semibold truncate">
          {entry.name_th || LOCATION_LABEL[entry.category]}
        </p>
      </div>
    </Link>
  )
}

export default function LocalExperiencesPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('curated')

  const filtered = useMemo(
    () => entries.filter((e) => matchTab(activeTab, e)).slice(0, 8),
    [entries, activeTab],
  )

  const walkingStreet = entries.find((e) => e.id === 'indochina-walking-street')

  return (
    <div className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Explore</h1>
          <button className="w-10 h-10 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05]">🔍</button>
        </div>

        {/* Section title */}
        <div className="mb-5">
          <h2 className="text-[20px] font-extrabold text-ink tracking-tight">Local Gems Around You</h2>
          <p className="text-[13px] text-ink/55 font-semibold mt-1">Discover hidden treasures in Nakhon Phanom</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto -mx-5 px-5 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={
                'shrink-0 px-4 py-2 rounded-kit-pill text-[12px] font-extrabold transition ' +
                (activeTab === t.id
                  ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                  : 'bg-kit-cream-2 text-ink/65 hover:bg-ink/5')
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-sm text-ink/55 py-8 font-medium">
              No matches.
            </div>
          )}
          {filtered.map((entry, i) => (
            <TravelCard key={entry.id} entry={entry} rating={4.5 + (i % 5) * 0.1} />
          ))}
        </div>

        {/* Local Events */}
        {walkingStreet && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] font-extrabold text-ink tracking-tight">Local Events</h3>
              <Link to="/booking" className="text-blue-strong text-[12px] font-bold">See All</Link>
            </div>
            <button
              onClick={() => navigate(`/entry/${walkingStreet.id}`)}
              className="w-full text-left bg-rose-50 rounded-kit-photo p-4 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-kit-photo bg-rose-100 grid place-items-center text-xl flex-shrink-0">
                  🛍️
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-ink text-[14px] tracking-tight">
                    Walking Street ({walkingStreet.name_th})
                  </h4>
                  <p className="text-[12px] text-ink/55 mt-0.5 font-semibold leading-snug">
                    Live music + 120 stalls along the Mekong
                  </p>
                  <p className="text-[11px] text-ink/45 mt-1 font-bold">Tonight · 17:00 — 23:00</p>
                </div>
                <span className="bg-rose-500 text-white px-3 py-1.5 rounded-kit-pill text-[11px] font-extrabold shrink-0">
                  Get Pass
                </span>
              </div>
            </button>
          </div>
        )}
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
