// Themes — curated city-level identity statements per /CONTEXT.md.
// MVP: hardcoded constants per City. Future: editable curator entity.

import type { Theme } from '../types'

export const NKP_THEMES: Theme[] = [
  {
    id: 'birthday-stupa-pilgrimage',
    city_id: 'nkp',
    name_en: 'Birthday-Stupa Pilgrimage',
    name_th: 'พระธาตุประจำวันเกิด',
    tagline_en: "Thailand's only province with all 8 weekday stupas",
    tagline_th: 'หนึ่งเดียวในไทย — ครบ 8 พระธาตุประจำวันเกิด',
    emoji: '🛕',
    accent_color: '#d4a017', // gold
    entry_ids: [
      'wat-phra-that-phanom',
      'phra-that-renu',
      'phra-that-si-khun',
      'phra-that-mahachai',
      'phra-that-marukkha-nakhon',
      'phra-that-prasit',
      'phra-that-tha-uthen',
      'phra-that-nakhon',
    ],
  },
  {
    id: 'mekong-naga-lore',
    city_id: 'nkp',
    name_en: 'Mekong & Naga Lore',
    name_th: 'แม่น้ำโขง & พญานาค',
    tagline_en: 'Where the river meets myth',
    tagline_th: 'จุดที่แม่น้ำพบกับตำนาน',
    emoji: '🐉',
    accent_color: '#1e8df0',
    entry_ids: [
      'naga-statue',
      'tham-nakee',
      'indochina-walking-street',
      'river-vibes-cafe',
    ],
  },
  {
    id: 'vietnamese-thai-heritage',
    city_id: 'nkp',
    name_en: 'Vietnamese-Thai Heritage',
    name_th: 'มรดกไทย-เวียดนาม',
    tagline_en: "Ho Chi Minh's Thai exile, pho noodles, the Indochina market",
    tagline_th: 'บ้านลุงโฮ เฝอ และตลาดอินโดจีน',
    emoji: '🇻🇳',
    accent_color: '#b16060',
    entry_ids: [
      'ho-chi-minh-house',
      'pho-sawan',
      'indochina-walking-street',
      'old-town-street-art',
    ],
  },
  {
    id: 'otop-local-crafts',
    city_id: 'nkp',
    name_en: 'OTOP & Local Crafts',
    name_th: 'OTOP & งานคราฟต์ท้องถิ่น',
    tagline_en: 'Phu Thai textiles, mat-mi weaving, Renu Nakhon crafts',
    tagline_th: 'ผ้ามัดหมี่ ผ้าเรณูนคร งานคราฟต์ผู้ไท',
    emoji: '🧵',
    accent_color: '#7c5acc',
    entry_ids: [], // ← data gap, awaiting OTOP entries (next grilling fork)
  },
]

export function themesForCity(cityId: string): Theme[] {
  return NKP_THEMES.filter((t) => t.city_id === cityId)
}

export function themeById(id: string): Theme | undefined {
  return NKP_THEMES.find((t) => t.id === id)
}
