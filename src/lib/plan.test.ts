import { describe, expect, it } from 'vitest'
import { getPlan, isValidPlan } from './plan'

describe('Plan shape contract', () => {
  it('getPlan returns a value that passes isValidPlan', async () => {
    const plan = await getPlan('I have one afternoon, I love food and history', 'nkp')
    expect(isValidPlan(plan)).toBe(true)
  })

  it('rejects plans with no stops', () => {
    expect(isValidPlan({ query: 'q', city_id: 'nkp', rationale_en: '', stops: [], route_geometry: { type: 'LineString', coordinates: [[0,0],[1,1]] } })).toBe(false)
  })

  it('rejects plans where a stop is missing entry_summary', () => {
    expect(
      isValidPlan({
        query: 'q', city_id: 'nkp', rationale_en: '',
        stops: [{ position: 1, entry_id: 'x', arrival_time: '12:00', duration_min: 30, optional: false }],
        route_geometry: { type: 'LineString', coordinates: [[0,0],[1,1]] },
      }),
    ).toBe(false)
  })

  it('rejects route_geometry that is not a LineString', () => {
    expect(
      isValidPlan({
        query: 'q', city_id: 'nkp', rationale_en: '',
        stops: [],
        route_geometry: { type: 'Polygon', coordinates: [] },
      }),
    ).toBe(false)
  })

  it('echoes the query and city_id back into the plan', async () => {
    const plan = await getPlan('test query', 'nkp')
    expect(plan.query).toBe('test query')
    expect(plan.city_id).toBe('nkp')
  })
})
