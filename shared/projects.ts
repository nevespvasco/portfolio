export interface ProjectSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ProjectImage {
  /** Path under public/, e.g. "/projects/cirnota/cover.webp". */
  src: string;
  alt: string;
  caption?: string;
}

export type ProjectStatus = "production" | "open-source";

export interface Project {
  slug: string;
  name: string;
  outcome: string;
  tags: string[];
  year: number;
  role: string;
  status: ProjectStatus;
  /** Shown on the home page under "Selected projects". */
  featured?: boolean;
  /** Source code, when it is public. */
  repo?: string;
  /** The running product, when there is one. */
  live?: string;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  sections: ProjectSection[];
}

export const statusLabels: Record<ProjectStatus, string> = {
  production: "In production",
  "open-source": "Open source",
};

/** The projects list page. */
export const projectsListPath = "/projects";

/** Path of a project's case-study page. */
export const projectPath = (slug: string) => `/projects/${slug}`;

export const projects: Project[] = [
  {
    slug: "cirnota",
    name: "Cirnota",
    live: "https://cirnota.pt",
    year: 2026,
    role: "Solo developer",
    status: "production",
    featured: true,
    outcome:
      "A surgical portfolio for doctors in Portugal, in production: log surgeries on the day, see what is left for residency minimums, and export a CV as PDF or Word.",
    tags: ["React 19", "TypeScript", "Vite", "NestJS", "PostgreSQL"],
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Surgical residents in Portugal have to prove a minimum number of procedures and keep a CV of their surgical, training and scientific activity. Tracking that by hand across hospitals is slow and easy to get wrong.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A monorepo with the product app (React 19, TypeScript, Vite), a NestJS API with PostgreSQL, and a marketing site that shares the app's design tokens.",
        ],
        bullets: [
          "Records are organised by hospital and cover surgeries, training and scientific activity.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "Privacy and security built in from day one: least-privilege data access, two-factor login and an audit trail.",
          "Decisions recorded as architecture decision records (9 so far).",
        ],
      },
      {
        heading: "Result",
        bullets: [
          "Live at cirnota.pt.",
          "CI on every change: typecheck, lint, tests, a dependency audit and a production boot smoke test, with separate staging and production deploy pipelines.",
        ],
      },
    ],
  },
  {
    slug: "a-minha-rua",
    name: "A Minha Rua",
    live: "https://isometric-lisbon-sigma.vercel.app",
    year: 2026,
    role: "Solo developer",
    status: "production",
    featured: true,
    outcome:
      "Turns any address in Portugal into an isometric pixel-art poster, drawn from OpenStreetMap with the real sun position and live weather.",
    tags: ["Nuxt 4", "Vue 3", "TypeScript", "three.js", "Stripe"],
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "A poster of your own street usually means a generic map print or a commissioned illustration. I wanted any place in Portugal drawn as pixel art, on demand.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "You search for a place and the app draws the roughly 300 m square around it from OpenStreetMap buildings, roads, water and parks, rendered deterministically with three.js at 360×480 art pixels.",
        ],
        bullets: [
          "Four camera orientations, and the real sun at the place for any day and hour, with cast shadows and a palette for the hour.",
          "Live weather from METAR, IPMA and DWD along a timeline, or a chosen look (season, clouds, rain, fog, snow).",
          "Painted previews from an image model, held to the plain render by a guard so water and paper stay where they belong.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "Every painted preview is kept as a public variation of its 100 m cell and shown on a shared board, so the next visitor there can reuse it.",
          "Abuse limits on paid model calls, so a single visitor cannot run up the bill.",
          "Map data and searches cached on disk; decisions recorded as ADRs (9 so far).",
        ],
      },
      {
        heading: "Result",
        bullets: [
          "Live, with Stripe checkout, print files in Blob storage and order emails.",
          "Lisbon verified city by city so far; other places work and are labelled beta.",
        ],
      },
    ],
  },
  {
    slug: "filebridge",
    name: "filebridge",
    year: 2026,
    role: "Solo developer",
    status: "open-source",
    featured: true,
    outcome:
      "Turned a 31-hour manual server migration into a 5-step wizard that resumes after a crash and verifies every file with SHA-256.",
    tags: ["Vue 3", "TypeScript", "Tauri 2", "Rust", "SQLite"],
    repo: "https://github.com/nevespvasco/filebridge",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Moving a personal archive to Nextcloud by hand took 31 hours. SSH dropped mid-transfer, Nextcloud rejected names with decomposed accents, some names arrived as mojibake, and the final file scan was slow with no progress shown.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A desktop and Android app with a Vue 3 + TypeScript interface on Tauri 2, over a Rust engine. The wizard has five steps: source, destination, analysis, review and send, and verification. The same engine also runs as a CLI for servers and scripts.",
        ],
        bullets: [
          "The core talks to a Transport contract, never to rclone directly, so new destinations (SFTP, SMB, S3, WebDAV, Nextcloud, Immich) are plugins registered in one place.",
          "Every job stage is stored in SQLite, so a job resumes after a crash, a reboot, a full destination or an unplugged disk.",
          "Secrets live only in the OS keyring (Android Keystore on phones).",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "Copy-only: the app never deletes or changes the source. There is no move mode.",
          "Names are fixed in transit, never at the source, and the mapping is kept in a manifest so verification does not depend on the final name.",
          "Scope is deliberately personal use, recorded as a decision record. The repo holds 35 architecture decision records in docs/adr.",
        ],
      },
      {
        heading: "Result",
        bullets: [
          "Every problem from the manual migration became a feature: background jobs with automatic resume, pre-send name analysis with automatic NFC correction, mojibake detection, and a scan of only the uploaded folders.",
          "Per-file SHA-256 on both sides, with CSV, JSON or sealed HTML reports.",
          "Runs on Linux, Windows, macOS and Android.",
        ],
      },
    ],
  },
  {
    slug: "pushguard",
    name: "PushGuard",
    year: 2026,
    role: "Solo developer",
    status: "open-source",
    outcome:
      "AI code review on every git push, with three strictness presets and a fail-open design that never blocks a push.",
    tags: ["TypeScript", "Node.js", "CLI", "LLM APIs"],
    repo: "https://github.com/nevespvasco/pushguard",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Bugs and security issues often reach the remote before anyone has reviewed the change.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "A git pre-push hook that sends the diff to an OpenAI, Anthropic or Gemini model and reports what it finds before the push goes out. An interactive CLI installs the hook and edits the configuration.",
        ],
        bullets: [
          "Three presets: strict (bugs, security, performance and code quality), balanced (bugs and security) and permissive (critical issues only).",
          "Model and preset can be overridden per review from the command line.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "Fail-open: if the review service is unavailable, the push goes through with a warning instead of blocking the developer.",
          "Safe YAML parsing, validation of git commands and file paths against command injection and path traversal, and sanitised error messages.",
        ],
      },
      {
        heading: "Next",
        bullets: [
          "Cache reviews for unchanged diffs and review only changed files.",
          "Support local models (Ollama) and run in CI on pull requests.",
        ],
      },
    ],
  },
];

/** The projects either side of `slug` in list order, for case-study navigation. */
export function adjacentProjects(
  slug: string,
  list: readonly Project[] = projects,
): { previous?: Project; next?: Project } {
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: list[index - 1], next: list[index + 1] };
}
