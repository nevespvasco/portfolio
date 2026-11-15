// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.scss"],
  compatibilityDate: "2026-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@vercel/analytics/nuxt", "@vercel/speed-insights/nuxt"],
  fonts: {
    families: [
      // only resolve this font with the `google` provider
      { name: "Inter", provider: "google" },
    ],
  },
  icon: {
    // Icons come from the installed @iconify-json/* collections only: used
    // icons are bundled into the client and the rest is served by the app's
    // own server, never fetched from the public Iconify API.
    serverBundle: "local",
    clientBundle: {
      scan: { globInclude: ["app/**/*.{vue,ts}"] },
    },
    fallbackToApi: false,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      // viewport-fit=cover lets the fixed mobile nav respect the safe area.
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
  },
});
