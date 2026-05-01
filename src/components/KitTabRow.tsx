type Tab = { id: string; label: string }

type Props = {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
  /** Render the last tab's label in kit-gold as an accent (figma pattern) */
  goldLastTab?: boolean
}

export default function KitTabRow({ tabs, activeId, onChange, goldLastTab = false }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-none">
      {tabs.map((tab, i) => {
        const isActive = tab.id === activeId
        const isLast = i === tabs.length - 1
        const goldAccent = goldLastTab && isLast && !isActive
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={
              'shrink-0 px-5 py-2.5 rounded-kit-pill text-[14px] font-bold tracking-tight transition ' +
              (isActive
                ? 'bg-kit-gold-1 text-ink'
                : goldAccent
                ? 'text-kit-gold-1 hover:bg-ink/5'
                : 'text-ink/70 hover:bg-ink/5')
            }
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
