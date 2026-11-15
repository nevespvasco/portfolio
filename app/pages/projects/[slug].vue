<template>
  <UiPageContainer wide>
    <article v-if="project" class="case-study">
      <header class="header">
        <p class="back"><NuxtLink :to="projectsListPath">← All projects</NuxtLink></p>
        <h1 class="project-name">{{ project.name }}</h1>
        <p class="outcome">{{ project.outcome }}</p>
      </header>

      <figure v-if="project.cover" class="cover">
        <NuxtPicture
          :src="project.cover.src"
          :alt="project.cover.alt"
          format="avif,webp"
          width="1280"
          height="800"
          sizes="sm:100vw md:736px"
          preload
          :img-attrs="{ class: 'cover-image', fetchpriority: 'high' }"
        />
      </figure>

      <aside class="facts" aria-label="Project facts">
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{{ project.year }}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{{ statusLabels[project.status] }}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd><UiTagList :tags="project.tags" /></dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd><ProjectLinks :project="project" class="fact-links" /></dd>
          </div>
        </dl>
      </aside>

      <div class="content">
        <section v-for="section in project.sections" :key="section.heading">
          <UiSectionHeading>{{ section.heading }}</UiSectionHeading>
          <p v-for="(paragraph, i) in section.paragraphs" :key="i">
            {{ paragraph }}
          </p>
          <ul v-if="section.bullets" class="bullets">
            <li v-for="(bullet, i) in section.bullets" :key="i">{{ bullet }}</li>
          </ul>
        </section>

        <section v-if="project.gallery?.length" aria-labelledby="screens-heading">
          <UiSectionHeading id="screens-heading">Screens</UiSectionHeading>
          <ul class="gallery">
            <li v-for="image in project.gallery" :key="image.src">
              <figure>
                <a :href="image.src" class="gallery-link" target="_blank" rel="noopener">
                  <NuxtPicture
                    :src="image.src"
                    :alt="image.alt"
                    format="avif,webp"
                    width="1280"
                    height="800"
                    sizes="sm:100vw md:360px"
                    loading="lazy"
                    :img-attrs="{ class: 'gallery-image' }"
                  />
                  <span class="visually-hidden">(opens the full-size image)</span>
                </a>
                <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
              </figure>
            </li>
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
      </div>
    </article>
  </UiPageContainer>
</template>

<script lang="ts" setup>
import {
  adjacentProjects,
  projectOgImage,
  projectPath,
  projects,
  projectsListPath,
  statusLabels,
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
  ogImage: absoluteUrl(projectOgImage(project)),
  ogImageAlt: project.cover?.alt,
  twitterCard: "summary_large_image",
});

const { previous, next } = adjacentProjects(project.slug);
</script>

<style lang="scss" scoped>
.case-study {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "header"
    "cover"
    "facts"
    "content";
  gap: var(--space-5) 0;
}

.header {
  grid-area: header;
}

.cover {
  grid-area: cover;
  margin: 0;
}

.facts {
  grid-area: facts;
}

.content {
  grid-area: content;
}

.back {
  margin-top: var(--space-6);
}

.project-name {
  margin: var(--space-4) 0 var(--space-2);
  font-size: var(--text-4xl);
}

.outcome {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--text-xl);
  line-height: 1.5;
}

:deep(.cover-image) {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.facts {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  align-self: start;

  dl {
    display: grid;
    gap: var(--space-4);
    margin: 0;
  }

  dt {
    margin-bottom: var(--space-1);
    color: var(--color-text-muted);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    font-weight: 400;
  }
}

.fact-links {
  flex-direction: column;
}

.bullets li {
  margin-bottom: var(--space-2);
}

.gallery {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  figure {
    margin: 0;
  }

  figcaption {
    margin-top: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
}

.gallery-link {
  display: block;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
}

:deep(.gallery-image) {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
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

@media (max-width: 959px) {
  // Compact facts on small screens: short facts share rows, stack and links
  // take the full width.
  .facts dl {
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    gap: var(--space-4) var(--space-3);

    > div:nth-child(n + 4) {
      grid-column: 1 / -1;
    }
  }
}

@media (min-width: 640px) {
  .gallery {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  // Text and cover in the main column; the facts card stays in view beside them.
  .case-study {
    grid-template-columns: minmax(0, 1fr) 17rem;
    grid-template-areas:
      "header header"
      "cover facts"
      "content facts";
    gap: var(--space-5) var(--space-6);
  }

  .facts {
    position: sticky;
    top: 5.5rem;
  }
}
</style>
