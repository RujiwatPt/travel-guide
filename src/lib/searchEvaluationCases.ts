export type SearchEvaluationMode = 'search' | 'plan'

export type SearchEvaluationCase = {
  query: string
  expectedMode: SearchEvaluationMode
  expectedTopId?: string
  expectedTopIds?: string[]
  expectedTopCategories?: string[]
  expectedReasonSubstring?: string
  topWindow?: number
  notes: string
}

export const SEARCH_EVALUATION_CASES: SearchEvaluationCase[] = [
  {
    query: 'ไหว้พระ ขอพร',
    expectedMode: 'search',
    expectedTopIds: ['wat-phra-that-phanom', 'naga-statue', 'phra-that-renu'],
    expectedReasonSubstring: 'ai general_blessing hint',
    topWindow: 5,
    notes: 'Core blessing query should surface spiritual landmarks and temples near the top.',
  },
  {
    query: 'ขอลูก',
    expectedMode: 'search',
    expectedTopId: 'wat-phra-that-phanom',
    expectedReasonSubstring: 'ai fertility_blessing hint',
    notes: 'Fertility blessing query should keep Wat Phra That Phanom as the top result.',
  },
  {
    query: 'ของกิน อาหารเวียดนาม',
    expectedMode: 'search',
    expectedTopId: 'pho-sawan',
    expectedTopCategories: ['food', 'market'],
    expectedReasonSubstring: 'ai food_trip hint',
    topWindow: 3,
    notes: 'Food trip query should prioritize food-first results and keep the mock AI hint visible.',
  },
  {
    query: 'พระธาตุประจำวันเกิด',
    expectedMode: 'search',
    expectedTopIds: ['wat-phra-that-phanom', 'phra-that-renu'],
    expectedTopCategories: ['temple'],
    expectedReasonSubstring: 'ai birthday_stupa hint',
    topWindow: 5,
    notes: 'Birthday-stupa search should remain in search mode and keep temples near the top.',
  },
  {
    query: 'ริมโขง เดินเล่น',
    expectedMode: 'search',
    expectedTopIds: ['naga-statue', 'indochina-walking-street', 'river-vibes-cafe'],
    expectedTopCategories: ['landmark', 'market', 'cafe'],
    expectedReasonSubstring: 'ai riverside_evening hint',
    topWindow: 5,
    notes: 'Riverside evening search should surface walkable Mekong-adjacent results.',
  },
  {
    query: 'I have one afternoon, I love food and history',
    expectedMode: 'plan',
    notes: 'Existing itinerary demo prompt must stay in plan mode.',
  },
  {
    query: 'I was born on Sunday',
    expectedMode: 'plan',
    notes: 'English birthday-plan prompt must keep using plan mode.',
  },
  {
    query: 'civet coffee farm',
    expectedMode: 'search',
    expectedTopId: 'bluegold-coffee',
    expectedReasonSubstring: 'matched search text',
    notes: 'Fallback text relevance should still find the civet coffee entry.',
  },
  {
    query: 'zzqv mystery phrase',
    expectedMode: 'search',
    notes: 'Unknown query should not throw even when neither deterministic nor AI hints match.',
  },
]
