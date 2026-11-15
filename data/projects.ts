export interface ProjectSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  name: string;
  outcome: string;
  tags: string[];
  repo?: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "filebridge",
    name: "filebridge",
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
