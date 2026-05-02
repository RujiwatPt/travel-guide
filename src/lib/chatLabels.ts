import type { ChatLanguage } from './chatGuard'

const LABEL_MAP: Array<{ keys: string[]; th: string; en: string }> = [
  { keys: ['blessing', 'fertility', 'merit', 'spiritual', 'pray'], th: 'ขอพร', en: 'Blessing' },
  { keys: ['temple'], th: 'วัด', en: 'Temple' },
  { keys: ['food', 'restaurant', 'vietnamese'], th: 'อาหาร', en: 'Food' },
  { keys: ['cafe', 'coffee'], th: 'คาเฟ่', en: 'Cafe' },
  { keys: ['nature', 'park'], th: 'ธรรมชาติ', en: 'Nature' },
  { keys: ['landmark'], th: 'แลนด์มาร์ก', en: 'Landmark' },
  { keys: ['photo'], th: 'ถ่ายรูป', en: 'Photo spot' },
  { keys: ['riverside', 'mekong'], th: 'ริมโขง', en: 'Riverside' },
]

function normalizeLabel(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize('NFKC')
}

function shouldDropRawLabel(label: string): boolean {
  if (!label) return true
  if (label.startsWith('grade:')) return true
  if (label.startsWith('ai ')) return true
  if (label.includes('general_discovery')) return false
  if (label.includes('food_trip')) return false
  if (/[a-z]+_[a-z]+/.test(label)) return false
  return false
}

export function simplifyChatLabels(rawLabels: string[], language: ChatLanguage): string[] {
  const simplified: string[] = []

  for (const rawLabel of rawLabels) {
    const normalized = normalizeLabel(rawLabel)
    if (!normalized) continue
    if (normalized.startsWith('grade:') || normalized.startsWith('ai ')) continue

    const tokens = normalized
      .split(/[^a-z]+/)
      .map((token) => token.trim())
      .filter(Boolean)

    for (const mapping of LABEL_MAP) {
      if (tokens.some((token) => mapping.keys.includes(token))) {
        const display = language === 'th' ? mapping.th : mapping.en
        if (!simplified.includes(display)) {
          simplified.push(display)
        }
        break
      }
    }

    if (simplified.length >= 3) break

    if (!shouldDropRawLabel(normalized) && !/[a-z]+_[a-z]+/.test(normalized)) {
      continue
    }
  }

  return simplified.slice(0, 3)
}
