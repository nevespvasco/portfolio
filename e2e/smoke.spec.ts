import { expect, test } from "@playwright/test";

// Every page loads cleanly in every engine: a heading, no script errors and,
// at phone width, nothing wider than the screen.
const pages = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "case study", path: "/projects/filebridge" },
  { name: "experience", path: "/experience" },
  { name: "404", path: "/projects/does-not-exist", notFound: true },
];

for (const { name, path, notFound } of pages) {
  test(`${name} loads without errors or horizontal scroll`, async ({ page }, testInfo) => {
    // Vercel Analytics and Speed Insights are served by Vercel, not the app.
    await page.route("**/_vercel/**", (route) =>
      route.fulfill({ contentType: "text/javascript", body: "" }),
    );
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      // The 404 page's own response is logged as a failed resource load.
      if (notFound && message.text().includes("404")) return;
      errors.push(message.text());
    });

    // Desktop projects are also checked at phone width; device projects
    // keep their own screen.
    if (!testInfo.project.use.isMobile) await page.setViewportSize({ width: 375, height: 812 });
    const response = await page.goto(path);
    expect(response?.status()).toBe(notFound ? 404 : 200);
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}
