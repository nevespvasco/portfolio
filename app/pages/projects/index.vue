<template>
  <UiPageContainer>
    <h1 class="title">Projects</h1>
    <ul class="project-list">
      <li v-for="project in projects" :key="project.slug">
        <ProjectCard :project="project" />
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
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--space-6) 0 var(--space-5);
  font-size: var(--text-4xl);
}

.project-list {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
