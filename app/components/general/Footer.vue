<template>
  <footer>
    <span>
      &#169; {{ new Date().getFullYear() }} / {{ site.name }}
    </span>
    <div class="footer-icons">
      <a
        v-for="link in contactLinks"
        :key="link.label"
        :href="link.url"
        :aria-label="link.label"
      >
        <Icon :name="link.icon" aria-hidden="true" />
      </a>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { contactLinks, site } from "#shared/site";
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin: var(--space-7) auto var(--space-4);
  font-size: var(--text-sm);
}

.footer-icons {
  display: flex;
  gap: 1.25rem;

  a {
    color: inherit;
    font-size: 1.5em;
    line-height: 0;

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 4px;
    }
  }
}

@media (min-width: 768px) {
  footer {
    flex-direction: row;
    justify-content: space-around;
    gap: 0;
    margin: var(--space-4) 0;
  }
}
</style>
