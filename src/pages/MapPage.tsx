import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import ChatbotBar from '../components/ChatbotBar'
import EntryCard from '../components/EntryCard'
import MapView from '../components/MapView'
import PlanResult from '../components/PlanResult'
import ThemeStrip from '../components/ThemeStrip'
import { NKP } from '../data/seed'
import { themesForCity } from '../data/themes'
import { distanceKm } from '../lib/distance'
import { CHIPS, applyFilters } from '../lib/filters'
import {
  rankEntriesForIntent,
  shouldUsePlanMode,
  type RankedEntry,
} from '../lib/intentSearch'
import { getPlan, type Plan } from '../lib/plan'
import { useAppStore } from '../store/useAppStore'

type ActiveSearch = {
  query: string
  results: RankedEntry[]
}

export default function MapPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const [selectedChipIds, setSelectedChipIds] = useState<string[]>([])
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null)
  const [activeSearch, setActiveSearch] = useState<ActiveSearch | null>(null)

  // Chatbot / plan orchestration
  const [chatbotLoading, setChatbotLoading] = useState(false)
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const [routeRevealedSegments, setRouteRevealedSegments] = useState(0)

  const themes = useMemo(() => themesForCity('nkp'), [])
  const activeTheme = useMemo(
    () => themes.find((t) => t.id === activeThemeId) ?? null,
    [themes, activeThemeId],
  )

  // Filter pipeline: theme narrows the candidate set first; chips refine.
  const filteredEntries = useMemo(() => {
    const candidates = activeTheme
      ? entries.filter((e) => activeTheme.entry_ids.includes(e.id))
      : entries
    return applyFilters(candidates, selectedChipIds, new Date())
  }, [entries, selectedChipIds, activeTheme])

  const toggleChip = (id: string) => {
    setActiveSearch(null)
    setSelectedChipIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      // Auto-promote sheet on first selection
      if (prev.length === 0 && next.length > 0 && sheetState === 'peek') {
        setSheetState('half')
      }
      return next
    })
  }

  const handleThemeTap = (themeId: string) => {
    setActiveSearch(null)
    setActiveThemeId((prev) => (prev === themeId ? null : themeId))
    setSelectedChipIds([])
    if (sheetState === 'peek') setSheetState('half')
  }

  const handlePinTap = (entryId: string) => {
    navigate(`/entry/${entryId}`)
  }

  const handleCardTap = (id: string) => {
    navigate(`/entry/${id}`)
  }

  const handleChatbotSubmit = async (query: string) => {
    setActivePlan(null)
    setRouteRevealedSegments(0)
    setSelectedChipIds([])
    setActiveThemeId(null)
    setActiveSearch(null)

    if (shouldUsePlanMode(query)) {
      setChatbotLoading(true)
      const plan = await getPlan(query, 'nkp')
      setChatbotLoading(false)
      setActivePlan(plan)
      setSheetState('full')
      return
    }

    const rankedResults = rankEntriesForIntent(query, entries)
    if (rankedResults.length > 0) {
      setActiveSearch({ query, results: rankedResults })
      setSheetState('full')
      return
    }
    setChatbotLoading(true)
    const plan = await getPlan(query, 'nkp')
    setChatbotLoading(false)
    setActivePlan(plan)
    setSheetState('full')
  }

  const handleClearResults = () => {
    setActiveSearch(null)
    setActivePlan(null)
    setSelectedChipIds([])
    setActiveThemeId(null)
    setRouteRevealedSegments(0)
    setSheetState('peek')
  }

  // After plan arrives, reveal route segments in sequence (matches card cascade timing)
  useEffect(() => {
    if (!activePlan) return
    const totalSegments = activePlan.route_geometry.coordinates.length - 1
    setRouteRevealedSegments(0)
    const startDelay = 600 // wait for rationale to typewriter a bit before drawing
    const segmentInterval = 250
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < totalSegments; i++) {
      timers.push(
        setTimeout(() => setRouteRevealedSegments(i + 1), startDelay + i * segmentInterval),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [activePlan])

  // When a plan is active, use ALL entries (so faded pins still render); otherwise use filtered.
  const searchEntries = activeSearch?.results.map((result) => result.entry) ?? []
  const mapEntries = activePlan ? entries : activeSearch ? searchEntries : filteredEntries

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <ChatbotBar
        onSubmit={handleChatbotSubmit}
        loading={chatbotLoading}
        initialQuery={activeSearch?.query ?? activePlan?.query}
        onClear={handleClearResults}
        hasPlan={!!activePlan || !!activeSearch}
      />
      <MapView
        city={NKP}
        entries={mapEntries}
        onPinTap={(e) => handlePinTap(e.id)}
        activePlan={activePlan}
        routeRevealedSegments={routeRevealedSegments}
      />

      <BottomSheet state={sheetState} onStateChange={setSheetState}>
        {activePlan ? (
          <PlanResult plan={activePlan} onClear={handleClearResults} />
        ) : activeSearch ? (
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted font-semibold">
                  Search results
                </p>
                <h2 className="text-lg font-bold text-ink leading-tight">
                  {activeSearch.query}
                </h2>
                <p className="text-[12px] text-muted mt-0.5">
                  {activeSearch.results.length} ranked result
                  {activeSearch.results.length === 1 ? '' : 's'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearResults}
                className="text-[12px] font-semibold text-blue-strong hover:text-ink"
              >
                Clear
              </button>
            </div>

            {activeSearch.results.map((result, index) => (
              <div key={result.entry.id} className="mb-3">
                <div className="flex items-center gap-2 mb-1 text-[11px] text-muted">
                  <span className="font-bold text-blue-strong">#{index + 1}</span>
                  <span>{result.score} pts</span>
                  {result.matchedReasons.length > 0 && (
                    <span className="truncate">{result.matchedReasons.join(' · ')}</span>
                  )}
                </div>
                <EntryCard
                  entry={result.entry}
                  distanceKm={distanceKm(
                    { lat: NKP.default_lat, lng: NKP.default_lng },
                    { lat: result.entry.lat, lng: result.entry.lng },
                  )}
                  onTap={(e) => handleCardTap(e.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Theme strip — city identity (above chips) */}
            <ThemeStrip
              themes={themes}
              activeThemeId={activeThemeId}
              onThemeTap={handleThemeTap}
            />

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
              {CHIPS.map((chip) => {
                const active = selectedChipIds.includes(chip.id)
                return (
                  <button
                    key={chip.id}
                    onClick={() => toggleChip(chip.id)}
                    className={
                      'kit-chip ' + (active ? 'kit-chip-active' : 'kit-chip-inactive')
                    }
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>

            {/* Active-theme banner */}
            {activeTheme && (
              <div
                className="rounded-kit-photo p-3 mb-3 text-[12px] flex items-center gap-2.5 border-2"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.accent_color}25, ${activeTheme.accent_color}08)`,
                  borderColor: `${activeTheme.accent_color}50`,
                }}
              >
                <span className="text-lg">{activeTheme.emoji}</span>
                <span className="flex-1 text-ink/85 font-semibold">
                  Showing <span className="font-extrabold">{activeTheme.name_en}</span>
                </span>
                <button
                  onClick={() => setActiveThemeId(null)}
                  className="w-7 h-7 grid place-items-center rounded-kit-pill text-muted hover:text-ink hover:bg-ink/5 text-base leading-none transition"
                  aria-label="Clear theme"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Card list (filtered) */}
            <div>
              {filteredEntries.length === 0 && (
                <div className="text-center text-sm text-muted py-8">
                  No matches. Try removing a filter.
                </div>
              )}
              {filteredEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  distanceKm={distanceKm(
                    { lat: NKP.default_lat, lng: NKP.default_lng },
                    { lat: entry.lat, lng: entry.lng },
                  )}
                  onTap={(e) => handleCardTap(e.id)}
                />
              ))}
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  )
}
