// Shared types — see /CONTEXT.md for the domain language.
// `Entry` here is a structural superset of the narrower one in src/lib/status.ts;
// isOpenNow() accepts it via structural typing.

export type EntryType = 'activity' | 'place'
export type Category =
  | 'food' | 'cafe' | 'landmark' | 'market' | 'museum'
  | 'temple' | 'nature' | 'workshop' | 'shop'
export type Setting = 'indoor' | 'outdoor' | 'mixed'
export type PriceBand = 'free' | 'budget' | 'mid' | 'premium'
export type LiveStatus =
  | 'open' | 'closing_soon' | 'closed_today'
  | 'sold_out' | 'temporarily_closed'
export type DataSource = 'owner_updated' | 'curated' | 'imported'

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type HoursWeekly = {
  tz: string
  all_day?: boolean
  weekly?: Partial<Record<Day, [string, string][] | null>>
  notes_en?: string | null
  notes_th?: string | null
}

export type City = {
  id: string
  name_en: string
  name_th: string
  region_en?: string
  region_th?: string
  default_lat: number
  default_lng: number
  default_zoom: number
  hero_photo_url?: string | null
  tagline_en?: string
  tagline_th?: string
}

export type Owner = {
  id: string
  display_name: string
  contact_phone?: string | null
  language_pref: 'th' | 'en'
  verified: boolean
}

export type Entry = {
  id: string
  type: EntryType
  city_id: string

  name_en: string
  name_th: string
  description_en: string
  description_th?: string
  why_visit_en: string
  why_visit_th?: string

  lat: number
  lng: number

  category: Category
  emoji: string
  vibe_tags: string[]
  cuisine_tags: string[]
  time_tags: string[]
  setting?: Setting
  price_band?: PriceBand

  photos: string[]
  hours_weekly: HoursWeekly | null
  duration_min?: number
  price_min_thb?: number | null
  price_max_thb?: number | null

  owner_id: string | null
  owner_edit_token: string | null
  live_status: LiveStatus | null
  status_note: string | null
  status_updated: string | null

  hours_confidence?: 'high' | 'medium' | 'low' | 'unknown'
  hours_source_type?: 'official' | 'facebook' | 'map_listing' | 'community' | 'unknown'
  hours_last_checked_at?: string | null
  contact_phone?: string | null
  facebook_url?: string | null

  data_source: DataSource
}

export type Theme = {
  id: string
  city_id: string
  name_en: string
  name_th: string
  tagline_en: string
  tagline_th: string
  emoji: string
  accent_color: string
  entry_ids: string[]
}

export type StatusLogEntry = {
  id: string
  entry_id: string
  owner_id: string
  field: string
  old_value: unknown
  new_value: unknown
  updated_at: string
}
