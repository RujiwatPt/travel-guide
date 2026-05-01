import { Link } from 'react-router-dom'
import { ENTRIES } from '../data/seed'
import KitBottomNav from '../components/KitBottomNav'

/**
 * BookingHubPage — kit "Booking Hub" pattern.
 * Repurposed for our domain as an OTOP marketplace placeholder —
 * Renu Phu Thai textiles (ผ้ามัดย้อม), BlueGold civet coffee, etc.
 */

export default function BookingHubPage() {
  const otopEntries = ENTRIES.filter((e) => e.category === 'shop')
  const eventLikeEntries = ENTRIES.filter((e) => e.vibe_tags.includes('iconic')).slice(0, 3)

  return (
    <div className="min-h-[100dvh] bg-panel pb-32">
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-ink/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">‹</Link>
        <p className="kit-eyebrow">OTOP & Booking</p>
        <button className="w-11 h-11 grid place-items-center rounded-kit-pill hover:bg-ink/5 text-xl">⋯</button>
      </header>

      <main className="px-5 pt-4">
        <h1 className="kit-h1 text-[24px] tracking-[-0.03em]">OTOP Marketplace</h1>
        <p className="text-sm text-muted mt-1 font-bold">Local Phu Thai crafts & specialty coffee.</p>

        <div className="flex gap-2 overflow-x-auto pb-3 mt-4 -mx-5 px-5 scrollbar-none">
          <span className="kit-chip kit-chip-active">All</span>
          <span className="kit-chip kit-chip-inactive">Textiles</span>
          <span className="kit-chip kit-chip-inactive">Coffee</span>
          <span className="kit-chip kit-chip-inactive">Workshops</span>
        </div>

        {/* OTOP cards — kit booking-card pattern */}
        {otopEntries.map((entry) => (
          <div key={entry.id} className="relative mb-5 rounded-kit-hero overflow-hidden h-[220px] shadow-kit-card"
            style={{
              background: entry.photos?.[0]
                ? `linear-gradient(to top, rgba(12,35,47,0.66), transparent 56%), url(${entry.photos[0]})`
                : 'linear-gradient(135deg, #ffe6ea, #9fcfe7 60%, #426e53)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-kit-pill bg-white/45 backdrop-blur text-xs font-extrabold text-ink">
              ★ Featured OTOP
            </div>
            <button className="absolute top-4 right-4 w-11 h-11 rounded-kit-pill bg-white/45 backdrop-blur grid place-items-center text-white text-xl">
              ♡
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-extrabold text-lg tracking-tight">{entry.name_en}</h3>
              <p className="text-xs text-white/80 mt-0.5 font-bold">{entry.name_th}</p>
              <p className="text-xs text-white/80 mt-1.5 font-medium line-clamp-1">{entry.why_visit_en}</p>
              <div className="flex items-center justify-between mt-2.5">
                <strong className="text-lg font-extrabold">
                  {entry.price_min_thb ? `฿${entry.price_min_thb}–${entry.price_max_thb}` : 'Free'}
                </strong>
                <Link
                  to={`/entry/${entry.id}`}
                  className="px-4 py-2 rounded-kit-pill bg-yellow text-ink text-xs font-extrabold shadow-kit-card"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-6 mb-3">
          <p className="kit-eyebrow">Coming this week</p>
          <span className="text-xs text-blue-strong font-bold cursor-pointer">See All</span>
        </div>

        {eventLikeEntries.map((entry) => (
          <Link key={entry.id} to={`/entry/${entry.id}`} className="flex items-center gap-3 mb-3 kit-card p-3">
            <span
              className="w-[58px] h-[58px] rounded-kit-photo grid place-items-center text-2xl bg-kit-cream-1"
              style={
                entry.photos?.[0]
                  ? { backgroundImage: `url(${entry.photos[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : undefined
              }
            >
              {entry.photos?.[0] ? '' : entry.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-ink text-sm">{entry.name_en}</p>
              <p className="text-xs text-muted mt-0.5 font-bold">May 13 · 10:00 AM</p>
            </div>
            <button className="px-3 py-2 rounded-kit-pill bg-blue-strong text-white text-xs font-extrabold">
              Get Pass
            </button>
          </Link>
        ))}
      </main>

      <KitBottomNav active="explore" />
    </div>
  )
}
