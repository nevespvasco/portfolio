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
