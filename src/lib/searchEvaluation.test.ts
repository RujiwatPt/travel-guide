import { describe, expect, it } from 'vitest'
import { ENTRIES } from '../data/seed'
import {
  mockIntentClassifierProvider,
  rankEntriesForIntent,
  rankEntriesForIntentWithHints,
  shouldUsePlanMode,
} from './intentSearch'
import { SEARCH_EVALUATION_CASES } from './searchEvaluationCases'

const planCases = SEARCH_EVALUATION_CASES.filter((testCase) => testCase.expectedMode === 'plan')
const searchCases = SEARCH_EVALUATION_CASES.filter((testCase) => testCase.expectedMode === 'search')
const mockHintQueries = searchCases.filter((testCase) => testCase.expectedReasonSubstring?.startsWith('ai '))

describe('search evaluation set', () => {
  it('keeps plan-mode prompts routed to plan mode', () => {
    for (const testCase of planCases) {
      expect(shouldUsePlanMode(testCase.query), testCase.notes).toBe(true)
    }
  })

  it('keeps search-mode prompts out of plan mode', () => {
    for (const testCase of searchCases) {
      expect(shouldUsePlanMode(testCase.query), testCase.notes).toBe(false)
    }
  })

  it('keeps search-mode cases sensible with AI hints', async () => {
    for (const testCase of searchCases) {
      const results = await rankEntriesForIntentWithHints(
        testCase.query,
        ENTRIES,
        mockIntentClassifierProvider,
      )

      if (testCase.query === 'zzqv mystery phrase') {
        expect(results, testCase.notes).toEqual([])
        continue
      }

      expect(results.length, testCase.notes).toBeGreaterThan(0)

      const window = testCase.topWindow ?? 3
      const topResults = results.slice(0, window)
      const topIds = topResults.map((result) => result.entry.id)
      const topCategories = topResults.map((result) => result.entry.category)

      if (testCase.expectedTopId) {
        expect(topIds, testCase.notes).toContain(testCase.expectedTopId)
      }

      if (testCase.expectedTopIds) {
        for (const expectedTopId of testCase.expectedTopIds) {
          expect(topIds, `${testCase.notes} (${expectedTopId})`).toContain(expectedTopId)
        }
      }

      if (testCase.expectedTopCategories) {
        for (const expectedCategory of testCase.expectedTopCategories) {
          expect(topCategories, `${testCase.notes} (${expectedCategory})`).toContain(expectedCategory)
        }
      }

      if (testCase.expectedReasonSubstring) {
        const topReasonText = topResults
          .flatMap((result) => result.matchedReasons)
          .join(' | ')
        expect(topReasonText, testCase.notes).toContain(testCase.expectedReasonSubstring)
      }
    }
  })

  it('does not let AI hints make known search cases worse', async () => {
    for (const testCase of mockHintQueries) {
      const deterministicResults = rankEntriesForIntent(testCase.query, ENTRIES)
      const hintedResults = await rankEntriesForIntentWithHints(
        testCase.query,
        ENTRIES,
        mockIntentClassifierProvider,
      )

      expect(hintedResults.length, testCase.notes).toBeGreaterThan(0)

      if (testCase.expectedTopId) {
        const deterministicTopIds = deterministicResults.slice(0, 3).map((result) => result.entry.id)
        const hintedTopIds = hintedResults.slice(0, 3).map((result) => result.entry.id)

        expect(deterministicTopIds, testCase.notes).toContain(testCase.expectedTopId)
        expect(hintedTopIds, testCase.notes).toContain(testCase.expectedTopId)
      }

      if (testCase.expectedTopCategories) {
        const hintedTopCategories = hintedResults
          .slice(0, testCase.topWindow ?? 3)
          .map((result) => result.entry.category)

        expect(hintedTopCategories, testCase.notes).toEqual(
          expect.arrayContaining(testCase.expectedTopCategories),
        )
      }

      const hintedReasonText = hintedResults[0]?.matchedReasons.join(' | ') ?? ''
      expect(hintedReasonText, testCase.notes).toContain('ai ')
    }
  })

  it('keeps the civet coffee fallback stable with the evaluation data', async () => {
    const results = await rankEntriesForIntentWithHints(
      'civet coffee farm',
      ENTRIES,
      mockIntentClassifierProvider,
    )

    expect(results[0]?.entry.id).toBe('bluegold-coffee')
    expect(results[0]?.matchedReasons).toContain('matched search text')
  })
})
