<template>
  <UiPageContainer>
    <h1 class="title">Selected projects</h1>
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
import { projectsListPath, projects } from "#shared/projects";

const names = projects.map((project) => project.name);
const description = `Products and tools I have built and shipped: ${names.slice(0, -1).join(", ")} and ${names.at(-1)}.`;

usePageSeo({ title: "Projects", description, path: projectsListPath });
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
