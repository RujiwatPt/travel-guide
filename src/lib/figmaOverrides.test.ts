import { describe, expect, it } from 'vitest'
import { applyOverrides } from './figmaOverrides'
import type { EditableFigmaScreen } from '../figmaEditableData'

function makeScreen(layers: EditableFigmaScreen['layers'] = []): EditableFigmaScreen {
  return {
    id: 'test-screen',
    name: 'Test',
    width: 375,
    height: 812,
    layers,
  }
}

describe('applyOverrides', () => {
  it('returns the screen unchanged when overrides is empty', () => {
    const screen = makeScreen([
      { kind: 'text', name: 'Title', text: 'Hello', style: { left: '10px' } },
    ])
    const result = applyOverrides(screen, {})
    expect(result.layers[0].text).toBe('Hello')
  })

  it("replaces a layer's text when its name matches an override", () => {
    const screen = makeScreen([
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
    ])
    const result = applyOverrides(screen, { Title: { text: 'Nakhon Phanom!' } })
    expect(result.layers[0].text).toBe('Nakhon Phanom!')
  })

  it('leaves other layers untouched when overriding only one', () => {
    const screen = makeScreen([
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
      { kind: 'text', name: 'Subtitle', text: 'Ready to Explore', style: {} },
    ])
    const result = applyOverrides(screen, { Title: { text: 'Nakhon Phanom!' } })
    expect(result.layers[1].text).toBe('Ready to Explore')
  })

  it("replaces a layer's background image URL when imageSrc override is set", () => {
    const screen = makeScreen([
      {
        kind: 'shape',
        name: 'HeroPhoto',
        style: { background: 'url(/figma-assets-small/01-fuji.jpg) center/cover' },
      },
    ])
    const result = applyOverrides(screen, {
      HeroPhoto: { imageSrc: '/nkp/phra-that-phanom.jpg' },
    })
    expect(result.layers[0].style.background).toContain('/nkp/phra-that-phanom.jpg')
    expect(result.layers[0].style.background).not.toContain('fuji')
  })

  it('applies multiple overrides — text + image — in one call', () => {
    const screen = makeScreen([
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
      {
        kind: 'shape',
        name: 'HeroPhoto',
        style: { background: 'url(/old.jpg) center/cover' },
      },
    ])
    const result = applyOverrides(screen, {
      Title: { text: 'Nakhon Phanom!' },
      HeroPhoto: { imageSrc: '/new.jpg' },
    })
    expect(result.layers[0].text).toBe('Nakhon Phanom!')
    expect(result.layers[1].style.background).toContain('/new.jpg')
  })

  it('silently ignores layer names not present in the screen', () => {
    const screen = makeScreen([
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
    ])
    expect(() =>
      applyOverrides(screen, { NotARealLayer: { text: 'oops' } }),
    ).not.toThrow()
  })

  it('does not mutate the input screen', () => {
    const original = makeScreen([
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
    ])
    const snapshot = JSON.parse(JSON.stringify(original))
    applyOverrides(original, { Title: { text: 'Nakhon Phanom!' } })
    expect(original).toEqual(snapshot)
  })

  it('hides a layer from the output when hideLayer is true', () => {
    const screen = makeScreen([
      { kind: 'text', name: 'StatusBar', text: '9:54', style: {} },
      { kind: 'text', name: 'Title', text: 'Tokyo!', style: {} },
    ])
    const result = applyOverrides(screen, { StatusBar: { hideLayer: true } })
    expect(result.layers).toHaveLength(1)
    expect(result.layers[0].name).toBe('Title')
  })

  it("replaces backgroundImage style (camelCase) when imageSrc override is set on a layer using backgroundImage", () => {
    const screen = makeScreen([
      {
        kind: 'shape',
        name: 'PhotoCard',
        style: { backgroundImage: 'url(/figma-assets-small/19-9cc5e3d432.jpg)', backgroundSize: 'cover' },
      },
    ])
    const result = applyOverrides(screen, {
      PhotoCard: { imageSrc: '/nkp/phanom.jpg' },
    })
    expect(String(result.layers[0].style.backgroundImage)).toContain('/nkp/phanom.jpg')
  })

  it('targets the Nth occurrence of a layer name when key uses #index notation', () => {
    const screen = makeScreen([
      { kind: 'shape', name: 'image', style: { backgroundImage: 'url(/old-1.jpg)' } },
      { kind: 'shape', name: 'image', style: { backgroundImage: 'url(/old-2.jpg)' } },
    ])
    const result = applyOverrides(screen, {
      'image#0': { imageSrc: '/new-first.jpg' },
      'image#1': { imageSrc: '/new-second.jpg' },
    })
    expect(String(result.layers[0].style.backgroundImage)).toContain('/new-first.jpg')
    expect(String(result.layers[1].style.backgroundImage)).toContain('/new-second.jpg')
  })
})
