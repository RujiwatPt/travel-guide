import { describe, expect, it } from 'vitest'
import { distanceKm } from './distance'

describe('distanceKm', () => {
  it('returns 0 for identical points', () => {
    expect(distanceKm({ lat: 17.4083, lng: 104.7795 }, { lat: 17.4083, lng: 104.7795 })).toBe(0)
  })

  it('returns ~50 km between Mueang Nakhon Phanom and Wat Phra That Phanom', () => {
    // Mueang NKP city center vs That Phanom district stupa
    const result = distanceKm({ lat: 17.4083, lng: 104.7795 }, { lat: 16.9437, lng: 104.7239 })
    expect(result).toBeGreaterThan(45)
    expect(result).toBeLessThan(55)
  })

  it('returns ~9000 km for trans-Pacific (Bangkok ↔ San Francisco)', () => {
    const result = distanceKm({ lat: 13.7563, lng: 100.5018 }, { lat: 37.7749, lng: -122.4194 })
    expect(result).toBeGreaterThan(12000)
    expect(result).toBeLessThan(14000)
  })

  it('is symmetric — distance(a, b) === distance(b, a)', () => {
    const a = { lat: 17.408, lng: 104.779 }
    const b = { lat: 16.943, lng: 104.723 }
    expect(distanceKm(a, b)).toBeCloseTo(distanceKm(b, a), 6)
  })
})
