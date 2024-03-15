import { BaseUrls } from './app/constants';
import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const extraHTTPHeaders = {
  accept: 'application/json, text/plain, */*',
};

export default defineConfig({
  testDir: path.join(__dirname, './tests'),
  reporter: [['html', { outputFolder: path.join(__dirname, './report') }]],
  snapshotPathTemplate:
    '{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}',
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /setup.ts/,
      use: {
        baseURL: BaseUrls.ProxyTarget,
        extraHTTPHeaders,
      },
    },
    {
      name: 'non-critical-tests',
      grepInvert: /@critical/,
      use: {
        baseURL: BaseUrls.ProxyTarget,
        extraHTTPHeaders,
      },
      dependencies: ['setup'],
    },
    {
      name: 'critical-tests',
      grep: /@critical/,
      use: {
        baseURL: BaseUrls.ProxyTarget,
        extraHTTPHeaders,
      },
      dependencies: ['setup'],
    },
  ],
});
