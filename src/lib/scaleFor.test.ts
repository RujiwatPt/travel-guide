import { describe, expect, it } from 'vitest'
import { scaleFor } from './scaleFor'

describe('scaleFor', () => {
  it('returns 1.0 when viewport equals screen width', () => {
    expect(scaleFor(375, 375)).toBe(1)
  })

  it('returns 1.0 when viewport is wider than screen (no upscale)', () => {
    expect(scaleFor(750, 375)).toBe(1)
    expect(scaleFor(1024, 375)).toBe(1)
  })

  it('returns viewport/screen when narrower (scale down to fit)', () => {
    // iPhone SE (320 wide) showing a 375 screen
    expect(scaleFor(320, 375)).toBeCloseTo(0.853, 2)
  })

  it('clamps at MIN_SCALE (0.7) for very narrow viewports', () => {
    // Degenerate viewport — would otherwise be ~0.53, clamp at 0.7
    expect(scaleFor(200, 375)).toBe(0.7)
    // Even narrower
    expect(scaleFor(100, 375)).toBe(0.7)
  })
})
