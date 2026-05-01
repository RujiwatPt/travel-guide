import { describe, expect, it } from 'vitest'
import { ENTRIES, OWNERS, entryByToken, ownerById, entriesForOwner } from './seed'

describe('seed lookups', () => {
  describe('entryByToken', () => {
    it('resolves a known token to the right entry', () => {
      expect(entryByToken('pho-sawan-7x3k2')?.id).toBe('pho-sawan')
      expect(entryByToken('river-vibes-9k2x4')?.id).toBe('river-vibes-cafe')
    })

    it('returns undefined for unknown token', () => {
      expect(entryByToken('not-a-real-token')).toBeUndefined()
    })

    it('every Activity that has an owner has a unique edit token', () => {
      const tokens = ENTRIES
        .filter((e) => e.owner_id)
        .map((e) => e.owner_edit_token)
        .filter((t): t is string => t != null)
      expect(new Set(tokens).size).toBe(tokens.length)
    })
  })

  describe('ownerById', () => {
    it('finds Khun Somchai', () => {
      expect(ownerById('owner-somchai')?.display_name).toBe('Khun Somchai')
    })

    it('returns undefined for unknown owner', () => {
      expect(ownerById('owner-x')).toBeUndefined()
    })
  })

  describe('entriesForOwner', () => {
    it('Khun Somchai owns Pho Sawan + River Vibes Café (n:1 relation)', () => {
      const entries = entriesForOwner('owner-somchai')
      const ids = entries.map((e) => e.id).sort()
      expect(ids).toEqual(['pho-sawan', 'river-vibes-cafe'])
    })

    it('returns empty array for unknown owner', () => {
      expect(entriesForOwner('not-a-real-owner')).toEqual([])
    })
  })

  describe('seed invariants', () => {
    it('every Place has owner_id null (CHECK constraint mirrored in code)', () => {
      for (const e of ENTRIES.filter((x) => x.type === 'place')) {
        expect(e.owner_id).toBeNull()
        expect(e.live_status).toBeNull()
      }
    })

    it('all entry ids are unique', () => {
      const ids = ENTRIES.map((e) => e.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('all owners exist for any owner_id referenced from entries', () => {
      const ownerIds = OWNERS.map((o) => o.id)
      for (const e of ENTRIES.filter((x) => x.owner_id != null)) {
        expect(ownerIds).toContain(e.owner_id)
      }
    })
  })
})
