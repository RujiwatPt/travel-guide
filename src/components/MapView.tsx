import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import type { Plan } from '../lib/plan'
import { isSignature } from '../lib/signatures'
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

/**
 * Pin icon — circular thumbnail using the entry's photo, with a colored
 * status border, optional number badge, and optional signature glow.
 * Falls back to emoji if no photo URL is provided.
 */
function makePinIcon(
  emoji: string,
  borderColor: string,
  opts?: {
    photo?: string
    number?: number
    faded?: boolean
    large?: boolean
    signature?: boolean
  },
): L.DivIcon {
  const size = opts?.large ? 48 : 40
  const opacity = opts?.faded ? 0.3 : 1
  const numberBadge = opts?.number != null
    ? `<div class="pin-num">${opts.number}</div>`
    : ''
  const signatureGlow = opts?.signature
    ? 'box-shadow:0 0 0 3px #ffc20d, 0 4px 14px rgba(20,45,65,0.25);'
    : ''
  const photoStyle = opts?.photo
    ? `background-image:url(${opts.photo});background-size:cover;background-position:center;`
    : ''
  const innerContent = opts?.photo ? '' : emoji
  return L.divIcon({
    className: 'pin-wrapper',
    html: `<div class="pin" style="border-color:${borderColor};width:${size}px;height:${size}px;font-size:${opts?.large ? 26 : 22}px;opacity:${opacity};${signatureGlow}${photoStyle}">${innerContent}${numberBadge}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

/**
 * Inner component that uses the map ref to fit bounds when entries change.
 * Skips re-fit while a plan is active so the curated route stays visible.
 */
function FitBoundsToEntries({
  entries,
  active,
}: {
  entries: Entry[]
  active: boolean
}) {
  const map = useMap()
  useEffect(() => {
    if (!active || entries.length === 0) return
    const bounds = L.latLngBounds(entries.map((e) => [e.lat, e.lng] as [number, number]))
    if (!bounds.isValid()) return
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 })
  }, [active, entries, map])
  return null
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
      const photo = entry.photos?.[0]
      const inPlan = planStopIds.has(entry.id)
      if (activePlan && !inPlan) {
        return makePinIcon(entry.emoji, color, { photo, faded: true })
      }
      if (activePlan && inPlan) {
        const stop = activePlan.stops.find((s) => s.entry_id === entry.id)!
        return makePinIcon(entry.emoji, '#1e8df0', { photo, number: stop.position, large: true })
      }
      return makePinIcon(entry.emoji, color, { photo, signature: isSignature(entry) })
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
      <FitBoundsToEntries entries={entries} active={!activePlan} />
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
