<template>
  <aside class="contact-cta" :aria-labelledby="leadId">
    <p :id="leadId" class="lead">
      <slot>Want to talk?</slot>
    </p>
    <div class="actions">
      <BookCallButton />
      <UiLinkButton :to="emailLink.url" :icon="emailLink.icon">
        Send an email
      </UiLinkButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { emailLink } from "#shared/site";

const leadId = useId();
</script>

<style scoped>
.contact-cta {
  margin: var(--space-7) 0 var(--space-6);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
}

.lead {
  margin: 0 0 var(--space-4);
  font-size: var(--text-xl);
  font-weight: 500;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

/* The primary (filled) and secondary (outlined) actions share one size here,
   whatever their defaults are elsewhere. */
.actions > a {
  justify-content: center;
  min-height: 2.75rem;
  padding: var(--space-2) 1.1rem;
  font-size: var(--text-base);
}

/* Narrow phones: one per row, both full width. */
@media (max-width: 25rem) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
