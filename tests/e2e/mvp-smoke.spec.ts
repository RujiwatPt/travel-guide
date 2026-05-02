import { expect, test } from 'playwright/test'

test.describe('frontend MVP smoke', () => {
  test('home loads and app toggles between chat and map', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(
      page.getByRole('heading', { name: 'Ready to Explore', exact: false }),
    ).toBeVisible()

    await page.goto('/app', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: 'Concierge' })).toBeVisible()
    await expect(
      page.getByText('Ask me about blessings, food, nature, photo spots, or trip planning'),
    ).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByRole('search')).toBeVisible()
    await expect(page.getByLabel('Ask about Nakhon Phanom')).toBeVisible()
  })

  test('chat search shows assistant results and map keeps them accessible', async ({ page }) => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })

    const followUpInput = page.getByLabel('Follow up')
    await followUpInput.fill('ไหว้พระ ขอพร')
    await page.getByRole('button', { name: 'Send chat message' }).click()

    await expect(page.getByText('Top matches')).toBeVisible()
    await expect(page.getByRole('button', { name: /Wat Phra That Phanom/i }).first()).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByText('Search results')).toBeVisible()
    await expect(page.getByRole('button', { name: /Wat Phra That Phanom/i }).first()).toBeVisible()
  })

  test('plan my day sheet creates a plan and keeps map accessible', async ({ page }) => {
    await page.goto('/app', { waitUntil: 'domcontentloaded' })

    await page.getByRole('button', { name: 'Plan my day' }).click()
    await expect(page.getByRole('heading', { name: 'Plan my day' })).toBeVisible()
    await page.getByRole('button', { name: 'Food' }).click()
    await page.getByRole('button', { name: 'Create plan' }).click()

    await expect(page.getByText('Your plan')).toBeVisible()
    await expect(page.getByText('Pho Sawan')).toBeVisible()

    await page.getByRole('tab', { name: 'Map' }).click()
    await expect(page.getByRole('search')).toBeVisible()
  })
})
