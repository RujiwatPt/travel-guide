import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import ChatbotBar from '../components/ChatbotBar'
import EntryCard from '../components/EntryCard'
import MapView from '../components/MapView'
import PlanResult from '../components/PlanResult'
import SplashOverlay from '../components/SplashOverlay'
import { NKP } from '../data/seed'
import { distanceKm } from '../lib/distance'
import { CHIPS, applyFilters } from '../lib/filters'
import { getPlan, type Plan } from '../lib/plan'
import { useAppStore } from '../store/useAppStore'

export default function MapPage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const [selectedChipIds, setSelectedChipIds] = useState<string[]>([])

  // Chatbot / plan orchestration
  const [chatbotLoading, setChatbotLoading] = useState(false)
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const [routeRevealedSegments, setRouteRevealedSegments] = useState(0)

  const filteredEntries = useMemo(
    () => applyFilters(entries, selectedChipIds, new Date()),
    [entries, selectedChipIds],
  )

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
            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
              {CHIPS.map((chip) => {
                const active = selectedChipIds.includes(chip.id)
                return (
                  <button
                    key={chip.id}
                    onClick={() => toggleChip(chip.id)}
                    className={
                      'px-3 py-1.5 rounded-full border text-[12px] font-semibold whitespace-nowrap transition ' +
                      (active
                        ? 'bg-yellow border-yellow text-ink'
                        : 'bg-white border-ink/10 text-muted')
                    }
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>

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
