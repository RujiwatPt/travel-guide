/**
 * scaleFor — pure helper for the responsive figma renderer.
 * Returns a CSS transform-scale factor that fits a fixed-width
 * "screen" inside the user's viewport without horizontal overflow,
 * and without ever upscaling beyond the screen's native size.
 *
 * Clamped at MIN_SCALE so very narrow viewports stay readable.
 */

export const MIN_SCALE = 0.7

export function scaleFor(viewportW: number, screenW: number): number {
  if (viewportW >= screenW) return 1
  return Math.max(MIN_SCALE, viewportW / screenW)
}
