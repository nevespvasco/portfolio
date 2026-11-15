<template>
  <div class="skill-groups">
    <section
      v-for="group in groups"
      :key="group.name"
      class="skill-group"
      :aria-labelledby="groupId(group.name)"
    >
      <h3 :id="groupId(group.name)" class="skill-group-name">{{ group.name }}</h3>
      <ul class="skill-list">
        <li v-for="skill in group.skills" :key="skill.name" class="skill">
          <Icon
            :name="skill.icon"
            :class="['skill-icon', { 'skill-icon--silhouette': skill.silhouette }]"
            aria-hidden="true"
          />
          {{ skill.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { SkillGroup } from "~/data/skills";

defineProps<{ groups: SkillGroup[] }>();

const groupId = (name: string) =>
  `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
</script>

<style lang="scss" scoped>
.skill-groups {
  display: grid;
  gap: var(--space-5);
}

.skill-group-name {
  margin: 0 0 var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 500;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-weight: 400;
  white-space: nowrap;
  // The chips lift on hover, so they shouldn't also show a text cursor or
  // pick up stray selections; screen readers still read the names.
  cursor: default;
  user-select: none;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  // Only where hover is real: on touch screens it would stick after a tap.
  @media (hover: hover) {
    &:hover {
      border-color: var(--color-border-strong);
      transform: translateY(-2px);
    }
  }
}

.skill-icon {
  font-size: 1.25em;
}

.skill-icon--silhouette {
  filter: brightness(0) invert(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .skill {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
