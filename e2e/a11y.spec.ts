import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "experience", path: "/experience" },
  { name: "case study", path: "/projects/filebridge" },
  { name: "404", path: "/projects/does-not-exist" },
];

for (const { name, path } of pages) {
  for (const width of [375, 1280]) {
    test(`${name} at ${width}px has no serious or critical axe violations`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();
      const blocking = violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(blocking).toEqual([]);
    });
  }
}

test("the skip link is the first thing Tab reaches and jumps to the content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens with the button, closes with Escape and gives focus back", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const button = page.getByRole("button", { name: "Menu" });
    const menu = page.locator("#site-menu");

    await expect(menu).toBeHidden();
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(menu.getByRole("link", { name: "Experience" })).toBeVisible();

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    expect(violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
  });

  test("closes when a link is followed", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator("#site-menu").getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.locator("#site-menu")).toBeHidden();
  });
});
