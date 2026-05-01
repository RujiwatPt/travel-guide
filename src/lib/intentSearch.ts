import type { Entry } from '../types'

/**
 * Ranked search result for an intent query, including why the entry matched.
 */
export type RankedEntry = {
  entry: Entry
  score: number
  matchedReasons: string[]
}

/** Canonical intent ids shared by deterministic and AI-assisted ranking. */
export type IntentId =
  | 'general_blessing'
  | 'fertility_blessing'
  | 'birthday_stupa'
  | 'riverside_evening'
  | 'food_trip'

/** Provider-neutral hint payload that can nudge deterministic ranking. */
export type AiIntentHint = {
  intentIds: IntentId[]
  confidence: number
  matchedTerms: string[]
  categoryHints?: Entry['category'][]
  tagHints?: {
    vibeTags?: string[]
    cuisineTags?: string[]
    timeTags?: string[]
  }
  provider: 'mock' | string
}

/** Async classifier contract for future server-side or mock intent providers. */
export type IntentClassifierProvider = {
  classifyIntent(query: string): Promise<AiIntentHint | null>
}

type IntentGroup = {
  id: IntentId
  label: string
  keywords: string[]
  entryBoosts?: Record<string, number>
  categories?: Partial<Record<Entry['category'], number>>
  vibeTags?: Record<string, number>
  cuisineTags?: Record<string, number>
  timeTags?: Record<string, number>
}

// Heuristic boosts derived from the seeded Nakhon Phanom intent groups.
const INTENT_GROUPS: IntentGroup[] = [
  {
    id: 'general_blessing',
    label: 'blessing intent',
    keywords: [
      'ไหว้พระ',
      'ขอพร',
      'ทำบุญ',
      'เสริมดวง',
      'สายมู',
      'blessing',
      'pray',
      'merit',
      'temple',
      'spiritual',
    ],
    entryBoosts: {
      'wat-phra-that-phanom': 36,
      'naga-statue': 30,
      'phra-that-renu': 26,
    },
    categories: { temple: 20, landmark: 8, nature: 4 },
    vibeTags: { spiritual: 22, 'birthday-stupa': 16, iconic: 8 },
  },
  {
    id: 'fertility_blessing',
    label: 'fertility blessing intent',
    keywords: ['ขอลูก', 'ขอมีบุตร', 'อยากมีลูก', 'ขอพรเรื่องลูก', 'fertility', 'child', 'baby'],
    entryBoosts: {
      'wat-phra-that-phanom': 80,
      'naga-statue': 18,
      'phra-that-renu': 14,
    },
    categories: { temple: 18, landmark: 6 },
    vibeTags: { spiritual: 20, 'birthday-stupa': 10 },
  },
  {
    id: 'birthday_stupa',
    label: 'birthday stupa intent',
    keywords: [
      'พระธาตุประจำวันเกิด',
      'วันอาทิตย์',
      'วันจันทร์',
      'วันอังคาร',
      'วันพุธ',
      'วันพฤหัส',
      'วันศุกร์',
      'วันเสาร์',
      'birthday stupa',
      'born on',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ],
    entryBoosts: {
      'wat-phra-that-phanom': 32,
      'phra-that-renu': 30,
      'phra-that-si-khun': 30,
      'phra-that-mahachai': 30,
      'phra-that-marukkha-nakhon': 30,
      'phra-that-prasit': 30,
      'phra-that-tha-uthen': 30,
      'phra-that-nakhon': 30,
    },
    categories: { temple: 16 },
    vibeTags: {
      'birthday-stupa': 34,
      spiritual: 14,
      'birthday-sunday': 16,
      'birthday-monday': 16,
      'birthday-tuesday': 16,
      'birthday-wednesday-day': 16,
      'birthday-wednesday-night': 16,
      'birthday-thursday': 16,
      'birthday-friday': 16,
      'birthday-saturday': 16,
    },
  },
  {
    id: 'riverside_evening',
    label: 'riverside evening intent',
    keywords: [
      'ริมโขง',
      'เดินเล่น',
      'พระอาทิตย์ตก',
      'กลางคืน',
      'mekong',
      'riverside',
      'sunset',
      'evening',
      'night',
      'walk',
    ],
    entryBoosts: {
      'naga-statue': 34,
      'indochina-walking-street': 28,
      'river-vibes-cafe': 22,
      'phra-that-nakhon': 14,
    },
    categories: { landmark: 12, market: 12, cafe: 8 },
    vibeTags: { 'photo-spot': 10, lively: 8, iconic: 8 },
    timeTags: { sunset: 22, evening: 18, 'late-night': 10, 'weekend-only': 8 },
  },
  {
    id: 'food_trip',
    label: 'food intent',
    keywords: [
      'ของกิน',
      'ร้านดัง',
      'อาหารเวียดนาม',
      'อาหารเช้า',
      'กิน',
      'food',
      'eat',
      'restaurant',
      'vietnamese food',
      'breakfast',
      'must eat',
    ],
    entryBoosts: {
      'pho-sawan': 34,
      'indochina-walking-street': 22,
      'river-vibes-cafe': 12,
    },
    categories: { food: 34, cafe: 24, market: 18, shop: 4 },
    vibeTags: { 'local-favourite': 12, lively: 6 },
    cuisineTags: { vietnamese: 24, thai: 10, isan: 10, coffee: 8, dessert: 8 },
    timeTags: { morning: 8, evening: 6, 'weekend-only': 4 },
  },
]

