// Chatbot Plan Provider — for MVP returns a hardcoded Plan after a fake delay.
// Interface is stable per /CONTEXT.md so a real LLM impl can drop in later.

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
  arrival_time: string             // "13:00"
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
  coordinates: [number, number][]  // [lng, lat]
}

export type Plan = {
  query: string
  city_id: string
  generated_at: string             // ISO
  start_time: string
  end_time: string
  total_duration_min: number
  rationale_en: string
  rationale_th: string
  stops: Stop[]
  route_geometry: RouteGeometry
}

const HARDCODED_PLAN: Plan = {
  query: 'I have one afternoon, I love food and history',
  city_id: 'nkp',
  generated_at: new Date().toISOString(),
  start_time: '13:00',
  end_time: '18:00',
  total_duration_min: 300,
  rationale_en:
    "Pho Sawan's last lunch order is 14:00, Ho Chi Minh's House closes at 17:00, and the Naga statue faces west — sunset is at 18:18 today. Everything lines up.",
  rationale_th:
    'เฝอสวรรค์รับออเดอร์อาหารกลางวันถึง 14:00 บ้านลุงโฮปิด 17:00 และพญาศรีสัตตนาคราชหันหน้าไปทางทิศตะวันตก พระอาทิตย์ตก 18:18 วันนี้ ทุกอย่างลงล็อก',
  stops: [
    {
      position: 1,
      entry_id: 'pho-sawan',
      arrival_time: '13:00',
      duration_min: 45,
      travel_min_to_next: 8,
      travel_mode_to_next: 'drive',
      why_en: 'Lunch — pho + nem nuong',
      why_th: 'อาหารกลางวัน — เฝอ + แหนมเนือง',
      icon_emoji: '🍜',
      optional: false,
      entry_summary: {
        name_en: 'Pho Sawan',
        name_th: 'เฝอสวรรค์',
        category: 'food',
        primary_photo_url: 'https://images.unsplash.com/photo-1583224944844-5b268c057b72?auto=format&w=400&q=70',
        lat: 17.408,
        lng: 104.779,
        price_band: 'budget',
      },
    },
    {
      position: 2,
      entry_id: 'ho-chi-minh-house',
      arrival_time: '14:00',
      duration_min: 45,
      travel_min_to_next: 10,
      travel_mode_to_next: 'drive',
      why_en: 'Walk through the 1928 wooden house',
      why_th: 'เดินชมบ้านไม้ปี 1928',
      icon_emoji: '🏛️',
      optional: false,
      entry_summary: {
        name_en: "Ho Chi Minh's House Memorial",
        name_th: 'บ้านลุงโฮ',
        category: 'museum',
        primary_photo_url: 'https://images.unsplash.com/photo-1565611655036-8af6a82b3b08?auto=format&w=400&q=70',
        lat: 17.4192,
        lng: 104.753,
        price_band: 'budget',
      },
    },
    {
      position: 3,
      entry_id: 'river-vibes-cafe',
      arrival_time: '15:30',
      duration_min: 30,
      travel_min_to_next: 3,
      travel_mode_to_next: 'walk',
      why_en: 'Coffee + rooftop river view',
      why_th: 'กาแฟ + วิวแม่น้ำชั้นบน',
      icon_emoji: '☕',
      optional: false,
      entry_summary: {
        name_en: 'River Vibes Café',
        name_th: 'ริเวอร์ไวบส์',
        category: 'cafe',
        primary_photo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&w=400&q=70',
        lat: 17.4085,
        lng: 104.78,
        price_band: 'mid',
      },
    },
    {
      position: 4,
      entry_id: 'naga-statue',
      arrival_time: '16:30',
      duration_min: 60,
      travel_min_to_next: 1,
      travel_mode_to_next: 'walk',
      why_en: 'Iconic Naga + sunset over Laos',
      why_th: 'พญานาคไอคอนิก + พระอาทิตย์ตกฝั่งลาว',
      icon_emoji: '🐉',
      optional: false,
      entry_summary: {
        name_en: 'Phaya Sri Sattanakharat',
        name_th: 'พญาศรีสัตตนาคราช',
        category: 'landmark',
        primary_photo_url: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&w=400&q=70',
        lat: 17.4083,
        lng: 104.7805,
        price_band: 'free',
      },
    },
    {
      position: 5,
      entry_id: 'indochina-walking-street',
      arrival_time: '18:00',
      duration_min: 90,
      travel_min_to_next: null,
      travel_mode_to_next: null,
      why_en: 'Friday night market — dinner & shopping',
      why_th: 'ตลาดคืนวันศุกร์ — มื้อเย็น & ช้อปปิ้ง',
      icon_emoji: '🌙',
      optional: true,
      entry_summary: {
        name_en: 'Indochina Walking Street',
        name_th: 'ถนนคนเดินอินโดจีน',
        category: 'market',
        primary_photo_url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&w=400&q=70',
        lat: 17.4078,
        lng: 104.7795,
        price_band: 'budget',
      },
    },
  ],
  route_geometry: {
    type: 'LineString',
    coordinates: [
      [104.779, 17.408],
      [104.753, 17.4192],
      [104.78, 17.4085],
      [104.7805, 17.4083],
      [104.7795, 17.4078],
    ],
  },
}

const FAKE_DELAY_MS = 1400

export function getPlan(query: string, cityId: string): Promise<Plan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...HARDCODED_PLAN,
        query,
        city_id: cityId,
        generated_at: new Date().toISOString(),
      })
    }, FAKE_DELAY_MS)
  })
}

// Runtime shape validation — the shape contract test consumes this.
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
