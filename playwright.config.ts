import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig } from './playwright/e2e/config/environments';

const config = getEnvironmentConfig();

export default defineConfig({
  testDir: './playwright/e2e/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: config.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: config.baseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

