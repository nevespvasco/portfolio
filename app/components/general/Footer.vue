<template>
  <footer>
    <span class="footer-copyright">
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

<style lang="scss">
footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 3rem auto 1rem auto;
  font-size: 0.825rem;
  align-items: center;
  gap: 1rem;
}

.footer-copyright {
  color: var(--white);
}

.footer-icons {
  display: flex;
  gap: 1.25rem;
  a {
    color: inherit;
    font-size: 1.5em;
    line-height: 0;
  }
}

@media (min-width: 768px) {
  footer {
    justify-content: space-around;
    flex-direction: row;
    margin: 1rem 0;
    gap: 0;
  }
}
</style>
