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
</style>
