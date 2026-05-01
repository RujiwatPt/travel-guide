import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { todaysHoursLabel } from '../lib/format'
import { relativeTime } from '../lib/time'
import type { LiveStatus } from '../types'

const STATUS_OPTIONS: { value: LiveStatus; label: string; dot: string }[] = [
  { value: 'open',                label: 'Open',               dot: '🟢' },
  { value: 'closing_soon',        label: 'Closing Soon',       dot: '🟡' },
  { value: 'sold_out',            label: 'Sold Out',           dot: '⚫' },
  { value: 'closed_today',        label: 'Closed Today',       dot: '⚫' },
  { value: 'temporarily_closed',  label: 'Temporarily Closed', dot: '🔴' },
]

const DAY_LABEL: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed',
  thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}
const DAY_KEYS_DISPLAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

export default function OwnerEditPage() {
  const [params] = useSearchParams()
  const token = params.get('token')

  // Subscribe to raw arrays (stable references unless contents change),
  // then derive in the component via useMemo. The previous version called
  // selectors that returned new arrays each render → infinite loop.
  const entries = useAppStore((s) => s.entries)
  const owners = useAppStore((s) => s.owners)
  const statusLog = useAppStore((s) => s.statusLog)
  const updateEntryStatus = useAppStore((s) => s.updateEntryStatus)

  const entry = useMemo(
    () => (token ? entries.find((e) => e.owner_edit_token === token) : undefined),
    [entries, token],
  )
  const owner = useMemo(
    () => (entry?.owner_id ? owners.find((o) => o.id === entry.owner_id) : undefined),
    [owners, entry],
  )
  const entriesForOwner = useMemo(
    () => (owner ? entries.filter((e) => e.owner_id === owner.id) : []),
    [entries, owner],
  )
  const recentUpdates = useMemo(
    () =>
      entry
        ? statusLog
            .filter((row) => row.entry_id === entry.id)
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
            )
            .slice(0, 3)
        : [],
    [statusLog, entry],
  )

  const [pendingStatus, setPendingStatus] = useState<LiveStatus | null>(
    entry?.live_status ?? 'open',
  )
  const [pendingNote, setPendingNote] = useState<string>(entry?.status_note ?? '')
  const [showToast, setShowToast] = useState(false)

  const todaysHours = entry ? todaysHoursLabel(entry, new Date()) : '—'

  if (!entry) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-ink mb-2">This link is no longer valid</h1>
        <p className="text-muted">Ask your contact for an updated edit link.</p>
      </div>
    )
  }

  const handleSave = () => {
    updateEntryStatus(entry.id, {
      live_status: pendingStatus,
      status_note: pendingNote.trim() || null,
    })
    setShowToast(true)
    // Toast visible 3.5s (rule toast-dismiss: 3-5s)
    setTimeout(() => setShowToast(false), 3500)
  }

  return (
    <div className="min-h-[100dvh] bg-panel pb-32 relative">
      {/* Kit gradient header — Plan A Trip pattern */}
      <div className="bg-kit-sky-soft pt-4 pb-8 px-4 rounded-b-[36px] relative">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white/70 backdrop-blur text-xl shadow-kit-pill"
            aria-label="Back"
          >
            ‹
          </Link>
          <p className="kit-eyebrow">Owner edit</p>
          <button className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white/70 backdrop-blur text-xl shadow-kit-pill">⋯</button>
        </header>

        <h1 className="kit-h1 text-[32px] mt-5 leading-tight tracking-[-0.04em]">
          {entry.name_en}
        </h1>
        <p className="text-base text-ink/65 mt-1 font-bold">{entry.name_th}</p>
      </div>

      <main className="px-4 -mt-4 space-y-4 relative z-10">
        {/* Identity strip — kit elevated card */}
        {owner && (
          <div className="kit-card flex items-center gap-3 px-4 py-3.5 shadow-kit-card">
            <div className="w-11 h-11 rounded-kit-pill bg-gradient-to-br from-kit-cream-1 to-kit-gold-2/40 grid place-items-center text-lg shadow-sm">👤</div>
            <div className="flex-1">
              <div className="font-extrabold text-ink text-sm">
                {owner.display_name}
                {owner.verified && <span className="ml-1 text-blue-strong">✓</span>}
              </div>
              <div className="text-xs text-muted font-semibold">
                Owner of {entriesForOwner.length} {entriesForOwner.length === 1 ? 'place' : 'places'}
              </div>
            </div>
          </div>
        )}

        {/* Status chip column — kit segmented selector */}
        <section className="kit-card p-4 shadow-kit-card">
          <p className="kit-eyebrow mb-3">Status right now</p>
          <div className="flex flex-col gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const active = pendingStatus === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setPendingStatus(opt.value)}
                  className={
                    'flex items-center gap-3 px-4 py-3 rounded-kit-photo border text-left transition ' +
                    (active
                      ? 'bg-yellow border-yellow font-extrabold text-ink shadow-sm'
                      : 'bg-white border-ink/10 text-ink/80 hover:bg-panel')
                  }
                >
                  <span className="text-lg">{opt.dot}</span>
                  <span className="flex-1">{opt.label}</span>
                  {active && <span>✓</span>}
                </button>
              )
            })}
          </div>
        </section>

        {/* Note — kit input */}
        <section className="kit-card p-4 shadow-kit-card">
          <label htmlFor="status-note" className="kit-eyebrow mb-3 block">
            Note for tourists (optional)
          </label>
          <input
            id="status-note"
            type="text"
            maxLength={80}
            value={pendingNote}
            onChange={(e) => setPendingNote(e.target.value)}
            placeholder="e.g. Back tomorrow 9 AM"
            autoComplete="off"
            aria-describedby="status-note-help"
            className="w-full bg-panel border border-ink/10 rounded-kit-photo px-4 py-3 text-sm font-semibold focus:outline-none focus:border-blue-strong focus:bg-white transition"
          />
          <p id="status-note-help" className="text-[11px] text-muted font-semibold mt-2 flex items-center justify-between">
            <span>Visible on the place page. Markdown not supported.</span>
            <span className="tabular-nums">{pendingNote.length}/80</span>
          </p>
        </section>

        {/* Today's hours — kit row */}
        <section className="kit-card p-4 shadow-kit-card">
          <p className="kit-eyebrow mb-3">Today's hours</p>
          <div className="text-sm flex items-center justify-between">
            <span className="text-ink">
              <span className="text-muted font-bold">{DAY_LABEL[DAY_KEYS_DISPLAY[new Date().getDay()]]}</span>
              <span className="mx-2 text-ink/30">·</span>
              <span className="font-semibold">{todaysHours}</span>
            </span>
            <span className="text-muted">›</span>
          </div>
        </section>

        {/* Recent updates */}
        {recentUpdates.length > 0 && (
          <section className="kit-card p-4 shadow-kit-card">
            <p className="kit-eyebrow mb-3">Recent updates</p>
            <ul className="space-y-2 text-sm text-muted">
              {recentUpdates.map((row) => (
                <li key={row.id} className="font-semibold">
                  • {relativeTime(row.updated_at)} —{' '}
                  set {row.field === 'live_status'
                    ? STATUS_OPTIONS.find((o) => o.value === row.new_value)?.label ?? String(row.new_value)
                    : `${row.field} to "${row.new_value}"`}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* Sticky save button — kit prominent CTA */}
      <div className="fixed inset-x-0 bottom-0 px-4 pb-6 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <div className="phone-frame !p-0 !min-h-0 !bg-transparent !shadow-none">
          <button
            onClick={handleSave}
            className="w-full h-15 rounded-kit-hero bg-ink text-white font-extrabold shadow-kit-frame hover:opacity-95 active:scale-[0.99] transition py-4 tracking-wide"
          >
            Save & Notify Tourists
          </button>
        </div>
      </div>

      {/* Toast — aria-live so screen readers announce confirmation */}
      <div
        role="status"
        aria-live="polite"
        className={
          'fixed inset-x-0 bottom-24 flex justify-center z-50 pointer-events-none transition-opacity duration-200 ' +
          (showToast ? 'opacity-100' : 'opacity-0')
        }
      >
        {showToast && (
          <div className="bg-ink text-white text-sm font-bold px-5 py-3 rounded-kit-pill shadow-kit-frame">
            ✓ Updated. 3 tourists viewing this now.
          </div>
        )}
      </div>
    </div>
  )
}
