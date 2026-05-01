import { Link } from 'react-router-dom'

type NavKey = 'home' | 'grid'

type Props = {
  active: NavKey
}

export default function KitBottomNav2({ active }: Props) {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2.5 rounded-kit-pill bg-white shadow-kit-frame border border-ink/5 z-kit-nav"
    >
      <Link
        to="/"
        aria-label="Home"
        className={
          'w-11 h-11 grid place-items-center rounded-kit-pill transition ' +
          (active === 'home' ? 'bg-ink text-white' : 'text-ink/55 hover:bg-ink/5')
        }
      >
        <HomeIcon />
      </Link>
      <Link
        to="/app"
        aria-label="Explore"
        className={
          'w-11 h-11 grid place-items-center rounded-kit-pill transition ' +
          (active === 'grid' ? 'bg-ink text-white' : 'text-ink/55 hover:bg-ink/5')
        }
      >
        <GridIcon />
      </Link>
    </nav>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}
