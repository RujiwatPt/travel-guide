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

  const handleClear = () => {
    setValue('')
    onClear?.()
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-30">
      <form
        onSubmit={handleSubmit}
        className="kit-pill"
      >
        <span className="text-base text-ink/60">âŒ•</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about Nakhon Phanomâ€¦"
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
            className="w-8 h-8 grid place-items-center rounded-kit-pill text-muted hover:text-ink hover:bg-ink/5 text-lg leading-none transition"
            aria-label="Clear search or plan"
          >
            âœ•
          </button>
        ) : (
          <button
            type="submit"
            className="w-8 h-8 grid place-items-center rounded-kit-pill bg-ink/5 text-blue-strong text-lg leading-none disabled:opacity-30 hover:bg-ink/10 transition"
            disabled={value.trim().length === 0}
            aria-label="Submit"
          >
            â—‰
          </button>
        )}
      </form>
    </div>
  )
}
