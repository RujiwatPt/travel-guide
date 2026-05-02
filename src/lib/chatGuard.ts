export type ChatIntent =
  | 'travel_search'
  | 'travel_plan'
  | 'pause'
  | 'off_topic'
  | 'unclear'

export type ChatLanguage = 'th' | 'en'

export type TravelHint =
  | 'blessing'
  | 'food'
  | 'cafe'
  | 'nature'
  | 'photo'
  | 'family'
  | 'hidden_gem'
  | 'general'

export type ChatGuardResult = {
  intent: ChatIntent
  language: ChatLanguage
  normalizedQuery: string
  travelHint?: TravelHint
  reason: string
}

type KeywordGroup = {
  hint: TravelHint
  keywords: string[]
}

const LATIN_WORD_PATTERN = /[a-z]/

const PAUSE_PATTERNS = [
  'เดี๋ยวนะ',
  'เดียวนะ',
  'รอก่อน',
  'แป๊บ',
  'แปป',
  'wait',
  'hold on',
  'hmm',
]

const OFF_TOPIC_PATTERNS = [
  'ไก่กับไข่อะไรเกิดก่อน',
  'วันนี้วันอะไร',
  'เขียนโค้ด python ให้หน่อย',
  'python',
  'หวยออกอะไร',
  'เล่าเรื่องตลกให้ฟัง',
  'joke',
  'what day is it',
]

const PLAN_PATTERNS = [
  'วางแผนเที่ยว',
  'วางแผน',
  'ครึ่งวัน',
  '1 วัน',
  '1วัน',
  'หนึ่งวัน',
  'จัดทริป',
  'จัดแพลน',
  'เที่ยว 1 วัน',
  'เที่ยว1วัน',
  'plan my day',
  'trip plan',
  'itinerary',
  'i have one afternoon',
  'one afternoon',
  'half day',
  'one day',
]

const AMBIGUOUS_SHORT_MESSAGES = [
  'เอา',
  'อะไร',
  'ยังไง',
  'ต่อ',
  'ดีไหม',
]

const TRAVEL_KEYWORD_GROUPS: KeywordGroup[] = [
  {
    hint: 'blessing',
    keywords: [
      'ขอลูก',
      'ไหว้พระ',
      'ขอพร',
      'สายบุญ',
      'วัด',
      'temple',
      'blessing',
      'fertility',
      'merit',
      'spiritual',
    ],
  },
  {
    hint: 'food',
    keywords: [
      'ของอร่อย',
      'ร้านอาหาร',
      'อาหารเวียดนาม',
      'อาหารเช้า',
      'ของกิน',
      'กินอะไร',
      'food',
      'restaurant',
      'breakfast',
      'vietnamese',
    ],
  },
  {
    hint: 'cafe',
    keywords: ['คาเฟ่', 'กาแฟ', 'cafe', 'coffee'],
  },
  {
    hint: 'nature',
    keywords: ['ธรรมชาติ', 'แม่น้ำ', 'ภูเขา', 'nature', 'park'],
  },
  {
    hint: 'photo',
    keywords: ['ถ่ายรูป', 'จุดถ่ายรูป', 'วิวสวย', 'photo', 'photospot', 'photo spot'],
  },
  {
    hint: 'family',
    keywords: ['ครอบครัว', 'เด็ก', 'family'],
  },
  {
    hint: 'hidden_gem',
    keywords: ['hidden gem', 'ลับ', 'คนไม่เยอะ', 'ไม่แมส'],
  },
  {
    hint: 'general',
    keywords: ['เที่ยว', 'ที่เที่ยว', 'mekong', 'ริมโขง', 'riverside', 'นครพนม', 'nakhon phanom'],
  },
]

function normalizeQuery(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
}

function detectLanguage(query: string): ChatLanguage {
  return /[\u0E00-\u0E7F]/.test(query) ? 'th' : 'en'
}

function includesPattern(query: string, patterns: string[]): string | null {
  return (
    patterns.find((pattern) => matchesNormalizedPattern(query, normalizeQuery(pattern))) ?? null
  )
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesNormalizedPattern(query: string, pattern: string): boolean {
  if (!pattern) return false
  if (!LATIN_WORD_PATTERN.test(pattern)) {
    return query.includes(pattern)
  }

  const boundedPattern = new RegExp(`(^|[^a-z0-9])${escapeRegex(pattern)}($|[^a-z0-9])`)
  return boundedPattern.test(query)
}

function detectTravelHint(query: string): TravelHint | undefined {
  for (const group of TRAVEL_KEYWORD_GROUPS) {
    if (group.keywords.some((keyword) => matchesNormalizedPattern(query, normalizeQuery(keyword)))) {
      return group.hint
    }
  }
  return undefined
}

export function classifyChatIntent(query: string): ChatGuardResult {
  const normalizedQuery = normalizeQuery(query)
  const language = detectLanguage(normalizedQuery)

  if (!normalizedQuery) {
    return {
      intent: 'unclear',
      language,
      normalizedQuery,
      reason: 'empty query',
    }
  }

  const pauseMatch = includesPattern(normalizedQuery, PAUSE_PATTERNS)
  if (pauseMatch) {
    return {
      intent: 'pause',
      language,
      normalizedQuery,
      reason: `pause phrase: ${pauseMatch}`,
    }
  }

  const offTopicMatch = includesPattern(normalizedQuery, OFF_TOPIC_PATTERNS)
  if (offTopicMatch) {
    return {
      intent: 'off_topic',
      language,
      normalizedQuery,
      reason: `off-topic phrase: ${offTopicMatch}`,
    }
  }

  const planMatch = includesPattern(normalizedQuery, PLAN_PATTERNS)
  if (planMatch) {
    return {
      intent: 'travel_plan',
      language,
      normalizedQuery,
      travelHint: 'general',
      reason: `plan phrase: ${planMatch}`,
    }
  }

  const travelHint = detectTravelHint(normalizedQuery)
  if (travelHint) {
    return {
      intent: 'travel_search',
      language,
      normalizedQuery,
      travelHint,
      reason: `travel keyword for ${travelHint}`,
    }
  }

  const shortMatch = includesPattern(normalizedQuery, AMBIGUOUS_SHORT_MESSAGES)
  if (shortMatch || normalizedQuery.length <= 8) {
    return {
      intent: 'unclear',
      language,
      normalizedQuery,
      reason: shortMatch ? `ambiguous short phrase: ${shortMatch}` : 'short ambiguous query',
    }
  }

  return {
    intent: 'off_topic',
    language,
    normalizedQuery,
    reason: 'no travel signal detected',
  }
}
