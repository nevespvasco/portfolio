<template>
  <component :is="as" class="section-heading">
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ as?: "h2" | "h3" }>(), { as: "h2" });
</script>

<style scoped>
.section-heading {
  font-size: var(--text-3xl);
  margin: var(--space-7) 0 var(--space-4);
}
</style>
