import { describe, expect, it } from 'vitest'
import { simplifyChatLabels } from './chatLabels'

describe('simplifyChatLabels', () => {
  it('removes internal labels and keeps user-facing food label', () => {
    const result = simplifyChatLabels(
      ['general_discovery', 'food_trip', 'grade:medium', 'food'],
      'en',
    )
    expect(result.join(' ')).not.toContain('general_discovery')
    expect(result.join(' ')).not.toContain('food_trip')
    expect(result.join(' ')).not.toContain('grade:medium')
    expect(result).toContain('Food')
  })

  it('keeps user-facing temple or blessing labels without grade', () => {
    const result = simplifyChatLabels(['temple', 'spiritual', 'grade:high'], 'en')
    expect(result.join(' ')).not.toContain('grade:high')
    expect(result.some((label) => label === 'Temple' || label === 'Blessing')).toBe(true)
  })

  it('does not display snake_case labels raw', () => {
    const result = simplifyChatLabels(['temple_category', 'general_discovery', 'photo_spot'], 'th')
    expect(result.join(' ')).not.toContain('temple_category')
    expect(result.join(' ')).not.toContain('general_discovery')
    expect(result.some((label) => label === 'ถ่ายรูป' || label === 'วัด')).toBe(true)
  })
})
