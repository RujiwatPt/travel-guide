import type { Theme } from '../types'

type Props = {
  themes: Theme[]
  activeThemeId: string | null
  onThemeTap: (themeId: string) => void
}

export default function ThemeStrip({ themes, activeThemeId, onThemeTap }: Props) {
  return (
    <div className="px-1 -mx-4 pb-2">
      <div className="text-[11px] font-bold text-muted uppercase tracking-wider px-3 mb-2">
        What is Nakhon Phanom?
      </div>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-none px-3 pb-1 snap-x snap-mandatory">
        {themes.map((theme) => {
          const active = activeThemeId === theme.id
          const empty = theme.entry_ids.length === 0
          return (
            <button
              key={theme.id}
              onClick={() => onThemeTap(theme.id)}
              className={
                'snap-start flex-shrink-0 w-[260px] text-left rounded-2xl p-3 transition-all border ' +
                (active
                  ? 'shadow-md scale-[1.02]'
                  : 'shadow-sm hover:shadow-md active:scale-[0.99]') +
                (empty ? ' opacity-60' : '')
              }
              style={{
                background: active
                  ? `linear-gradient(135deg, ${theme.accent_color}25, ${theme.accent_color}10)`
                  : 'white',
                borderColor: active ? theme.accent_color : 'rgba(7,27,48,0.08)',
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl">{theme.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-ink text-sm leading-tight">{theme.name_en}</div>
                  <div className="text-[11px] text-muted mt-0.5">{theme.name_th}</div>
                </div>
              </div>
              <p className="text-[12px] text-ink/75 mt-2 line-clamp-2 leading-snug">
                {theme.tagline_en}
              </p>
              <div className="text-[11px] text-muted mt-2">
                {empty ? 'Coming soon' : `${theme.entry_ids.length} places`}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
