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

  it('birthday-stupa query returns the Sunday-stupa plan featuring Phra That Phanom', async () => {
    const plan = await getPlan('I was born on Sunday — what is my birthday temple?', 'nkp')
    expect(plan.stops.some((s) => s.entry_id === 'wat-phra-that-phanom')).toBe(true)
    expect(plan.rationale_en).toContain('Sunday')
    expect(isValidPlan(plan)).toBe(true)
  })

  it('default query (food + history) returns the afternoon plan featuring Pho Sawan', async () => {
    const plan = await getPlan('I have one afternoon, I love food and history', 'nkp')
    expect(plan.stops.some((s) => s.entry_id === 'pho-sawan')).toBe(true)
    expect(isValidPlan(plan)).toBe(true)
  })
})

describe('dispatchPlan keyword routing', () => {
  // Each test verifies that a keyword routes to the BIRTHDAY plan
  // (recognizable because it features Wat Phra That Phanom).
  // If a keyword routes to the AFTERNOON plan instead, the test fails with
  // a clear message — not 'just' a Plan validation issue.
  const isBirthdayPlan = (entryIds: string[]) => entryIds.includes('wat-phra-that-phanom')
  const isAfternoonPlan = (entryIds: string[]) => entryIds.includes('pho-sawan')

  it("routes 'born' → birthday plan", async () => {
    const plan = await getPlan('what should I do, I was born in the spring', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it("routes 'sunday' → birthday plan", async () => {
    const plan = await getPlan('something Sunday-themed please', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it("routes 'stupa' → birthday plan", async () => {
    const plan = await getPlan('which stupa do I visit?', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it("routes Thai 'พระธาตุ' → birthday plan", async () => {
    const plan = await getPlan('แนะนำพระธาตุประจำวันเกิด', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it("routes Thai 'วันเกิด' → birthday plan", async () => {
    const plan = await getPlan('วันเกิดวันอาทิตย์ไปไหน', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it("routes a generic query → afternoon plan (no keyword match)", async () => {
    const plan = await getPlan('show me cafes and hidden gems', 'nkp')
    expect(isAfternoonPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })

  it('is case-insensitive — uppercase BIRTHDAY still routes to birthday plan', async () => {
    const plan = await getPlan('BIRTHDAY temple please', 'nkp')
    expect(isBirthdayPlan(plan.stops.map((s) => s.entry_id))).toBe(true)
  })
})
