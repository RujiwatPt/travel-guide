import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, ChevronRight, Sparkles, Star, Landmark, Sunset, Shirt } from 'lucide-react'
import KitBottomNav2 from '../components/KitBottomNav2'
import SplashOverlay from '../components/SplashOverlay'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import { useAppStore } from '../store/useAppStore'

const ICON_STROKE = 2.2
const ICON_SM = 16
const ICON_MD = 22

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
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={300}
          height={225}
          className="w-full h-full object-cover bg-kit-cream-1"
        />
        {rating != null && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-kit-pill px-2 py-1 flex items-center gap-1 shadow-kit-pill">
            <Star size={12} fill="currentColor" className="text-kit-gold-1" aria-hidden="true" />
            <span className="text-[11px] font-extrabold text-ink tabular-nums">{rating.toFixed(1)}</span>
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
  icon: React.ReactNode
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
      <div className={`w-14 h-14 rounded-kit-pill grid place-items-center mx-auto mb-2 shadow-kit-pill ${TONE[tone]}`}>
        {icon}
      </div>
      <p className="text-[11px] text-ink/70 font-bold leading-tight whitespace-pre-line">{label}</p>
    </Link>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const entries = useAppStore((s) => s.entries)
  const [query, setQuery] = useState('')

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/app?q=${encodeURIComponent(q)}`)
  }
  // Pick two iconic destinations for "Locals by AI"
  const phra = entries.find((e) => e.id === 'wat-phra-that-phanom')
  const naga = entries.find((e) => e.id === 'naga-statue')
  // And two hidden gems for the bottom row
  const tham = entries.find((e) => e.id === 'tham-nakee')
  const street = entries.find((e) => e.id === 'old-town-street-art')

  return (
    <main className="bg-gradient-to-b from-kit-cream-1 to-white min-h-[100dvh] relative pb-28">
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
            <Bell size={ICON_MD} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </Link>
        </div>

        {/* Ask-anything chatbot input — submits to /app for ranked search */}
        <form
          onSubmit={handleAskSubmit}
          role="search"
          className="flex items-center gap-2 mb-7 bg-white rounded-kit-pill px-4 py-3 shadow-kit-pill border border-ink/[0.05]"
        >
          <label htmlFor="home-ask-input" className="sr-only">Ask about Nakhon Phanom</label>
          <Sparkles size={ICON_SM} strokeWidth={ICON_STROKE} className="text-blue-strong" aria-hidden="true" />
          <input
            id="home-ask-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about Nakhon Phanom…"
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-[14px] font-semibold text-ink placeholder:text-ink/45"
          />
          <button
            type="submit"
            disabled={query.trim().length === 0}
            aria-label="Ask"
            className="w-11 h-11 -mr-2 grid place-items-center rounded-kit-pill bg-ink/5 text-blue-strong disabled:opacity-30 hover:bg-ink/10 transition"
          >
            <ChevronRight size={ICON_MD} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
        </form>

        {/* AI Insights Today */}
        <div className="mb-7">
          <h3 className="font-extrabold text-ink text-[16px] mb-4 tracking-tight">AI Insights Today</h3>
          <div className="grid grid-cols-3 gap-2">
            <Insight icon={<Landmark size={ICON_MD} strokeWidth={ICON_STROKE} aria-hidden="true" />} label={`Birthday-Stupa\nRoute`}    tone="amber" to="/journal" />
            <Insight icon={<Sunset   size={ICON_MD} strokeWidth={ICON_STROKE} aria-hidden="true" />} label={`Mekong\nSunset`}           tone="sky"   to="/explore" />
            <Insight icon={<Shirt    size={ICON_MD} strokeWidth={ICON_STROKE} aria-hidden="true" />} label={`OTOP\nTextiles`}           tone="green" to="/booking" />
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
    </main>
  )
}
