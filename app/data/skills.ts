export interface Skill {
  name: string;
  /** Iconify name from an installed @iconify-json collection. */
  icon: string;
  /** Logo colours too dark for the background: render as a light silhouette. */
  silhouette?: boolean;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

// Rendered in this order. Adding a skill is one line in the right group.
export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: [
      { name: "Vue", icon: "logos:vue" },
      { name: "Nuxt", icon: "logos:nuxt-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Pinia", icon: "logos:pinia" },
      { name: "TanStack Query", icon: "logos:react-query-icon" },
      { name: "React", icon: "devicon:react" },
      { name: "Redux", icon: "logos:redux" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "three.js", icon: "logos:threejs", silhouette: true },
    ],
  },
  {
    name: "Testing",
    skills: [
      { name: "Vitest", icon: "logos:vitest" },
      { name: "Playwright", icon: "logos:playwright" },
    ],
  },
  {
    name: "Backend & data",
    skills: [
      { name: "Laravel", icon: "logos:laravel" },
      { name: "NestJS", icon: "logos:nestjs" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MySQL", icon: "logos:mysql-icon", silhouette: true },
      { name: "Stripe", icon: "logos:stripe" },
    ],
  },
  {
    name: "Tooling & AI",
    skills: [
      { name: "Claude Code", icon: "logos:claude-code" },
      { name: "Cursor", icon: "logos:cursor-icon", silhouette: true },
      { name: "Claude API", icon: "logos:claude-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "CI/CD", icon: "logos:github-actions" },
      { name: "Linux", icon: "logos:linux-tux", silhouette: true },
      { name: "Figma", icon: "logos:figma" },
    ],
  },
];
