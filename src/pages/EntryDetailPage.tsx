import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { todaysHoursLabel } from '../lib/format'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR, STATUS_LABEL } from '../lib/statusDisplay'
import { relativeTime } from '../lib/time'

function makePinIcon(emoji: string, color: string): L.DivIcon {
  return L.divIcon({
    className: 'pin-wrapper',
    html: `<div class="pin" style="border-color:${color}">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const entry = useAppStore((s) => (id ? s.getEntryById(id) : undefined))
  const owner = useAppStore((s) => (entry?.owner_id ? s.getOwnerById(entry.owner_id) : undefined))

  const status = useMemo(
    () => (entry ? isOpenNow(entry, new Date()) : 'OPEN'),
    [entry],
  )
  const pinIcon = useMemo(
    () => (entry ? makePinIcon(entry.emoji, STATUS_COLOR[status]) : null),
    [entry, status],
  )

  if (!entry) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-ink mb-2">Not found</h1>
        <Link to="/" className="text-blue-strong">← Back to map</Link>
      </div>
    )
  }

  const photo = entry.photos?.[0]
  const updated = relativeTime(entry.status_updated)
  const allTags = [
    ...entry.vibe_tags,
    ...entry.cuisine_tags,
    ...entry.time_tags,
    ...(entry.setting ? [entry.setting] : []),
    ...(entry.price_band ? [entry.price_band] : []),
  ]

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${entry.lat},${entry.lng}`

  return (
    <div className="min-h-[100dvh] bg-panel relative pb-28">
      {/* Hero */}
      <div className="relative h-[55dvh] w-full overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={entry.name_en}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-soft to-cream grid place-items-center text-7xl">
            {entry.emoji}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

        {/* Floating buttons */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 w-10 h-10 grid place-items-center rounded-full bg-white/40 backdrop-blur text-white text-xl"
        >
          ‹
        </button>
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="w-10 h-10 grid place-items-center rounded-full bg-white/40 backdrop-blur text-white">
            ♡
          </button>
          <button className="w-10 h-10 grid place-items-center rounded-full bg-white/40 backdrop-blur text-white">
            ⋯
          </button>
        </div>

        {/* Live status pill (Activity only) */}
        {entry.type === 'activity' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-white shadow"
              style={{ background: STATUS_COLOR[status] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {STATUS_LABEL[status]}
            </div>
          </div>
        )}

        {/* Title block */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="text-xs uppercase tracking-wider opacity-80">{entry.category}</p>
          <h1 className="text-3xl font-extrabold leading-tight mt-1">{entry.name_en}</h1>
          <p className="text-base text-white/80 mt-0.5">{entry.name_th}</p>
        </div>
      </div>

      {/* White scrollable card */}
      <div className="bg-white -mt-6 rounded-t-3xl p-5 space-y-5 relative z-10">
        {/* Trust badge */}
        {entry.type === 'activity' && owner && updated && (
          <div className="flex items-center gap-3 bg-cream/70 border border-yellow/40 rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-white grid place-items-center text-base">👤</div>
            <div className="flex-1 text-sm">
              <div className="font-bold text-ink">
                Updated {updated} by {owner.display_name}
                {owner.verified && <span className="ml-1 text-blue-strong">✓</span>}
              </div>
              {entry.status_note && (
                <div className="text-xs text-ink/70 italic mt-0.5">"{entry.status_note}"</div>
              )}
            </div>
          </div>
        )}

        {/* why_visit */}
        <p className="text-base text-ink/80 italic">
          <span className="not-italic">✨ </span>{entry.why_visit_en}
        </p>

        <hr className="border-ink/10" />

        {/* Today's hours */}
        <section>
          <div className="text-sm flex items-center gap-2">
            <span>🕐</span>
            <span className="font-semibold">Today</span>
            <span className="text-ink/30">·</span>
            <span>{todaysHoursLabel(entry, new Date())}</span>
          </div>
          {entry.hours_weekly?.notes_en && (
            <div className="text-xs text-muted mt-1.5 ml-6">
              ⓘ {entry.hours_weekly.notes_en}
            </div>
          )}
          <div className="text-xs text-blue-strong mt-1.5 ml-6 cursor-pointer">See full week ›</div>
        </section>

        <hr className="border-ink/10" />

        {/* Description */}
        <section>
          <h2 className="text-sm font-bold text-ink mb-2">About</h2>
          <p className="text-sm text-ink/80 leading-relaxed">{entry.description_en}</p>
        </section>

        {/* Tags */}
        {allTags.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-panel border border-ink/10 text-[11px] text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <hr className="border-ink/10" />

        {/* Mini map */}
        <section>
          <div className="rounded-2xl overflow-hidden border border-ink/10 h-40 relative">
            <MapContainer
              center={[entry.lat, entry.lng]}
              zoom={14}
              className="absolute inset-0"
              zoomControl={false}
              attributionControl={false}
              dragging={false}
              touchZoom={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {pinIcon && <Marker position={[entry.lat, entry.lng]} icon={pinIcon} />}
            </MapContainer>
          </div>
          <div className="text-xs text-muted mt-2">
            📍 {entry.lat.toFixed(4)}, {entry.lng.toFixed(4)}
          </div>
        </section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white to-transparent">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener"
          className="block w-full h-14 rounded-2xl bg-blue-strong text-white font-bold text-center grid place-items-center shadow-lg hover:opacity-95"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
}
