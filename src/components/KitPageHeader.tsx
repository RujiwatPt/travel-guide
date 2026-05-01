import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
  /** Override default browser back navigation */
  onBack?: () => void
  /** Show ellipsis menu button on the right */
  onMenu?: () => void
}

export default function KitPageHeader({ title, onBack, onMenu }: Props) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <button
        onClick={handleBack}
        aria-label="Back"
        className="w-11 h-11 grid place-items-center rounded-kit-pill bg-white border border-ink/5 shadow-kit-pill text-ink hover:bg-ink/5 transition"
      >
        <BackIcon />
      </button>
      <h1 className="text-[18px] font-extrabold text-ink tracking-tight truncate px-3">{title}</h1>
      <button
        onClick={onMenu}
        aria-label="Menu"
        className={
          'w-11 h-11 grid place-items-center rounded-kit-pill bg-kit-cream-2 border border-ink/5 text-ink transition ' +
          (onMenu ? 'hover:bg-kit-cream-1 cursor-pointer' : 'opacity-90 cursor-default')
        }
      >
        <MenuDotsIcon />
      </button>
    </header>
  )
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function MenuDotsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
    </svg>
  )
}
