import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import KitEventRow from '../components/KitEventRow'
import KitHeroBookingCard from '../components/KitHeroBookingCard'
import KitPageHeader from '../components/KitPageHeader'
import KitSectionTitle from '../components/KitSectionTitle'
import KitTabRow from '../components/KitTabRow'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

const TABS = [
  { id: 'all',       label: 'All'       },
  { id: 'textiles',  label: 'Textiles'  },
  { id: 'coffee',    label: 'Coffee'    },
  { id: 'workshops', label: 'Workshops' },
]

function matchTab(tabId: string, e: Entry): boolean {
  if (tabId === 'all') return true
  if (tabId === 'textiles') return e.id === 'renu-otop' || e.cuisine_tags.length === 0 && e.category === 'shop'
  if (tabId === 'coffee')   return e.cuisine_tags.includes('coffee')
  if (tabId === 'workshops') return e.category === 'shop'
  return true
}

export default function BookingHubPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('all')

  // Hero scroller: shop entries (Renu OTOP, BlueGold Coffee)
  const heroes = useMemo(
    () => entries.filter((e) => e.category === 'shop' && matchTab(activeTab, e)),
    [entries, activeTab],
  )

  // Events: weekend-only / market / cafe entries with status
  const events = useMemo(
    () =>
      entries.filter(
        (e) =>
          (e.category === 'market' || e.id === 'bluegold-coffee' || e.id === 'naga-statue') &&
          matchTab(activeTab, e),
      ),
    [entries, activeTab],
  )

  return (
    <div className="min-h-[100dvh] bg-white relative pb-28">
      <KitPageHeader title="Explore" />

      <KitSectionTitle
        title="OTOP Hub"
        subtitle="OTOP & local crafts in Nakhon Phanom."
      />

      <div className="px-5">
        <KitTabRow tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      {/* Hero scroller */}
      <div className="px-5 pt-4">
        <div className="flex overflow-x-auto -mx-5 px-5 snap-x scrollbar-none pb-2">
          {heroes.length === 0 && (
            <div className="text-center text-sm text-ink/55 py-6 font-medium w-full">
              No items in this category yet.
            </div>
          )}
          {heroes.map((entry) => (
            <KitHeroBookingCard
              key={entry.id}
              entry={entry}
              price={entry.id === 'renu-nakhon-otop' ? '฿200+' : '฿600'}
              ctaLabel="View"
              onTap={(e) => navigate(`/entry/${e.id}`)}
              onCta={(e) => navigate(`/entry/${e.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="px-5 pt-2 flex items-center justify-between">
        <h2 className="text-[18px] font-extrabold text-ink tracking-tight">This Weekend</h2>
        <button className="text-[12px] font-bold text-blue-strong">See All</button>
      </div>

      <div className="px-5 pt-3">
        {events.map((e) => (
          <KitEventRow
            key={e.id}
            photo={e.photos?.[0]}
            emoji={e.emoji}
            title={e.id === 'indochina-walking-street' ? 'Walking Street (ถนนคนเดิน)'
              : e.id === 'bluegold-coffee'             ? 'BlueGold Coffee Tour'
              : e.id === 'naga-statue'                 ? 'Naga Sunset Walk'
              : e.name_en}
            meta={e.id === 'indochina-walking-street' ? 'Fri 17:00 · Indochina Market'
              : e.id === 'bluegold-coffee'             ? 'Sat 10:00 · Civet coffee farm'
              : e.id === 'naga-statue'                 ? 'Daily 18:00 · Free'
              : 'NKP'}
            ctaLabel={e.id === 'indochina-walking-street' ? 'Get Pass' : 'Details'}
            onTap={() => navigate(`/entry/${e.id}`)}
            onCta={() => navigate(`/entry/${e.id}`)}
          />
        ))}
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
