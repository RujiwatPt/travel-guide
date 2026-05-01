import { chromium } from 'playwright'

const ROUTES = [
  { path: '/',                      name: '01-home' },
  { path: '/profile',               name: '02-profile' },
  { path: '/local',                 name: '03-local' },
  { path: '/booking',               name: '04-booking' },
  { path: '/notifications',         name: '05-notifications' },
  { path: '/explore',               name: '06-explore' },
  { path: '/journal',               name: '07-journal' },
  { path: '/entry/pho-sawan',       name: '08-entry-detail' },
  { path: '/owner/edit?token=pho-sawan-7x3k2', name: '09-owner-edit' },
  { path: '/app',                   name: '10-app' },
]

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 430, height: 932 },     // iPhone 14 Pro Max
  deviceScaleFactor: 2,
})
const page = await context.newPage()

// Skip splash on first visit
await page.goto('http://localhost:5173/')
await page.evaluate(() => localStorage.setItem('travel_guide_visited', 'true'))

const results = []
for (const r of ROUTES) {
  const url = `http://localhost:5173${r.path}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(800)
  const file = `/tmp/screenshots/${r.name}.png`
  await page.screenshot({ path: file, fullPage: false })
  // Capture errors
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  results.push({ url, file, errors: consoleErrors })
  console.log(`✓ ${r.path} → ${file}`)
}

await browser.close()
