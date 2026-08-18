/**
 * Turns your photographs into the six main-menu skybox faces.
 *
 * Drop images into `images/` at the repo root and run:
 *   node scripts/build-panorama.mjs
 *
 * They are centre-cropped square and downscaled hard. That is deliberate: the
 * menu blurs this backdrop anyway, and shipping tiny files lets the browser's
 * smooth upscaling do the blurring instead of a costly runtime filter.
 * See public/panorama/README.md.
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "images");
const OUT_DIR = join(ROOT, "public", "panorama");
const SIZE = 96;
const FACES = 6;
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);

let sources;
try {
  sources = readdirSync(SOURCE_DIR)
    .filter((name) => SUPPORTED.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
} catch {
  console.error(`No ${SOURCE_DIR} directory. Create it and add your photos.`);
  process.exit(1);
}

if (sources.length === 0) {
  console.error(`No images found in ${SOURCE_DIR}.`);
  console.error(`Supported extensions: ${[...SUPPORTED].join(", ")}`);
  process.exit(1);
}

if (sources.length < FACES) {
  console.warn(`Only ${sources.length} image(s) found; faces will repeat to fill all ${FACES}.`);
}

mkdirSync(OUT_DIR, { recursive: true });

for (let face = 0; face < FACES; face++) {
  const source = sources[face % sources.length];
  const output = join(OUT_DIR, `panorama_${face}.png`);

  const buffer = await sharp(join(SOURCE_DIR, source))
    .rotate() // honour EXIF orientation
    .resize(SIZE, SIZE, { fit: "cover", position: "attention" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(output, buffer);
  console.log(`panorama_${face}.png  <-  ${source}  (${buffer.length} bytes)`);
}

console.log(`\nDone. ${FACES} faces written to public/panorama/.`);
