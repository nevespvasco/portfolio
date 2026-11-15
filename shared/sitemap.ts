import { projectPath, projectsListPath } from "./projects";
import { absoluteUrl } from "./site";

/** Every public page: the top-level pages, then one case study per project slug. */
export function sitemapUrls(projectSlugs: readonly string[]): string[] {
  return [
    absoluteUrl("/"),
    absoluteUrl(projectsListPath),
    absoluteUrl("/experience"),
    ...projectSlugs.map((slug) => absoluteUrl(projectPath(slug))),
  ];
}
