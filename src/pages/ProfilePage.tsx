import { Link } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'

/**
 * ProfilePage — structure adapted from Builder.io Visual Copilot's
 * extraction of the figma "Profile" frame. Generic Tailwind colors
 * swapped for kit palette; Tokyo content swapped for NKP.
 */

type ProfileItemProps = {
  icon: string
  title: string
  subtitle?: string
  to?: string
  tone?: 'cream' | 'sky' | 'rose' | 'green' | 'amber' | 'violet'
}

const TONE_BG: Record<NonNullable<ProfileItemProps['tone']>, string> = {
  cream:  'bg-kit-cream-1 text-amber-700',
  sky:    'bg-blue-soft/40 text-blue-strong',
  rose:   'bg-rose-100 text-rose-600',
  green:  'bg-emerald-100 text-emerald-700',
  amber:  'bg-amber-100 text-amber-700',
  violet: 'bg-violet-100 text-violet-600',
}

function ProfileItem({ icon, title, subtitle, to, tone = 'cream' }: ProfileItemProps) {
  const inner = (
    <div className="flex items-center justify-between py-3.5 px-1 hover:bg-ink/[0.02] rounded-kit-photo transition">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-kit-pill grid place-items-center text-base flex-shrink-0 ${TONE_BG[tone]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-extrabold text-ink text-[14px] tracking-tight leading-tight">{title}</p>
          {subtitle && <p className="text-[12px] text-ink/55 mt-0.5 font-semibold truncate">{subtitle}</p>}
        </div>
      </div>
      <span className="text-ink/35 text-lg shrink-0">›</span>
    </div>
  )
  if (to) return <Link to={to}>{inner}</Link>
  return <button className="w-full text-left">{inner}</button>
}

export default function ProfilePage() {
  return (
    <div className="bg-white min-h-[100dvh] relative pb-28">
      <div className="px-5 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Profile</h1>
          <button
            aria-label="Settings"
            className="w-10 h-10 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/[0.05] text-ink"
          >
            ⚙️
          </button>
        </div>

        {/* Avatar + identity */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-kit-cream-1 to-kit-gold-2/40 rounded-kit-pill mx-auto mb-3 overflow-hidden grid place-items-center shadow-kit-card text-4xl">
            🧕
          </div>
          <h2 className="text-[18px] font-extrabold text-ink tracking-tight">
            Khun Ploy <span className="font-bold text-ink/55">(แขก)</span>
          </h2>
          <p className="text-[13px] text-ink/55 font-semibold mt-1">In Nakhon Phanom now · Foodie / สายมู</p>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-5">
            <Stat value="8" label="Stupas" />
            <Stat value="4" label="Themes" />
            <Stat value="17" label="Entries" />
          </div>
        </div>

        {/* Your Travel Profile */}
        <section className="space-y-1">
          <h3 className="text-[15px] font-extrabold text-ink mb-3 px-1">Your Travel Profile</h3>

          <ProfileItem
            icon="🧭"
            tone="amber"
            title="Travel Persona Manager"
            subtitle="สายมู, Foodie, Hidden-gem hunter"
          />
          <ProfileItem
            icon="📍"
            tone="sky"
            title="Saved Places"
            subtitle="5 Signatures saved"
          />
          <ProfileItem
            icon="✈️"
            tone="rose"
            title="Saved Trips"
            subtitle="Birthday-Stupa Pilgrimage"
          />
        </section>

        {/* Preferences */}
        <section className="border-t border-ink/[0.08] pt-5 mt-6 space-y-1">
          <h3 className="text-[15px] font-extrabold text-ink mb-3 px-1">Your Preferences</h3>

          <ProfileItem
            icon="🔔"
            tone="cream"
            title="Notifications"
            subtitle="Owner updates · AI tips"
            to="/notifications"
          />
          <ProfileItem
            icon="🌐"
            tone="green"
            title="Language"
            subtitle="English / ไทย"
          />
          <ProfileItem
            icon="🛕"
            tone="violet"
            title="Birthday-Stupa Theme"
            subtitle="Today in NKP"
            to="/journal"
          />
        </section>
      </div>

      <KitBottomNav2 active="grid" />
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-[24px] font-extrabold text-ink leading-none">{value}</div>
      <div className="text-[11px] text-ink/55 font-bold mt-1 tracking-wide uppercase">{label}</div>
    </div>
  )
}
