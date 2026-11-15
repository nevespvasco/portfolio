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
