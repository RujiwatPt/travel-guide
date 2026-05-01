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
  hideLayer?: boolean
}

export type Overrides = {
  // Key forms:
  //   "Layer Name"      — applies to all layers with this name
  //   "Layer Name#0"    — applies to the 0th occurrence of this name
  [layerName: string]: LayerOverride
}

export function applyOverrides(
  screen: EditableFigmaScreen,
  overrides: Overrides,
): EditableFigmaScreen {
  if (Object.keys(overrides).length === 0) return screen

  // Track per-name occurrence index for "Name#N" matching
  const occurrence = new Map<string, number>()

  const out = screen.layers.flatMap((layer) => {
    const idx = occurrence.get(layer.name) ?? 0
    occurrence.set(layer.name, idx + 1)

    // Indexed override (e.g. "image#0") wins over plain name
    const o = overrides[`${layer.name}#${idx}`] ?? overrides[layer.name]
    if (!o) return [layer]
    if (o.hideLayer) return []

    let next = layer
    if (o.text !== undefined) next = { ...next, text: o.text }
    if (o.imageSrc !== undefined) {
      next = {
        ...next,
        style: {
          ...next.style,
          background: replaceUrlInBackground(String(next.style.background ?? ''), o.imageSrc),
          backgroundImage: `url(${o.imageSrc})`,
        },
      }
    }
    return [next]
  })

  return { ...screen, layers: out }
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
