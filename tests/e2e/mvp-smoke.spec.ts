import { expect, test, type Page } from 'playwright/test'

async function sendChatMessage(page: Page, message: string) {
  await page.getByLabel('Follow up').fill(message)
  await page.getByRole('button', { name: 'Send chat message' }).click()
}

test.describe('frontend MVP smoke', () => {
  test('home loads and app toggles between chat and map', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(
      page.getByRole('heading', { name: 'Ready to Explore', exact: false }),
    ).toBeVisible()

    await page.goto('/app', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: 'Concierge' })).toBeVisible()
    await expect(page.getByPlaceholder('Follow up...')).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByRole('search')).toBeVisible()
    await expect(page.getByLabel('Ask about Nakhon Phanom')).toBeVisible()
  })

  test('off-topic, pause, and ambiguous prompts do not force recommendations', async ({ page }) => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })

    await sendChatMessage(page, 'ไก่กับไข่อะไรเกิดก่อน')
    await expect(page.getByText('ผมช่วยเรื่องเที่ยวนครพนมเป็นหลักครับ')).toBeVisible()
    await expect(page.getByText('Top matches')).toHaveCount(0)
    await expect(page.getByText('Pho Sawan')).toHaveCount(0)

    await sendChatMessage(page, 'เดียวนะ')
    await expect(page.getByText('พิมพ์ต่อได้เลย')).toBeVisible()
    await expect(page.getByText('Top matches')).toHaveCount(0)

    await sendChatMessage(page, 'เอา')
    await expect(page.getByText('ผมยังไม่แน่ใจว่าคุณอยากหาอะไรในนครพนมครับ')).toBeVisible()
    await expect(page.getByText('Top matches')).toHaveCount(0)
  })

  test('blessing and travel queries still work without exposing internal labels', async ({ page }) => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })

    await sendChatMessage(page, 'ขอลูก')
    await expect(page.getByText(/ขอพรเรื่องบุตร|ตรงกับคำขอของคุณ/)).toBeVisible()
    await expect(page.getByText('Top matches')).toBeVisible()
    await expect(page.getByText('general_discovery')).toHaveCount(0)
    await expect(page.getByText('food_trip')).toHaveCount(0)
    await expect(page.getByText('grade:medium')).toHaveCount(0)
    await expect(page.getByText('grade:high')).toHaveCount(0)
    await expect(page.getByText('grade:low')).toHaveCount(0)

    await sendChatMessage(page, 'ไหว้พระ ขอพร')
    await expect(page.getByText('Top matches')).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByRole('search')).toBeVisible()
  })

  test('plan queries and plan-my-day sheet still create itineraries', async ({ page }) => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })

    await sendChatMessage(page, 'วางแผนเที่ยวครึ่งวัน')
    await expect(page.getByText('Your plan')).toBeVisible()

    await page.getByRole('button', { name: 'Plan my day' }).click()
    await expect(page.getByRole('heading', { name: 'Plan my day' })).toBeVisible()
    await page.getByRole('button', { name: 'Food' }).click()
    await page.getByRole('button', { name: 'Create plan' }).click()
    await expect(page.getByText('Your plan')).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByRole('search')).toBeVisible()
  })
})
