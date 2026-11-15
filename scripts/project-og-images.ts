// Writes public/projects/<slug>/og.jpg (1200x630) from each project's
// cover.webp. Link-preview crawlers handle JPEG far more reliably than WebP,
// so case studies use this for og:image. Run with `npm run og:projects`.
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = join("public", "projects");

for (const slug of await readdir(root)) {
  const dir = join(root, slug);
  if (!(await stat(dir)).isDirectory()) continue;
  const cover = join(dir, "cover.webp");
  const out = join(dir, "og.jpg");
  if (!(await stat(cover).catch(() => null))) {
    console.log("skipped", slug, "(no cover.webp)");
    continue;
  }
  await sharp(cover)
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out);
  console.log("wrote", out);
}
