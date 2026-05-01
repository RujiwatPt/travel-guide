import { describe, expect, it } from 'vitest'
import { relativeTime } from './time'

const NOW = new Date('2026-05-01T12:00:00Z')

describe('relativeTime', () => {
  it('returns null when iso is null', () => {
    expect(relativeTime(null, NOW)).toBe(null)
  })

  it("returns 'just now' for timestamps less than 1 minute old", () => {
    const iso = new Date(NOW.getTime() - 30_000).toISOString()
    expect(relativeTime(iso, NOW)).toBe('just now')
  })

  it("returns 'Nm ago' for minutes-scale ages", () => {
    const iso = new Date(NOW.getTime() - 5 * 60_000).toISOString()
    expect(relativeTime(iso, NOW)).toBe('5m ago')
  })

  it("returns 'Nh ago' for hours-scale ages", () => {
    const iso = new Date(NOW.getTime() - 2 * 60 * 60_000).toISOString()
    expect(relativeTime(iso, NOW)).toBe('2h ago')
  })

  it("returns 'Nd ago' for days-scale ages", () => {
    const iso = new Date(NOW.getTime() - 3 * 24 * 60 * 60_000).toISOString()
    expect(relativeTime(iso, NOW)).toBe('3d ago')
  })

  it('rounds down at boundaries (59m → 59m, 60m → 1h)', () => {
    const iso59 = new Date(NOW.getTime() - 59 * 60_000).toISOString()
    const iso60 = new Date(NOW.getTime() - 60 * 60_000).toISOString()
    expect(relativeTime(iso59, NOW)).toBe('59m ago')
    expect(relativeTime(iso60, NOW)).toBe('1h ago')
  })
})
