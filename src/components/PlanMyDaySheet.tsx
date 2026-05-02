type DurationOption = '1 Hour' | 'Half-Day' | 'Full-Day'
type VibeOption = 'Spiritual' | 'Food' | 'Nature' | 'Photo' | 'Family' | 'Hidden Gem'
type PaceOption = 'Relaxed' | 'Balanced' | 'Packed'

export type PlanMyDaySelections = {
  duration: DurationOption
  vibe: VibeOption
  pace: PaceOption
}

type Props = {
  open: boolean
  selections: PlanMyDaySelections
  onChange: (next: PlanMyDaySelections) => void
  onClose: () => void
  onSubmit: () => void
  loading: boolean
}

const DURATIONS: DurationOption[] = ['1 Hour', 'Half-Day', 'Full-Day']
const VIBES: VibeOption[] = ['Spiritual', 'Food', 'Nature', 'Photo', 'Family', 'Hidden Gem']
const PACES: PaceOption[] = ['Relaxed', 'Balanced', 'Packed']

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-kit-eyebrow">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`kit-chip ${active ? 'kit-chip-active' : 'kit-chip-inactive'}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PlanMyDaySheet({
  open,
  selections,
  onChange,
  onClose,
  onSubmit,
  loading,
}: Props) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-[80] bg-ink/30 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close plan my day sheet"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[32px] bg-white px-4 pb-6 pt-4 shadow-sheet">
        <div className="mx-auto mb-4 h-[5px] w-11 rounded-full bg-ink/20" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="kit-eyebrow mb-2">Quick planner</p>
            <h2 className="text-xl font-black tracking-[-0.04em] text-ink">Plan my day</h2>
            <p className="mt-1 text-sm text-muted">
              Pick a vibe, pace, and trip length. We&apos;ll turn it into one itinerary prompt.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-kit-pill px-3 py-2 text-sm font-bold text-muted hover:bg-panel hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <ChipGroup
            label="Duration"
            options={DURATIONS}
            value={selections.duration}
            onChange={(duration) => onChange({ ...selections, duration })}
          />
          <ChipGroup
            label="Vibe"
            options={VIBES}
            value={selections.vibe}
            onChange={(vibe) => onChange({ ...selections, vibe })}
          />
          <ChipGroup
            label="Pace"
            options={PACES}
            value={selections.pace}
            onChange={(pace) => onChange({ ...selections, pace })}
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="mt-6 w-full rounded-kit-pill bg-ink px-4 py-3 text-sm font-extrabold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Planning...' : 'Create plan'}
        </button>
      </div>
    </div>
  )
}
