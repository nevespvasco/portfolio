<template>
  <UiPageContainer>
    <section class="hero" aria-labelledby="hero-name">
      <img
        src="@/assets/img/profile_pic.jpg"
        class="profile-pic"
        :alt="site.name"
      >
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
      <ul class="contact-list">
        <li v-for="link in contactLinks" :key="link.label">
          <UiLinkButton :to="link.url" :icon="link.icon">
            {{ link.label }}
          </UiLinkButton>
        </li>
      </ul>
    </section>

    <p class="lead">
      I build complex, data-heavy web applications with Vue 3, Nuxt and
      TypeScript, where a wrong number or a broken state costs someone. I have
      5+ years in frontend, from enterprise migrations and design systems to
      test suites with Vitest and Playwright, and I ship the backend slice of
      my own features too (Laravel, NestJS, PostgreSQL).
    </p>

    <section id="projects" aria-labelledby="projects-heading">
      <UiSectionHeading id="projects-heading">Projects</UiSectionHeading>
      <ul class="project-list">
        <li v-for="project in projects" :key="project.slug">
          <ProjectCard :project="project" />
        </li>
      </ul>
    </section>

    <section aria-labelledby="how-heading">
      <UiSectionHeading id="how-heading">How I build</UiSectionHeading>
      <p class="lead">
        I work AI-first every day with Claude Code and Cursor: I brief agents
        on multi-file changes, review every diff they produce, and lean on
        the test suites as guardrails. I own the decisions; the agents do the
        typing.
      </p>
    </section>

    <section aria-labelledby="skills-heading">
      <UiSectionHeading id="skills-heading">Technical Skills</UiSectionHeading>
      <SkillGroups :groups="skillGroups" />
    </section>

    <ContactCta />
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { projects } from "#shared/projects";
import { skillGroups } from "~/data/skills";
import { contactLinks, locationLabel, site } from "#shared/site";
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--space-5);
}

.profile-pic {
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

.project-list {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
