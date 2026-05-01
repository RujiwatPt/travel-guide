import { describe, expect, it } from 'vitest'
import { isSignature } from './signatures'
import type { Entry } from '../types'

function makeEntry(vibe_tags: string[]): Entry {
  return {
    id: 'e', type: 'place', city_id: 'nkp',
    name_en: 'X', name_th: 'X',
    description_en: '', why_visit_en: '',
    lat: 0, lng: 0, category: 'food', emoji: '📍',
    vibe_tags, cuisine_tags: [], time_tags: [],
    photos: [],
    hours_weekly: { tz: 'Asia/Bangkok', all_day: true },
    owner_id: null, owner_edit_token: null,
    live_status: null, status_note: null, status_updated: null,
    data_source: 'curated',
  }
}

describe('isSignature', () => {
  it('returns true when vibe_tags includes iconic', () => {
    expect(isSignature(makeEntry(['iconic']))).toBe(true)
  })

  it('returns true when iconic is one of multiple vibe_tags', () => {
    expect(isSignature(makeEntry(['photo-spot', 'iconic', 'spiritual']))).toBe(true)
  })

  it('returns false when iconic is absent', () => {
    expect(isSignature(makeEntry(['photo-spot', 'spiritual']))).toBe(false)
  })

  it('returns false for empty vibe_tags', () => {
    expect(isSignature(makeEntry([]))).toBe(false)
  })
})
