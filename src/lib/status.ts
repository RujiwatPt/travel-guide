export type LiveStatus =
  | 'open'
  | 'closing_soon'
  | 'closed_today'
  | 'sold_out'
  | 'temporarily_closed'

export type ComputedStatus =
  | 'OPEN'
  | 'CLOSING_SOON'
  | 'CLOSED_TODAY'
  | 'SOLD_OUT'
  | 'TEMPORARILY_CLOSED'

type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type HoursWeekly = {
  tz: string
  all_day?: boolean
  weekly?: Partial<Record<Day, [string, string][] | null>>
}

export type Entry = {
  type: 'activity' | 'place'
  hours_weekly: HoursWeekly | null
  live_status?: LiveStatus | null
}

const WEEKDAY_MAP: Record<string, Day> = {
  Mon: 'mon', Tue: 'tue', Wed: 'wed',
  Thu: 'thu', Fri: 'fri', Sat: 'sat', Sun: 'sun',
}

function localDayAndMinutes(now: Date, tz: string): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(now)
  const wkd = parts.find((p) => p.type === 'weekday')!.value
  const hr = Number(parts.find((p) => p.type === 'hour')!.value)
  const min = Number(parts.find((p) => p.type === 'minute')!.value)
  return { day: WEEKDAY_MAP[wkd], minutes: hr * 60 + min }
}

function rangeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function isOpenNow(entry: Entry, now: Date): ComputedStatus {
  switch (entry.live_status) {
    case 'sold_out':           return 'SOLD_OUT'
    case 'closed_today':       return 'CLOSED_TODAY'
    case 'temporarily_closed': return 'TEMPORARILY_CLOSED'
    case 'closing_soon':       return 'CLOSING_SOON'
    case 'open':               return 'OPEN'
  }
  if (!entry.hours_weekly) return 'CLOSED_TODAY'
  return isOpenBySchedule(entry.hours_weekly, now) ? 'OPEN' : 'CLOSED_TODAY'
}

function isOpenBySchedule(hours: HoursWeekly, now: Date): boolean {
  if (hours.all_day) return true
  if (!hours.weekly) return false

  const { day, minutes } = localDayAndMinutes(now, hours.tz)

  for (const [open, close] of hours.weekly[day] ?? []) {
    if (minutes >= rangeToMinutes(open) && minutes < rangeToMinutes(close)) return true
  }

  // Yesterday's overhang — ranges with close > 24:00 (1440 min) extend into today
  for (const [, close] of hours.weekly[previousDay(day)] ?? []) {
    const closeMin = rangeToMinutes(close)
    if (closeMin > 1440 && minutes < closeMin - 1440) return true
  }

  return false
}

const DAY_ORDER: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
function previousDay(d: Day): Day {
  return DAY_ORDER[(DAY_ORDER.indexOf(d) + 6) % 7]
}
