import { describe, expect, it } from 'vitest'
import type { ChatGuardResult } from './chatGuard'
import { decideChatResponse } from './chatResponsePolicy'

function guard(overrides: Partial<ChatGuardResult>): ChatGuardResult {
  return {
    intent: 'travel_search',
    language: 'th',
    normalizedQuery: 'query',
    reason: 'test',
    ...overrides,
  }
}

describe('decideChatResponse', () => {
  it('returns Thai off-topic guidance with no cards', () => {
    const result = decideChatResponse({
      guard: guard({ intent: 'off_topic', language: 'th' }),
      searchResultCount: 0,
      topScore: 0,
    })
    expect(result.shouldShowCards).toBe(false)
    expect(result.text).toContain('ช่วยเรื่องเที่ยวนครพนมเป็นหลัก')
  })

  it('returns Thai pause response with no cards', () => {
    const result = decideChatResponse({
      guard: guard({ intent: 'pause', language: 'th' }),
      searchResultCount: 0,
      topScore: 0,
    })
    expect(result.shouldShowCards).toBe(false)
    expect(result.text).toContain('พิมพ์ต่อได้เลย')
  })

  it('returns Thai clarification for unclear intent', () => {
    const result = decideChatResponse({
      guard: guard({ intent: 'unclear', language: 'th' }),
      searchResultCount: 0,
      topScore: 0,
    })
    expect(result.shouldShowCards).toBe(false)
    expect(result.text).toContain('ผมยังไม่แน่ใจ')
  })

  it('returns tentative blessing wording with cards for medium confidence', () => {
    const result = decideChatResponse({
      guard: guard({ language: 'th', travelHint: 'blessing' }),
      searchResultCount: 3,
      topScore: 60,
    })
    expect(result.confidence).toBe('medium')
    expect(result.shouldShowCards).toBe(true)
    expect(result.text).toContain('สถานที่ขอพรเรื่องบุตรหรือสายบุญ')
  })

  it('returns grounded high-confidence wording for strong matches', () => {
    const result = decideChatResponse({
      guard: guard({ language: 'th', travelHint: 'food' }),
      searchResultCount: 4,
      topScore: 82,
    })
    expect(result.confidence).toBe('high')
    expect(result.shouldShowCards).toBe(true)
    expect(result.text).toContain('ตรงกับคำขอของคุณ')
    expect(result.text).not.toContain('strong match')
  })

  it('returns clarification and no cards for low confidence without hint', () => {
    const result = decideChatResponse({
      guard: guard({ language: 'th', travelHint: undefined }),
      searchResultCount: 2,
      topScore: 22,
    })
    expect(result.confidence).toBe('low')
    expect(result.shouldShowCards).toBe(false)
    expect(result.text).toContain('ผมยังไม่แน่ใจ')
  })

  it('returns English guidance for off-topic queries', () => {
    const result = decideChatResponse({
      guard: guard({ intent: 'off_topic', language: 'en' }),
      searchResultCount: 0,
      topScore: 0,
    })
    expect(result.shouldShowCards).toBe(false)
    expect(result.text).toContain('I mainly help with Nakhon Phanom travel')
  })
})
