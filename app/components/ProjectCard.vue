<template>
  <article class="card" :class="{ 'card--compact': compact }">
    <div v-if="project.cover" class="cover">
      <!-- Decorative here: the title link names the card, and the case study
           shows the cover with its real description. -->
      <NuxtPicture
        :src="project.cover.src"
        alt=""
        format="avif,webp"
        width="1280"
        height="800"
        :sizes="compact ? 'sm:100vw md:240px' : 'sm:100vw md:736px'"
        :loading="priority ? 'eager' : 'lazy'"
        :preload="priority"
        :img-attrs="{ class: 'cover-image' }"
      />
    </div>

    <div class="body">
      <p class="meta">
        <span class="status" :class="`status--${project.status}`">{{ statusLabels[project.status] }}</span>
        <span>{{ project.year }}</span>
      </p>
      <h3 class="title">
        <NuxtLink :to="href">{{ project.name }}</NuxtLink>
      </h3>
      <p class="outcome">{{ project.outcome }}</p>
      <UiTagList :tags="project.tags" />
      <ProjectLinks :project="project" class="links" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { type Project, projectPath, statusLabels } from "#shared/projects";

const props = defineProps<{
  project: Project;
  /** Smaller layout for lists on the home page. */
  compact?: boolean;
  /** Load the cover eagerly: set it for the first card on a page. */
  priority?: boolean;
}>();
const href = computed(() => projectPath(props.project.slug));
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--color-border-strong);
  }

  // The title link covers the whole card; the Live site / Repository links
  // sit above it so they stay separately clickable.
  &:has(.title a:focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.cover {
  aspect-ratio: 16 / 10;
  background-color: var(--color-bg);
}

:deep(.cover-image) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.body {
  padding: 1.25rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0 0 var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.status {
  padding: 0.1rem 0.55rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-weight: 500;
}

.status--production {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.title {
  margin: 0 0 var(--space-2);
  font-size: var(--text-xl);

  a {
    color: var(--color-text);
    text-decoration: none;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
    }

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: none;
    }
  }
}

.outcome {
  margin: 0 0 var(--space-3);
}

.links {
  margin-top: var(--space-3);

  :deep(a) {
    position: relative;
    z-index: 1;
  }
}

@media (min-width: 768px) {
  .card--compact {
    grid-template-columns: 15rem 1fr;
    align-items: start;

    // A small 16:10 thumbnail beside the text, never cropped to the card height.
    .cover {
      margin: 1.25rem 0 1.25rem 1.25rem;
      overflow: hidden;
      border-radius: var(--radius-md);
    }
  }
}
</style>
