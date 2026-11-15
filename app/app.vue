<template>
  <div id="app">
    <NuxtLayout>
      <div id="page--background"></div>
      <GeneralHeader />
      <NuxtPage />
      <GeneralFooter />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const description =
  "Vasco Neves, Senior Frontend Engineer in Lisbon. Data-heavy Vue 3, Nuxt and TypeScript apps, tested with Vitest and Playwright.";

useHead({
  title: "Vasco Neves · Senior Frontend Engineer",
  meta: [
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Vasco Neves · Senior Frontend Engineer" },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://www.vasconeves.com/" },
    { property: "og:image", content: "https://www.vasconeves.com/og.jpg" },
    { name: "twitter:card", content: "summary" },
  ],
  link: [{ rel: "canonical", href: "https://www.vasconeves.com/" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vasco Neves",
        jobTitle: "Senior Frontend Engineer",
        url: "https://www.vasconeves.com/",
        image: "https://www.vasconeves.com/og.jpg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lisbon",
          addressCountry: "PT",
        },
        knowsAbout: ["Vue.js", "Nuxt", "TypeScript", "Vitest", "Playwright"],
        sameAs: [
          "https://github.com/nevespvasco",
          "https://www.linkedin.com/in/nevespvasco",
        ],
      }),
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
