type Props = {
  photo: string
  pillLabel: string
  prompt: string
  onTap?: () => void
}

export default function KitAiHeroCard({ photo, pillLabel, prompt, onTap }: Props) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left relative rounded-kit-photo overflow-hidden shadow-kit-card border border-ink/[0.04] active:scale-[0.99] transition-transform"
    >
      <div
        className="w-full h-[180px] relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(3,29,44,0.65) 0%, rgba(3,29,44,0.1) 60%, transparent 100%), url(${photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* AI pill at top-center */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-kit-pill bg-white/95 text-blue-strong text-[11px] font-extrabold flex items-center gap-1 shadow-kit-pill">
          <SparkIcon />
          {pillLabel}
        </div>
        {/* Voice icon + prompt at bottom */}
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 text-white">
          <WaveIcon />
          <p className="text-[15px] font-extrabold tracking-tight leading-tight drop-shadow whitespace-pre-line">
            {prompt}
          </p>
        </div>
      </div>
    </button>
  )
}

function SparkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.5 5L18 9l-4.5 1.5L12 16l-1.5-5L6 9l4.5-2L12 2zm7 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
      <rect x="2" y="10" width="2" height="4" rx="1" />
      <rect x="6" y="7" width="2" height="10" rx="1" />
      <rect x="10" y="4" width="2" height="16" rx="1" />
      <rect x="14" y="7" width="2" height="10" rx="1" />
      <rect x="18" y="10" width="2" height="4" rx="1" />
    </svg>
  )
}
