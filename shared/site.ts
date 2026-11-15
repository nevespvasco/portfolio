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
  languages: ["Portuguese", "English"],
  /** First year working in frontend; the bio counts years from it. */
  careerStartYear: 2020,
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

/** Whole years since careerStartYear, so the bio never needs a yearly edit. */
export function yearsInFrontend(now = new Date()): number {
  return now.getFullYear() - site.careerStartYear;
}

/** Home page copy about the owner. */
export const copy = {
  bio: () =>
    `I build complex, data-heavy web applications with Vue 3, Nuxt and TypeScript, where a wrong number or a broken state costs someone. I have ${yearsInFrontend()}+ years in frontend, from enterprise migrations and design systems to test suites with Vitest and Playwright, and I ship the backend slice of my own features too (Laravel, NestJS, PostgreSQL).`,
  howIBuild:
    "I work AI-first every day with Claude Code and Cursor: I brief agents on multi-file changes, review every diff they produce, and lean on the test suites as guardrails. I own the decisions; the agents do the typing.",
};

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
