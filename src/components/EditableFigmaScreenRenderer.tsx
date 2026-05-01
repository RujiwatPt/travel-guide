import type { CSSProperties } from 'react'
import type { EditableFigmaScreen } from '../figmaEditableData'
import { applyOverrides, type Overrides } from '../lib/figmaOverrides'

type Props = {
  screen: EditableFigmaScreen
  overrides?: Overrides
  /** When true, renders inside a phone-frame chrome (rounded, shadow). */
  framed?: boolean
}

/**
 * Renders a Figma screen exported to editable React/CSS layers.
 * Each layer becomes an absolutely-positioned div whose styles come
 * straight from the Figma export. The `overrides` prop lets callers
 * swap text strings and image URLs by layer name without mutating
 * the source data in figmaEditableData.ts.
 */
export default function EditableFigmaScreenRenderer({ screen, overrides, framed = true }: Props) {
  const patched = overrides ? applyOverrides(screen, overrides) : screen

  const stage = (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width: patched.width, height: patched.height } as CSSProperties}
    >
      {patched.layers.map((layer, index) => {
        const style = {
          position: 'absolute',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: layer.kind === 'text' ? 'pre-wrap' : undefined,
          wordBreak: layer.kind === 'text' ? 'break-word' : undefined,
          ...layer.style,
        } as CSSProperties

        if (layer.kind === 'text') {
          return (
            <div key={`${layer.name}-${index}`} data-figma-layer={layer.name} style={style}>
              {layer.text}
            </div>
          )
        }

        return <div key={`${layer.name}-${index}`} data-figma-layer={layer.name} style={style} />
      })}
    </div>
  )

  if (!framed) return stage

  return (
    <div className="overflow-hidden rounded-kit-frame bg-white shadow-kit-frame ring-1 ring-black/5">
      {stage}
    </div>
  )
}
