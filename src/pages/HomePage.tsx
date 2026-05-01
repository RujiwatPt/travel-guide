import { Link } from 'react-router-dom'
import KitBottomNav2 from '../components/KitBottomNav2'
import SplashOverlay from '../components/SplashOverlay'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import { useAppStore } from '../store/useAppStore'

/**
 * HomePage — structure adapted from Builder.io Visual Copilot's
 * extraction of the figma "Home" frame. Generic Tailwind colors
 * swapped for kit pastel palette; Tokyo content swapped for NKP.
 */

type TravelCardProps = {
  title: string
  subtitle?: string
  image: string
  rating?: number
  to: string
}

function TravelCard({ title, subtitle, image, rating, to }: TravelCardProps) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] active:scale-[0.99] transition-transform"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-32 object-cover" />
        {rating != null && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-kit-pill px-2 py-1 flex items-center gap-1 shadow-kit-pill">
            <span className="text-kit-gold-1 text-xs">★</span>
            <span className="text-[11px] font-extrabold text-ink">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-extrabold text-[14px] text-ink tracking-tight leading-tight truncate">{title}</h3>
        {subtitle && <p className="text-[11px] text-ink/55 mt-0.5 font-semibold truncate">{subtitle}</p>}
      </div>
    </Link>
  )
}

type InsightProps = {
  icon: string
  label: string
  tone: 'amber' | 'sky' | 'green'
  to: string
}

const TONE: Record<InsightProps['tone'], string> = {
  amber: 'bg-kit-cream-1 text-amber-700',
  sky:   'bg-blue-soft/40 text-blue-strong',
  green: 'bg-emerald-100 text-emerald-700',
}

function Insight({ icon, label, tone, to }: InsightProps) {
  return (
    <Link to={to} className="text-center active:scale-[0.97] transition-transform">
      <div className={`w-14 h-14 rounded-kit-pill grid place-items-center text-xl mx-auto mb-2 shadow-kit-pill ${TONE[tone]}`}>
        {icon}
      </div>
      <p className="text-[11px] text-ink/70 font-bold leading-tight">{label}</p>
    </Link>
  )
}

export default function HomePage() {
  const entries = useAppStore((s) => s.entries)
  // Pick two iconic destinations for "Locals by AI"
  const phra = entries.find((e) => e.id === 'wat-phra-that-phanom')
  const naga = entries.find((e) => e.id === 'naga-statue')
  // And two hidden gems for the bottom row
  const tham = entries.find((e) => e.id === 'tham-nakee')
  const street = entries.find((e) => e.id === 'old-town-street-art')

  return (
    <div className="bg-gradient-to-b from-kit-cream-1 to-white min-h-[100dvh] relative pb-28">
      <SplashOverlay />
      <div className="px-5 pt-8 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[26px] font-extrabold text-ink leading-tight tracking-tight">Ready to Explore</h1>
            <h2 className="text-[26px] font-extrabold text-ink leading-tight tracking-tight">Nakhon Phanom!</h2>
          </div>
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white shadow-kit-pill text-ink"
          >
            🔔
          </Link>
        </div>

        {/* Search */}
        <Link
          to="/explore"
          className="block relative mb-7"
        >
          <div className="w-full bg-white rounded-kit-pill px-5 py-3.5 pr-12 shadow-kit-pill border border-ink/[0.05] text-[14px] font-medium text-ink/45">
            Find places, food, trips…
          </div>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/45 text-lg">🔍</span>
        </Link>

        {/* AI Insights Today */}
        <div className="mb-7">
          <h3 className="font-extrabold text-ink text-[16px] mb-4 tracking-tight">AI Insights Today</h3>
          <div className="grid grid-cols-3 gap-2">
            <Insight icon="🛕"  label={`Birthday-Stupa\nRoute`}    tone="amber" to="/journal" />
            <Insight icon="🌅"  label={`Mekong\nSunset`}           tone="sky"   to="/explore" />
            <Insight icon="🧵"  label={`OTOP\nTextiles`}            tone="green" to="/booking" />
          </div>
        </div>

        {/* Locals by AI — destination cards */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-ink text-[16px] tracking-tight">Locals by AI</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {phra && (
              <TravelCard
                title="Phra That Phanom"
                subtitle="พระธาตุพนม"
                image={phra.photos?.[0] ?? NKP_PHOTOS.phraThatPhanom}
                rating={4.9}
                to={`/entry/${phra.id}`}
              />
            )}
            {naga && (
              <TravelCard
                title="Phaya Sri Sattanakharat"
                subtitle="พญาศรีสัตตนาคราช"
                image={naga.photos?.[0] ?? NKP_PHOTOS.nagaStatue}
                rating={4.8}
                to={`/entry/${naga.id}`}
              />
            )}
          </div>
        </div>

        {/* Hidden Gems Nearby */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-ink text-[16px] tracking-tight">Hidden Gems Nearby</h3>
            <Link to="/explore" className="text-blue-strong text-[12px] font-bold">See All</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tham && (
              <TravelCard
                title="Tham Nakee"
                subtitle="Naga Cave"
                image={tham.photos?.[0] ?? NKP_PHOTOS.thamNakee}
                to={`/entry/${tham.id}`}
              />
            )}
            {street && (
              <TravelCard
                title="Old Town Street Art"
                subtitle="Mekong-side murals"
                image={street.photos?.[0] ?? NKP_PHOTOS.walkingStreet}
                to={`/entry/${street.id}`}
              />
            )}
          </div>
        </div>
      </div>

      <KitBottomNav2 active="home" />
    </div>
  )
}
