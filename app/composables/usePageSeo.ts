import { absoluteUrl, site } from "#shared/site";

interface PageSeo {
  /** Page title without the site name, which is appended. */
  title: string;
  description: string;
  /** Path on the site, e.g. "/projects". */
  path: string;
  /** Preview image path under public/; defaults to the site-wide card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

/** Canonical URL, description and social-preview meta for a page. */
export function usePageSeo({
  title,
  description,
  path,
  image = "/og.jpg",
  imageAlt,
  type = "website",
}: PageSeo) {
  const url = absoluteUrl(path);
  const fullTitle = `${title} · ${site.name}`;

  useHead({ link: [{ rel: "canonical", href: url }] });
  useSeoMeta({
    title: fullTitle,
    description,
    ogType: type,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url,
    ogImage: absoluteUrl(image),
    ogImageAlt: imageAlt,
    twitterCard: "summary_large_image",
  });
}
