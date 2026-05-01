import { expect, test } from 'playwright/test'

test.describe('frontend MVP smoke', () => {
  test('home and map routes load', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: 'Ready to Explore', exact: false }),
    ).toBeVisible()

    await page.goto('/app')
    await expect(page.getByRole('search')).toBeVisible()
    await expect(page.getByLabel('Ask about Nakhon Phanom')).toBeVisible()
  })

  test('intent search returns ranked results and can be cleared', async ({ page }) => {
    await page.goto('/app')

    const searchInput = page.getByLabel('Ask about Nakhon Phanom')
    await searchInput.fill('ไหว้พระ ขอพร')
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText('Search results')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'ไหว้พระ ขอพร' })).toBeVisible()
    await expect(page.getByText('Wat Phra That Phanom')).toBeVisible()

    await page.getByRole('button', { name: 'Clear search or plan' }).click()
    await expect(searchInput).toHaveValue('')
    await expect(page.getByText('Search results')).not.toBeVisible()
  })

  test('plan-style prompt shows a plan without crashing', async ({ page }) => {
    await page.goto('/app')

    const searchInput = page.getByLabel('Ask about Nakhon Phanom')
    await searchInput.fill('I have one afternoon, I love food and history')
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText('Your plan', { exact: false })).toBeVisible()
    await expect(page.getByText('Pho Sawan')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Clear search or plan' })).toBeVisible()
  })
})
