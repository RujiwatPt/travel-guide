import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import EntryCard from '../components/EntryCard'
import MapView from '../components/MapView'
import SplashOverlay from '../components/SplashOverlay'
import { ENTRIES, NKP } from '../data/seed'
import { distanceKm } from '../lib/distance'
import { CHIPS, applyFilters } from '../lib/filters'

export default function MapPage() {
  const navigate = useNavigate()
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const [selectedChipIds, setSelectedChipIds] = useState<string[]>([])

  const filteredEntries = useMemo(
    () => applyFilters(ENTRIES, selectedChipIds, new Date()),
    [selectedChipIds],
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

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <SplashOverlay />
      <MapView city={NKP} entries={filteredEntries} onPinTap={(e) => handlePinTap(e.id)} />

      <BottomSheet state={sheetState} onStateChange={setSheetState}>
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
      </BottomSheet>
    </div>
  )
}
