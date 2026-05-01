import { describe, expect, it } from 'vitest'
import { ENTRIES } from '../data/seed'
import {
  mockIntentClassifierProvider,
  rankEntriesForIntent,
  rankEntriesForIntentWithHints,
  shouldUsePlanMode,
  type IntentClassifierProvider,
} from './intentSearch'

describe('rankEntriesForIntent', () => {
  it('routes clear itinerary prompts to plan mode', () => {
    expect(
      shouldUsePlanMode('I have one afternoon, I love food and history'),
    ).toBe(true)
  })

  it('routes English birthday plan prompts to plan mode', () => {
    expect(shouldUsePlanMode('I was born on Sunday')).toBe(true)
    expect(
      shouldUsePlanMode('I was born on Sunday — what is my birthday temple?'),
    ).toBe(true)
  })

  it('keeps blessing-style searches out of plan mode', () => {
    expect(shouldUsePlanMode('ไหว้พระ ขอพร')).toBe(false)
  })

  it('keeps Thai birthday-stupa search phrases out of plan mode', () => {
    expect(shouldUsePlanMode('พระธาตุประจำวันเกิด')).toBe(false)
    expect(shouldUsePlanMode('เกิดวันอาทิตย์')).toBe(false)
  })

  it('ranks spiritual and temple entries near the top for blessing intent', () => {
    const results = rankEntriesForIntent('ไหว้พระ ขอพร', ENTRIES)
    const topIds = results.slice(0, 4).map((result) => result.entry.id)

    expect(topIds).toContain('wat-phra-that-phanom')
    expect(topIds).toContain('naga-statue')
    expect(topIds).toContain('phra-that-renu')
    expect(results[0].entry.vibe_tags).toContain('spiritual')
    expect(results[0].matchedReasons.length).toBeGreaterThan(0)
  })

  it('ranks Wat Phra That Phanom first for fertility blessing intent', () => {
    const results = rankEntriesForIntent('ขอลูก', ENTRIES)

    expect(results[0]?.entry.id).toBe('wat-phra-that-phanom')
    expect(results[0]?.score).toBeGreaterThan(results[1]?.score ?? 0)
  })

  it('ranks food-related entries before unrelated places for Vietnamese food intent', () => {
    const results = rankEntriesForIntent('ของกิน อาหารเวียดนาม', ENTRIES)
    const topIds = results.slice(0, 3).map((result) => result.entry.id)
    const templeIndex = results.findIndex((result) => result.entry.category === 'temple')
    const firstFoodIndex = results.findIndex((result) =>
      ['food', 'cafe', 'market'].includes(result.entry.category),
    )

    expect(topIds).toContain('pho-sawan')
    expect(results[0].entry.category).toBe('food')
    expect(firstFoodIndex).toBeGreaterThanOrEqual(0)
    expect(templeIndex === -1 || firstFoodIndex < templeIndex).toBe(true)
  })

  it('returns no ranked results for an empty query', () => {
    expect(rankEntriesForIntent('', ENTRIES)).toEqual([])
    expect(rankEntriesForIntent('   ', ENTRIES)).toEqual([])
  })

  it('uses fallback text relevance for unknown queries without throwing', () => {
    const results = rankEntriesForIntent('civet coffee farm', ENTRIES)

    expect(results[0]?.entry.id).toBe('bluegold-coffee')
    expect(results[0]?.matchedReasons).toContain('matched search text')
  })

  it('keeps deterministic results unchanged when no AI hints are returned', async () => {
    const noHintProvider: IntentClassifierProvider = {
      async classifyIntent() {
        return null
      },
    }

    const deterministicResults = rankEntriesForIntent('ไหว้พระ ขอพร', ENTRIES)
    const hintedResults = await rankEntriesForIntentWithHints(
      'ไหว้พระ ขอพร',
      ENTRIES,
      noHintProvider,
    )

    expect(hintedResults).toEqual(deterministicResults)
  })

  it('uses mock AI hints to annotate and boost Thai ranking results', async () => {
    const deterministicResults = rankEntriesForIntent('ของกิน อาหารเวียดนาม', ENTRIES)
    const hintedResults = await rankEntriesForIntentWithHints(
      'ของกิน อาหารเวียดนาม',
      ENTRIES,
      mockIntentClassifierProvider,
    )

    expect(hintedResults[0]?.entry.id).toBe('pho-sawan')
    expect(hintedResults[0]?.score).toBeGreaterThan(deterministicResults[0]?.score ?? 0)
    expect(hintedResults[0]?.matchedReasons).toContain('ai food_trip hint')
  })

  it('falls back to deterministic results if the provider throws', async () => {
    const failingProvider: IntentClassifierProvider = {
      async classifyIntent() {
        throw new Error('mock provider failure')
      },
    }

    const deterministicResults = rankEntriesForIntent('ขอลูก', ENTRIES)
    const hintedResults = await rankEntriesForIntentWithHints(
      'ขอลูก',
      ENTRIES,
      failingProvider,
    )

    expect(hintedResults).toEqual(deterministicResults)
  })

  it('does not throw for unknown queries when using the async wrapper', async () => {
    await expect(
      rankEntriesForIntentWithHints(
        'mystery riverside pastry',
        ENTRIES,
        mockIntentClassifierProvider,
      ),
    ).resolves.toEqual(rankEntriesForIntent('mystery riverside pastry', ENTRIES))
  })
})
