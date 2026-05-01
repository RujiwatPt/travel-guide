import { Link } from 'react-router-dom'
import { ENTRIES } from '../data/seed'
import { themesForCity } from '../data/themes'
import { isSignature } from '../lib/signatures'
import KitBottomNav from '../components/KitBottomNav'

/**
 * ProfilePage — kit Profile pattern with NKP-themed stats.
 * Tourists are anonymous in our model, so the "profile" is a fake
 * persona ("Khun Ploy") with NKP-themed achievements: stupas visited,
 * themes explored, places saved, etc.
 */

export default function ProfilePage() {
  const themes = themesForCity('nkp')
  const stupasCount = ENTRIES.filter((e) => e.vibe_tags.includes('birthday-stupa')).length
  const signaturesCount = ENTRIES.filter(isSignature).length

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">Profile</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-5 pt-5">
        {/* Profile head — kit pattern with avatar + stats */}
        <div className="flex items-end gap-4">
          <div
            className="w-[110px] h-[110px] rounded-kit-hero border-2 border-white shadow-kit-card grid place-items-center text-5xl"
            style={{
              background: 'linear-gradient(160deg, #e7fbff, #ffffff)',
            }}
          >
            🧖‍♀️
          </div>
          <div className="flex-1 mb-1">
            <h1 className="kit-h1 text-2xl tracking-[-0.04em]">
              Khun Ploy <span className="text-base text-ink/50 font-bold">(แขก)</span>
            </h1>
            <p className="text-xs text-muted mt-1 font-bold">🔎 Currently in Nakhon Phanom</p>
            <div className="flex gap-1.5 mt-2">
              <span className="kit-chip kit-chip-active text-[11px]">สายมู</span>
              <span className="kit-chip bg-blue-soft/40 text-ink text-[11px] border border-blue-soft">Foodie</span>
            </div>
          </div>
        </div>

        {/* Stats — kit row */}
        <div className="flex justify-around mt-7 mb-7">
          <div className="text-center">
            <p className="text-3xl font-medium text-ink">{stupasCount}</p>
            <p className="text-xs text-muted font-bold mt-0.5">Stupas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-medium text-ink">{themes.length}</p>
            <p className="text-xs text-muted font-bold mt-0.5">Themes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-medium text-ink">{signaturesCount}</p>
            <p className="text-xs text-muted font-bold mt-0.5">Signatures</p>
          </div>
        </div>

        <p className="kit-eyebrow mb-3">Your Travel Profile</p>

        {/* List cards */}
        <Link to="/explore" className="block kit-card p-4 mb-3 flex items-center gap-3">
          <span className="text-3xl">🧭</span>
          <div className="flex-1">
            <p className="font-extrabold text-ink text-sm">Travel Persona</p>
            <p className="text-xs text-muted mt-0.5 font-bold">สายมู, Foodie, Hidden-gem hunter…</p>
          </div>
          <span className="text-muted">›</span>
        </Link>
        <Link to="/journal" className="block kit-card p-4 mb-3 flex items-center gap-3">
          <span className="text-3xl">📍</span>
          <div className="flex-1">
            <p className="font-extrabold text-ink text-sm">Saved Places</p>
            <p className="text-xs text-muted mt-0.5 font-bold">{signaturesCount} NKP signatures</p>
          </div>
          <span className="text-muted">›</span>
        </Link>
        <Link to="/journal" className="block kit-card p-4 mb-3 flex items-center gap-3">
          <span className="text-3xl">🛕</span>
          <div className="flex-1">
            <p className="font-extrabold text-ink text-sm">Birthday-Stupa Circuit</p>
            <p className="text-xs text-muted mt-0.5 font-bold">{stupasCount} of 8 stupas planned</p>
          </div>
          <span className="text-muted">›</span>
        </Link>

        <p className="kit-eyebrow mb-3 mt-6">Your Preferences</p>
        <Link to="/notifications" className="block kit-card p-4 mb-3 flex items-center gap-3 opacity-80">
          <span className="text-3xl">🔔</span>
          <div className="flex-1">
            <p className="font-extrabold text-ink text-sm">Notifications</p>
            <p className="text-xs text-muted mt-0.5 font-bold">Owner updates, AI tips</p>
          </div>
          <span className="text-muted">›</span>
        </Link>
      </main>

      <KitBottomNav active="profile" />
    </div>
  )
}
