<template>
  <ul class="project-links">
    <li v-if="project.live">
      <a :href="project.live">
        Live site<Icon name="material-symbols:arrow-outward" aria-hidden="true" />
        <span class="visually-hidden">(opens the live site)</span>
      </a>
    </li>
    <li v-if="project.repo">
      <a :href="project.repo">
        Repository<Icon name="material-symbols:arrow-outward" aria-hidden="true" />
        <span class="visually-hidden">(opens GitHub)</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Project } from "#shared/projects";

defineProps<{ project: Pick<Project, "live" | "repo"> }>();
</script>

<style lang="scss" scoped>
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
