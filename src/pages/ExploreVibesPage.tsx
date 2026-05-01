import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Heart, Sparkles, Star } from 'lucide-react'
import KitBottomNav2 from '../components/KitBottomNav2'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

/**
 * ExploreVibesPage — adapted from Builder.io's Screen 2 (Search Results):
 * back/search header + 3 chip tabs + tall hero overlay card +
 * Must-See Today 2-col grid. Tokyo content swapped for NKP.
 */

const TABS = [
  { id: 'near',  label: 'Near You'  },
  { id: 'hidden', label: 'Hidden Gem' },
  { id: 'food',  label: 'Food & Drink' },
]

function matchTab(tabId: string, e: Entry): boolean {
  if (tabId === 'near')   return e.category === 'temple' || e.category === 'landmark'
  if (tabId === 'hidden') return e.vibe_tags.includes('hidden-gem') || e.vibe_tags.includes('quiet')
  if (tabId === 'food')   return e.category === 'food' || e.category === 'cafe'
  return true
}

function TravelCard({ entry, rating }: { entry: Entry; rating?: number }) {
  return (
    <Link
      to={`/entry/${entry.id}`}
      className="block bg-white rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] active:scale-[0.99] transition-transform"
    >
      <div className="relative aspect-[4/3]">
        <img
          src={entry.photos?.[0] ?? ''}
          alt={entry.name_en}
          loading="lazy"
          width={300}
          height={225}
          className="w-full h-full object-cover bg-kit-cream-1"
        />
        {rating != null && (
          <div className="absolute top-2 right-2 bg-white/95 rounded-kit-pill px-2 py-1 flex items-center gap-1 shadow-kit-pill">
            <Star size={12} fill="currentColor" className="text-kit-gold-1" aria-hidden="true" />
            <span className="text-[11px] font-extrabold text-ink tabular-nums">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-extrabold text-[13px] text-ink tracking-tight leading-tight truncate">
          {entry.name_en}
        </h3>
        <p className="text-[11px] text-ink/55 mt-0.5 font-semibold truncate">
          {entry.name_th || entry.category}
        </p>
      </div>
    </Link>
  )
}

export default function ExploreVibesPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('near')
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => entries.filter((e) => matchTab(activeTab, e)).slice(0, 6),
    [entries, activeTab],
  )

  return (
    <main className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Search header */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
          >
            <ArrowLeft size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <div className="flex-1 relative" role="search">
            <label htmlFor="explore-search-input" className="sr-only">Search by vibe, place, or tag</label>
            <input
              id="explore-search-input"
              type="search"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vibe, place, tag…"
              className="w-full min-h-[44px] bg-kit-cream-2 rounded-kit-pill px-4 py-2.5 pr-10 text-[13px] font-medium text-ink placeholder:text-ink/45 border border-ink/[0.05] focus:outline-none focus:border-blue-strong"
            />
            <Search size={18} strokeWidth={2.2} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/45" aria-hidden="true" />
          </div>
        </div>

        {/* Chip tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto -mx-5 px-5 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              aria-pressed={activeTab === t.id}
              className={
                'shrink-0 min-h-[44px] px-5 py-2.5 rounded-kit-pill text-[13px] font-extrabold transition ' +
                (activeTab === t.id
                  ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                  : 'bg-kit-cream-2 text-ink/65 hover:bg-ink/5')
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Hero AI card */}
        <Link
          to="/app"
          className="block relative mb-7 rounded-kit-photo overflow-hidden shadow-kit-card active:scale-[0.99] transition-transform"
        >
          <img
            src={NKP_PHOTOS.mekongSunset}
            alt="Mekong sunset"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
          <span
            aria-label="Save"
            role="img"
            className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-kit-pill bg-white/25 backdrop-blur-md text-white"
          >
            <Heart size={18} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[11px] font-bold opacity-95 tracking-wide flex items-center gap-1">
              <Sparkles size={12} strokeWidth={2.4} aria-hidden="true" />
              AI PICK · MUST-SEE TODAY
            </p>
            <h3 className="text-[18px] font-extrabold tracking-tight leading-tight mt-1 drop-shadow">
              Find a sunset spot near the Mekong
            </h3>
          </div>
        </Link>

        {/* Must-See Today grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-extrabold text-ink tracking-tight">Must-See Today</h3>
            <Link to="/booking" className="text-blue-strong text-[12px] font-bold">See All</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 kit-stagger">
            {filtered.length === 0 && (
              <div className="col-span-2 text-center text-sm text-ink/55 py-8 font-medium">
                No matches.
              </div>
            )}
            {filtered.map((entry, i) => (
              <TravelCard key={entry.id} entry={entry} rating={4.5 + (i % 5) * 0.1} />
            ))}
          </div>
        </div>
      </div>

      <KitBottomNav2 active="grid" />
    </main>
  )
}
