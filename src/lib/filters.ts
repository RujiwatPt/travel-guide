import { isOpenNow } from './status'
import type { Entry } from '../types'

export type ChipDef = {
  id: string
  label: string
  match: (entry: Entry, now: Date) => boolean
}

export const CHIPS: ChipDef[] = [
  { id: 'open-now',   label: '🟢 Open now',   match: (e, now) => isOpenNow(e, now) === 'OPEN' },
  { id: 'food',       label: '🍜 Food',       match: (e) => e.category === 'food' },
  { id: 'cafe',       label: '☕ Cafe',        match: (e) => e.category === 'cafe' },
  { id: 'iconic',     label: '🐉 Iconic',     match: (e) => e.vibe_tags.includes('iconic') },
  { id: 'sunset',     label: '🌅 Sunset',     match: (e) => e.time_tags.includes('sunset') },
  { id: 'history',    label: '🏛️ History',    match: (e) => e.category === 'museum' || e.category === 'temple' },
  { id: 'market',     label: '🛍️ Market',     match: (e) => e.category === 'market' },
  { id: 'nature',     label: '🌿 Nature',     match: (e) => e.category === 'nature' },
  { id: 'temple',     label: '🛕 Temple',     match: (e) => e.category === 'temple' },
  { id: 'spiritual',  label: '✨ Spiritual',  match: (e) => e.vibe_tags.includes('spiritual') },
  { id: 'photo-spot', label: '📸 Photo-spot', match: (e) => e.vibe_tags.includes('photo-spot') },
]

const CHIP_BY_ID = new Map(CHIPS.map((c) => [c.id, c]))

export function applyFilters(
  entries: Entry[],
  selectedIds: string[],
  now: Date,
): Entry[] {
  if (selectedIds.length === 0) return entries
  const predicates = selectedIds
    .map((id) => CHIP_BY_ID.get(id))
    .filter((c): c is ChipDef => c != null)
    .map((c) => c.match)
  return entries.filter((e) => predicates.every((p) => p(e, now)))
}
