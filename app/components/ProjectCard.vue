<template>
  <article class="card">
    <h3 class="card-title">
      <NuxtLink :to="href">{{ project.name }}</NuxtLink>
    </h3>
    <p class="card-outcome">{{ project.outcome }}</p>
    <UiTagList :tags="project.tags" />
    <p class="card-links">
      <NuxtLink :to="href">Case study</NuxtLink>
      <a v-if="project.repo" :href="project.repo">Repository</a>
    </p>
  </article>
</template>

<script lang="ts" setup>
import type { Project } from "#shared/projects";

const props = defineProps<{ project: Project }>();
const href = computed(() => `/projects/${props.project.slug}`);
</script>

<style lang="scss" scoped>
.card {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
}

.card-title {
  margin: 0 0 var(--space-2);
  font-size: var(--text-xl);

  a {
    color: var(--color-text);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.card-outcome {
  margin: 0 0 var(--space-3);
}

.card-links {
  display: flex;
  gap: var(--space-4);
  margin: var(--space-3) 0 0;
}
</style>
