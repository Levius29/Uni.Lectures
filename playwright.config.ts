import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', use: { baseURL: 'http://127.0.0.1:4387', headless: true }, webServer: { command: 'npm run build && npx vite preview --port 4387 --strictPort', url: 'http://127.0.0.1:4387', reuseExistingServer: false }, projects: [{ name: 'chromium', use: { browserName: 'chromium' } }] });
