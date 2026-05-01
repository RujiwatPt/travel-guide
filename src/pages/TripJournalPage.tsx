import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import KitJournalCard from '../components/KitJournalCard'
import KitPageHeader from '../components/KitPageHeader'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

const STUPA_DAY: Record<string, string> = {
  'wat-phra-that-phanom':       'That Phanom District · Sunday',
  'phra-that-renu':             'Renu Nakhon · Monday',
  'phra-that-si-khun':          'Mueang NKP · Tuesday',
  'phra-that-mahachai':         'Pla Pak District · Wed daytime',
  'phra-that-marukkha-nakhon':  'Tha Uthen · Wed night',
  'phra-that-prasit':           'Tha Uthen · Thursday',
  'phra-that-tha-uthen':        'Tha Uthen · Friday',
  'phra-that-nakhon':           'Mueang NKP · Saturday',
}

const STUPA_HINT: Record<string, string> = {
  'wat-phra-that-phanom':       '50 km south of Mueang NKP',
  'phra-that-renu':             '30 km west of Mueang NKP',
  'phra-that-si-khun':          'In Mueang NKP centre',
  'phra-that-mahachai':         '20 km west of Mueang NKP',
  'phra-that-marukkha-nakhon':  '40 km north of Mueang NKP',
  'phra-that-prasit':           '40 km north of Mueang NKP',
  'phra-that-tha-uthen':        '25 km north of Mueang NKP',
  'phra-that-nakhon':           'In Mueang NKP centre',
}

export default function TripJournalPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [mode, setMode] = useState<'timeline' | 'storymode'>('timeline')

  const stupas: Entry[] = entries.filter((e) =>
    e.vibe_tags?.includes('birthday-stupa'),
  )

  return (
    <div className="min-h-[100dvh] bg-white relative pb-28">
      <KitPageHeader title="Birthday-Stupa Pilgrimage" />

      {/* Tab toggle */}
      <div className="px-5 pt-2">
        <div className="flex gap-2 p-1.5 bg-kit-cream-2 rounded-kit-pill">
          <button
            onClick={() => setMode('timeline')}
            className={
              'flex-1 px-3 py-2 rounded-kit-pill text-[13px] font-extrabold transition flex items-center justify-center gap-1.5 ' +
              (mode === 'timeline' ? 'bg-white shadow-kit-pill text-ink' : 'text-ink/55')
            }
          >
            📔 Timeline
          </button>
          <button
            onClick={() => setMode('storymode')}
            className={
              'flex-1 px-3 py-2 rounded-kit-pill text-[13px] font-extrabold transition flex items-center justify-center gap-1.5 ' +
              (mode === 'storymode' ? 'bg-white shadow-kit-pill text-ink' : 'text-ink/55')
            }
          >
            ✨ Storymode
          </button>
        </div>
      </div>

      <div className="px-5 pt-4">
        {stupas.length === 0 && (
          <div className="text-center text-sm text-ink/55 py-10 font-medium">
            No stupas mapped yet.
          </div>
        )}
        {stupas.map((entry) => (
          <KitJournalCard
            key={entry.id}
            entry={entry}
            subtitle={STUPA_DAY[entry.id] ?? 'Birthday-Stupa Trail'}
            locationHint={STUPA_HINT[entry.id] ?? 'Nakhon Phanom Province'}
            tags={['Spiritual', 'Iconic']}
            onTap={(e) => navigate(`/entry/${e.id}`)}
          />
        ))}
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
