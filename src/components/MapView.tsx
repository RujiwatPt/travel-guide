import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'
import type { City, Entry } from '../types'

type Props = {
  city: City
  entries: Entry[]
  onPinTap?: (entry: Entry) => void
}

function makePinIcon(emoji: string): L.DivIcon {
  return L.divIcon({
    className: 'pin-wrapper',
    html: `<div class="pin">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

export default function MapView({ city, entries, onPinTap }: Props) {
  // Memoize icons by emoji so we don't recreate on every render
  const iconCache = useMemo(() => {
    const cache = new Map<string, L.DivIcon>()
    for (const e of entries) {
      if (!cache.has(e.emoji)) cache.set(e.emoji, makePinIcon(e.emoji))
    }
    return cache
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
      {entries.map((entry) => (
        <Marker
          key={entry.id}
          position={[entry.lat, entry.lng]}
          icon={iconCache.get(entry.emoji)!}
          eventHandlers={{
            click: () => onPinTap?.(entry),
          }}
        />
      ))}
    </MapContainer>
  )
}
