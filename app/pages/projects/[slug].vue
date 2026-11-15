<template>
  <UiPageContainer>
    <article v-if="project" class="case-study">
      <p class="back"><NuxtLink :to="projectsListPath">← All projects</NuxtLink></p>
      <h1 class="project-name">{{ project.name }}</h1>
      <p class="outcome">{{ project.outcome }}</p>
      <UiTagList :tags="project.tags" />
      <ProjectLinks :project="project" class="repo" />

      <section v-for="section in project.sections" :key="section.heading">
        <UiSectionHeading>{{ section.heading }}</UiSectionHeading>
        <p v-for="(paragraph, i) in section.paragraphs" :key="i">
          {{ paragraph }}
        </p>
        <ul v-if="section.bullets" class="bullets">
          <li v-for="(bullet, i) in section.bullets" :key="i">{{ bullet }}</li>
        </ul>
      </section>

      <ContactCta>Want the 10-minute walkthrough?</ContactCta>

      <nav v-if="previous || next" class="project-nav" aria-label="More projects">
        <NuxtLink
          v-if="previous"
          :to="projectPath(previous.slug)"
          class="project-nav-link project-nav-link--previous"
        >
          <span class="project-nav-label">← Previous project</span>
          <span class="project-nav-name">{{ previous.name }}</span>
        </NuxtLink>
        <NuxtLink
          v-if="next"
          :to="projectPath(next.slug)"
          class="project-nav-link project-nav-link--next"
        >
          <span class="project-nav-label">Next project →</span>
          <span class="project-nav-name">{{ next.name }}</span>
        </NuxtLink>
      </nav>
    </article>
  </UiPageContainer>
</template>

<script lang="ts" setup>
import {
  adjacentProjects,
  projectPath,
  projects,
  projectsListPath,
} from "#shared/projects";
import { absoluteUrl, site } from "#shared/site";

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

const title = `${project.name} · ${site.name}`;
const url = absoluteUrl(projectPath(project.slug));

useHead({ link: [{ rel: "canonical", href: url }] });
useSeoMeta({
  title,
  description: project.outcome,
  ogType: "article",
  ogTitle: title,
  ogDescription: project.outcome,
  ogUrl: url,
  ogImage: absoluteUrl("/og.jpg"),
  twitterCard: "summary_large_image",
});

const { previous, next } = adjacentProjects(project.slug);
</script>

<style lang="scss" scoped>
.back {
  margin-top: var(--space-6);
}

.project-name {
  margin: var(--space-4) 0 var(--space-2);
  font-size: var(--text-4xl);
}

.outcome {
  margin: 0 0 var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--text-xl);
  line-height: 1.5;
}

.repo {
  margin: var(--space-4) 0 0;
}

.bullets li {
  margin-bottom: var(--space-2);
}

.project-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.project-nav-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.project-nav-link--next {
  grid-column: 2;
  text-align: right;
}

.project-nav-label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 400;
}

.project-nav-name {
  color: var(--color-text);
  font-size: var(--text-lg);
  font-weight: 700;
}
</style>
