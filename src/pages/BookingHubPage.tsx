import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, PartyPopper } from 'lucide-react'
import KitBottomNav2 from '../components/KitBottomNav2'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

/**
 * BookingHubPage — adapted from Builder.io's Screen 8 (Booking Hub):
 * page header + section title + 3-tab pill row + 2-col TravelCard grid
 * with prices + Local Events callout. Tokyo/yen content swapped for
 * Nakhon Phanom OTOP / baht.
 */

const TABS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'crafts',      label: 'OTOP Crafts' },
  { id: 'food',        label: 'Food & Coffee' },
]

function matchTab(tabId: string, e: Entry): boolean {
  if (tabId === 'recommended') return e.category === 'shop' || e.category === 'cafe' || e.category === 'temple'
  if (tabId === 'crafts')      return e.category === 'shop'
  if (tabId === 'food')        return e.category === 'cafe' || e.category === 'food'
  return true
}

const PRICE_FOR: Record<string, string> = {
  'renu-nakhon-otop': '฿200+',
  'bluegold-coffee':  '฿600',
  'pho-sawan':        '฿120',
  'river-vibes-cafe': '฿150',
  'wat-phra-that-phanom': 'Free',
  'naga-statue':      'Free',
}

function getPrice(id: string): string {
  return PRICE_FOR[id] ?? '฿200+'
}

type CardProps = { entry: Entry }

function TravelCard({ entry }: CardProps) {
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
        <span
          aria-label="Save"
          role="img"
          className="absolute top-2 right-2 w-7 h-7 grid place-items-center rounded-kit-pill bg-white/95 text-rose-500 shadow-kit-pill"
        >
          <Heart size={14} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-extrabold text-[13px] text-ink tracking-tight leading-tight truncate">
          {entry.name_en}
        </h3>
        <p className="text-[11px] text-ink/55 mt-0.5 font-semibold truncate">
          {entry.name_th}
        </p>
        <p className="text-[14px] font-extrabold text-blue-strong mt-1.5 tabular-nums">{getPrice(entry.id)}</p>
      </div>
    </Link>
  )
}

export default function BookingHubPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('recommended')

  const filtered = useMemo(
    () => entries.filter((e) => matchTab(activeTab, e)).slice(0, 6),
    [entries, activeTab],
  )

  const walkingStreet = entries.find((e) => e.id === 'indochina-walking-street')

  return (
    <div className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Explore</h1>
          <Link
            to="/explore"
            aria-label="Search"
            className="w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
          >
            <Search size={20} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>

        {/* Section title */}
        <div className="mb-5">
          <h2 className="text-[20px] font-extrabold text-ink tracking-tight">Booking Hub</h2>
          <p className="text-[13px] text-ink/55 font-semibold mt-1">OTOP, food, and cultural bookings in Nakhon Phanom</p>
        </div>

        {/* Tabs */}
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

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-3 mb-7 kit-stagger">
          {filtered.map((entry) => (
            <TravelCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* Local Events */}
        {walkingStreet && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] font-extrabold text-ink tracking-tight">This Weekend</h3>
              <Link to="/explore" className="text-blue-strong text-[12px] font-bold">See All</Link>
            </div>
            <button
              onClick={() => navigate(`/entry/${walkingStreet.id}`)}
              className="w-full text-left bg-blue-soft/20 rounded-kit-photo p-4 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-kit-photo bg-blue-soft/40 grid place-items-center text-blue-strong flex-shrink-0">
                  <PartyPopper size={22} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-ink text-[14px] tracking-tight">
                    Indochina Walking Street
                  </h4>
                  <p className="text-[12px] text-ink/55 mt-0.5 font-semibold leading-snug">
                    Fri-Sun · live music + 120 stalls
                  </p>
                  <p className="text-[11px] text-ink/45 mt-1 font-bold">Tonight · 17:00 onwards</p>
                </div>
                <span className="bg-blue-strong text-white px-3 py-1.5 rounded-kit-pill text-[11px] font-extrabold shrink-0">
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
