import { expect, test } from "@playwright/test";

// Rendered-behaviour checks for small UI details, against the production build.

test("skill chips show the default cursor and their labels aren't selectable", async ({ page }) => {
  await page.goto("/");
  const chip = page.locator(".skill").first();
  await expect(chip).toHaveCSS("cursor", "default");
  await expect(chip).toHaveCSS("user-select", "none");
  // Screen readers still get the name.
  await expect(page.getByRole("listitem").filter({ hasText: /^\s*Vitest\s*$/ })).toBeVisible();
});

test.describe("\"Want to talk?\" buttons", () => {
  const cta = (page: import("@playwright/test").Page) => page.locator(".contact-cta");

  test("are the same height and at least 44px tall on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const book = await cta(page).getByRole("link", { name: /Book a call/ }).boundingBox();
    const email = await cta(page).getByRole("link", { name: /Send an email/ }).boundingBox();
    expect(book!.height).toBeGreaterThanOrEqual(44);
    expect(email!.height).toBeCloseTo(book!.height, 0);
  });

  test("stack one per row at the same full width on narrow phones", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const actions = await cta(page).locator(".actions").boundingBox();
    const book = await cta(page).getByRole("link", { name: /Book a call/ }).boundingBox();
    const email = await cta(page).getByRole("link", { name: /Send an email/ }).boundingBox();
    expect(email!.y).toBeGreaterThan(book!.y + book!.height - 1);
    expect(book!.width).toBeCloseTo(actions!.width, 0);
    expect(email!.width).toBeCloseTo(actions!.width, 0);
    expect(email!.height).toBeCloseTo(book!.height, 0);
  });
});

test.describe("\"Book a call\" bubbles", () => {
  // Every bubble animation, jumped to `fraction` of its run, so geometry can
  // be measured at the furthest point of travel.
  async function seekBubbles(page: import("@playwright/test").Page, fraction: number) {
    await page.evaluate((f) => {
      for (const a of document.getAnimations()) {
        const target = (a.effect as KeyframeEffect | null)?.target as Element | null;
        if (!target?.classList.contains("bubble")) continue;
        const duration = Number(a.effect!.getTiming().duration);
        a.pause();
        a.currentTime = duration * f;
      }
    }, fraction);
  }

  test("both buttons bubble, each with its own filter", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const buttons = page.locator(".book-call");
    await expect(buttons).toHaveCount(2);
    for (const button of await buttons.all()) {
      await expect(button.locator(".bubble").first()).toBeVisible();
    }
    const ids = await page.locator(".book-call filter").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    const filters = await page.locator(".book-call .goo").evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).filter),
    );
    filters.forEach((filter, i) => expect(filter).toContain(`#${ids[i]}`));
  });

  test("bubbles stay just above their button and never take clicks", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    for (const fraction of [0, 0.5, 0.99]) {
      await seekBubbles(page, fraction);
      for (const button of await page.locator(".book-call").all()) {
        const box = (await button.boundingBox())!;
        for (const bubble of await button.locator(".bubble").all()) {
          const b = (await bubble.boundingBox())!;
          expect(b.x).toBeGreaterThanOrEqual(box.x - 1);
          expect(b.x + b.width).toBeLessThanOrEqual(box.x + box.width + 1);
          expect(b.y).toBeGreaterThanOrEqual(box.y - 16);
          expect(b.y + b.height).toBeLessThanOrEqual(box.y + box.height);
        }
      }
    }
    await expect(page.locator(".book-call .goo").first()).toHaveCSS("pointer-events", "none");
  });

  test("the hidden filter SVG is hidden from assistive tech and takes no space", async ({ page }) => {
    await page.goto("/");
    const svg = page.locator(".book-call svg.goo-filter").first();
    await expect(svg).toHaveAttribute("aria-hidden", "true");
    const box = await svg.boundingBox();
    expect(box?.width ?? 0).toBe(0);
    expect(box?.height ?? 0).toBe(0);
  });

  test("there are no bubbles under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".book-call").first()).toBeVisible();
    await expect(page.locator(".book-call .bubble")).not.toHaveCount(0);
    await expect(page.locator(".book-call .bubble").first()).toBeHidden();
  });
});
