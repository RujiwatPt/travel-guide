import { describe, expect, it } from 'vitest'
import { applyFilters } from './filters'
import type { Entry } from '../types'

function makeEntry(overrides: Partial<Entry>): Entry {
  return {
    id: 'e',
    type: 'activity',
    city_id: 'nkp',
    name_en: 'X', name_th: 'X',
    description_en: '', why_visit_en: '',
    lat: 0, lng: 0,
    category: 'food',
    emoji: '📍',
    vibe_tags: [], cuisine_tags: [], time_tags: [],
    photos: [],
    hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
    owner_id: null, owner_edit_token: null,
    live_status: null, status_note: null, status_updated: null,
    data_source: 'curated',
    ...overrides,
  }
}

describe('applyFilters', () => {
  it('returns all entries when no chips selected', () => {
    const entries = [makeEntry({ id: 'a' }), makeEntry({ id: 'b' })]
    expect(applyFilters(entries, [], new Date())).toEqual(entries)
  })

  it('filters by category chip — food keeps only food entries', () => {
    const food = makeEntry({ id: 'food1', category: 'food' })
    const cafe = makeEntry({ id: 'cafe1', category: 'cafe' })
    const result = applyFilters([food, cafe], ['food'], new Date())
    expect(result).toEqual([food])
  })

  it('open-now chip drops entries that are sold_out via live_status', () => {
    const open = makeEntry({ id: 'open', live_status: 'open' })
    const soldOut = makeEntry({ id: 'soldOut', live_status: 'sold_out' })
    const result = applyFilters([open, soldOut], ['open-now'], new Date())
    expect(result).toEqual([open])
  })

  it('multi-chip stack intersects (food AND open-now)', () => {
    const openFood = makeEntry({ id: 'a', category: 'food', live_status: 'open' })
    const closedFood = makeEntry({ id: 'b', category: 'food', live_status: 'sold_out' })
    const openCafe = makeEntry({ id: 'c', category: 'cafe', live_status: 'open' })
    const result = applyFilters([openFood, closedFood, openCafe], ['food', 'open-now'], new Date())
    expect(result).toEqual([openFood])
  })

  it('vibe_tags chip — iconic keeps only entries tagged iconic', () => {
    const iconic = makeEntry({ id: 'i', vibe_tags: ['iconic', 'photo-spot'] })
    const ordinary = makeEntry({ id: 'o', vibe_tags: ['quiet'] })
    const result = applyFilters([iconic, ordinary], ['iconic'], new Date())
    expect(result).toEqual([iconic])
  })

  it('returns empty array when no entry matches all selected chips', () => {
    const food = makeEntry({ id: 'a', category: 'food', vibe_tags: [] })
    const result = applyFilters([food], ['food', 'iconic'], new Date())
    expect(result).toEqual([])
  })

  it('ignores unknown chip ids without throwing', () => {
    const e = makeEntry({ id: 'a' })
    expect(() => applyFilters([e], ['nonexistent'], new Date())).not.toThrow()
    expect(applyFilters([e], ['nonexistent'], new Date())).toEqual([e])
  })
})
