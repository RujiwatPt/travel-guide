import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import ChatbotBar from '../components/ChatbotBar'
import EntryCard from '../components/EntryCard'
import MapView from '../components/MapView'
import PlanResult from '../components/PlanResult'
import SplashOverlay from '../components/SplashOverlay'
import ThemeStrip from '../components/ThemeStrip'
import { NKP } from '../data/seed'
import { themesForCity } from '../data/themes'
import { distanceKm } from '../lib/distance'
import { CHIPS, applyFilters } from '../lib/filters'
import { getPlan, type Plan } from '../lib/plan'
import { useAppStore } from '../store/useAppStore'

export default function MapPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const [selectedChipIds, setSelectedChipIds] = useState<string[]>([])
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null)

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
    setChatbotLoading(true)
    setActivePlan(null)
    setRouteRevealedSegments(0)
    setSelectedChipIds([])
    setActiveThemeId(null)
    const plan = await getPlan(query, 'nkp')
    setChatbotLoading(false)
    setActivePlan(plan)
    setSheetState('full')
  }

  const handleClearPlan = () => {
    setActivePlan(null)
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
  const mapEntries = activePlan ? entries : filteredEntries

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <SplashOverlay />
      <ChatbotBar
        onSubmit={handleChatbotSubmit}
        loading={chatbotLoading}
        initialQuery={activePlan?.query}
        onClear={handleClearPlan}
        hasPlan={!!activePlan}
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
          <PlanResult plan={activePlan} onClear={handleClearPlan} />
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
