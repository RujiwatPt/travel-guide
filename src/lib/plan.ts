import { ENTRIES } from '../data/seed'
import type { Entry } from '../types'

export type EntrySummary = {
  name_en: string
  name_th: string
  category: string
  primary_photo_url: string | null
  lat: number
  lng: number
  price_band: 'free' | 'budget' | 'mid' | 'premium' | null
}

export type Stop = {
  position: number
  entry_id: string
  arrival_time: string
  duration_min: number
  travel_min_to_next: number | null
  travel_mode_to_next: 'walk' | 'drive' | 'bike' | null
  why_en: string
  why_th: string
  icon_emoji: string
  optional: boolean
  entry_summary: EntrySummary
}

export type RouteGeometry = {
  type: 'LineString'
  coordinates: [number, number][]
}

export type Plan = {
  query: string
  city_id: string
  generated_at: string
  start_time: string
  end_time: string
  total_duration_min: number
  rationale_en: string
  rationale_th: string
  stops: Stop[]
  route_geometry: RouteGeometry
}

const FAKE_DELAY_MS = 500

const entryById = new Map(ENTRIES.map((e) => [e.id, e]))

function mustEntry(id: string): Entry {
  const row = entryById.get(id)
  if (!row) throw new Error(`Missing seed entry: ${id}`)
  return row
}

function toSummary(e: Entry): EntrySummary {
  return {
    name_en: e.name_en,
    name_th: e.name_th,
    category: e.category,
    primary_photo_url: e.photos?.[0] ?? null,
    lat: e.lat,
    lng: e.lng,
    price_band: e.price_band ?? null,
  }
}

function stopFromEntry(e: Entry, position: number, arrival: string, whyEn: string, whyTh: string, optional = false): Stop {
  return {
    position,
    entry_id: e.id,
    arrival_time: arrival,
    duration_min: e.duration_min ?? 45,
    travel_min_to_next: null,
    travel_mode_to_next: null,
    why_en: whyEn,
    why_th: whyTh,
    icon_emoji: e.emoji,
    optional,
    entry_summary: toSummary(e),
  }
}

function withTravel(stops: Stop[]): Stop[] {
  return stops.map((s, i) => {
    if (i === stops.length - 1) return s
    return { ...s, travel_min_to_next: 8, travel_mode_to_next: 'drive' }
  })
}

function birthdayPlan(query: string, cityId: string): Plan {
  const naga = mustEntry('naga-statue')
  const phra = mustEntry('wat-phra-that-phanom')
  const stops = withTravel([
    stopFromEntry(naga, 1, '09:00', 'Start with blessings at the Mekong Naga landmark.', 'เริ่มด้วยการขอพรที่พญานาคริมโขง'),
    stopFromEntry(phra, 2, '10:30', 'Visit your birthday stupa for merit and family blessings.', 'ไปกราบพระธาตุประจำวันเกิดเพื่อความเป็นสิริมงคล'),
  ])
  return {
    query,
    city_id: cityId,
    generated_at: new Date().toISOString(),
    start_time: '09:00',
    end_time: '13:00',
    total_duration_min: 240,
    rationale_en: 'Built from Sunday birthday-temple intent and local NKP sacred landmarks with practical daytime hours.',
    rationale_th: 'จัดแผนจากเจตนาวันเกิดและจุดศักดิ์สิทธิ์ในนครพนม โดยยึดช่วงเวลาเปิดที่เดินทางได้จริง',
    stops,
    route_geometry: {
      type: 'LineString',
      coordinates: stops.map((s) => [s.entry_summary.lng, s.entry_summary.lat]),
    },
  }
}

