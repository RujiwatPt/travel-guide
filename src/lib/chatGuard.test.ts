import { describe, expect, it } from 'vitest'
import { classifyChatIntent } from './chatGuard'

describe('classifyChatIntent', () => {
  it('marks chicken and egg as off-topic', () => {
    const result = classifyChatIntent('ไก่กับไข่อะไรเกิดก่อน')
    expect(result.intent).toBe('off_topic')
    expect(result.intent).not.toBe('travel_search')
  })

  it('marks pause phrases in Thai', () => {
    expect(classifyChatIntent('เดียวนะ').intent).toBe('pause')
    expect(classifyChatIntent('เดี๋ยวนะ').intent).toBe('pause')
    expect(classifyChatIntent('รอก่อน').intent).toBe('pause')
  })

  it('marks date question as off-topic', () => {
    expect(classifyChatIntent('วันนี้วันอะไร').intent).toBe('off_topic')
  })

  it('marks coding request as off-topic', () => {
    expect(classifyChatIntent('เขียนโค้ด python ให้หน่อย').intent).toBe('off_topic')
  })

  it('marks very short Thai prompts as unclear', () => {
    expect(classifyChatIntent('เอา').intent).toBe('unclear')
    expect(classifyChatIntent('อะไร').intent).toBe('unclear')
  })

  it('treats ขอลูก as blessing travel search', () => {
    const result = classifyChatIntent('ขอลูก')
    expect(result.intent).toBe('travel_search')
    expect(result.travelHint).toBe('blessing')
  })

  it('treats blessing search as travel search', () => {
    const result = classifyChatIntent('ไหว้พระ ขอพร')
    expect(result.intent).toBe('travel_search')
    expect(result.travelHint).toBe('blessing')
  })

  it('treats food-style Thai requests as travel search', () => {
    expect(classifyChatIntent('อยากกินของอร่อย').travelHint).toBe('food')
    expect(classifyChatIntent('ร้านอาหารเวียดนาม').travelHint).toBe('food')
  })

  it('treats cafe and riverside searches as travel search', () => {
    const result = classifyChatIntent('คาเฟ่ริมโขง')
    expect(result.intent).toBe('travel_search')
    expect(['cafe', 'general']).toContain(result.travelHint)
  })

  it('treats nature and photo requests as travel search', () => {
    expect(classifyChatIntent('ที่เที่ยวธรรมชาติ').travelHint).toBe('nature')
    expect(classifyChatIntent('จุดถ่ายรูป').travelHint).toBe('photo')
  })

  it('treats trip planning phrases as travel plan', () => {
    expect(classifyChatIntent('วางแผนเที่ยวครึ่งวัน').intent).toBe('travel_plan')
    expect(classifyChatIntent('เที่ยว 1 วัน').intent).toBe('travel_plan')
    expect(classifyChatIntent('I have one afternoon').intent).toBe('travel_plan')
  })

  it('treats English travel search and pause phrases correctly', () => {
    expect(classifyChatIntent('food near Mekong').intent).toBe('travel_search')
    expect(classifyChatIntent('hold on').intent).toBe('pause')
    expect(classifyChatIntent('hidden gem').travelHint).toBe('hidden_gem')
    expect(classifyChatIntent('temple').travelHint).toBe('blessing')
    expect(classifyChatIntent('food').travelHint).toBe('food')
  })
})
