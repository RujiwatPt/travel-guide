import type { Theme } from '../types'

type Props = {
  themes: Theme[]
  activeThemeId: string | null
  onThemeTap: (themeId: string) => void
}

export default function ThemeStrip({ themes, activeThemeId, onThemeTap }: Props) {
  return (
    <div className="px-1 -mx-4 pb-2">
      <p className="kit-eyebrow px-3 mb-2.5">What is Nakhon Phanom?</p>
      <div className="flex gap-3 overflow-x-auto scrollbar-none px-3 pb-2 snap-x snap-mandatory">
        {themes.map((theme) => {
          const active = activeThemeId === theme.id
          const empty = theme.entry_ids.length === 0
          return (
            <button
              key={theme.id}
              onClick={() => onThemeTap(theme.id)}
              className={
                'snap-start flex-shrink-0 w-[270px] text-left rounded-kit-hero p-4 transition-all border-2 ' +
                (active
                  ? 'shadow-kit-card scale-[1.02]'
                  : 'shadow-kit-card hover:scale-[1.01] active:scale-[0.99]') +
                (empty ? ' opacity-60' : '')
              }
              style={{
                background: active
                  ? `linear-gradient(135deg, ${theme.accent_color}30, ${theme.accent_color}12)`
                  : 'white',
                borderColor: active ? theme.accent_color : 'rgba(7,27,48,0.06)',
              }}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-3xl leading-none">{theme.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-ink text-[15px] leading-tight tracking-tight">
                    {theme.name_en}
                  </div>
                  <div className="text-[11px] text-muted mt-0.5 font-bold">{theme.name_th}</div>
                </div>
              </div>
              <p className="text-[12px] text-ink/75 mt-2.5 line-clamp-2 leading-snug font-medium">
                {theme.tagline_en}
              </p>
              <div className="text-[11px] text-muted mt-2.5 font-bold">
                {empty ? 'Coming soon' : `${theme.entry_ids.length} places`}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
