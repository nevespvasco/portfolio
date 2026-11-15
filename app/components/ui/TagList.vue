<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ tags: readonly string[] }>();
</script>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-xs);
}

.tag {
  padding: 0.15rem 0.6rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-pill);
}
</style>
