<template>
  <NuxtLink :to="to" class="link-button">
    <Icon v-if="icon" :name="icon" class="link-button-icon" aria-hidden="true" />
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{ to: string; icon?: string }>();
</script>

<style scoped>
.link-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.35rem var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 0.95rem;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.link-button-icon {
  font-size: 1.2em;
}
</style>
