<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand">{{ site.name }}</NuxtLink>
    <nav class="nav" aria-label="Main">
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <NuxtLink
            :to="item.to"
            :class="['nav-item', { 'nav-item--active': item.id === active }]"
            :aria-current="item.id === active ? 'page' : undefined"
            @click="scrollIfAlreadyHome(item.to)"
          >
            <Icon :name="item.icon" class="nav-icon" aria-hidden="true" />
            <span class="nav-label">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="cta">
      <BookCallButton />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { site } from "#shared/site";
import type { NavItem } from "~/utils/navigation";

const navItems: { id: NavItem; label: string; icon: string; to: string }[] = [
  { id: "home", label: "Home", icon: "material-symbols:account-circle-full", to: "/" },
  {
    id: "projects",
    label: "Projects",
    icon: "material-symbols:book-2-outline-rounded",
    to: "/#projects",
  },
];

const route = useRoute();
const projectsInView = ref(false);
const active = computed(() => activeNavItem(route.path, projectsInView.value));

// Track the home page's Projects section so the nav follows scrolling. The
// observer is re-attached after every page change because the section only
// exists on the home page.
let observer: IntersectionObserver | undefined;

function observeProjects() {
  observer?.disconnect();
  projectsInView.value = false;
  const section = route.path === "/" ? document.getElementById("projects") : null;
  if (!section) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      projectsInView.value = entry?.isIntersecting ?? false;
    },
    // "In view" means the section crosses the middle band of the viewport.
    { rootMargin: "-45% 0px -45% 0px" },
  );
  observer.observe(section);
}

const nuxtApp = useNuxtApp();
onMounted(observeProjects);
const removeHook = nuxtApp.hook("page:transition:finish", observeProjects);
onBeforeUnmount(() => {
  observer?.disconnect();
  removeHook();
});

// Clicking a nav item for a spot on the page you're already on is a no-op
// navigation for the router, so scroll there explicitly.
function scrollIfAlreadyHome(to: string) {
  if (route.path !== "/") return;
  const id = to.split("#")[1];
  const target = id ? document.getElementById(id) : null;
  if (target) target.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  right: var(--gutter);
  bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  left: var(--gutter);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: var(--text-sm);
}

.brand {
  display: none;
}

.nav-list {
  display: flex;
  gap: var(--space-1);
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  box-shadow:
    0 2px 4px rgb(0 0 0 / 12%),
    0 8px 12px rgb(0 0 0 / 8%),
    0 8px 16px rgb(0 0 0 / 8%);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  min-width: 4rem;
  padding: var(--space-1) var(--space-3);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--text-xs);
  font-weight: 400;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-border);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.nav-item--active {
  background-color: var(--color-surface-raised);
  border-color: var(--color-border);
}

.nav-icon {
  font-size: 1.4em;
}

@media (min-width: 768px) {
  .site-header {
    position: relative;
    inset: auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: var(--space-4);
  }

  .brand {
    display: inline;
    justify-self: start;
    color: var(--color-text);
    font-weight: 500;
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 4px;
    }
  }

  .nav-list {
    background-color: var(--color-overlay);
    box-shadow: none;
  }

  .nav-item {
    flex-direction: row;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--text-sm);
  }

  .cta {
    justify-self: end;
  }
}
</style>
