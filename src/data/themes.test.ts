import { describe, expect, it } from 'vitest'
import { themesForCity, themeById, NKP_THEMES } from './themes'

describe('themes', () => {
  describe('themesForCity', () => {
    it('returns all themes for Nakhon Phanom', () => {
      expect(themesForCity('nkp')).toHaveLength(NKP_THEMES.length)
    })

    it('returns empty array for unknown city', () => {
      expect(themesForCity('xyz')).toEqual([])
    })
  })

  describe('themeById', () => {
    it('finds birthday-stupa-pilgrimage', () => {
      const theme = themeById('birthday-stupa-pilgrimage')
      expect(theme).toBeDefined()
      expect(theme?.name_en).toBe('Birthday-Stupa Pilgrimage')
    })

    it('returns undefined for unknown id', () => {
      expect(themeById('not-a-theme')).toBeUndefined()
    })
  })

  describe('NKP_THEMES content invariants', () => {
    it('all themes belong to nkp', () => {
      for (const t of NKP_THEMES) expect(t.city_id).toBe('nkp')
    })

    it('every theme has a non-empty bilingual name and tagline', () => {
      for (const t of NKP_THEMES) {
        expect(t.name_en.length).toBeGreaterThan(0)
        expect(t.name_th.length).toBeGreaterThan(0)
        expect(t.tagline_en.length).toBeGreaterThan(0)
      }
    })

    it('all entry_ids are unique within a single theme', () => {
      for (const t of NKP_THEMES) {
        expect(new Set(t.entry_ids).size).toBe(t.entry_ids.length)
      }
    })
  })
})
