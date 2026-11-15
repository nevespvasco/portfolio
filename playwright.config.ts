import { defineConfig, devices } from "@playwright/test";

const port = 3100;

// Accessibility, rendered-UI and smoke checks against the production build
// (`npm run build` first), in every engine the site has to work in:
// - Desktop Chrome, and a Pixel for Android Chrome. Brave, Edge and Opera
//   are Chromium too, so these cover them.
// - WebKit on an iPhone profile: the closest CI gets to Safari on iOS
//   (every iOS browser is WebKit). A real-device check is still manual.
// - WebKit desktop for Safari on macOS, and Firefox desktop.
// PW_CHROMIUM_PATH lets a local run reuse an already-installed Chromium.
// `npx playwright test --project=chromium` runs a single engine.
const chromiumLaunch = process.env.PW_CHROMIUM_PATH
  ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
  : {};

export default defineConfig({
  testDir: "e2e",
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], ...chromiumLaunch } },
    { name: "android-chrome", use: { ...devices["Pixel 7"], ...chromiumLaunch } },
    { name: "ios-safari", use: { ...devices["iPhone 15"] } },
    { name: "safari", use: { ...devices["Desktop Safari"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
  webServer: {
    command: `PORT=${port} node .output/server/index.mjs`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
  },
});
