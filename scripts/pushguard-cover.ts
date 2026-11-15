// Generates public/projects/pushguard/cover.webp: PushGuard is a CLI with no
// UI to capture, so the cover is a terminal drawn in the exact format of its
// review output (src/hook.ts in the pushguard repo). The issues shown are an
// invented example, labelled as such on the image.
// Run with `npm run pushguard:cover`.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const WIDTH = 1280;
const HEIGHT = 800;

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Part = { text: string; fill: string; bold?: boolean };
const white = "#e6edf3";
const gray = "#8b949e";
const red = "#ff6b6b";
const yellow = "#e3b341";
const green = "#3fb950";

const lines: Part[][] = [
  [{ text: "$ ", fill: green }, { text: "git push origin feature/login", fill: white }],
  [],
  [{ text: "Review Summary:", fill: white, bold: true }],
  [{ text: "2 issues in the changed files, one of them a security risk.", fill: white }],
  [],
  [{ text: "Issues found:", fill: red, bold: true }],
  [
    { text: "[ERROR] ", fill: red },
    { text: "src/auth/session.ts:42 ", fill: gray },
    { text: "User input is concatenated into the SQL query.", fill: white },
  ],
  [
    { text: "[WARNING] ", fill: yellow },
    { text: "src/api/client.ts:118 ", fill: gray },
    { text: "Request is retried without a timeout.", fill: white },
  ],
  [],
  [{ text: "Push blocked. Review the issues above.", fill: yellow }],
  [{ text: "To bypass (not recommended): git push --no-verify", fill: gray }],
];

const lineHeight = 38;
const top = 215;
const text = lines
  .map((parts, row) => {
    if (parts.length === 0) return "";
    const spans = parts
      .map(
        (p) =>
          `<tspan fill="${p.fill}"${p.bold ? ' font-weight="700"' : ""}>${escape(p.text)}</tspan>`,
      )
      .join("");
    return `<text x="110" y="${top + row * lineHeight}" xml:space="preserve">${spans}</text>`;
  })
  .join("\n    ");

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#924205" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#924205" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="70" y="80" width="1140" height="640" rx="16" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
  <rect x="70" y="80" width="1140" height="56" rx="16" fill="#161b22"/>
  <rect x="70" y="120" width="1140" height="16" fill="#161b22"/>
  <circle cx="108" cy="108" r="8" fill="#ff5f56"/>
  <circle cx="136" cy="108" r="8" fill="#ffbd2e"/>
  <circle cx="164" cy="108" r="8" fill="#27c93f"/>
  <text x="640" y="115" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="18" fill="${gray}">pre-push hook · PushGuard</text>
  <g font-family="DejaVu Sans Mono, monospace" font-size="21">
    ${text}
  </g>
  <g font-family="DejaVu Sans, sans-serif">
    <rect x="1010" y="650" width="170" height="40" rx="20" fill="#21262d" stroke="#30363d"/>
    <text x="1095" y="676" text-anchor="middle" font-size="17" fill="${gray}">Example output</text>
  </g>
</svg>`;

await mkdir("public/projects/pushguard", { recursive: true });
await sharp(Buffer.from(svg))
  .webp({ quality: 85 })
  .toFile("public/projects/pushguard/cover.webp");
console.log("Wrote public/projects/pushguard/cover.webp");
