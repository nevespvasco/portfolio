// Builds the 1200x630 Open Graph card (public/og.jpg) from the profile photo
// and the site config. Run with `npm run og:card` after changing either.
import sharp from "sharp";
import { site } from "../shared/site.ts";

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO = 300;

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const background = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="warm" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#924205" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#924205" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cool" cx="5%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#0d3a3f" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0d3a3f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <rect width="100%" height="100%" fill="url(#cool)"/>
  <rect width="100%" height="100%" fill="url(#warm)"/>
  <circle cx="${110 + PHOTO / 2}" cy="${HEIGHT / 2}" r="${PHOTO / 2 + 3}" fill="#595959"/>
  <g font-family="Noto Sans, DejaVu Sans, sans-serif">
    <text x="480" y="285" font-size="78" font-weight="800" fill="#ffffff">${escape(site.name)}</text>
    <text x="480" y="350" font-size="40" font-weight="400" fill="#d2d2d2">${escape(site.role)}</text>
    <text x="480" y="430" font-size="30" font-weight="600" fill="#00dc82">${escape(new URL(site.url).host.replace(/^www\./, ""))}</text>
  </g>
</svg>`;

const circleMask = Buffer.from(
  `<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`,
);

const photo = await sharp("public/img/vasco-neves.jpg")
  .resize(PHOTO, PHOTO, { fit: "cover" })
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(Buffer.from(background))
  .composite([{ input: photo, left: 110, top: (HEIGHT - PHOTO) / 2 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile("public/og.jpg");

console.log("Wrote public/og.jpg");
