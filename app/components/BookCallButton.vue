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
      <span v-for="n in bubbleCount" :key="n" class="bubble" />
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
const bubbleCount = 8;
</script>

<style lang="scss" scoped>
@use "sass:list";
@use "sass:map";

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

// Bubbles start just inside the top edge, rise a few pixels and shrink away,
// so they never reach past the space above the button. Positions and timings
// are fixed (not random) so every build looks the same.
$bubbles: (
  (left: 6%, size: 20px, duration: 2.6s, delay: 0s),
  (left: 18%, size: 16px, duration: 3.1s, delay: 1.2s),
  (left: 30%, size: 22px, duration: 2.8s, delay: 0.5s),
  (left: 43%, size: 17px, duration: 3.4s, delay: 2s),
  (left: 54%, size: 21px, duration: 2.7s, delay: 0.9s),
  (left: 65%, size: 16px, duration: 3.2s, delay: 1.6s),
  (left: 74%, size: 20px, duration: 2.9s, delay: 0.3s),
  (left: 82%, size: 15px, duration: 3s, delay: 2.4s),
);

.bubble {
  position: absolute;
  top: 4px;
  border-radius: 50%;
  background-color: var(--color-accent);
  animation: rise linear infinite;

  @each $b in $bubbles {
    $i: list.index($bubbles, $b);

    &:nth-child(#{$i}) {
      left: map.get($b, left);
      width: map.get($b, size);
      height: map.get($b, size);
      animation-duration: map.get($b, duration);
      animation-delay: -(map.get($b, delay));
    }
  }
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
