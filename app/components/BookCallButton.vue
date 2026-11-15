<template>
  <a :href="site.bookingUrl" class="book-call">
    <!-- Gooey bubbles: the button's green is painted by this layer, and the
         SVG filter melts the bubbles into it, so they stretch off the top edge
         and break away as drops. Each instance has its own filter id, so two
         buttons on a page never share one. -->
    <svg class="goo-filter" aria-hidden="true" focusable="false">
      <defs>
        <!-- Tall enough to hold the drops at the top of their rise. -->
        <filter :id="filterId" x="-20%" y="-400%" width="140%" height="550%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
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
          '--left': `${bubble.left}px`,
          '--rise': `${bubble.rise}px`,
          '--duration': `${3 + (i + 1) * 0.02}s`,
          '--delay': `${(i + 1) * 0.2}s`,
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

// The original animation: ten 25px bubbles along the left of the button rise
// 50-130px, break away as drops and start again from the edge, each a little
// later than the one before. The original picked positions (px from the left)
// and heights (px) at random per build; these are fixed so every build looks
// the same.
const bubbles = [
  { left: 23, rise: 92 },
  { left: 71, rise: 61 },
  { left: 48, rise: 118 },
  { left: 95, rise: 74 },
  { left: 15, rise: 130 },
  { left: 62, rise: 55 },
  { left: 84, rise: 103 },
  { left: 37, rise: 87 },
  { left: 56, rise: 66 },
  { left: 29, rise: 121 },
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
  top: 0;
  left: var(--left);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--color-accent);
  animation: rise var(--duration) var(--delay) infinite;
}

@keyframes rise {
  0% {
    transform: translateY(0);
  }

  99% {
    transform: translateY(calc(-1 * var(--rise)));
  }

  100% {
    transform: translateY(0);
    opacity: 0;
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
