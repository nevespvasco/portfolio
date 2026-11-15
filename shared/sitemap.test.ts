import { describe, expect, it } from "vitest";
import { sitemapUrls } from "./sitemap";

describe("sitemapUrls", () => {
  it("lists the home page and one absolute URL per case study, in order", () => {
    expect(sitemapUrls(["filebridge", "pushguard"])).toEqual([
      "https://www.vasconeves.com/",
      "https://www.vasconeves.com/projects/filebridge",
      "https://www.vasconeves.com/projects/pushguard",
    ]);
  });
});
