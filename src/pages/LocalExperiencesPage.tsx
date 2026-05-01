import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import KitPageHeader from '../components/KitPageHeader'
import KitSectionTitle from '../components/KitSectionTitle'
import KitTabRow from '../components/KitTabRow'
import KitWidePhotoCard from '../components/KitWidePhotoCard'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

const TABS = [
  { id: 'food',     label: 'Street Food'     },
  { id: 'cultural', label: 'Cultural Sites'  },
  { id: 'otop',     label: 'OTOP Crafts'     },
  { id: 'hidden',   label: 'Hidden Gem'      },
]

function matchTab(tabId: string, e: Entry): boolean {
  switch (tabId) {
    case 'food':     return e.category === 'food' || e.category === 'cafe'
    case 'cultural': return e.category === 'temple' || e.category === 'landmark' || e.category === 'museum'
    case 'otop':     return e.category === 'market' || e.vibe_tags.includes('local-favourite')
    case 'hidden':   return e.vibe_tags.includes('hidden-gem') || e.vibe_tags.includes('quiet')
    default:         return true
  }
}

const META_FOR_CATEGORY: Partial<Record<Entry['category'], string>> = {
  food: 'Local favourite',
  cafe: 'Quiet spot',
  market: 'Lively',
  landmark: 'Iconic',
  temple: 'Spiritual',
  museum: 'Hidden gem',
  nature: 'Outdoors',
}

export default function LocalExperiencesPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('food')

  const filtered = useMemo(
    () => entries.filter((e) => matchTab(activeTab, e)),
    [entries, activeTab],
  )

  return (
    <div className="min-h-[100dvh] bg-white relative pb-28">
      <KitPageHeader title="Explore" />

      <KitSectionTitle
        title="Local Gems in Nakhon Phanom"
        subtitle="Feel the heartbeat through food & culture."
      />

      <div className="px-5">
        <KitTabRow
          tabs={TABS}
          activeId={activeTab}
          onChange={setActiveTab}
          goldLastTab
        />
      </div>

      <div className="px-5 pt-4">
        {filtered.length === 0 && (
          <div className="text-center text-sm text-ink/55 py-10 font-medium">
            No matches yet. Try another tab.
          </div>
        )}
        {filtered.map((entry) => (
          <KitWidePhotoCard
            key={entry.id}
            entry={entry}
            metaRight={META_FOR_CATEGORY[entry.category]}
            onTap={(e) => navigate(`/entry/${e.id}`)}
          />
        ))}
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
