<template>
  <div id="app">
    <SkipLink />
    <div id="page--background" aria-hidden="true" />
    <GeneralHeader />
    <UiPageContainer>
      <section class="error" aria-labelledby="error-title">
        <p class="status">{{ error.statusCode }}</p>
        <h1 id="error-title" class="title">{{ heading }}</h1>
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button type="button" class="action" @click="leave('/#projects')">
            See all projects
          </button>
          <button type="button" class="action" @click="leave('/')">
            Go to the home page
          </button>
        </div>
      </section>
    </UiPageContainer>
    <GeneralFooter />
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";
import { site } from "#shared/site";

const props = defineProps<{ error: NuxtError }>();

const notFound = computed(() => props.error.statusCode === 404);
const heading = computed(() =>
  notFound.value ? "This page doesn't exist" : "Something went wrong",
);
// Never show the raw error or stack trace, only a fixed, friendly message.
const message = computed(() =>
  notFound.value
    ? "The link may be old or mistyped. The projects list has everything that's here."
    : "Sorry, this page failed to load. Try again in a moment, or head back home.",
);

useHead({
  title: computed(() => `${heading.value} · ${site.name}`),
  htmlAttrs: { lang: "en" },
});

function leave(to: string) {
  clearError({ redirect: to });
}
</script>

<style lang="scss" scoped>
.error {
  padding: var(--space-8) 0;
}

.status {
  margin: 0;
  color: var(--color-accent);
  font-size: var(--text-xl);
  font-weight: 700;
}

.title {
  margin: var(--space-2) 0 var(--space-4);
  font-size: var(--text-4xl);
}

.message {
  margin: 0 0 var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.action {
  padding: 0.5rem var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border-color: var(--color-border-strong);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}
</style>
