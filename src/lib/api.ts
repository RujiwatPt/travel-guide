import type { Entry, LiveStatus } from '../types'
import { ENTRIES as LOCAL_SEED } from '../data/seed'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || 'http://127.0.0.1:8000'
const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined)?.trim() || 'dev-local-key'

type ApiEntry = {
  id: string
  legacy_code: string
  type: 'activity' | 'place'
  category: string
  city?: string
  city_id?: string
  name_en: string
  name_th: string
  lat: number
  lng: number
  opening_hours_text?: string | null
  hours_confidence?: 'high' | 'medium' | 'low' | 'unknown'
  hours_source_type?: 'official' | 'facebook' | 'map_listing' | 'community' | 'unknown'
  hours_last_checked_at?: string | null
  contact_phone?: string | null
  facebook_url?: string | null
}

type ApiEntriesResponse = {
  city: string
  city_id?: string
  count: number
  items: ApiEntry[]
}

type ApiSearchItem = {
  entry_id: string
  legacy_code: string
  entity_type: 'activity' | 'place'
  category: string
  name: string
  score: number
  open_status?: 'open_now' | 'closing_soon' | 'closed' | 'unknown'
  hours_confidence?: 'high' | 'medium' | 'low' | 'unknown'
  retrieval_grade?: 'high' | 'medium' | 'low'
}

type ApiSearchResponse = {
  query: string
  city: string
  matched_intent: string
  intent_confidence: 'high' | 'medium' | 'low'
  entity_scope: 'activity_only' | 'food_only' | 'place_only' | 'mixed'
  results: ApiSearchItem[]
}

export type IntentSearchHit = {
  entryId: string
  name: string
  category: string
  score: number
  matchedIntent: string
  entityScope: ApiSearchResponse['entity_scope']
  openStatus?: ApiSearchItem['open_status']
  hoursConfidence?: ApiSearchItem['hours_confidence']
  retrievalGrade?: ApiSearchItem['retrieval_grade']
}

type ApiPlan = {
  query: string
  city_id: string
  generated_at: string
  start_time: string
  end_time: string
  total_duration_min: number
  rationale_en: string
  rationale_th: string
  stops: unknown[]
  route_geometry: { type: 'LineString'; coordinates: [number, number][] }
}

function emojiForCategory(category: string): string {
  const c = category.toLowerCase()
  if (c === 'food') return '🍜'
  if (c === 'cafe') return '☕'
  if (c === 'temple') return '🛕'
  if (c === 'nature') return '🌿'
  if (c === 'market') return '🛍️'
  if (c === 'museum') return '🏛️'
  if (c === 'landmark') return '📍'
  return '✨'
}

function parseLiveStatus(_confidence: ApiEntry['hours_confidence']): LiveStatus | null {
  return null
}

