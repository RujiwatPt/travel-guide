import { useState } from 'react'

type Props = {
  onSubmit: (query: string) => void
  loading: boolean
  initialQuery?: string
  onClear?: () => void
  hasPlan?: boolean
}

export default function ChatbotBar({ onSubmit, loading, initialQuery, onClear, hasPlan }: Props) {
  const [value, setValue] = useState(initialQuery ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loading && value.trim().length > 0) {
      onSubmit(value.trim())
    }
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-30">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 h-12 px-4 rounded-full bg-white/95 backdrop-blur shadow-soft border border-ink/5"
      >
        <span className="text-base">⌕</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about Nakhon Phanom…"
          disabled={loading}
          className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted disabled:opacity-60"
        />
        {loading ? (
          <div className="flex gap-0.5 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '160ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '320ms' }} />
          </div>
        ) : hasPlan ? (
          <button
            type="button"
            onClick={onClear}
            className="text-muted hover:text-ink text-lg leading-none"
            aria-label="Clear plan"
          >
            ✕
          </button>
        ) : (
          <button
            type="submit"
            className="text-blue-strong text-lg leading-none disabled:opacity-40"
            disabled={value.trim().length === 0}
            aria-label="Submit"
          >
            ◉
          </button>
        )}
      </form>
    </div>
  )
}
