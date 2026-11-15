<template>
  <main id="main" class="page-container">
    <slot />
  </main>
</template>

<style scoped>
.page-container {
  flex: 1;
  width: 100%;
  max-width: calc(var(--content-width) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 0 var(--gutter);
}
</style>
