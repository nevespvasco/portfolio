<template>
  <UiPageContainer>
    <h1 class="title">Projects</h1>
    <p class="intro">
      Products and tools I have designed, built and shipped on my own: what
      problem each one solves, the decisions behind it and how it turned out.
    </p>
    <ul class="project-list">
      <li v-for="(project, index) in projects" :key="project.slug">
        <ProjectCard :project="project" heading-level="h2" :priority="index === 0" />
      </li>
    </ul>
    <ContactCta />
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { projects } from "#shared/projects";
import { absoluteUrl } from "#shared/site";

const description =
  "Products and tools I have built and shipped: a surgical portfolio for doctors, an isometric pixel-art poster maker, a file-transfer app and a git review hook.";

useHead({ link: [{ rel: "canonical", href: absoluteUrl("/projects") }] });
useSeoMeta({
  title: "Projects · Vasco Neves",
  description,
  ogTitle: "Projects · Vasco Neves",
  ogDescription: description,
  ogUrl: absoluteUrl("/projects"),
  ogImage: absoluteUrl("/og.jpg"),
  twitterCard: "summary_large_image",
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--space-6) 0 var(--space-3);
  font-size: var(--text-4xl);
}

.intro {
  margin: 0 0 var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.project-list {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
