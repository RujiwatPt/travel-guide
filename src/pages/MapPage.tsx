import MapView from '../components/MapView'
import { ENTRIES, NKP } from '../data/seed'

export default function MapPage() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <MapView
        city={NKP}
        entries={ENTRIES}
        onPinTap={(entry) => {
          // Slice 1: console.log only; Slice 10 will navigate to Entry Detail
          console.log('pin tapped:', entry.id, entry.name_en)
        }}
      />
    </div>
  )
}
