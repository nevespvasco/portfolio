<template>
  <main id="main" class="page-container" :class="{ 'page-container--wide': wide }" tabindex="-1">
    <slot />
  </main>
</template>

<script lang="ts" setup>
defineProps<{
  /** A wider column, for pages that lay content out in two columns. */
  wide?: boolean;
}>();
</script>

<style lang="scss" scoped>
.page-container {
  flex: 1;
  width: 100%;
  max-width: calc(var(--content-width) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 0 var(--gutter);

  &.page-container--wide {
    max-width: calc(var(--wide-width) + 2 * var(--gutter));
  }

  /* Focus lands here from the skip link; no ring around the whole page. */
  &:focus {
    outline: none;
  }
}
</style>
