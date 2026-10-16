import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Central configuration.
 * - "api" project: pure API tests, no browser.
 * - Browser projects: E2E tests against the ServeRest front-end.
 * URLs come from environment variables so the same suite runs locally, in Docker and in CI.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.FRONT_URL ?? 'https://front.serverest.dev',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: process.env.API_URL ?? 'https://serverest.dev' },
    },
    {
      name: 'chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
