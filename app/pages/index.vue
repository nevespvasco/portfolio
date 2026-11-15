<template>
  <main class="main-container">
    <section />
    <section>
      <div class="profile-pic-container">
        <img
          src="@/assets/img/profile_pic.jpg"
          class="profile-pic"
          :alt="site.name"
        >
      </div>
      <div>
        <div class="location-container">
          <span class="location-info">
            <Icon name="bi:globe-europe-africa" class="location-icon" aria-hidden="true" />
            {{ locationLabel }}
          </span>
        </div>
        <div class="language-container">
          <p v-for="language in site.languages" :key="language" class="language-tag">
            {{ language }}
          </p>
        </div>
        <div class="name-container">
          <h1 class="name">{{ site.name }}</h1>
        </div>
        <div class="title-container">
          <h2 class="title">{{ site.role }}</h2>
        </div>
        <div class="social-container">
          <ul class="social-list">
            <li v-for="social in contactLinks" :key="social.label">
              <a :href="social.url" class="social-item">
                <Icon :name="social.icon" class="social-icon" aria-hidden="true" />
                <span class="social-title">{{ social.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p class="bio">
        I build complex, data-heavy web applications with Vue 3, Nuxt and
        TypeScript, where a wrong number or a broken state costs someone. I have
        5+ years in frontend, from enterprise migrations and design systems to
        test suites with Vitest and Playwright, and I ship the backend slice of
        my own features too (Laravel, NestJS, PostgreSQL).
      </p>

      <section id="projects" class="projects">
        <h2 class="section-title">Projects</h2>
        <ul class="project-list">
          <li v-for="project in projects" :key="project.slug" class="card">
            <h3 class="card-title">
              <NuxtLink :to="`/projects/${project.slug}`">{{ project.name }}</NuxtLink>
            </h3>
            <p class="card-outcome">{{ project.outcome }}</p>
            <ul class="tag-list">
              <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
            </ul>
            <p class="card-links">
              <NuxtLink :to="`/projects/${project.slug}`">Case study</NuxtLink>
              <a v-if="project.repo" :href="project.repo">Repository</a>
            </p>
          </li>
        </ul>
      </section>

      <section class="how-i-build">
        <h2 class="section-title">How I build</h2>
        <p class="bio">
          I work AI-first every day with Claude Code and Cursor: I brief agents
          on multi-file changes, review every diff they produce, and lean on
          the test suites as guardrails. I own the decisions; the agents do the
          typing.
        </p>
      </section>

      <div class="technical-skills-container">
        <h2 class="technical-skills-title">Technical Skills</h2>
        <div v-if="technicalIcons.length > 0" class="technical-skills-icons">
          <div
            v-for="technical in technicalIcons"
            :key="technical.id"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 42px;
            "
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
      </div>
      <p class="bio skills-also">
        Also: Vitest, Playwright, TanStack Query, NestJS, PostgreSQL, MySQL,
        Figma, Claude API.
      </p>
    </section>
    <section />
  </main>
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
.main-container {
  display: grid;
  grid-template-columns: 80%;
  justify-content: center;
}

.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.profile-pic {
  border-radius: 999rem;
  background-color: var(--neutral-background-medium);
  object-position: center;
  height: 10rem;
  width: 10rem;
  border: 1px solid var(--scheme-gray-400);
}

.location-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.location-icon {
  color: var(--green);
}

.location-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.language-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  margin-top: 1rem;
}

.language-tag {
  border: 1px solid var(--scheme-gray-300);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.name-container {
  display: flex;
  justify-content: start;
}

.name {
  font-weight: 800;
  font-size: 5rem;
  line-height: initial;
  margin: 1rem auto;
}

.title-container {
  display: flex;
  justify-content: start;
}

.title {
  font-weight: 300;
  font-size: 2rem;
  line-height: initial;
  color: var(--scheme-gray-800);
  margin-top: 0;
}

.social-container {
  display: flex;
  justify-content: start;
  margin-bottom: 2rem;
}

.bio {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: justify;
}

.technical-skills-container {
  padding-top: 1rem;
}

.technical-skills-title {
  font-weight: 800;
  font-size: 2.5rem;
  line-height: initial;
  color: var(--white);
}

.technical-skills-icon {
  font-size: 2em;
}

.technical-skills-icons {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  padding-top: 2rem;
}

@keyframes zoom-in {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}

.social-list {
  display: flex;
  padding: 0;
  color: var(--white);
  list-style-type: none;
  gap: 0.5rem;
  font-weight: 500;
  margin-bottom: 0;
  flex-wrap: wrap;
}

.social-icon {
  font-size: 1.2em;
}

.social-item {
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.75rem;
  transition: background-color 0.5s ease, border-color 0.5s ease;
  border: 1px solid var(--scheme-gray-600-30);
  &:hover {
    background-color: var(--scheme-gray-600-10);
    border: 1px solid var(--scheme-gray-400);
  }
}

.section-title {
  font-weight: 800;
  font-size: 2.5rem;
  line-height: initial;
  margin: 2.5rem 0 1rem;
}

.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.card {
  border: 1px solid var(--scheme-gray-600-30);
  border-radius: 0.75rem;
  padding: 1.25rem;
  background-color: var(--scheme-gray-600-10);
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
  font-weight: 700;
  a {
    color: var(--white);
  }
}

.card-outcome {
  margin: 0 0 0.75rem;
  line-height: 1.5rem;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem;
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

.card-links {
  display: flex;
  gap: 1rem;
  margin: 0;
  a {
    color: var(--green);
    font-weight: 500;
  }
}

.skills-also {
  color: var(--scheme-gray-800);
}

@media (min-width: 768px) {
  .main-container {
    grid-template-columns: 20% 60% 20%;
  }

  .name {
    line-height: 1rem;
    margin: auto;
  }

  .title {
    line-height: initial;
  }

  .technical-skills-title {
    line-height: initial;
  }
  .technical-skills-icons {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(4, 1fr);
    .technical-skills-icon {
      filter: grayscale(100%);
      &.technical-skills-icon--animation {
        animation: 1s ease-out 0s 1 zoom-in;
        filter: grayscale(0);
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1290px) {
  .main-container {
    grid-template-columns: 20% 60% 20%;
  }

  .name {
    white-space: nowrap;
    margin: revert;
  }
}

@media (min-width: 1290px) {
  .main-container {
    grid-template-columns: 30% 40% 30%;
  }

  .name {
    line-height: 1rem;
    white-space: nowrap;
    margin: revert;
  }

  .title {
    line-height: 0.5rem;
  }

  .technical-skills-title {
    line-height: 0.5rem;
  }

  .technical-skills-icons {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
