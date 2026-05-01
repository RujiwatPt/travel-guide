import { useState } from 'react'
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

  const entry = useAppStore((s) => (token ? s.getEntryByToken(token) : undefined))
  const owner = useAppStore((s) => (entry?.owner_id ? s.getOwnerById(entry.owner_id) : undefined))
  const entriesForOwner = useAppStore((s) => (owner ? s.getEntriesForOwner(owner.id) : []))
  const recentUpdates = useAppStore((s) => (entry ? s.getRecentUpdates(entry.id, 3) : []))
  const updateEntryStatus = useAppStore((s) => s.updateEntryStatus)

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
    setTimeout(() => setShowToast(false), 2400)
  }

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-10 h-10 grid place-items-center rounded-full hover:bg-ink/5 text-xl">
          ‹
        </Link>
        <h1 className="text-base font-bold text-ink truncate flex-1 text-center">
          {entry.name_en}
        </h1>
        <button className="w-10 h-10 grid place-items-center rounded-full hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-4 pt-4 space-y-5">
        {/* Identity strip */}
        {owner && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-ink/5 px-4 py-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-cream grid place-items-center text-lg">👤</div>
            <div className="flex-1">
              <div className="font-bold text-ink text-sm">
                {owner.display_name}
                {owner.verified && <span className="ml-1 text-blue-strong">✓</span>}
              </div>
              <div className="text-xs text-muted">
                Owner of {entriesForOwner.length} {entriesForOwner.length === 1 ? 'place' : 'places'}
              </div>
            </div>
          </div>
        )}

        {/* Status chip column */}
        <section>
          <h2 className="text-sm font-bold text-ink mb-2">Status right now</h2>
          <div className="flex flex-col gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const active = pendingStatus === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setPendingStatus(opt.value)}
                  className={
                    'flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition ' +
                    (active
                      ? 'bg-yellow border-yellow font-bold text-ink shadow'
                      : 'bg-white border-ink/10 text-ink/80')
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

        {/* Note */}
        <section>
          <h2 className="text-sm font-bold text-ink mb-2">Note for tourists (optional)</h2>
          <input
            type="text"
            maxLength={80}
            value={pendingNote}
            onChange={(e) => setPendingNote(e.target.value)}
            placeholder="e.g. Back tomorrow 9 AM"
            className="w-full bg-white border border-ink/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-strong"
          />
        </section>

        {/* Today's hours */}
        <section>
          <h2 className="text-sm font-bold text-ink mb-2">Today's hours</h2>
          <div className="bg-white border border-ink/10 rounded-2xl px-4 py-3 text-sm flex items-center justify-between">
            <span className="text-ink">
              <span className="text-muted">{DAY_LABEL[DAY_KEYS_DISPLAY[new Date().getDay()]]}</span>
              <span className="mx-2 text-ink/30">·</span>
              <span>{todaysHours}</span>
            </span>
            <span className="text-muted">›</span>
          </div>
        </section>

        {/* Recent updates */}
        {recentUpdates.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-ink mb-2">Recent updates</h2>
            <ul className="space-y-1.5 text-sm text-muted">
              {recentUpdates.map((row) => (
                <li key={row.id}>
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

      {/* Sticky save button */}
      <div className="fixed inset-x-0 bottom-0 px-4 pb-6 pt-3 bg-gradient-to-t from-white via-white to-transparent">
        <div className="phone-frame !p-0 !min-h-0 !bg-transparent !shadow-none">
          <button
            onClick={handleSave}
            className="w-full h-14 rounded-2xl bg-blue-strong text-white font-bold shadow-lg hover:opacity-95 active:scale-[0.99] transition"
          >
            Save & Notify Tourists
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed inset-x-0 bottom-24 flex justify-center z-50 pointer-events-none">
          <div className="bg-ink text-white text-sm px-4 py-2.5 rounded-full shadow-lg">
            ✓ Updated. 3 tourists viewing this now.
          </div>
        </div>
      )}
    </div>
  )
}
