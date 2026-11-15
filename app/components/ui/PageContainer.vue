<template>
  <main id="main" class="page-container" tabindex="-1">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.page-container {
  flex: 1;
  width: 100%;
  max-width: calc(var(--content-width) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 0 var(--gutter);

  /* Focus lands here from the skip link; no ring around the whole page. */
  &:focus {
    outline: none;
  }
}
</style>
