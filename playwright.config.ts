import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 15000,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4321/shahbaz-portfolio', reducedMotion: 'reduce' },
  // Locally Playwright starts the server; in CI the workflow does.
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npx astro preview --host 127.0.0.1 --port 4321',
        url: 'http://127.0.0.1:4321/shahbaz-portfolio/',
        reuseExistingServer: true,
        timeout: 60000,
      },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
