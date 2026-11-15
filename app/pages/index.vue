<template>
  <UiPageContainer>
    <section class="hero" aria-labelledby="hero-name">
      <NuxtPicture
        src="/img/vasco-neves.jpg"
        format="avif,webp"
        width="160"
        height="160"
        sizes="160px"
        densities="x1 x2"
        preload
        :img-attrs="{ class: 'profile-pic', alt: site.name, fetchpriority: 'high' }"
      />
      <p class="location">
        <Icon name="bi:globe-europe-africa" class="location-icon" aria-hidden="true" />
        {{ locationLabel }}
      </p>
      <ul class="languages">
        <li v-for="language in site.languages" :key="language">
          {{ language }}
        </li>
      </ul>
      <h1 id="hero-name" class="name">{{ site.name }}</h1>
      <p class="role">{{ site.role }}</p>
      <p class="current">
        {{ currentRole.title }} at {{ currentRole.company }} · previously
        {{ previousRole.title }} at {{ previousRole.company }}.
        <NuxtLink :to="experiencePath">Full experience →</NuxtLink>
      </p>
      <ul class="contact-list">
        <li v-for="link in contactLinks" :key="link.label">
          <UiLinkButton :to="link.url" :icon="link.icon">
            {{ link.label }}
          </UiLinkButton>
        </li>
      </ul>
    </section>

    <p class="lead">{{ bio }}</p>

    <section id="projects" aria-labelledby="projects-heading">
      <UiSectionHeading id="projects-heading">Selected projects</UiSectionHeading>
      <ul class="project-list">
        <li v-for="project in featuredProjects" :key="project.slug">
          <ProjectCard :project="project" compact />
        </li>
      </ul>
      <p class="all-projects">
        <UiLinkButton :to="projectsListPath">View all projects →</UiLinkButton>
      </p>
    </section>

    <section aria-labelledby="how-heading">
      <UiSectionHeading id="how-heading">How I build</UiSectionHeading>
      <p class="lead">{{ copy.howIBuild }}</p>
    </section>

    <section aria-labelledby="skills-heading">
      <UiSectionHeading id="skills-heading">Technical skills</UiSectionHeading>
      <SkillGroups :groups="skillGroups" />
    </section>

    <ContactCta />
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { currentRole, experiencePath, previousRole } from "#shared/experience";
import { projects, projectsListPath } from "#shared/projects";
import { skillGroups } from "~/data/skills";
import { contactLinks, copy, locationLabel, site } from "#shared/site";

const bio = copy.bio();
const featuredProjects = projects.filter((project) => project.featured);
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--space-5);
}

// The <img> is rendered inside NuxtPicture, out of reach of scoped styles.
:deep(.profile-pic) {
  display: block;
  width: 10rem;
  height: 10rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  object-fit: cover;
}

.location {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-4) 0 0;
}

.location-icon {
  color: var(--color-accent);
}

.languages {
  display: flex;
  gap: var(--space-2);
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-xs);

  li {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-pill);
  }
}

.name {
  align-self: stretch;
  margin: var(--space-6) 0 var(--space-2);
  font-size: var(--text-display);
}

.role {
  align-self: stretch;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--text-2xl);
  line-height: var(--leading-tight);
}

.current {
  align-self: stretch;
  margin: var(--space-3) 0 0;
  color: var(--color-text-muted);

  a {
    white-space: nowrap;
  }
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  gap: var(--space-2);
  margin: var(--space-5) 0 var(--space-6);
  padding: 0;
  list-style: none;
}

.lead {
  font-size: var(--text-lg);
  font-weight: 400;
}

.all-projects {
  margin: var(--space-4) 0 0;
}

.project-list {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
