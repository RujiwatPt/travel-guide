import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'
import type { Plan } from '../lib/plan'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR } from '../lib/statusDisplay'
import type { City, Entry } from '../types'

type Props = {
  city: City
  entries: Entry[]
  onPinTap?: (entry: Entry) => void
  activePlan?: Plan | null
  routeRevealedSegments?: number  // 0 = none drawn, n = first n segments visible
}

function makePinIcon(emoji: string, borderColor: string, opts?: { number?: number; faded?: boolean; large?: boolean }): L.DivIcon {
  const size = opts?.large ? 48 : 40
  const opacity = opts?.faded ? 0.3 : 1
  const numberBadge = opts?.number != null
    ? `<div class="pin-num">${opts.number}</div>`
    : ''
  return L.divIcon({
    className: 'pin-wrapper',
    html: `<div class="pin" style="border-color:${borderColor};width:${size}px;height:${size}px;font-size:${opts?.large ? 26 : 22}px;opacity:${opacity}">${emoji}${numberBadge}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export default function MapView({ city, entries, onPinTap, activePlan, routeRevealedSegments = 0 }: Props) {
  const planStopIds = useMemo(
    () => new Set(activePlan?.stops.map((s) => s.entry_id) ?? []),
    [activePlan],
  )

  // Pin icons recomputed when entries / plan / segment count changes
  const pinIcons = useMemo(() => {
    const now = new Date()
    return entries.map((entry) => {
      const status = isOpenNow(entry, now)
      const color = STATUS_COLOR[status]
      const inPlan = planStopIds.has(entry.id)
      if (activePlan && !inPlan) {
        return makePinIcon(entry.emoji, color, { faded: true })
      }
      if (activePlan && inPlan) {
        const stop = activePlan.stops.find((s) => s.entry_id === entry.id)!
        return makePinIcon(entry.emoji, '#1e8df0', { number: stop.position, large: true })
      }
      return makePinIcon(entry.emoji, color)
    })
  }, [entries, activePlan, planStopIds])

  // Route geometry: reveal first N segments
  const routePositions: [number, number][] = useMemo(() => {
    if (!activePlan) return []
    const coords = activePlan.route_geometry.coordinates
      .slice(0, Math.min(routeRevealedSegments + 1, activePlan.route_geometry.coordinates.length))
      .map((c) => [c[1], c[0]] as [number, number]) // GeoJSON is [lng,lat]; Leaflet wants [lat,lng]
    return coords
  }, [activePlan, routeRevealedSegments])

  return (
    <MapContainer
      center={[city.default_lat, city.default_lng]}
      zoom={city.default_zoom}
      className="absolute inset-0 z-0"
      zoomControl={false}
      attributionControl={false}
      dragging={!activePlan}
      scrollWheelZoom={!activePlan}
      doubleClickZoom={!activePlan}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {routePositions.length >= 2 && (
        <Polyline
          positions={routePositions}
          pathOptions={{ color: '#1e8df0', weight: 4, opacity: 0.85 }}
        />
      )}
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
