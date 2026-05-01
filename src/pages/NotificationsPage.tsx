import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { relativeTime } from '../lib/time'
import KitBottomNav from '../components/KitBottomNav'

/**
 * NotificationsPage — kit "Notifications & Alerts" pattern.
 * Surfaces real entry_status_log rows + a few static AI tips and weather alerts.
 */

export default function NotificationsPage() {
  const statusLog = useAppStore((s) => s.statusLog)
  const entries = useAppStore((s) => s.entries)
  const owners = useAppStore((s) => s.owners)

  const recent = statusLog.slice(0, 5)

  return (
    <div className="min-h-[100dvh] bg-kit-sky-soft pb-32">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">Notifications</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⚙</button>
      </header>

      <main className="px-5 pt-5">
        {/* Owner Updates */}
        <p className="kit-eyebrow mb-3">Owner Updates</p>
        {recent.map((row) => {
          const entry = entries.find((e) => e.id === row.entry_id)
          const owner = owners.find((o) => o.id === row.owner_id)
          if (!entry || !owner) return null
          return (
            <Link
              key={row.id}
              to={`/entry/${entry.id}`}
              className="kit-card flex items-center gap-3 mb-2.5 p-3.5"
            >
              <span className="w-10 h-10 grid place-items-center rounded-kit-pill bg-blue-soft/30 text-xl">
                {entry.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-ink truncate">
                  {entry.name_en}
                </p>
                <p className="text-xs text-muted mt-0.5 font-bold truncate">
                  {owner.display_name} set status to {String(row.new_value).replace('_', ' ')}
                </p>
              </div>
              <time className="text-[11px] text-muted font-bold">{relativeTime(row.updated_at)}</time>
            </Link>
          )
        })}

        {/* AI Tips */}
        <p className="kit-eyebrow mb-3 mt-6">AI Travel Tips</p>
        <div className="kit-card flex items-center gap-3 mb-2.5 p-3.5">
          <span className="w-10 h-10 grid place-items-center rounded-kit-pill bg-yellow/30 text-xl">💡</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-ink">Walk to Indochina Market tonight</p>
            <p className="text-xs text-muted mt-0.5 font-bold">Friday — live music after 19:00</p>
          </div>
          <time className="text-[11px] text-muted font-bold">3h</time>
        </div>
        <div className="kit-card flex items-center gap-3 mb-2.5 p-3.5">
          <span className="w-10 h-10 grid place-items-center rounded-kit-pill bg-blue-soft/30 text-xl">🌅</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-ink">Sunset at Naga statue at 18:18</p>
            <p className="text-xs text-muted mt-0.5 font-bold">Best Mekong photo spot in NKP</p>
          </div>
          <time className="text-[11px] text-muted font-bold">5h</time>
        </div>
        <div className="kit-card flex items-center gap-3 mb-2.5 p-3.5">
          <span className="w-10 h-10 grid place-items-center rounded-kit-pill bg-yellow/30 text-xl">🛕</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-ink">Your Sunday stupa is Phra That Phanom</p>
            <p className="text-xs text-muted mt-0.5 font-bold">~50 km south, plan a half-day</p>
          </div>
          <time className="text-[11px] text-muted font-bold">12h</time>
        </div>

        {/* Weather alert */}
        <p className="kit-eyebrow mb-3 mt-6">Weather & Safety</p>
        <div className="kit-card flex items-center gap-3 mb-2.5 p-3.5">
          <span className="w-10 h-10 grid place-items-center rounded-kit-pill bg-status-temp-closed/20 text-xl">⚠️</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-ink">Light rain forecast 16:00–19:00</p>
            <p className="text-xs text-muted mt-0.5 font-bold">Indoor museums recommended this afternoon</p>
          </div>
          <time className="text-[11px] text-muted font-bold">1d</time>
        </div>
      </main>

      <KitBottomNav active="profile" />
    </div>
  )
}
