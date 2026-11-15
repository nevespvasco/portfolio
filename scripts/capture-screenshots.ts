// Builds the project images under public/projects/<slug>/ as 1280x800 (16:10)
// WebP, so covers and galleries can reserve their space without per-image
// dimensions.
//
//   npm run screenshots                  all projects
//   npm run screenshots -- cirnota       one or more projects
//
// Sources:
//   - public sites, captured with Playwright;
//   - filebridge running locally in its mock mode (demo data only): set
//     FILEBRIDGE_APP_URL to include it. Cirnota's app is private, so only
//     its public marketing pages are ever captured;
//   - artwork copied from the project's own repository (ARTWORK_DIR);
//   - a generated cover for projects without a UI (PushGuard).
//
// PW_CHROMIUM_PATH points Playwright at an existing Chromium.
import { mkdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";

const WIDTH = 1280;
const HEIGHT = 800;
const outDir = (slug: string) => join("public", "projects", slug);

const home = homedir();
const artwork = process.env.ARTWORK_DIR ?? join(home, "Documents/github/isometric-lisbon");

type Capture = (page: Page) => Promise<void>;

interface Shot {
  project: string;
  /** File name without extension, e.g. "cover" or "gallery-1". */
  name: string;
  /** Page to capture, or an image file to convert. */
  source: { url: string; before?: Capture; locale?: string } | { file: string };
}

const settle = (ms: number): Capture => (page) => page.waitForTimeout(ms);

const amr = "https://a-minha-rua.vercel.app";
const filebridgeApp = process.env.FILEBRIDGE_APP_URL;

/** Scrolls a section of the Cirnota landing page to the top of the screen. */
const cirnotaSection = (id: string): Capture => async (page) => {
  await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(2500);
};

const shots: Shot[] = [
  { project: "a-minha-rua", name: "cover", source: { file: join(artwork, "public/hero.webp") } },
  {
    project: "a-minha-rua",
    name: "gallery-1",
    source: { url: `${amr}/map/lisboa`, before: settle(6000) },
  },
  {
    project: "a-minha-rua",
    name: "gallery-2",
    source: { file: join(artwork, "artifacts/painted/alfama-300m.png") },
  },
  { project: "a-minha-rua", name: "gallery-3", source: { url: `${amr}/`, before: settle(1500) } },
  {
    project: "cirnota",
    name: "cover",
    source: { url: "https://cirnota.pt/", before: settle(2500) },
  },
  {
    project: "cirnota",
    name: "gallery-1",
    source: { url: "https://cirnota.pt/", before: cirnotaSection("cap-registo") },
  },
  {
    project: "cirnota",
    name: "gallery-2",
    source: { url: "https://cirnota.pt/", before: cirnotaSection("cap-progresso") },
  },
  {
    project: "cirnota",
    name: "gallery-3",
    source: { url: "https://cirnota.pt/", before: cirnotaSection("cap-curriculo") },
  },
];

if (filebridgeApp) {
  // filebridge uses hash routing and, in mock mode, serves demo data only.
  const base = filebridgeApp.replace(/\/$/, "");
  const at = (route: string): Capture => async (page) => {
    await page.goto(`${base}/#${route}`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
    // The first-run guide covers the screen; skip it when it shows.
    const skip = page.getByRole("button", { name: "Skip" });
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.waitForTimeout(500);
  };
  const openVerifiedTransfer: Capture = async (page) => {
    await at("/jobs")(page);
    await page.getByText("Documentos do escritório").first().click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
  };
  shots.push(
    { project: "filebridge", name: "cover", source: { url: base, before: at("/home"), locale: "en-US" } },
    { project: "filebridge", name: "gallery-1", source: { url: base, before: at("/new"), locale: "en-US" } },
    { project: "filebridge", name: "gallery-2", source: { url: base, before: openVerifiedTransfer, locale: "en-US" } },
  );
}

const wanted = process.argv.slice(2);
const todo = shots.filter((s) => wanted.length === 0 || wanted.includes(s.project));

async function save(input: Buffer | string, project: string, name: string) {
  await mkdir(outDir(project), { recursive: true });
  const file = join(outDir(project), `${name}.webp`);
  await sharp(input)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toFile(file);
  console.log("wrote", file);
}

/** Artwork is letterboxed onto its own background so nothing is cropped. */
async function saveArtwork(path: string, project: string, name: string) {
  const { data } = await sharp(path)
    .removeAlpha()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const background = { r: data[0] ?? 255, g: data[1] ?? 255, b: data[2] ?? 255 };
  const fitted = await sharp(path)
    .resize(WIDTH, HEIGHT, { fit: "contain", background })
    .toBuffer();
  await save(fitted, project, name);
}

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || undefined,
});
try {
  for (const shot of todo) {
    if ("file" in shot.source) {
      if (!(await stat(shot.source.file).catch(() => null))) {
        console.warn(`skipped ${shot.project}/${shot.name}: ${shot.source.file} not found (set ARTWORK_DIR)`);
        continue;
      }
      await saveArtwork(shot.source.file, shot.project, shot.name);
      continue;
    }
    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 2,
      locale: shot.source.locale ?? "pt-PT",
      colorScheme: "light",
    });
    const page = await context.newPage();
    try {
      await page.goto(shot.source.url, { waitUntil: "networkidle", timeout: 60_000 });
      await shot.source.before?.(page);
      await save(await page.screenshot(), shot.project, shot.name);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
