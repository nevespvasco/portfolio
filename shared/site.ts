// Single source of truth for who the site is about and how to reach them.
// Lives in shared/ so both the app and server routes (sitemap, robots) can
// import it.

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

const email = "nevespvasco+jobs@gmail.com";

export const site = {
  name: "Vasco Neves",
  role: "Senior Frontend Engineer",
  description:
    "Vasco Neves, Senior Frontend Engineer in Lisbon. Data-heavy Vue 3, Nuxt and TypeScript apps, tested with Vitest and Playwright.",
  url: "https://www.vasconeves.com",
  location: { city: "Lisbon", country: "Portugal", countryCode: "PT" },
  languages: ["English", "Portuguese"],
  email,
  bookingUrl: "https://book.schedly.io/nevespvasco",
  socials: [
    { label: "GitHub", url: "https://github.com/nevespvasco", icon: "mdi:github" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/nevespvasco",
      icon: "mdi:linkedin",
    },
  ] satisfies SocialLink[],
  knowsAbout: ["Vue.js", "Nuxt", "TypeScript", "Vitest", "Playwright"],
} as const;

export const locationLabel = `${site.location.city}, ${site.location.country}`;

export const emailLink: SocialLink = {
  label: "Email",
  url: `mailto:${email}`,
  icon: "material-symbols:mail",
};

/** Socials followed by email: the full set of ways to reach the owner. */
export const contactLinks: SocialLink[] = [...site.socials, emailLink];

/** Absolute URL on the site for a path such as "/" or "/projects/x". */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).href;
}
