import { describe, expect, it } from 'vitest'
import { priceLabel, todaysHoursLabel } from './format'
import type { Entry } from '../types'

function makeEntry(hours: Entry['hours_weekly']): Entry {
  return {
    id: 'e', type: 'place', city_id: 'nkp',
    name_en: 'X', name_th: 'X',
    description_en: '', why_visit_en: '',
    lat: 0, lng: 0, category: 'food', emoji: '📍',
    vibe_tags: [], cuisine_tags: [], time_tags: [],
    photos: [],
    hours_weekly: hours,
    owner_id: null, owner_edit_token: null,
    live_status: null, status_note: null, status_updated: null,
    data_source: 'curated',
  }
}

describe('priceLabel', () => {
  it("returns 'Free' for null (no price_band set)", () => {
    expect(priceLabel(null)).toBe('Free')
  })

  it("returns 'Free' for explicit 'free'", () => {
    expect(priceLabel('free')).toBe('Free')
  })

  it("returns '₿' for budget", () => {
    expect(priceLabel('budget')).toBe('₿')
  })

  it("returns '₿₿' for mid", () => {
    expect(priceLabel('mid')).toBe('₿₿')
  })

  it("returns '₿₿₿' for premium", () => {
    expect(priceLabel('premium')).toBe('₿₿₿')
  })
})

describe('todaysHoursLabel', () => {
  it("returns '—' when entry has no hours_weekly", () => {
    expect(todaysHoursLabel(makeEntry(null), new Date())).toBe('—')
  })

  it("returns 'Open all day' when all_day is true", () => {
    const entry = makeEntry({ tz: 'Asia/Bangkok', all_day: true })
    expect(todaysHoursLabel(entry, new Date('2026-05-01T10:00:00Z'))).toBe('Open all day')
  })

  it("returns 'Closed today' when today's weekly entry is null", () => {
    // 2026-04-29 is a Wednesday; entry only opens Fri/Sat/Sun
    const entry = makeEntry({
      tz: 'Asia/Bangkok',
      weekly: {
        mon: null, tue: null, wed: null, thu: null,
        fri: [['17:00', '22:00']], sat: [['17:00', '22:00']], sun: [['17:00', '22:00']],
      },
    })
    expect(todaysHoursLabel(entry, new Date('2026-04-29T10:00:00+07:00'))).toBe('Closed today')
  })

  it("formats a single range as 'open–close'", () => {
    // 2026-05-01 is a Friday
    const entry = makeEntry({
      tz: 'Asia/Bangkok',
      weekly: { fri: [['09:00', '20:00']] },
    })
    expect(todaysHoursLabel(entry, new Date('2026-05-01T10:00:00+07:00'))).toBe('09:00–20:00')
  })

  it("formats a split shift as comma-separated ranges", () => {
    // 2026-05-01 is a Friday with split shift
    const entry = makeEntry({
      tz: 'Asia/Bangkok',
      weekly: { fri: [['09:00', '14:00'], ['17:00', '22:00']] },
    })
    expect(todaysHoursLabel(entry, new Date('2026-05-01T10:00:00+07:00'))).toBe('09:00–14:00, 17:00–22:00')
  })

  it('respects the entry timezone — UTC near midnight crosses to next day in Bangkok', () => {
    // 2026-05-01 17:30 UTC = 2026-05-02 00:30 Bangkok (Saturday)
    // Entry is open Mon-Fri only; Saturday should read as 'Closed today'.
    const entry = makeEntry({
      tz: 'Asia/Bangkok',
      weekly: {
        mon: [['09:00', '17:00']], tue: [['09:00', '17:00']], wed: [['09:00', '17:00']],
        thu: [['09:00', '17:00']], fri: [['09:00', '17:00']],
      },
    })
    expect(todaysHoursLabel(entry, new Date('2026-05-01T17:30:00Z'))).toBe('Closed today')
  })
})
