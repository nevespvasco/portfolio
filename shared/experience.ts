// Work history and education, transcribed from the LinkedIn profile (the
// new export). Only what is already public there goes on the site: each
// role's stack lists only tools its own text names.

export interface Role {
  company: string;
  title: string;
  /** "YYYY-MM". */
  start: string;
  /** "YYYY-MM"; left out for the role held today. */
  end?: string;
  location?: string;
  paragraphs?: string[];
  bullets?: string[];
  stack?: string[];
}

export interface Education {
  institution: string;
  qualification: string;
  /** Years or "Mon YYYY" strings, as shown on the profile. */
  period: string;
}

// Most recent first.
export const roles: Role[] = [
  {
    company: "OFFX",
    title: "Frontend Software Engineer",
    start: "2025-03",
    paragraphs: [
      "OFFX is a venue for private-market liquidity: locked and liquid tokens, pre-IPO equity secondaries, fund secondaries and SPVs, used by 1,000+ institutional counterparties.",
      "I work on the frontend of the trading platform across the whole deal lifecycle: exploring assets, creating listings with premium/discount pricing and public, targeted or private distribution, negotiating bids and offers, and following deals through to settlement, including token lockup and unlock data and price-history charts.",
    ],
    stack: ["Vue 3", "Nuxt", "TypeScript", "Pinia", "TanStack Query", "Vitest", "Playwright", "Figma"],
  },
  {
    company: "Siemens",
    title: "Software Developer",
    start: "2022-10",
    end: "2025-03",
    location: "Amadora, Lisbon, Portugal",
    bullets: [
      "Led full SAP UI5 to Vue 3 migration of a 12-screen, 30+ component enterprise application for ~1,800 internal users, eliminated legacy framework constraints and unblocked the team from shipping new features without UI5 restrictions.",
      "Automated workflows in an internal real estate ticketing system, eliminating 6+ months of cumulative manual effort across the operations team, highest single-impact delivery of the tenure.",
      "Designed a reusable Vue 3 component library adopted across the 13 person team, eliminating duplication across 30+ components and reducing integration overhead on every subsequent feature.",
    ],
    stack: ["Vue 3", "SAP UI5"],
  },
  {
    company: "NOS SGPS",
    title: "Frontend Developer",
    start: "2022-01",
    end: "2022-10",
    location: "Lisbon, Portugal",
    bullets: [
      "Developed and enhanced customer-facing and internal applications using JavaScript, HTML, and SCSS",
      "Improved UX consistency by refining design guidelines and implementing reusable UI patterns",
      "Actively contributed to Agile delivery processes",
    ],
    stack: ["JavaScript", "HTML", "SCSS"],
  },
  {
    company: "Wonderstaff",
    title: "Frontend Engineer",
    start: "2022-05",
    end: "2022-07",
    location: "Lisbon, Portugal",
    bullets: [
      "Translated UI wireframes into user-friendly React applications.",
      "Created a consistent user interface only for desktop devices.",
      "Optimized application for speed and scalability",
    ],
    stack: ["React"],
  },
  {
    company: "Sinmetro",
    title: "Full Stack Developer",
    start: "2021-02",
    end: "2022-01",
    location: "Leiria, Portugal",
    bullets: [
      "Built custom web applications using Vue.js and Laravel, delivering tailored solutions to client requirements",
      "Increased client retention and expanded the customer base by ~15% through improved digital workflows",
      "Implemented Docker based deployment pipelines, reducing downtime and deployment friction",
      "Developed a React Native mobile application to support field operations in low-bandwidth environments",
    ],
    stack: ["Vue.js", "Laravel", "Docker", "React Native"],
  },
  {
    company: "NBCLINIC",
    title: "Full Stack Developer",
    start: "2020-09",
    end: "2020-10",
    location: "Lisbon, Portugal",
    bullets: [
      "Redesigned the clinic's website from scratch, creating wireframes in Adobe XD and implementing the frontend with Bulma, aligning with brand standards and improving UX.",
      "Introduced GitHub for version control and Trello for task tracking, establishing a structured workflow for the project.",
    ],
    stack: ["Adobe XD", "Bulma", "GitHub", "Trello"],
  },
  {
    company: "Mediaweb Global",
    title: "Web Developer",
    start: "2019-02",
    end: "2019-06",
    location: "Leiria, Portugal",
    bullets: [
      "Migrated Randstad's Style Guide to OutSystems, improving consistency across their digital interfaces.",
      "Enhanced the MediaWeb and LD Auto websites with design and development improvements.",
      "Created mockup proposals and newsletters for client campaigns.",
      "Developed a seasonal web application for Lusiaves Company from concept to delivery.",
    ],
    stack: ["OutSystems"],
  },
  {
    company: "Pombalsys",
    title: "Web Developer",
    start: "2017-05",
    end: "2017-07",
    location: "Pombal, Portugal",
    bullets: [
      "Redesigned the company's outdated website end-to-end, wireframed in Adobe XD and developed the full implementation in Ruby on Rails.",
      "Produced print advertising materials for Luís Pinto & Gomes Lda using Photoshop CS6.",
    ],
    stack: ["Adobe XD", "Ruby on Rails", "Photoshop"],
  },
];

export const education: Education[] = [
  {
    institution: "ISTEC",
    qualification: "Bachelor of Engineering (BE), Multimedia Engineering",
    period: "Oct 2021 – Aug 2024",
  },
  {
    institution: "Politécnico de Leiria",
    qualification: "TeSP, Programação de Sistemas de Informação",
    period: "2017 – 2019",
  },
];

/** The experience page. */
export const experiencePath = "/experience";

/** The role with no end date: what the owner does today. */
export const currentRole = roles.find((role) => !role.end) ?? roles[0]!;

/** The most recent role that has ended. */
export const previousRole = roles.find((role) => role.end) ?? roles[1]!;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar 2025" from "YYYY-MM". */
export function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}
