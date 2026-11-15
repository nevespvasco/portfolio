import { projects } from "#shared/projects";
import { sitemapUrls } from "#shared/sitemap";

export default defineEventHandler((event) => {
  const urls = sitemapUrls(projects.map((project) => project.slug))
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n");

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
