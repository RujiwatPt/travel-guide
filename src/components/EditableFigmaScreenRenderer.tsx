import { useEffect, useState, type CSSProperties } from 'react'
import type { EditableFigmaScreen } from '../figmaEditableData'
import { applyOverrides, type Overrides } from '../lib/figmaOverrides'
import { scaleFor } from '../lib/scaleFor'

type Props = {
  screen: EditableFigmaScreen
  overrides?: Overrides
  /** When true, renders inside a phone-frame chrome (rounded, shadow). */
  framed?: boolean
}

/**
 * Renders a Figma screen exported to editable React/CSS layers.
 *
 * The screen has a fixed native pixel size (e.g. 375×812) but the
 * wrapper applies CSS `transform: scale(...)` based on the current
 * viewport width via `scaleFor`. iOS safe-area + bottom-nav padding
 * are added so content doesn't crop or hide under chrome.
 */
export default function EditableFigmaScreenRenderer({ screen, overrides, framed = true }: Props) {
  const patched = overrides ? applyOverrides(screen, overrides) : screen

  // Track viewport width to drive scale. SSR-safe initial value.
  const [viewportW, setViewportW] = useState<number>(() =>
    typeof window === 'undefined' ? screen.width : window.innerWidth,
  )
  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scale = scaleFor(viewportW, screen.width)

  const stage = (
    <div
      className="relative overflow-hidden bg-white"
      style={
        {
          width: patched.width,
          height: patched.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        } as CSSProperties
      }
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

  // Wrapper handles safe-area + bottom-nav clearance. The scaled stage
  // takes scale × native-height vertical space.
  const scaledHeight = patched.height * scale
  const wrapper = (
    <div
      className="mx-auto"
      style={{
        width: patched.width,
        height: scaledHeight,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: '96px', // clearance for KitBottomNav
      }}
    >
      {stage}
    </div>
  )

  if (!framed) return wrapper

  return (
    <div className="overflow-hidden rounded-kit-frame bg-white shadow-kit-frame ring-1 ring-black/5">
      {stage}
    </div>
  )
}
