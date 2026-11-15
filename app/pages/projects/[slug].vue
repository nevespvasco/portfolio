<template>
  <UiPageContainer>
    <article v-if="project" class="case-study">
      <p class="back"><NuxtLink to="/#projects">← All projects</NuxtLink></p>
      <h1 class="project-name">{{ project.name }}</h1>
      <p class="outcome">{{ project.outcome }}</p>
      <UiTagList :tags="project.tags" />
      <p v-if="project.repo" class="repo">
        <a :href="project.repo">View the repository on GitHub</a>
      </p>

      <section v-for="section in project.sections" :key="section.heading">
        <UiSectionHeading>{{ section.heading }}</UiSectionHeading>
        <p v-for="(paragraph, i) in section.paragraphs" :key="i">
          {{ paragraph }}
        </p>
        <ul v-if="section.bullets" class="bullets">
          <li v-for="(bullet, i) in section.bullets" :key="i">{{ bullet }}</li>
        </ul>
      </section>

      <p class="contact">
        Want the 10-minute walkthrough?
        <a :href="emailLink.url">Email me</a>.
      </p>
    </article>
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { projects } from "~/data/projects";
import { absoluteUrl, emailLink, site } from "#shared/site";

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

useHead({
  title: `${project.name} · ${site.name}`,
  meta: [
    { name: "description", content: project.outcome },
    { property: "og:title", content: `${project.name} · ${site.name}` },
    { property: "og:description", content: project.outcome },
  ],
  link: [
    { rel: "canonical", href: absoluteUrl(`/projects/${project.slug}`) },
  ],
});
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

.contact {
  margin: var(--space-7) 0 var(--space-8);
}
</style>
