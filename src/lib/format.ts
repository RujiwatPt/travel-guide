/**
 * Display formatters — pure functions extracted from inline duplicates.
 * Each helper here was previously copy-pasted across multiple components.
 */

import type { Day, Entry, HoursWeekly, PriceBand } from '../types'

export function priceLabel(band: PriceBand | null | undefined): string {
  switch (band) {
    case 'budget':  return '₿'
    case 'mid':     return '₿₿'
    case 'premium': return '₿₿₿'
    default:        return 'Free'  // null, undefined, or 'free'
  }
}

const DAY_KEYS: Day[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function localDayInTz(now: Date, tz: string): Day {
  const wkd = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' })
    .formatToParts(now)
    .find((p) => p.type === 'weekday')!.value
  const map: Record<string, Day> = {
    Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun',
  }
  return map[wkd]
}

export function todaysHoursLabel(entry: Entry, now: Date): string {
  const hours: HoursWeekly | null = entry.hours_weekly
  if (!hours) return '—'
  if (hours.all_day) return 'Open all day'
  const day = localDayInTz(now, hours.tz)
  const ranges = hours.weekly?.[day]
  if (!ranges || ranges.length === 0) return 'Closed today'
  return ranges.map(([open, close]) => `${open}–${close}`).join(', ')
}

void DAY_KEYS