function normalizeName(s: string): string {
  return s
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveStableLocalId(api: ApiEntry): string {
  const th = normalizeName(api.name_th)
  const en = normalizeName(api.name_en)
  const hit = LOCAL_SEED.find((e) => {
    const eth = normalizeName(e.name_th)
    const een = normalizeName(e.name_en)
    return eth === th || een === en || eth.includes(th) || th.includes(eth) || een.includes(en) || en.includes(een)
  })
  return hit?.id ?? api.id
}

function normalizeCategory(input: string): Entry['category'] {
  const c = input.toLowerCase()
  if (c === 'food' || c === 'cafe' || c === 'landmark' || c === 'market' || c === 'museum' || c === 'temple' || c === 'nature' || c === 'workshop' || c === 'shop') {
    return c
  }
  return 'landmark'
}

function toFrontendEntry(api: ApiEntry): Entry {
  const hoursNote = api.opening_hours_text?.trim() || null
  const cityId = (api.city_id || api.city || 'nkp').toLowerCase()
  return {
    id: resolveStableLocalId(api),
    type: api.type,
    city_id: cityId,
    name_en: api.name_en,
    name_th: api.name_th,
    description_en: hoursNote ? `Opening hours: ${hoursNote}` : 'Curated listing from Nakhon Phanom dataset.',
    description_th: hoursNote ? `เวลาเปิด-ปิด: ${hoursNote}` : 'รายการสถานที่จากชุดข้อมูลนครพนม',
    why_visit_en: 'Recommended based on your selected travel intent.',
    why_visit_th: 'แนะนำตามเจตนาการเที่ยวที่คุณเลือก',
    lat: api.lat,
    lng: api.lng,
    category: normalizeCategory(api.category),
    emoji: emojiForCategory(api.category),
    vibe_tags: [],
    cuisine_tags: [],
    time_tags: [],
    setting: 'mixed',
    price_band: 'budget',
    photos: [],
    hours_weekly: null,
    duration_min: 45,
    price_min_thb: null,
    price_max_thb: null,
    owner_id: null,
    owner_edit_token: null,
    live_status: parseLiveStatus(api.hours_confidence),
    status_note: null,
    status_updated: api.hours_last_checked_at ?? null,
    hours_confidence: api.hours_confidence ?? 'unknown',
    hours_source_type: api.hours_source_type ?? 'unknown',
    hours_last_checked_at: api.hours_last_checked_at ?? null,
    contact_phone: api.contact_phone ?? null,
    facebook_url: api.facebook_url ?? null,
    data_source: 'imported',
  }
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  })
  if (!res.ok) throw new Error(`API request failed: ${res.status}`)
  return (await res.json()) as T
}

export async function fetchEntries(city = 'nkp'): Promise<Entry[]> {
  const data = await apiGet<ApiEntriesResponse>(`/api/v1/entries?city=${encodeURIComponent(city)}&limit=200`)
  return data.items.map(toFrontendEntry)
}

export async function fetchEntriesRaw(city = 'nkp'): Promise<ApiEntry[]> {
  const data = await apiGet<ApiEntriesResponse>(`/api/v1/entries?city=${encodeURIComponent(city)}&limit=200`)
  return data.items
}

export async function searchIntent(city: string, q: string, topK = 8): Promise<ApiSearchResponse> {
  return apiGet<ApiSearchResponse>(`/api/v1/search-intent?city=${encodeURIComponent(city)}&q=${encodeURIComponent(q)}&top_k=${topK}`)
}

export async function searchIntentWithStatus(
  city: string,
  q: string,
  topK = 8,
  statuses: Array<'open_now' | 'closing_soon' | 'closed' | 'unknown'> = [],
): Promise<ApiSearchResponse> {
  const statusParam = statuses.length > 0 ? `&open_statuses=${encodeURIComponent(statuses.join(','))}` : ''
  return apiGet<ApiSearchResponse>(
    `/api/v1/search-intent?city=${encodeURIComponent(city)}&q=${encodeURIComponent(q)}&top_k=${topK}${statusParam}`,
  )
}

export async function searchIntentHits(
  city: string,
  q: string,
  topK = 8,
  statuses: Array<'open_now' | 'closing_soon' | 'closed' | 'unknown'> = [],
): Promise<IntentSearchHit[]> {
  const res = statuses.length > 0
    ? await searchIntentWithStatus(city, q, topK, statuses)
    : await searchIntent(city, q, topK)
  return res.results.map((r) => ({
    entryId: resolveStableLocalId({
      id: r.entry_id,
      legacy_code: r.legacy_code,
      type: r.entity_type,
      category: r.category,
      city_id: city,
      name_en: r.name,
      name_th: r.name,
      lat: 0,
      lng: 0,
    }),
    name: r.name,
    category: r.category,
    score: r.score,
    matchedIntent: res.matched_intent,
    entityScope: res.entity_scope,
    openStatus: r.open_status,
    hoursConfidence: r.hours_confidence,
    retrievalGrade: r.retrieval_grade,
  }))
}

export async function fetchPlan(city: string, query: string): Promise<ApiPlan> {
  const res = await fetch(`${API_BASE_URL}/api/v1/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ city, query }),
  })
  if (!res.ok) throw new Error(`Plan API request failed: ${res.status}`)
  return (await res.json()) as ApiPlan
}
