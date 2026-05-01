import { useState } from 'react'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import EntryCard from '../components/EntryCard'
import MapView from '../components/MapView'
import SplashOverlay from '../components/SplashOverlay'
import { ENTRIES, NKP } from '../data/seed'
import { distanceKm } from '../lib/distance'

export default function MapPage() {
  const [sheetState, setSheetState] = useState<SheetState>('peek')

  const handlePinTap = () => {
    if (sheetState === 'peek') setSheetState('half')
  }

  const handleCardTap = (id: string) => {
    // Slice 10 will navigate to /entry/:id
    console.log('card tapped:', id)
  }

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <SplashOverlay />
      <MapView city={NKP} entries={ENTRIES} onPinTap={handlePinTap} />

      <BottomSheet state={sheetState} onStateChange={setSheetState}>
        {/* Filter chip placeholder — replaced in Slice 9 */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
          {['🟢 Open now', '🍜 Food', '☕ Cafe', '🐉 Iconic', '🌅 Sunset', '🏛️ History'].map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 rounded-full bg-white border border-ink/10 text-[12px] font-semibold whitespace-nowrap text-muted"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Card list */}
        <div>
          {ENTRIES.map((entry) => (
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
