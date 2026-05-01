import { Link } from 'react-router-dom'

type NavKey = 'home' | 'explore' | 'plan' | 'journal' | 'profile' | 'app'

const NAV: { key: NavKey; icon: string; to: string; label: string }[] = [
  { key: 'home',    icon: '⌂',  to: '/',           label: 'Home' },
  { key: 'explore', icon: '◇',  to: '/explore',    label: 'Explore' },
  { key: 'app',     icon: '🗺️', to: '/app',        label: 'Map' },
  { key: 'journal', icon: '✎',  to: '/journal',    label: 'Journal' },
  { key: 'profile', icon: '☻',  to: '/profile',    label: 'Profile' },
]

type Props = {
  active: NavKey
}

export default function KitBottomNav({ active }: Props) {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-2 rounded-kit-pill bg-white/90 backdrop-blur-md shadow-kit-frame border border-ink/5 z-40">
      {NAV.map((item) => {
        const isActive = item.key === active
        return (
          <Link
            key={item.key}
            to={item.to}
            className={
              'w-12 h-12 grid place-items-center rounded-kit-pill text-xl transition ' +
              (isActive
                ? 'bg-ink text-white'
                : 'text-ink/55 hover:bg-ink/5')
            }
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </Link>
        )
      })}
    </nav>
  )
}