// Phrases that should preserve the existing plan demo flow instead of ranked search.
const PLAN_MODE_KEYWORDS = [
  'i have one afternoon',
  'one afternoon',
  'one day',
  'half day',
  'i was born',
  'born on',
  'my birthday temple',
  'what is my birthday temple',
  'plan',
  'itinerary',
  'route',
  'trip',
  'จัดทริป',
  'วางแผน',
  'มีเวลา',
  'ครึ่งวัน',
  'หนึ่งวัน',
]

/** Normalizes user and entry text for simple multilingual substring matching. */
function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s'-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Flattens searchable entry fields into one normalized search string. */
function entrySearchText(entry: Entry): string {
  return normalize(
    [
      entry.id,
      entry.name_en,
      entry.name_th,
      entry.description_en,
      entry.description_th ?? '',
      entry.why_visit_en,
      entry.why_visit_th ?? '',
      entry.category,
      entry.type,
      entry.vibe_tags.join(' '),
      entry.cuisine_tags.join(' '),
      entry.time_tags.join(' '),
    ].join(' '),
  )
}

function addReason(reasons: Set<string>, reason: string) {
  if (reasons.size < 4) reasons.add(reason)
}

/** Adds one short reason while keeping AI-specific annotations visible in the cap. */
function addReasonToList(reasons: string[], reason: string) {
  if (reasons.includes(reason)) return
  if (reasons.length < 4) {
    reasons.push(reason)
    return
  }
  if (reason.startsWith('ai ') && reasons.some((existing) => existing.startsWith('ai '))) {
    return
  }
  reasons[reasons.length - 1] = reason
}

/** Returns the configured intent groups whose keywords appear in the query. */
function detectIntentGroups(query: string): IntentGroup[] {
  const normalizedQuery = normalize(query)
  return INTENT_GROUPS.filter((group) =>
    group.keywords.some((keyword) => normalizedQuery.includes(normalize(keyword))),
  )
}

/**
 * Sends clearly itinerary-like prompts to the existing plan flow.
 * Search-like prompts stay on the ranked entry path.
 */
export function shouldUsePlanMode(query: string): boolean {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return false

  return PLAN_MODE_KEYWORDS.some((keyword) =>
    normalizedQuery.includes(normalize(keyword)),
  )
}

/** Scores direct text overlap between the query and an entry's searchable fields. */
function scoreTextMatch(query: string, entry: Entry, reasons: Set<string>): number {
  const normalizedQuery = normalize(query)
  const searchText = entrySearchText(entry)
  let score = 0

  if (searchText.includes(normalizedQuery)) {
    score += 24
    addReason(reasons, 'direct phrase match')
  }

  const tokens = normalizedQuery.split(' ').filter((token) => token.length >= 2)
  let tokenMatches = 0
  for (const token of tokens) {
    if (searchText.includes(token)) tokenMatches += 1
  }
  if (tokenMatches > 0) {
    score += tokenMatches * 5
    addReason(reasons, 'matched search text')
  }

  return score
}

