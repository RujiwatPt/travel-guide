import { defineConfig, devices } from 'playwright/test'

const port = 4173
const host = '127.0.0.1'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://${host}:${port}`,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: process.env.CI
      ? `npm run preview -- --host ${host} --port ${port}`
      : `npm run dev -- --host ${host} --port ${port}`,
    url: `http://${host}:${port}/app`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
