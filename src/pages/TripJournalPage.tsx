import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

/**
 * TripJournalPage — adapted from Builder.io's Screen 3 (Trip Journal):
 * gradient-background cards with location chip + title + description +
 * rating + CTA. Tokyo content swapped for NKP birthday-stupa pilgrimage.
 */

const STUPA_CONFIG: Record<
  string,
  { gradient: string; subtitle: string; rating: string }
> = {
  'wat-phra-that-phanom': {
    gradient: 'from-amber-400 to-rose-400',
    subtitle: 'That Phanom · Sunday',
    rating: '4.9 (3.2k pilgrims)',
  },
  'phra-that-renu': {
    gradient: 'from-pink-400 to-fuchsia-400',
    subtitle: 'Renu Nakhon · Monday',
    rating: '4.7 (1.5k pilgrims)',
  },
  'phra-that-si-khun': {
    gradient: 'from-orange-400 to-amber-500',
    subtitle: 'Mueang NKP · Tuesday',
    rating: '4.6 (980 pilgrims)',
  },
  'phra-that-mahachai': {
    gradient: 'from-emerald-400 to-teal-500',
    subtitle: 'Pla Pak · Wed daytime',
    rating: '4.5 (640 pilgrims)',
  },
  'phra-that-marukkha-nakhon': {
    gradient: 'from-blue-400 to-indigo-500',
    subtitle: 'Tha Uthen · Wed night',
    rating: '4.6 (510 pilgrims)',
  },
  'phra-that-prasit': {
    gradient: 'from-violet-400 to-purple-500',
    subtitle: 'Tha Uthen · Thursday',
    rating: '4.5 (430 pilgrims)',
  },
  'phra-that-tha-uthen': {
    gradient: 'from-sky-400 to-cyan-500',
    subtitle: 'Tha Uthen · Friday',
    rating: '4.7 (720 pilgrims)',
  },
  'phra-that-nakhon': {
    gradient: 'from-rose-400 to-orange-400',
    subtitle: 'Mueang NKP · Saturday',
    rating: '4.7 (1.1k pilgrims)',
  },
}

export default function TripJournalPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [mode, setMode] = useState<'timeline' | 'storymode'>('timeline')

  const stupas: Entry[] = entries.filter((e) =>
    e.vibe_tags?.includes('birthday-stupa'),
  )

  return (
    <div className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Trip Journal</h1>
          <div className="flex gap-2">
            <button className="w-10 h-10 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05]">📅</button>
            <button className="w-10 h-10 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05]">⚙️</button>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('timeline')}
            className={
              'px-5 py-2 rounded-kit-pill text-[13px] font-extrabold transition ' +
              (mode === 'timeline'
                ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                : 'text-ink/55 hover:bg-ink/5')
            }
          >
            📔 Timeline
          </button>
          <button
            onClick={() => setMode('storymode')}
            className={
              'px-5 py-2 rounded-kit-pill text-[13px] font-extrabold transition ' +
              (mode === 'storymode'
                ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                : 'text-ink/55 hover:bg-ink/5')
            }
          >
            ✨ Storymode
          </button>
        </div>

        {/* Stupa cards */}
        <div className="space-y-4">
          {stupas.map((entry) => {
            const config = STUPA_CONFIG[entry.id] ?? {
              gradient: 'from-slate-400 to-slate-500',
              subtitle: 'Birthday-Stupa Trail',
              rating: '4.5',
            }
            return (
              <button
                key={entry.id}
                onClick={() => navigate(`/entry/${entry.id}`)}
                className={`w-full text-left rounded-kit-photo p-4 text-white shadow-kit-card bg-gradient-to-br ${config.gradient} active:scale-[0.99] transition-transform`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">📍</span>
                  <span className="text-[12px] font-bold opacity-95">{config.subtitle}</span>
                </div>
                <h3 className="text-[18px] font-extrabold tracking-tight leading-tight mb-1">
                  {entry.name_en}
                </h3>
                <p className="text-[13px] opacity-95 font-bold mb-2">{entry.name_th}</p>
                <p className="text-[12px] opacity-90 mb-3 leading-snug line-clamp-2">
                  {entry.why_visit_en}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[12px] font-bold">
                    <span className="text-yellow-200">★</span>
                    <span>{config.rating}</span>
                  </div>
                  <span className="bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-kit-pill text-[11px] font-extrabold">
                    CONTINUE →
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}
