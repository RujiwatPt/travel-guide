import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR } from '../lib/statusDisplay'
import type { City, Entry } from '../types'

type Props = {
  city: City
  entries: Entry[]
  onPinTap?: (entry: Entry) => void
}

function makePinIcon(emoji: string, borderColor: string): L.DivIcon {
  return L.divIcon({
    className: 'pin-wrapper',
    html: `<div class="pin" style="border-color:${borderColor}">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

export default function MapView({ city, entries, onPinTap }: Props) {
  const now = new Date()

  // Memoize icons by (emoji + status color) so we don't recreate on every render
  const pinIcons = useMemo(() => {
    return entries.map((entry) => {
      const status = isOpenNow(entry, now)
      return makePinIcon(entry.emoji, STATUS_COLOR[status])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries])

  return (
    <MapContainer
      center={[city.default_lat, city.default_lng]}
      zoom={city.default_zoom}
      className="absolute inset-0 z-0"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {entries.map((entry, i) => (
        <Marker
          key={entry.id}
          position={[entry.lat, entry.lng]}
          icon={pinIcons[i]}
          eventHandlers={{
            click: () => onPinTap?.(entry),
          }}
        />
      ))}
    </MapContainer>
  )
}
