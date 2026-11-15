import { absoluteUrl } from "./site";

/** Every public page: the home page, then one case study per project slug. */
export function sitemapUrls(projectSlugs: readonly string[]): string[] {
  return [absoluteUrl("/"), ...projectSlugs.map((slug) => absoluteUrl(`/projects/${slug}`))];
}
