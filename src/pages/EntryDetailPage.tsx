import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { todaysHoursLabel } from '../lib/format'
import { isOpenNow } from '../lib/status'
import { STATUS_COLOR, STATUS_LABEL } from '../lib/statusDisplay'
import { relativeTime } from '../lib/time'



function confidenceLabel(v?: string): string {
  if (!v) return 'Unknown'
  return v.replace('_', ' ').toUpperCase()
}

function sourceLabel(v?: string): string {
  if (!v) return 'unknown'
  return v.replace('_', ' ')
}

function reliabilityBadge(v?: string): { label: string; className: string } {
  if (v === 'high') return { label: 'Verified', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
  if (v === 'medium') return { label: 'Partially Verified', className: 'bg-amber-100 text-amber-800 border-amber-200' }
  return { label: 'Uncertain', className: 'bg-rose-100 text-rose-800 border-rose-200' }
}

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
  const reliability = reliabilityBadge(entry.hours_confidence)

  return (
    <div className="min-h-[100dvh] bg-panel relative pb-28">
      {/* Hero — kit Place Details Page pattern: full-bleed cover + dark text overlay */}
      <div className="relative h-[62dvh] w-full overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={entry.name_en}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-kit-sky grid place-items-center text-8xl">
            {entry.emoji}
          </div>
        )}
        {/* Kit overlay-dark gradient (top→bottom darkening for text legibility) */}
        <div className="absolute inset-0 bg-kit-overlay-dark" />

        {/* Floating buttons — kit pill style */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-11 h-11 grid place-items-center rounded-kit-pill bg-white/35 backdrop-blur-md text-white text-2xl shadow-kit-pill"
          aria-label="Back"
        >
          ‹
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white/35 backdrop-blur-md text-white text-lg shadow-kit-pill">
            ♡
          </button>
          <button className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white/35 backdrop-blur-md text-white text-lg shadow-kit-pill">
            ⋯
          </button>
        </div>

        {/* Live status pill (Activity only) — kit pill at top-center */}
        {entry.type === 'activity' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-kit-pill text-[11px] font-extrabold tracking-wide text-white shadow-kit-pill"
              style={{ background: STATUS_COLOR[status] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {STATUS_LABEL[status]}
            </div>
          </div>
        )}

        {/* Title block — kit hero typography */}
        <div className="absolute bottom-7 left-6 right-6 text-white">
          <p className="kit-eyebrow text-white/75">{entry.category}</p>
          <h1 className="kit-h1 text-[44px] leading-[0.96] tracking-[-0.06em] text-white mt-2.5">
            {entry.name_en}
          </h1>
          <p className="text-lg text-white/75 mt-1.5 font-bold">{entry.name_th}</p>
        </div>
      </div>

      {/* White scrollable card — kit hero corner radius */}
      <div className="bg-white -mt-7 rounded-t-[36px] p-6 space-y-5 relative z-10 shadow-kit-frame">
        {/* Trust badge — kit cream-yellow accent */}
        {entry.type === 'activity' && owner && updated && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-kit-cream-1 to-kit-cream-1/50 border border-yellow/30 rounded-kit-photo px-4 py-3 shadow-sm">
            <div className="w-10 h-10 rounded-kit-pill bg-white grid place-items-center text-base shadow-sm">👤</div>
            <div className="flex-1 text-sm">
              <div className="font-extrabold text-ink">
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
        <p className="text-base text-ink/85 italic font-medium leading-relaxed">
          <span className="not-italic mr-0.5">✨</span> {entry.why_visit_en}
        </p>

        <hr className="border-ink/8" />

        {/* Today's hours */}
        <section>
          <div className="text-sm flex items-center gap-2">
            <span>🕐</span>
            <span className="font-extrabold text-ink">Today</span>
            <span className="text-ink/30">·</span>
            <span className="text-ink/80">{todaysHoursLabel(entry, new Date())}</span>
          </div>
          {entry.hours_weekly?.notes_en && (
            <div className="text-xs text-muted mt-1.5 ml-6">
              ⓘ {entry.hours_weekly.notes_en}
            </div>
          )}
          <div className="text-xs text-blue-strong font-bold mt-1.5 ml-6 cursor-pointer">See full week ›</div>
        </section>

        <hr className="border-ink/8" />

        {/* Description */}
        <section>
          <p className="kit-eyebrow mb-2">About</p>
          <p className="text-sm text-ink/85 leading-relaxed">{entry.description_en}</p>
        </section>

        {/* PRD reliability metadata */}
        <section className="text-sm text-ink/75 space-y-1">
          <div className={`inline-flex px-2.5 py-1 rounded-kit-pill border text-[11px] font-extrabold ${reliability.className}`}>
            {reliability.label}
          </div>
          <p><span className="font-bold">Hours confidence:</span> {confidenceLabel(entry.hours_confidence)}</p>
          <p><span className="font-bold">Source:</span> {sourceLabel(entry.hours_source_type)}</p>
          {entry.hours_last_checked_at && (
            <p><span className="font-bold">Last checked:</span> {new Date(entry.hours_last_checked_at).toLocaleString()}</p>
          )}
          {entry.contact_phone && (
            <p><span className="font-bold">Phone:</span> {entry.contact_phone}</p>
          )}
          {entry.facebook_url && (
            <p>
              <span className="font-bold">Facebook:</span>{' '}
              <a href={entry.facebook_url} target="_blank" rel="noopener" className="text-blue-strong underline">
                Open page
              </a>
            </p>
          )}
        </section>

        {/* Tags — kit chip pattern */}
        {allTags.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="kit-chip kit-chip-inactive"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <hr className="border-ink/8" />

        {/* Mini map */}
        <section>
          <div className="rounded-kit-photo overflow-hidden border border-ink/8 h-44 relative shadow-kit-card">
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
          <div className="text-xs text-muted mt-2 font-semibold">
            📍 {entry.lat.toFixed(4)}, {entry.lng.toFixed(4)}
          </div>
        </section>
      </div>

      {/* Sticky CTA — kit prominent button style */}
      <div className="fixed inset-x-0 bottom-0 px-5 pb-6 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener"
          className="block w-full h-15 rounded-kit-hero bg-ink text-white font-extrabold text-center grid place-items-center shadow-kit-frame hover:opacity-95 active:scale-[0.99] transition py-4 tracking-wide"
        >
          Get Directions →
        </a>
      </div>
    </div>
  )
}
