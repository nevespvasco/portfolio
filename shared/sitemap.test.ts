import { describe, expect, it } from "vitest";
import { sitemapUrls } from "./sitemap";

describe("sitemapUrls", () => {
  it("lists the home, projects and experience pages, then one case study per slug in order", () => {
    expect(sitemapUrls(["filebridge", "pushguard"])).toEqual([
      "https://www.vasconeves.com/",
      "https://www.vasconeves.com/projects",
      "https://www.vasconeves.com/experience",
      "https://www.vasconeves.com/projects/filebridge",
      "https://www.vasconeves.com/projects/pushguard",
    ]);
  });
});
