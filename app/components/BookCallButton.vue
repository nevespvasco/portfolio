<template>
  <a :href="site.bookingUrl" class="book-call">
    <Icon name="material-symbols:calendar-month-outline" aria-hidden="true" />
    Book a call
    <Icon name="material-symbols:arrow-outward" class="external" aria-hidden="true" />
    <span class="visually-hidden">(opens the booking site)</span>
  </a>
</template>

<script lang="ts" setup>
import { site } from "#shared/site";
</script>

<style scoped>
.book-call {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-md);
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgb(0 220 130 / 35%);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }
}

.external {
  font-size: 0.9em;
}

@media (prefers-reduced-motion: reduce) {
  .book-call {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
