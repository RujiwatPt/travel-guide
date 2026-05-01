import { useState } from 'react'
import { Sparkles, X, ChevronRight } from 'lucide-react'

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

  const handleClear = () => {
    setValue('')
    onClear?.()
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-kit-overlay">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="kit-pill"
      >
        <label htmlFor="app-ask-input" className="sr-only">Ask about Nakhon Phanom</label>
        <Sparkles size={16} strokeWidth={2.2} className="text-blue-strong" aria-hidden="true" />
        <input
          id="app-ask-input"
          type="search"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about Nakhon Phanom…"
          disabled={loading}
          className="flex-1 bg-transparent outline-none text-sm font-semibold text-ink placeholder:text-muted disabled:opacity-60"
        />
        {loading ? (
          <div className="flex gap-1 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '160ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-strong animate-pulse" style={{ animationDelay: '320ms' }} />
          </div>
        ) : hasPlan ? (
          <button
            type="button"
            onClick={handleClear}
            className="w-11 h-11 -mr-1.5 grid place-items-center rounded-kit-pill text-muted hover:text-ink hover:bg-ink/5 transition"
            aria-label="Clear search or plan"
          >
            <X size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            className="w-11 h-11 -mr-1.5 grid place-items-center rounded-kit-pill bg-ink/5 text-blue-strong disabled:opacity-30 hover:bg-ink/10 transition"
            disabled={value.trim().length === 0}
            aria-label="Submit"
          >
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}
      </form>
    </div>
  )
}
