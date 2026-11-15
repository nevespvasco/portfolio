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
      <div class="technical-skills-icons">
        <div
          v-for="technical in technicalIcons"
          :key="technical.id"
          class="technical-skill"
        >
          <Icon
            :name="technical.icon"
            class="technical-skills-icon"
            aria-hidden="true"
            :class="[
              technical.isOver ? 'technical-skills-icon--animation' : '',
            ]"
            @mouseover="technical.isOver = true"
            @mouseleave="technical.isOver = false"
          />
          <p :style="{ color: technical.isOver ? technical.colorName : '' }">
            {{ technical.name }}
          </p>
        </div>
      </div>
      <p class="lead skills-also">
        Also: Vitest, Playwright, TanStack Query, NestJS, PostgreSQL, MySQL,
        Figma, Claude API.
      </p>
    </section>
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { projects } from "~/data/projects";
import { contactLinks, locationLabel, site } from "#shared/site";

const technicalIcons = ref<
  {
    id: number;
    icon: string;
    isOver: boolean;
    name: string;
    colorName: string;
  }[]
>([
  {
    id: 0,
    icon: "logos:vue",
    isOver: false,
    name: "Vue",
    colorName: "#41B883",
  },
  {
    id: 1,
    icon: "logos:nuxt-icon",
    isOver: false,
    name: "Nuxt",
    colorName: "#00DC82",
  },
  {
    id: 2,
    icon: "logos:pinia",
    isOver: false,
    name: "Pinia",
    colorName: "#ffd04a",
  },
  {
    id: 3,
    icon: "logos:laravel",
    isOver: false,
    name: "Laravel",
    colorName: "#FF2D20",
  },
  {
    id: 4,
    icon: "devicon:react",
    isOver: false,
    name: "React",
    colorName: "#61DAFB",
  },
  {
    id: 5,
    icon: "logos:redux",
    isOver: false,
    name: "Redux",
    colorName: "#764ABC",
  },
  {
    id: 6,
    icon: "logos:docker-icon",
    isOver: false,
    name: "Docker",
    colorName: "#2396ED",
  },
  {
    id: 7,
    icon: "logos:typescript-icon",
    isOver: false,
    name: "TypeScript",
    colorName: "#3178C6",
  },
  {
    id: 8,
    icon: "logos:tailwindcss-icon",
    isOver: false,
    name: "Tailwind CSS",
    colorName: "#44a8b3",
  },
]);

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

.technical-skills-icons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  padding-top: var(--space-4);
}

.technical-skill {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: var(--space-2) 0 0;
    text-align: center;
  }
}

.technical-skills-icon {
  font-size: 2em;
}

.skills-also {
  color: var(--color-text-muted);
}

@keyframes zoom-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@media (min-width: 768px) {
  .technical-skills-icons {
    grid-template-columns: repeat(4, 1fr);
  }

  .technical-skills-icon {
    filter: grayscale(100%);

    &.technical-skills-icon--animation {
      animation: 1s ease-out 0s 1 zoom-in;
      filter: grayscale(0);
    }
  }
}

@media (min-width: 1290px) {
  .technical-skills-icons {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
