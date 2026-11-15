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
    await expect(page.locator(".contact-cta .book-call")).toBeVisible();
    await expect(page.locator(".book-call .bubble")).not.toHaveCount(0);
    await expect(page.locator(".book-call .bubble").first()).toBeHidden();
  });
});

test.describe("main navigation", () => {
  type Page = import("@playwright/test").Page;
  const nav = (page: Page) => page.getByRole("navigation", { name: "Main" });

  // The indicator's box next to the active link's, in page pixels.
  async function indicatorAndActive(page: Page) {
    return page.evaluate(() => {
      const indicator = document.querySelector(".nav-indicator")!.getBoundingClientRect();
      const active = document.querySelector('.nav [aria-current="page"]')!.getBoundingClientRect();
      return { indicator: { x: indicator.x, width: indicator.width }, active: { x: active.x, width: active.width } };
    });
  }

  const runningTransitions = (page: Page) =>
    page.evaluate(() =>
      document.getAnimations().filter((a) => {
        const target = (a.effect as KeyframeEffect | null)?.target as Element | null;
        return target?.classList.contains("nav-indicator");
      }).length,
    );

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
  });

  test("landing on a page puts the indicator on its item without animating", async ({ page }) => {
    await page.goto("/projects/filebridge");
    await expect(nav(page).locator(".nav-indicator")).toBeVisible();
    expect(await runningTransitions(page)).toBe(0);
    const { indicator, active } = await indicatorAndActive(page);
    await expect(nav(page).locator('[aria-current="page"]')).toHaveText("Projects");
    expect(indicator.x).toBeCloseTo(active.x, 0);
    expect(indicator.width).toBeCloseTo(active.width, 0);
  });

  test("navigating slides the indicator to the new item", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await nav(page).getByRole("link", { name: "Experience" }).click();
    await expect.poll(() => runningTransitions(page)).toBeGreaterThan(0);
    await expect(page).toHaveURL(/\/experience$/);
    await expect.poll(async () => {
      const { indicator, active } = await indicatorAndActive(page);
      return Math.abs(indicator.x - active.x) + Math.abs(indicator.width - active.width);
    }).toBeLessThan(1);
  });

  test("hovering an item grows its underline", async ({ page }) => {
    await page.goto("/");
    const projects = nav(page).getByRole("link", { name: "Projects" });
    const underline = () => projects.evaluate((el) => getComputedStyle(el, "::after").transform);
    expect(await underline()).toMatch(/matrix\(0,/);
    await projects.hover();
    await expect.poll(underline).toBe("matrix(1, 0, 0, 1, 0, 0)");
  });

  test("nothing animates under reduced motion, and the active item still shows", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await nav(page).getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/\/experience$/);
    expect(await runningTransitions(page)).toBe(0);
    const { indicator, active } = await indicatorAndActive(page);
    expect(indicator.x).toBeCloseTo(active.x, 0);
  });

  test.describe("on mobile", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
    });

    test("the menu items come in with a staggered animation", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Menu" }).click();
      const delays = await page.locator("#site-menu .nav-list > li").evaluateAll((items) =>
        items.map((li) => getComputedStyle(li).animationDelay),
      );
      expect(delays).toHaveLength(3);
      expect(new Set(delays).size).toBe(3);
      await expect(page.locator("#site-menu").getByRole("link", { name: "Experience" })).toBeVisible();
    });

    test("the menu fades out when it closes", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(page.locator("#site-menu")).toHaveCSS("opacity", "1");
      await page.keyboard.press("Escape");
      await expect(page.locator("#site-menu")).toHaveCSS("transition-property", /opacity/);
      await expect(page.locator("#site-menu")).toBeHidden();
    });
  });
});