/** Applies intent-specific boosts using entry ids, categories, and tag dimensions. */
function scoreIntentMatch(group: IntentGroup, entry: Entry, reasons: Set<string>): number {
  let score = 0

  const entryBoost = group.entryBoosts?.[entry.id] ?? 0
  if (entryBoost > 0) {
    score += entryBoost
    addReason(reasons, group.label)
  }

  const categoryBoost = group.categories?.[entry.category] ?? 0
  if (categoryBoost > 0) {
    score += categoryBoost
    addReason(reasons, `${entry.category} category`)
  }

  for (const tag of entry.vibe_tags) {
    const boost = group.vibeTags?.[tag] ?? 0
    if (boost > 0) {
      score += boost
      addReason(reasons, `${tag} vibe`)
    }
  }

  for (const tag of entry.cuisine_tags) {
    const boost = group.cuisineTags?.[tag] ?? 0
    if (boost > 0) {
      score += boost
      addReason(reasons, `${tag} cuisine`)
    }
  }

  for (const tag of entry.time_tags) {
    const boost = group.timeTags?.[tag] ?? 0
    if (boost > 0) {
      score += boost
      addReason(reasons, `${tag} timing`)
    }
  }

  return score
}

/** Applies small additive boosts from AI intent hints to an already-ranked entry. */
function scoreAiHintIntentMatch(
  hint: AiIntentHint,
  entry: Entry,
  reasons: string[],
): number {
  let score = 0
  const confidence = Math.max(0, Math.min(1, hint.confidence || 0))

  for (const intentId of hint.intentIds) {
    const group = INTENT_GROUPS.find((candidate) => candidate.id === intentId)
    if (!group) continue

    const entryBoost = group.entryBoosts?.[entry.id] ?? 0
    if (entryBoost > 0) {
      score += Math.round(entryBoost * 0.2 * confidence)
      addReasonToList(reasons, `ai ${intentId} hint`)
    }

    const categoryBoost = group.categories?.[entry.category] ?? 0
    if (categoryBoost > 0) {
      score += Math.round(categoryBoost * 0.15 * confidence)
      addReasonToList(reasons, `ai ${intentId} hint`)
    }

    if (
      entry.vibe_tags.some((tag) => (group.vibeTags?.[tag] ?? 0) > 0) ||
      entry.cuisine_tags.some((tag) => (group.cuisineTags?.[tag] ?? 0) > 0) ||
      entry.time_tags.some((tag) => (group.timeTags?.[tag] ?? 0) > 0)
    ) {
      score += Math.round(4 * confidence)
      addReasonToList(reasons, `ai ${intentId} hint`)
    }
  }

  if (hint.categoryHints?.includes(entry.category)) {
    score += Math.round(6 * confidence)
    addReasonToList(reasons, `ai ${entry.category} category`)
  }

  if (hint.tagHints?.vibeTags?.some((tag) => entry.vibe_tags.includes(tag))) {
    score += Math.round(4 * confidence)
    addReasonToList(reasons, 'ai vibe hint')
  }

  if (hint.tagHints?.cuisineTags?.some((tag) => entry.cuisine_tags.includes(tag))) {
    score += Math.round(4 * confidence)
    addReasonToList(reasons, 'ai cuisine hint')
  }

  if (hint.tagHints?.timeTags?.some((tag) => entry.time_tags.includes(tag))) {
    score += Math.round(4 * confidence)
    addReasonToList(reasons, 'ai time hint')
  }

  return score
}

/**
 * Ranks mixed Entries for an activity-style query using deterministic intent rules
 * plus text relevance from the current seed data.
 */
