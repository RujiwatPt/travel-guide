import { describe, expect, it } from 'vitest'
import { isOpenNow, type Entry } from './status'

describe('isOpenNow', () => {
  it('returns OPEN when entry is all_day with no live_status', () => {
    const entry: Entry = {
      type: 'place',
      hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
    }
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00Z'))).toBe('OPEN')
  })

  it('returns SOLD_OUT when live_status is sold_out, regardless of hours', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: { tz: 'Asia/Bangkok', all_day: true }, // would otherwise be OPEN
      live_status: 'sold_out',
    }
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00Z'))).toBe('SOLD_OUT')
  })

  it('returns CLOSED_TODAY when live_status is closed_today', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
      live_status: 'closed_today',
    }
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00Z'))).toBe('CLOSED_TODAY')
  })

  it('returns TEMPORARILY_CLOSED when live_status is temporarily_closed', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
      live_status: 'temporarily_closed',
    }
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00Z'))).toBe('TEMPORARILY_CLOSED')
  })

  it('returns CLOSING_SOON when live_status is closing_soon', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
      live_status: 'closing_soon',
    }
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00Z'))).toBe('CLOSING_SOON')
  })

  it("returns OPEN when live_status is 'open' even if scheduled closed today", () => {
    // Friday in Bangkok; weekly says Friday is closed; owner forced open
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: { fri: null },
      },
      live_status: 'open',
    }
    // 2026-05-01 is a Friday
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00+07:00'))).toBe('OPEN')
  })

  it('returns OPEN when no live_status and current time falls within today\'s window', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: { fri: [['09:00', '20:00']] },
      },
    }
    // 2026-05-01 is a Friday; 10:00 Bangkok local is inside 09:00–20:00
    expect(isOpenNow(entry, new Date('2026-05-01T10:00:00+07:00'))).toBe('OPEN')
  })

  it('returns CLOSED_TODAY when current time is outside every range today', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: { fri: [['09:00', '20:00']] },
      },
    }
    // 2026-05-01 Friday; 21:00 Bangkok is past close
    expect(isOpenNow(entry, new Date('2026-05-01T21:00:00+07:00'))).toBe('CLOSED_TODAY')
  })

  it('returns CLOSED_TODAY when today is explicitly null in the weekly schedule', () => {
    // Indochina Walking Street: open Fri/Sat/Sun only.
    // Test it on a Wednesday — wed is null/missing.
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: {
          mon: null, tue: null, wed: null, thu: null,
          fri: [['17:00', '22:00']],
          sat: [['17:00', '22:00']],
          sun: [['17:00', '22:00']],
        },
      },
    }
    // 2026-04-29 is a Wednesday
    expect(isOpenNow(entry, new Date('2026-04-29T18:00:00+07:00'))).toBe('CLOSED_TODAY')
  })

  it('handles midnight-crossing range — open at 01:00 the next day when previous day spans into 26:00', () => {
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: {
          fri: [['18:00', '26:00']], // open Friday 6pm until 2am Saturday
        },
      },
    }
    // 2026-05-02 is a Saturday; 01:00 Bangkok = within Friday's overhang
    expect(isOpenNow(entry, new Date('2026-05-02T01:00:00+07:00'))).toBe('OPEN')
  })

  it('respects the entry timezone when now is given in UTC', () => {
    // Open Mon 09:00–17:00 Bangkok local.
    const entry: Entry = {
      type: 'activity',
      hours_weekly: {
        tz: 'Asia/Bangkok',
        weekly: { mon: [['09:00', '17:00']] },
      },
    }
    // 2026-05-04 is a Monday.
    // UTC 12:00 looks like noon, which is inside 09–17 if misread as local.
    // But Bangkok local = 19:00, which is past close → CLOSED_TODAY.
    // This test FAILS if timezone is not actually applied.
    expect(isOpenNow(entry, new Date('2026-05-04T12:00:00Z'))).toBe('CLOSED_TODAY')
  })
})
