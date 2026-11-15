<template>
  <main class="main-container">
    <section />
    <article v-if="project">
      <p class="back"><NuxtLink to="/#projects">← All projects</NuxtLink></p>
      <h1 class="project-name">{{ project.name }}</h1>
      <p class="outcome">{{ project.outcome }}</p>
      <ul class="tag-list">
        <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
      <p v-if="project.repo" class="repo">
        <a :href="project.repo">View the repository on GitHub</a>
      </p>

      <section v-for="section in project.sections" :key="section.heading">
        <h2 class="section-heading">{{ section.heading }}</h2>
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
    <section />
  </main>
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
.main-container {
  display: grid;
  grid-template-columns: 90%;
  justify-content: center;
  line-height: 1.6rem;
}

a {
  color: var(--green);
}

.back {
  margin-top: 2rem;
}

.project-name {
  font-weight: 800;
  font-size: 3rem;
  line-height: initial;
  margin: 1rem 0 0.5rem;
}

.outcome {
  font-size: 1.2rem;
  color: var(--scheme-gray-800);
}

.tag-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.tag {
  border: 1px solid var(--scheme-gray-300);
  padding: 0.15rem 0.6rem;
  border-radius: 1rem;
}

.section-heading {
  font-weight: 700;
  font-size: 1.6rem;
  margin: 2rem 0 0.5rem;
}

.bullets li {
  margin-bottom: 0.5rem;
}

.contact {
  margin: 3rem 0 6rem;
}

@media (min-width: 768px) {
  .main-container {
    grid-template-columns: 20% 60% 20%;
  }
}

@media (min-width: 1290px) {
  .main-container {
    grid-template-columns: 30% 40% 30%;
  }
}
</style>
