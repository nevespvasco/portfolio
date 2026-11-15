<template>
  <a :href="site.bookingUrl" class="book-call">
    <!-- Gooey bubbles: the button's green is painted by this layer, and the
         SVG filter melts the bubbles rising off its top edge into it. Each
         instance has its own filter id, so two buttons on a page never share
         one. -->
    <svg class="goo-filter" aria-hidden="true" focusable="false">
      <defs>
        <filter :id="filterId" x="-20%" y="-100%" width="140%" height="250%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <span class="goo" :style="{ filter: `url(#${filterId})` }" aria-hidden="true">
      <span
        v-for="(bubble, i) in bubbles"
        :key="i"
        class="bubble"
        :style="{
          '--left': `${bubble.left}%`,
          '--size': `${bubble.size}px`,
          '--duration': `${bubble.duration}s`,
          '--delay': `${-bubble.delay}s`,
        }"
      />
    </span>

    <Icon name="material-symbols:calendar-month-outline" aria-hidden="true" />
    Book a call
    <Icon name="material-symbols:arrow-outward" class="external" aria-hidden="true" />
    <span class="visually-hidden">(opens the booking site)</span>
  </a>
</template>

<script lang="ts" setup>
import { site } from "#shared/site";

const filterId = `goo-${useId()}`;

// Bubbles start just inside the top edge, rise a few pixels and shrink away,
// so they stay in the space above the button. Positions (% of the width),
// sizes (px) and timings (s) are fixed, not random, so every build looks the
// same.
const bubbles = [
  { left: 6, size: 20, duration: 2.6, delay: 0 },
  { left: 18, size: 16, duration: 3.1, delay: 1.2 },
  { left: 30, size: 22, duration: 2.8, delay: 0.5 },
  { left: 43, size: 17, duration: 3.4, delay: 2 },
  { left: 54, size: 21, duration: 2.7, delay: 0.9 },
  { left: 65, size: 16, duration: 3.2, delay: 1.6 },
  { left: 74, size: 20, duration: 2.9, delay: 0.3 },
  { left: 82, size: 15, duration: 3, delay: 2.4 },
];
</script>

<style lang="scss" scoped>
.book-call {
  position: relative;
  // Keeps the green layer (z-index -1) behind the label but inside the link.
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-md);
  color: var(--color-bg);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  // Only where hover is real: on touch screens it would stick after a tap.
  @media (hover: hover) {
    &:hover {
      box-shadow: 0 4px 16px rgb(0 220 130 / 35%);
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }
}

.goo-filter {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.goo {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--color-accent);
  pointer-events: none;
}

.bubble {
  position: absolute;
  top: 4px;
  left: var(--left);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: var(--color-accent);
  animation: rise var(--duration) linear var(--delay) infinite;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
  }

  100% {
    transform: translateY(-22px) scale(0.3);
  }
}

.external {
  font-size: 0.9em;
}

@media (prefers-reduced-motion: reduce) {
  .book-call {
    transition: none;

    &:hover {
      transform: none;
    }
  }

  .bubble {
    display: none;
  }
}
</style>
