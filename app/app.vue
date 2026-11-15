<template>
  <div id="app">
    <SkipLink />
    <NuxtLayout>
      <div id="page--background" aria-hidden="true" />
      <GeneralHeader />
      <NuxtPage />
      <GeneralFooter />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { absoluteUrl, site } from "#shared/site";

const title = `${site.name} · ${site.role}`;
const ogImage = absoluteUrl("/og.jpg");

useHead({
  title,
  meta: [
    { name: "description", content: site.description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: site.description },
    { property: "og:url", content: absoluteUrl("/") },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${site.name}, ${site.role}` },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [{ rel: "canonical", href: absoluteUrl("/") }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        url: absoluteUrl("/"),
        image: ogImage,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressCountry: site.location.countryCode,
        },
        knowsAbout: site.knowsAbout,
        sameAs: site.socials.map((social) => social.url),
      }),
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

