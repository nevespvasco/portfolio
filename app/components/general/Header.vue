<template>
  <header ref="headerEl" class="site-header">
    <div class="bar">
      <NuxtLink to="/" class="brand">{{ site.name }}</NuxtLink>

      <button
        ref="menuButton"
        type="button"
        class="menu-button"
        aria-controls="site-menu"
        :aria-expanded="open"
        @click="open = !open"
      >
        <Icon
          :name="open ? 'material-symbols:close' : 'material-symbols:menu'"
          aria-hidden="true"
        />
        Menu
      </button>

      <div id="site-menu" class="menu" :class="{ 'menu--open': open }">
        <nav class="nav" aria-label="Main">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.id">
              <NuxtLink
                :to="item.to"
                :class="['nav-item', { 'nav-item--active': item.id === active }]"
                :aria-current="item.id === active ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="cta">
          <BookCallButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { projectsListPath } from "#shared/projects";
import { site } from "#shared/site";
import type { NavItem } from "~/utils/navigation";

const navItems: { id: NavItem; label: string; to: string }[] = [
  { id: "home", label: "Home", to: "/" },
  { id: "projects", label: "Projects", to: projectsListPath },
];

const route = useRoute();
const active = computed(() => activeNavItem(route.path));

// Mobile menu: opens with the button; closes with Escape (focus returns to
// the button), on navigation and on a click outside the header.
const open = ref(false);
const headerEl = ref<HTMLElement>();
const menuButton = ref<HTMLButtonElement>();

watch(() => route.fullPath, () => {
  open.value = false;
});

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Escape" || !open.value) return;
  open.value = false;
  menuButton.value?.focus();
}

function onPointerDown(event: PointerEvent) {
  if (open.value && !headerEl.value?.contains(event.target as Node)) open.value = false;
}

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("pointerdown", onPointerDown);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("pointerdown", onPointerDown);
});
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg);
  font-size: var(--text-sm);
}

.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-3) var(--gutter);
}

.brand {
  color: var(--color-text);
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
}

.brand,
.menu-button,
.nav-item {
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
}

.menu-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: none;
  color: var(--color-text);
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--color-surface);
  }
}

// Mobile: the menu is a full-width panel under the bar.
.menu {
  display: none;
  flex-basis: 100%;
  padding-top: var(--space-3);

  &.menu--open {
    display: block;
  }
}

.nav-list {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  display: block;
  padding: var(--space-3);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--text-base);
  font-weight: 400;
  text-decoration: none;

  &:hover {
    background-color: var(--color-surface);
  }
}

.nav-item--active {
  border-color: var(--color-border);
  background-color: var(--color-surface-raised);
}

.cta {
  padding: var(--space-3) 0 var(--space-1);
}

@media (min-width: 768px) {
  .bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding-block: var(--space-3);
  }

  .menu-button {
    display: none;
  }

  // Desktop: the panel disappears and its children join the bar's grid.
  .menu,
  .menu.menu--open {
    display: contents;
  }

  .nav-list {
    display: flex;
    gap: var(--space-1);
  }

  .nav-item {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }

  .cta {
    justify-self: end;
    padding: 0;
  }
}
</style>
