import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Settings, BookOpen, Sparkles, MapPin, ChevronRight, Star } from 'lucide-react'
import KitBottomNav2 from '../components/KitBottomNav2'
import KitStorymode, { type StoryItem } from '../components/KitStorymode'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

/**
 * TripJournalPage — Birthday-Stupa Pilgrimage list.
 * Cards use the photo-on-top + content-below pattern that matches
 * /local, /booking, /explore for visual consistency across the app.
 */

const STUPA_CONFIG: Record<
  string,
  { subtitle: string; rating: string }
> = {
  'wat-phra-that-phanom':       { subtitle: 'That Phanom · Sunday',     rating: '4.9 (3.2k pilgrims)' },
  'phra-that-renu':             { subtitle: 'Renu Nakhon · Monday',     rating: '4.7 (1.5k pilgrims)' },
  'phra-that-si-khun':          { subtitle: 'Mueang NKP · Tuesday',     rating: '4.6 (980 pilgrims)'  },
  'phra-that-mahachai':         { subtitle: 'Pla Pak · Wed daytime',    rating: '4.5 (640 pilgrims)'  },
  'phra-that-marukkha-nakhon':  { subtitle: 'Tha Uthen · Wed night',    rating: '4.6 (510 pilgrims)'  },
  'phra-that-prasit':           { subtitle: 'Tha Uthen · Thursday',     rating: '4.5 (430 pilgrims)'  },
  'phra-that-tha-uthen':        { subtitle: 'Tha Uthen · Friday',       rating: '4.7 (720 pilgrims)'  },
  'phra-that-nakhon':           { subtitle: 'Mueang NKP · Saturday',    rating: '4.7 (1.1k pilgrims)' },
}

export default function TripJournalPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [mode, setMode] = useState<'timeline' | 'storymode'>('timeline')
  const [storyStartIdx, setStoryStartIdx] = useState(0)

  const stupas: Entry[] = entries.filter((e) =>
    e.vibe_tags?.includes('birthday-stupa'),
  )

  // Build StoryItem[] from stupas — read-along framing.
  // Body uses the FULL description_en (multi-sentence prose with markdown
  // bold), not the one-liner why_visit_en. Falls back to why_visit_en if
  // description is missing. Storymode renders longer copy at comfortable
  // reading size (16px / 1.55 line-height) and lets the user tap to advance.
  const storyItems: StoryItem[] = stupas.map((entry) => {
    const config = STUPA_CONFIG[entry.id]
    return {
      id: entry.id,
      photo: entry.photos?.[0] ?? '',
      eyebrow: config?.subtitle ?? 'Birthday-Stupa Trail',
      title: entry.name_en,
      subtitle: entry.name_th,
      body: entry.description_en || entry.why_visit_en,
      href: `/entry/${entry.id}`,
      ctaLabel: 'Visit place',
    }
  })

  const openStorymode = (startIdx = 0) => {
    setStoryStartIdx(startIdx)
    setMode('storymode')
  }
  const closeStorymode = () => setMode('timeline')

  return (
    <main className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Trip Journal</h1>
          <div className="flex gap-2">
            <button
              aria-label="Calendar"
              className="w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
            >
              <Calendar size={20} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              aria-label="Settings"
              className="w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
            >
              <Settings size={20} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6" role="tablist">
          <button
            onClick={() => setMode('timeline')}
            role="tab"
            aria-selected={mode === 'timeline'}
            className={
              'min-h-[44px] px-5 py-2.5 rounded-kit-pill text-[13px] font-extrabold transition flex items-center gap-1.5 ' +
              (mode === 'timeline'
                ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                : 'text-ink/55 hover:bg-ink/5')
            }
          >
            <BookOpen size={16} strokeWidth={2.2} aria-hidden="true" />
            Timeline
          </button>
          <button
            onClick={() => openStorymode(0)}
            role="tab"
            aria-selected={mode === 'storymode'}
            className={
              'min-h-[44px] px-5 py-2.5 rounded-kit-pill text-[13px] font-extrabold transition flex items-center gap-1.5 ' +
              (mode === 'storymode'
                ? 'bg-kit-gold-1 text-ink shadow-kit-pill'
                : 'text-ink/55 hover:bg-ink/5')
            }
          >
            <Sparkles size={16} strokeWidth={2.2} aria-hidden="true" />
            Storymode
          </button>
        </div>

        {/* Stupa cards — photo on top, content below (matches /local, /booking) */}
        <div className="space-y-4">
          {stupas.map((entry) => {
            const config = STUPA_CONFIG[entry.id] ?? {
              subtitle: 'Birthday-Stupa Trail',
              rating: '4.5',
            }
            return (
              <button
                key={entry.id}
                onClick={() => navigate(`/entry/${entry.id}`)}
                className="w-full text-left rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] bg-white active:scale-[0.99] transition-transform"
              >
                {/* Photo */}
                <div className="relative aspect-[16/10]">
                  <img
                    src={entry.photos?.[0] ?? ''}
                    alt={entry.name_en}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover bg-kit-cream-1"
                  />
                  {/* Subtitle (day-of-week) overlaid on photo for at-a-glance scanning */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-kit-pill px-3 py-1.5 flex items-center gap-1.5 shadow-kit-pill">
                    <MapPin size={12} strokeWidth={2.4} className="text-blue-strong" aria-hidden="true" />
                    <span className="text-[11px] font-extrabold text-ink">{config.subtitle}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="px-4 py-3">
                  <h3 className="text-[17px] font-extrabold text-ink tracking-tight leading-tight">
                    {entry.name_en}
                  </h3>
                  <p className="text-[13px] text-ink/55 mt-0.5 font-semibold">{entry.name_th}</p>
                  <p className="text-[12px] text-ink/65 mt-2 leading-snug line-clamp-2 font-medium">
                    {entry.why_visit_en}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-[12px] font-extrabold text-ink tabular-nums">
                      <Star size={12} fill="currentColor" className="text-kit-gold-1" aria-hidden="true" />
                      <span>{config.rating}</span>
                    </div>
                    <span className="bg-blue-soft/30 text-blue-strong px-3 py-1.5 rounded-kit-pill text-[11px] font-extrabold flex items-center gap-1">
                      CONTINUE
                      <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <KitBottomNav2 active="grid" />

      {/* Storymode overlay — read-along mode (autoAdvanceMs=0 default).
          User taps right side to advance, left to go back, swipes down to close.
          Body shows the full description_en in 16px / 1.55 lh for comfortable reading. */}
      {mode === 'storymode' && storyItems.length > 0 && (
        <KitStorymode
          items={storyItems}
          startIndex={storyStartIdx}
          onClose={closeStorymode}
        />
      )}
    </main>
  )
}