function afternoonPlan(query: string, cityId: string): Plan {
  const pho = mustEntry('pho-sawan')
  const ho = mustEntry('ho-chi-minh-house')
  const cafe = mustEntry('river-vibes-cafe')
  const naga = mustEntry('naga-statue')
  const street = mustEntry('indochina-walking-street')

  const stops = withTravel([
    stopFromEntry(pho, 1, '13:00', 'Lunch first at a local Vietnamese-Thai favorite.', 'เริ่มมื้อกลางวันที่ร้านดังสไตล์เวียดนาม-ไทยท้องถิ่น'),
    stopFromEntry(ho, 2, '14:00', 'Continue with history and cultural context of the city.', 'ต่อด้วยจุดประวัติศาสตร์เพื่อเข้าใจบริบทเมือง'),
    stopFromEntry(cafe, 3, '15:30', 'Short coffee break before the sunset zone.', 'พักดื่มกาแฟก่อนเข้าช่วงเย็นริมโขง'),
    stopFromEntry(naga, 4, '16:30', 'Prime riverside landmark for golden-hour photos.', 'จุดแลนด์มาร์กริมโขงสำหรับแสงเย็นและถ่ายรูป'),
    stopFromEntry(street, 5, '18:00', 'Optional night market for dinner and local shopping.', 'ทางเลือกช่วงค่ำที่ถนนคนเดินสำหรับมื้อเย็นและช้อปปิ้ง', true),
  ])

  return {
    query,
    city_id: cityId,
    generated_at: new Date().toISOString(),
    start_time: '13:00',
    end_time: '18:00',
    total_duration_min: 300,
    rationale_en: 'Built from food + culture + riverside flow using local entries and their listed opening windows.',
    rationale_th: 'จัดลำดับจากอาหาร ประวัติศาสตร์ และจุดริมน้ำ โดยอิงเวลาที่เปิดให้บริการของสถานที่ในชุดข้อมูล',
    stops,
    route_geometry: {
      type: 'LineString',
      coordinates: stops.map((s) => [s.entry_summary.lng, s.entry_summary.lat]),
    },
  }
}

function dispatchPlan(query: string, cityId: string): Plan {
  const q = query.toLowerCase()
  if (
    q.includes('birthday') ||
    q.includes('born') ||
    q.includes('sunday') ||
    q.includes('stupa') ||
    q.includes('วันเกิด') ||
    q.includes('วันอาทิตย์') ||
    q.includes('พระธาตุ')
  ) {
    return birthdayPlan(query, cityId)
  }
  return afternoonPlan(query, cityId)
}

export function getPlan(query: string, cityId: string): Promise<Plan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dispatchPlan(query, cityId))
    }, FAKE_DELAY_MS)
  })
}

export function isValidPlan(value: unknown): value is Plan {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  if (typeof v.query !== 'string') return false
  if (typeof v.city_id !== 'string') return false
  if (typeof v.rationale_en !== 'string') return false
  if (!Array.isArray(v.stops) || v.stops.length === 0) return false

  for (const s of v.stops) {
    if (!s || typeof s !== 'object') return false
    const stop = s as Record<string, unknown>
    if (typeof stop.position !== 'number') return false
    if (typeof stop.entry_id !== 'string') return false
    if (typeof stop.arrival_time !== 'string') return false
    if (typeof stop.duration_min !== 'number') return false
    if (typeof stop.optional !== 'boolean') return false
    if (!stop.entry_summary || typeof stop.entry_summary !== 'object') return false
    const summary = stop.entry_summary as Record<string, unknown>
    if (typeof summary.name_en !== 'string') return false
    if (typeof summary.lat !== 'number') return false
    if (typeof summary.lng !== 'number') return false
  }

  if (!v.route_geometry || typeof v.route_geometry !== 'object') return false
  const geom = v.route_geometry as Record<string, unknown>
  if (geom.type !== 'LineString') return false
  if (!Array.isArray(geom.coordinates) || geom.coordinates.length < 2) return false
  for (const coord of geom.coordinates) {
    if (!Array.isArray(coord) || coord.length !== 2) return false
    if (typeof coord[0] !== 'number' || typeof coord[1] !== 'number') return false
  }

  return true
}