export function rankEntriesForIntent(query: string, entries: Entry[]): RankedEntry[] {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const intentGroups = detectIntentGroups(trimmedQuery)
  const hasFoodIntent = intentGroups.some((group) => group.id === 'food_trip')
  const hasSpiritualIntent = intentGroups.some((group) =>
    ['general_blessing', 'fertility_blessing', 'birthday_stupa'].includes(group.id),
  )

  return entries
    .map((entry, index) => {
      const reasons = new Set<string>()
      let score = scoreTextMatch(trimmedQuery, entry, reasons)

      for (const group of intentGroups) {
        score += scoreIntentMatch(group, entry, reasons)
      }

      if (hasFoodIntent && !hasSpiritualIntent && entry.category === 'temple') {
        score -= 20
      }

      if (score <= 0) return null

      return {
        entry,
        score,
        matchedReasons: [...reasons],
        index,
      }
    })
    .filter(
      (result): result is RankedEntry & { index: number } =>
        result != null && result.score > 0,
    )
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ entry, score, matchedReasons }) => ({
      entry,
      score: Math.round(score),
      matchedReasons,
    }))
}

/**
 * Mock AI-ready provider that emits typed intent hints for known Thai search phrases.
 * It exists only to prove the async hint interface without any network calls.
 */
export const mockIntentClassifierProvider: IntentClassifierProvider = {
  async classifyIntent(query) {
    const normalizedQuery = normalize(query)
    if (!normalizedQuery) return null

    if (
      normalizedQuery.includes(normalize('ไหว้พระ')) &&
      normalizedQuery.includes(normalize('ขอพร'))
    ) {
      return {
        intentIds: ['general_blessing'],
        confidence: 0.88,
        matchedTerms: ['ไหว้พระ', 'ขอพร'],
        categoryHints: ['temple', 'landmark'],
        tagHints: { vibeTags: ['spiritual', 'birthday-stupa'] },
        provider: 'mock',
      }
    }

    if (normalizedQuery.includes(normalize('ขอลูก'))) {
      return {
        intentIds: ['fertility_blessing'],
        confidence: 0.96,
        matchedTerms: ['ขอลูก'],
        categoryHints: ['temple'],
        tagHints: { vibeTags: ['spiritual'] },
        provider: 'mock',
      }
    }

    if (
      normalizedQuery.includes(normalize('ของกิน')) &&
      normalizedQuery.includes(normalize('อาหารเวียดนาม'))
    ) {
      return {
        intentIds: ['food_trip'],
        confidence: 0.91,
        matchedTerms: ['ของกิน', 'อาหารเวียดนาม'],
        categoryHints: ['food', 'cafe', 'market'],
        tagHints: { cuisineTags: ['vietnamese'] },
        provider: 'mock',
      }
    }

    if (normalizedQuery.includes(normalize('พระธาตุประจำวันเกิด'))) {
      return {
        intentIds: ['birthday_stupa'],
        confidence: 0.9,
        matchedTerms: ['พระธาตุประจำวันเกิด'],
        categoryHints: ['temple'],
        tagHints: { vibeTags: ['birthday-stupa', 'spiritual'] },
        provider: 'mock',
      }
    }

    if (
      normalizedQuery.includes(normalize('ริมโขง')) &&
      normalizedQuery.includes(normalize('เดินเล่น'))
    ) {
      return {
        intentIds: ['riverside_evening'],
        confidence: 0.84,
        matchedTerms: ['ริมโขง', 'เดินเล่น'],
        categoryHints: ['landmark', 'market', 'cafe'],
        tagHints: { vibeTags: ['photo-spot', 'iconic'], timeTags: ['sunset', 'evening'] },
        provider: 'mock',
      }
    }

    return null
  },
}

/**
 * Async wrapper that preserves deterministic search while allowing provider-based
 * intent hints to add small ranking boosts and matched reasons.
 * Provider failures or missing hints return deterministic results unchanged.
 */
export async function rankEntriesForIntentWithHints(
  query: string,
  entries: Entry[],
  provider: IntentClassifierProvider,
): Promise<RankedEntry[]> {
  const baseResults = rankEntriesForIntent(query, entries)

  try {
    const hint = await provider.classifyIntent(query)
    if (!hint) return baseResults

    return baseResults
      .map((result, index) => {
        const matchedReasons = [...result.matchedReasons]
        const boostedScore = result.score + scoreAiHintIntentMatch(hint, result.entry, matchedReasons)

        return {
          ...result,
          index,
          score: boostedScore,
          matchedReasons,
        }
      })
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(({ index: _index, ...result }) => result)
  } catch {
    return baseResults
  }
}
