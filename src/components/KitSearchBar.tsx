type Props = {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}

export default function KitSearchBar({ placeholder = 'Search…', value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-kit-cream-2 rounded-kit-pill border border-ink/[0.05] shadow-kit-pill">
      <SearchIcon />
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] font-medium text-ink placeholder:text-ink/45 focus:outline-none"
      />
      <MicIcon />
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink/55">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/55">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}
