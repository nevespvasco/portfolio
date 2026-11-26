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

/** Social-preview image: the project's own JPEG card, else the site-wide one. */
export const projectOgImage = (project: Pick<Project, "slug" | "cover">) =>
  project.cover ? `/projects/${project.slug}/og.jpg` : "/og.jpg";

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
    cover: {
      src: "/projects/cirnota/cover.webp",
      alt: "The Cirnota landing page: a headline about logging every surgery over an operating-theatre lamp.",
    },
    gallery: [
      {
        src: "/projects/cirnota/gallery-1.webp",
        alt: "A list of surgeries by date, procedure and role, with a highlighted prompt for a missing field.",
        caption: "From the public landing page: logging a surgery, with a prompt when a field is missing. Sample data.",
      },
      {
        src: "/projects/cirnota/gallery-2.webp",
        alt: "A progress card showing 42 of 60 procedures done as principal surgeon, against a residency minimum.",
        caption: "Progress against the residency minimums, as shown on the public landing page. Sample data.",
      },
      {
        src: "/projects/cirnota/gallery-3.webp",
        alt: "A CV preview with a table of procedures by role, ready to export as PDF or Word.",
        caption: "The CV, ready to export as PDF or Word, as shown on the public landing page. Sample data.",
      },
    ],
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
          "Each doctor keeps their own lists of procedures and diagnoses, organised the way their supervisor asks, after a tester said it had to be customisable or nobody would use it.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "The CV is a view of the portfolio, not a copy: a doctor writes each thing once and can keep several CVs that all stay up to date.",
          "The PDF is drawn in the browser by the same component as the preview, so what you see is exactly what you download, and that code only loads on the CV page.",
          "Exports match the screen: the visible columns, in the same order, with the same labels and formatting, after users said the spreadsheet did not match the table.",
          "Privacy and security built in from day one, and decisions recorded as architecture decision records.",
        ],
      },
      {
        heading: "Result",
        bullets: [
          "Live at cirnota.pt.",
          "Typecheck, lint and tests on every change, with separate staging and production deploys.",
        ],
      },
    ],
  },
  {
    slug: "whisperbrain",
    name: "WhisperBrain",
    year: 2026,
    role: "Solo developer",
    status: "open-source",
    featured: true,
    cover: {
      src: "/projects/whisperbrain/cover.webp",
      alt: "A WhisperBrain meeting summary with an overview, key-point cards and a table of speakers with their talk time.",
    },
    gallery: [
      {
        src: "/projects/whisperbrain/gallery-1.webp",
        alt: "The transcript in dark mode, each line labelled with its speaker, above a timeline of who spoke when.",
        caption: "The transcript with each voice labelled and a timeline of who spoke when, in dark mode. Demo data.",
      },
    ],
    outcome:
      "A local-first meeting notepad for the desktop: records both sides of a call, transcribes on the device, labels who said what, and turns your notes into a summary with your own LLM.",
    tags: ["JavaScript", "Electron", "Node.js", "SQLite", "On-device AI"],
    repo: "https://github.com/nevespvasco/WhisperBrain",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Meeting-notes tools usually send the audio of every call to someone else's cloud. I wanted the same help, a transcript that knows who spoke, a summary and a searchable history, with everything staying on my own computer.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "An Electron app over a local Node.js server. The microphone and the computer's own audio are recorded as separate channels and transcribed on the device with sherpa-onnx; notes, transcripts and topics live in one SQLite file with full-text search. The interface is plain ES modules with no build step, in English and Portuguese, light and dark.",
        ],
        bullets: [
          "Speaker identification from voice prints, clustered live, with one-click naming and voices remembered across meetings. After Stop, a second pass on pitch and timbre fixes misjudged lines and splits or rejoins voices.",
          "Your own notes plus the transcript become an overview, key points, decisions and action items with owners, through any OpenAI-compatible server (Ollama, LM Studio or a hosted API).",
          "A live meeting assistant, off by default: when someone on the call asks a question, it drafts a short suggestion from your project notes and what was said, and marks anything the notes do not support. It also keeps a running summary of decisions, action items and open questions.",
          "Topics, a glossary and a people directory link meetings together, with a topic map and a ⌘K search over who said what.",
          "Imports and exports in the usual formats, and integrations with Google Calendar, Notion, Obsidian, Linear and signed webhooks.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "Audio is never stored: it is transcribed in memory, and the only text that leaves the machine goes to the LLM server you choose.",
          "The local server listens on 127.0.0.1 only, with a per-launch token and checks on Host and Origin headers.",
          "Only three things differ per operating system (audio capture, microphone-in-use detection and paste), so each is a small platform adapter, with native helpers in C, Swift and C++ where the OS needs them.",
        ],
      },
      {
        heading: "Result",
        bullets: [
          "Installers for Linux, macOS and Windows on GitHub Releases, built and published by GitHub Actions.",
          "700+ tests, including integration tests with real speech models, PipeWire audio capture and a headless boot of the packaged app.",
          "Developed and tested on Linux; the macOS and Windows adapters are unit-tested but not yet run on real hardware, and the README says so.",
        ],
      },
    ],
  },
  {
    slug: "a-minha-rua",
    name: "A Minha Rua",
    live: "https://a-minha-rua.vercel.app",
    year: 2026,
    role: "Solo developer",
    status: "production",
    featured: true,
    cover: {
      src: "/projects/a-minha-rua/cover.webp",
      alt: "An isometric pixel-art block of Lisbon with terracotta roofs, trees and cobbled streets.",
    },
    gallery: [
      {
        src: "/projects/a-minha-rua/gallery-1.webp",
        alt: "The Lisbon map in pixel art with neighbourhood labels, rain and cloud shadows over the Tagus.",
        caption: "The Lisbon map: the city in pixel art, with the sun and the weather where they really are.",
      },
      {
        src: "/projects/a-minha-rua/gallery-2.webp",
        alt: "A painted isometric preview of Alfama, a dense hillside of roofs and narrow streets.",
        caption: "A painted preview of Alfama, from the roughly 300 m square around it.",
      },
      {
        src: "/projects/a-minha-rua/gallery-3.webp",
        alt: "The A Minha Rua landing page with an address search and three steps to a poster.",
        caption: "The landing page: search an address, pick a style, download the files.",
      },
    ],
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
    cover: {
      src: "/projects/filebridge/cover.webp",
      alt: "The filebridge home screen: a drop zone, a transfer that needs attention and recent transfers.",
    },
    gallery: [
      {
        src: "/projects/filebridge/gallery-1.webp",
        alt: "The first step of the filebridge wizard, asking what to send, with pinned folders and disks.",
        caption: "Step one: choose what to send. filebridge only reads the source. Screens show demo data.",
      },
      {
        src: "/projects/filebridge/gallery-2.webp",
        alt: "A finished transfer reporting 1,234 files copied and verified one by one with SHA-256.",
        caption: "A verified transfer: every file at the destination is checked against its original with SHA-256.",
      },
    ],
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
    cover: {
      src: "/projects/pushguard/cover.webp",
      alt: "A terminal where PushGuard blocks a git push and lists one error and one warning.",
    },
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
