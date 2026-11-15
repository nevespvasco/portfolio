<template>
  <a href="#main" class="skip-link">Skip to content</a>
</template>

<style lang="scss" scoped>
.skip-link {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 100;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-weight: 700;
  text-decoration: none;
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
}
</style>
