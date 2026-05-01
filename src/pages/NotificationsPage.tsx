import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import KitBottomNav2 from '../components/KitBottomNav2'
import { NKP_PHOTOS } from '../data/nkpPhotos'

/**
 * NotificationsPage — adapted from Builder.io's Screen 9: header +
 * grouped sections of NotificationItem rows (Trip Reminders, AI
 * Travel Tips, Weather & Safety, Theme Alerts). Tokyo content swapped
 * for NKP.
 */

type Tone = 'sky' | 'amber' | 'green' | 'rose' | 'violet' | 'cream'
const TONE: Record<Tone, string> = {
  sky:    'bg-blue-soft/40 text-blue-strong',
  amber:  'bg-amber-100 text-amber-700',
  green:  'bg-emerald-100 text-emerald-700',
  rose:   'bg-rose-100 text-rose-600',
  violet: 'bg-violet-100 text-violet-600',
  cream:  'bg-kit-cream-1 text-amber-700',
}

type RowProps = {
  icon?: string
  photo?: string
  tone?: Tone
  title: string
  subtitle: string
  time: string
  isNew?: boolean
  to?: string
}

function NotificationItem({ icon, photo, tone = 'sky', title, subtitle, time, isNew, to }: RowProps) {
  const inner = (
    <div className="flex items-start gap-3 py-3.5 px-1 hover:bg-ink/[0.02] rounded-kit-photo transition">
      <div
        className={`w-10 h-10 rounded-kit-pill grid place-items-center flex-shrink-0 text-base ${TONE[tone]}`}
        style={
          photo
            ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        {photo ? '' : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-ink text-[14px] tracking-tight leading-tight truncate">
          {title}
        </p>
        <p className="text-[12px] text-ink/55 mt-0.5 font-medium leading-snug line-clamp-2">
          {subtitle}
        </p>
        <p className="text-[11px] text-ink/45 mt-1 font-bold">{time}</p>
      </div>
      {isNew && (
        <>
          <span className="sr-only">(unread)</span>
          <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 mt-2" aria-hidden="true" />
        </>
      )}
    </div>
  )
  if (to) return <Link to={to} className="block">{inner}</Link>
  return <button className="w-full text-left">{inner}</button>
}

export default function NotificationsPage() {
  return (
    <main className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Notifications</h1>
          <button
            aria-label="Notification settings"
            className="w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
          >
            <Settings size={22} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Owner Updates */}
        <section className="mb-6">
          <h2 className="text-[16px] font-extrabold text-ink mb-3">Owner Updates</h2>
          <div className="space-y-1">
            <NotificationItem
              icon="🍜"
              tone="amber"
              title="Pho Sawan — open now ✓"
              subtitle="Khun Somchai updated the live status 2h ago. Try the nem nuong special."
              time="2m ago"
              isNew
              to="/entry/pho-sawan"
            />
            <NotificationItem
              icon="🤖"
              tone="violet"
              title="AI created your half-day Sunday plan"
              subtitle="Walk-friendly, sunset-timed, Phra That Phanom included for your birthday-day stupa."
              time="15m ago"
              isNew
              to="/journal"
            />
            <NotificationItem
              photo={NKP_PHOTOS.phraThatPhanom}
              title="Phra That Phanom Pilgrimage"
              subtitle="Sunday morning — your birthday-day stupa. 50 km south of Mueang NKP."
              time="3h ago"
              to="/entry/wat-phra-that-phanom"
            />
          </div>
        </section>

        {/* AI Travel Tips */}
        <section className="mb-6">
          <h2 className="text-[16px] font-extrabold text-ink mb-3">AI Travel Tips</h2>
          <div className="space-y-1">
            <NotificationItem
              icon="🌃"
              tone="sky"
              title="Walk to Indochina Market tonight"
              subtitle="Friday — live music after 19:00. Best dinner option in NKP."
              time="3h ago"
              to="/entry/indochina-walking-street"
            />
            <NotificationItem
              icon="🌅"
              tone="rose"
              title="Sunset at Naga Statue at 18:18"
              subtitle="Best Mekong photo spot in NKP. 12-min walk from Pho Sawan."
              time="6h ago"
              to="/entry/naga-statue"
            />
          </div>
        </section>

        {/* Weather & Safety */}
        <section className="mb-6">
          <h2 className="text-[16px] font-extrabold text-ink mb-3">Weather & Safety</h2>
          <div className="space-y-1">
            <NotificationItem
              icon="🌧"
              tone="cream"
              title="Light rain forecast 16:00–19:00"
              subtitle="Indoor museums recommended. Try Old Town Street Art tour after the rain clears."
              time="1d ago"
            />
          </div>
        </section>

        {/* Theme Alerts */}
        <section>
          <h2 className="text-[16px] font-extrabold text-ink mb-3">Theme Alerts</h2>
          <div className="space-y-1">
            <NotificationItem
              icon="🛕"
              tone="violet"
              title="Birthday-Stupa Theme refreshed"
              subtitle="8 stupas now mapped — your Sunday is Phra That Phanom."
              time="2d ago"
              to="/journal"
            />
          </div>
        </section>
      </div>

      <KitBottomNav2 active="grid" />
    </main>
  )
}
