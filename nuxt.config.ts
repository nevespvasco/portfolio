// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.scss"],
  compatibilityDate: "2026-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@vercel/analytics/nuxt", "@vercel/speed-insights/nuxt"],
  fonts: {
    families: [
      // only resolve this font with the `google` provider
      { name: "Inter", provider: "google" },
    ],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
