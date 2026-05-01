import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KitAiHeroCard from '../components/KitAiHeroCard'
import KitBottomNav2 from '../components/KitBottomNav2'
import KitSearchBar from '../components/KitSearchBar'
import KitSquarePhotoCard from '../components/KitSquarePhotoCard'
import KitTabRow from '../components/KitTabRow'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

const TABS = [
  { id: 'must-see',  label: 'Must-See'    },
  { id: 'hidden',    label: 'Hidden Gem'  },
  { id: 'food-cafe', label: 'Food & Cafe' },
]

const MUST_SEE_IDS = ['wat-phra-that-phanom', 'naga-statue']
const HIDDEN_IDS   = ['tham-nakee', 'old-town-street-art', 'ho-chi-minh-house']
const FOOD_IDS     = ['pho-sawan', 'river-vibes-cafe', 'bluegold-coffee']

const EYEBROW: Record<string, string> = {
  'wat-phra-that-phanom': 'That Phanom District',
  'naga-statue':          'Riverfront',
  'tham-nakee':           'Phu Langka NP',
  'old-town-street-art':  'Old Town NKP',
  'ho-chi-minh-house':    'Ban Na Chok',
  'pho-sawan':            'Mueang NKP',
  'river-vibes-cafe':     'Mekong',
  'bluegold-coffee':      'Civet farm',
}

export default function ExploreVibesPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [activeTab, setActiveTab] = useState('must-see')
  const [search, setSearch] = useState('')

  const byId = useMemo(() => Object.fromEntries(entries.map((e) => [e.id, e])), [entries])

  const mustSee: Entry[] = MUST_SEE_IDS.map((id) => byId[id]).filter(Boolean)
  const hiddenGems: Entry[] = HIDDEN_IDS.map((id) => byId[id]).filter(Boolean)
  const foodCafe: Entry[] = FOOD_IDS.map((id) => byId[id]).filter(Boolean)

  // Top section follows the tab selection
  const topGrid =
    activeTab === 'hidden'    ? hiddenGems
    : activeTab === 'food-cafe' ? foodCafe
    : mustSee

  const topTitle =
    activeTab === 'hidden'    ? 'Hidden Gems Today'
    : activeTab === 'food-cafe' ? 'Food & Cafe Today'
    : 'Must-See Today'

  // Always show "Hidden Gems Nearby" as a secondary section
  const secondary = activeTab === 'hidden' ? foodCafe : hiddenGems
  const secondaryTitle = activeTab === 'hidden' ? 'Food & Cafe Nearby' : 'Hidden Gems Nearby'

  return (
    <div className="min-h-[100dvh] bg-white relative pb-28">
      <div className="px-5 pt-4">
        <KitSearchBar
          placeholder="Search by vibe, place, tag…"
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="px-5 pt-4">
        <KitTabRow tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      <div className="px-5 pt-4">
        <KitAiHeroCard
          photo={NKP_PHOTOS.mekongSunset}
          pillLabel="AI Pick"
          prompt={'Find me a sunset spot near\nthe Mekong'}
          onTap={() => navigate('/app')}
        />
      </div>

      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-extrabold text-ink tracking-tight leading-tight">{topTitle}</h2>
          <p className="text-[12px] text-ink/55 font-semibold">AI Curated Route</p>
        </div>
        <button className="text-[12px] font-bold text-blue-strong">See All</button>
      </div>

      <div className="px-5 pt-3 grid grid-cols-2 gap-3">
        {topGrid.map((entry) => (
          <KitSquarePhotoCard
            key={entry.id}
            entry={entry}
            eyebrow={EYEBROW[entry.id]}
            onTap={(e) => navigate(`/entry/${e.id}`)}
          />
        ))}
      </div>

      <div className="px-5 pt-5 flex items-center justify-between">
        <h2 className="text-[18px] font-extrabold text-ink tracking-tight">{secondaryTitle}</h2>
        <button className="text-[12px] font-bold text-blue-strong">See All</button>
      </div>

      <div className="px-5 pt-3 grid grid-cols-2 gap-3">
        {secondary.map((entry) => (
          <KitSquarePhotoCard
            key={entry.id}
            entry={entry}
            eyebrow={EYEBROW[entry.id]}
            onTap={(e) => navigate(`/entry/${e.id}`)}
          />
        ))}
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
