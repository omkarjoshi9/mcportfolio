/**
 * Generates the pixel textures used by the UI.
 *
 * These are drawn from scratch rather than downloaded so that every texture in
 * this repo is original work. See docs/01-licensing.md for why that matters.
 *
 * Run: node scripts/generate-textures.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { clamp, encodePng, makeRandom } from "./lib/png.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "textures");

/**
 * Speckled earth. A flat base colour with per-pixel darker and lighter grains,
 * plus a handful of larger clumps so the tile does not read as uniform noise.
 */
function earth({ size, seed, base, grains }) {
  const random = makeRandom(seed);
  const pixels = Buffer.alloc(size * size * 3);

  for (let i = 0; i < size * size; i++) {
    const grain = grains[Math.floor(random() * grains.length)];
    const jitter = Math.floor(random() * 12) - 6;
    pixels[i * 3] = clamp(grain[0] + jitter);
    pixels[i * 3 + 1] = clamp(grain[1] + jitter);
    pixels[i * 3 + 2] = clamp(grain[2] + jitter);
  }

  // Clumps: 2x2 patches of the base tone break up the speckle.
  for (let n = 0; n < size; n++) {
    const cx = Math.floor(random() * size);
    const cy = Math.floor(random() * size);
    for (const [dx, dy] of [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ]) {
      const x = (cx + dx) % size;
      const y = (cy + dy) % size;
      const i = y * size + x;
      const jitter = Math.floor(random() * 10) - 5;
      pixels[i * 3] = clamp(base[0] + jitter);
      pixels[i * 3 + 1] = clamp(base[1] + jitter);
      pixels[i * 3 + 2] = clamp(base[2] + jitter);
    }
  }

  return encodePng(size, size, pixels);
}

const TEXTURES = {
  "dirt.png": earth({
    size: 16,
    seed: 20260815,
    base: [134, 96, 67],
    grains: [
      [134, 96, 67],
      [121, 85, 58],
      [156, 114, 72],
      [110, 78, 54],
      [143, 104, 74],
    ],
  }),
  "stone.png": earth({
    size: 16,
    seed: 71134,
    base: [125, 125, 125],
    grains: [
      [125, 125, 125],
      [112, 112, 112],
      [138, 138, 138],
      [104, 104, 104],
    ],
  }),
};

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, buffer] of Object.entries(TEXTURES)) {
  writeFileSync(join(OUT_DIR, name), buffer);
  console.log(`${name} ${buffer.length} bytes`);
}
