import { defineConfig, devices } from "@playwright/test";

const port = 3100;

// Accessibility checks against the production build (`npm run build` first).
// PW_CHROMIUM_PATH lets a local run reuse an already-installed Chromium.
export default defineConfig({
  testDir: "e2e",
  reporter: process.env.CI ? "github" : "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://localhost:${port}`,
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: `PORT=${port} node .output/server/index.mjs`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
  },
});
