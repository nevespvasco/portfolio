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
          <ul ref="navList" class="nav-list">
            <li v-for="(item, i) in navItems" :key="item.id" :style="{ '--i': i }">
              <NuxtLink
                :to="item.to"
                :class="['nav-item', { 'nav-item--active': item.id === active }]"
                :aria-current="item.id === active ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
          <!-- Desktop only: one bar that slides under the active item. -->
          <span
            class="nav-indicator"
            :class="{ 'nav-indicator--animated': indicator.animated }"
            :style="indicatorStyle"
            aria-hidden="true"
          />
        </nav>
        <div class="cta">
          <BookCallButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { experiencePath } from "#shared/experience";
import { projectsListPath } from "#shared/projects";
import { site } from "#shared/site";
import type { NavItem } from "~/utils/navigation";

const navItems: { id: NavItem; label: string; to: string }[] = [
  { id: "home", label: "Home", to: "/" },
  { id: "projects", label: "Projects", to: projectsListPath },
  { id: "experience", label: "Experience", to: experiencePath },
];

const route = useRoute();
const active = computed(() => activeNavItem(route.path));

// The sliding indicator is measured from the active link, so it's placed only
// once mounted and again whenever the active item or the list's size changes
// (fonts loading, resizing). Transitions switch on after the first placement,
// so landing on a page never animates.
const navList = ref<HTMLElement>();
const indicator = reactive({ x: 0, width: 0, visible: false, animated: false });
const indicatorStyle = computed(() => ({
  opacity: indicator.visible ? 1 : 0,
  transform: `translateX(${indicator.x}px) scaleX(${indicator.width})`,
}));

function placeIndicator() {
  const link = navList.value?.querySelector<HTMLElement>('[aria-current="page"]');
  indicator.visible = Boolean(link);
  if (!link) return;
  indicator.x = link.offsetLeft;
  indicator.width = link.offsetWidth;
}

watch(active, () => nextTick(placeIndicator), { flush: "post" });

let resizeObserver: ResizeObserver | undefined;

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

  placeIndicator();
  requestAnimationFrame(() => {
    indicator.animated = true;
  });
  resizeObserver = new ResizeObserver(placeIndicator);
  if (navList.value) resizeObserver.observe(navList.value);
});
onBeforeUnmount(() => {
  resizeObserver?.disconnect();
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
  max-width: calc(var(--wide-width) + 2 * var(--gutter));
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

// Mobile: the menu is a full-width panel that drops in under the bar. It
// stays rendered so it can fade both ways; `visibility` keeps it out of the
// tab order and the accessibility tree while closed.
.menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  padding: var(--space-3) var(--gutter) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0s linear 0.2s;

  &.menu--open {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0s;
  }
}

.menu--open .nav-list > li {
  animation: nav-item-in 0.3s ease both;
  animation-delay: calc(var(--i) * 60ms + 40ms);
}

@keyframes nav-item-in {
  from {
    opacity: 0;
    transform: translateY(-0.4rem);
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
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;

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

// Mobile shows the active item as a highlighted row instead.
.nav-indicator {
  display: none;
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
  // `visibility` is inherited through `display: contents`, so reset it.
  .menu,
  .menu.menu--open {
    display: contents;
    visibility: visible;
  }

  .menu--open .nav-list > li {
    animation: none;
  }

  .nav {
    position: relative;
  }

  .nav-list {
    display: flex;
    gap: var(--space-1);
  }

  .nav-item {
    position: relative;
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);

    // Hover: a faint underline grows from the middle of the item.
    &::after {
      position: absolute;
      right: var(--space-4);
      bottom: 0.3rem;
      left: var(--space-4);
      height: 1px;
      background-color: var(--color-border-strong);
      content: "";
      transform: scaleX(0);
      transition: transform 0.25s ease;
    }

    &:hover::after,
    &:focus-visible::after {
      transform: scaleX(1);
    }
  }

  .nav-item--active::after {
    visibility: hidden;
  }

  // The active marker: a 1px-wide bar scaled to the active link's width and
  // moved under it, sitting on the header's bottom border. Only transform and
  // opacity change, so sliding it costs no layout.
  .nav-indicator {
    display: block;
    position: absolute;
    bottom: calc(-1 * var(--space-3) - 1px);
    left: 0;
    width: 1px;
    height: 2px;
    background-color: var(--color-accent);
    pointer-events: none;
    transform-origin: left;
  }

  .nav-indicator--animated {
    transition:
      transform 0.35s cubic-bezier(0.3, 0.7, 0.2, 1),
      opacity 0.2s ease;
  }

  .cta {
    justify-self: end;
    padding: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu,
  .menu.menu--open,
  .nav-item,
  .nav-item::after,
  .nav-indicator--animated {
    transition: none;
  }

  .menu {
    transform: none;
  }

  .menu--open .nav-list > li {
    animation: none;
  }
}
</style>
