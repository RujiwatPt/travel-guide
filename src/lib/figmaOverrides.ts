/**
 * applyOverrides — patches an editable Figma screen with NKP-specific
 * text and image swaps without mutating the input screen.
 *
 * Used by v4 pixel-faithful page components to render kit screens
 * with NKP content while keeping figmaEditableData.ts as immutable
 * source-of-truth.
 */

import type { EditableFigmaScreen } from '../figmaEditableData'

export type LayerOverride = {
  text?: string
  imageSrc?: string
}

export type Overrides = {
  [layerName: string]: LayerOverride
}

export function applyOverrides(
  screen: EditableFigmaScreen,
  overrides: Overrides,
): EditableFigmaScreen {
  if (Object.keys(overrides).length === 0) return screen
  return {
    ...screen,
    layers: screen.layers.map((layer) => {
      const o = overrides[layer.name]
      if (!o) return layer
      let next = layer
      if (o.text !== undefined) next = { ...next, text: o.text }
      if (o.imageSrc !== undefined) {
        next = {
          ...next,
          style: { ...next.style, background: replaceUrlInBackground(String(next.style.background ?? ''), o.imageSrc) },
        }
      }
      return next
    }),
  }
}

function replaceUrlInBackground(bg: string, newUrl: string): string {
  // Replace url(...) substring (first occurrence). If no url() exists,
  // fall back to a plain url() background.
  const match = bg.match(/url\([^)]*\)/)
  if (match) {
    return bg.replace(match[0], `url(${newUrl})`)
  }
  return `url(${newUrl}) center/cover`
}
