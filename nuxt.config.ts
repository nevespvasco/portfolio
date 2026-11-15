// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.scss"],
  compatibilityDate: "2026-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@vercel/analytics/nuxt", "@vercel/speed-insights/nuxt"],
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
  image: {
    format: ["avif", "webp"],
    // On Vercel only these widths are allowed, so every width the site asks
    // for must be listed: the 160px profile photo (and its 2x), the project
    // thumbnails, the project cards and the case-study gallery (each with
    // its 2x), next to the default breakpoints.
    screens: {
      avatar: 160,
      thumb: 240,
      xs: 320,
      thumb2x: 480,
      gallery: 360,
      sm: 640,
      md: 768,
      card: 736,
      gallery2x: 720,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      card2x: 1472,
    },
  },
  nitro: {
    // Sitemap and robots.txt are generated from the site config and projects
    // list at build time.
    prerender: { routes: ["/sitemap.xml", "/robots.txt"] },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
