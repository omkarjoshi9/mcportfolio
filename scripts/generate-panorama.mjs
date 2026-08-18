/**
 * Generates placeholder panorama faces for the main menu skybox.
 *
 * These are deliberately tiny (96px). The menu scales them to fill the
 * viewport, and the browser's smooth upscaling supplies the blur for free —
 * no runtime `filter: blur()`, which would be expensive on an element this
 * large. Replace them with your own photos via scripts/build-panorama.mjs.
 *
 * Face order matches Minecraft's convention: 0 front, 1 right, 2 back,
 * 3 left, 4 top, 5 bottom.
 *
 * Run: node scripts/generate-panorama.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { encodePng, makeRandom, mix } from "./lib/png.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "panorama");
const SIZE = 96;
const HORIZON = Math.round(SIZE * 0.58);

const SKY_TOP = [58, 106, 178];
const SKY_HORIZON = [166, 202, 232];
const GRASS = [94, 148, 63];
const GRASS_FAR = [126, 166, 104];
const STONE = [122, 126, 130];

/** A blocky skyline: per-column terrain heights with a few stone peaks. */
function face({ seed, peaks }) {
  const random = makeRandom(seed);
  const pixels = Buffer.alloc(SIZE * SIZE * 3);

  const heights = [];
  let height = HORIZON;
  for (let x = 0; x < SIZE; x++) {
    // Random walk in 4px steps keeps the silhouette blocky rather than smooth.
    if (x % 4 === 0) height += Math.round((random() - 0.5) * 7);
    height = Math.max(HORIZON - 22, Math.min(HORIZON + 8, height));
    heights.push(height);
  }

  for (let p = 0; p < peaks; p++) {
    const at = Math.floor(random() * SIZE);
    const width = 8 + Math.floor(random() * 12);
    const rise = 12 + Math.floor(random() * 16);
    for (let x = at; x < at + width && x < SIZE; x++) {
      const t = 1 - Math.abs((x - at) / width - 0.5) * 2;
      heights[x] = Math.min(heights[x], HORIZON - Math.round(rise * t));
    }
  }

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 3;
      let colour;

      if (y < heights[x]) {
        colour = mix(SKY_TOP, SKY_HORIZON, Math.min(1, y / HORIZON) ** 0.7);
      } else {
        // Terrain darkens with depth; stone above the tree line.
        const depth = (y - heights[x]) / (SIZE - HORIZON);
        const isStone = heights[x] < HORIZON - 14 && y < heights[x] + 6;
        colour = isStone ? STONE : mix(GRASS_FAR, GRASS, Math.min(1, depth * 1.6));
      }

      const jitter = (random() - 0.5) * 10;
      pixels[i] = Math.max(0, Math.min(255, Math.round(colour[0] + jitter)));
      pixels[i + 1] = Math.max(0, Math.min(255, Math.round(colour[1] + jitter)));
      pixels[i + 2] = Math.max(0, Math.min(255, Math.round(colour[2] + jitter)));
    }
  }

  return encodePng(SIZE, SIZE, pixels);
}

/** A flat vertical gradient, used for the sky and ground faces. */
function flat({ from, to, seed }) {
  const random = makeRandom(seed);
  const pixels = Buffer.alloc(SIZE * SIZE * 3);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 3;
      const colour = mix(from, to, y / SIZE);
      const jitter = (random() - 0.5) * 10;
      pixels[i] = Math.max(0, Math.min(255, Math.round(colour[0] + jitter)));
      pixels[i + 1] = Math.max(0, Math.min(255, Math.round(colour[1] + jitter)));
      pixels[i + 2] = Math.max(0, Math.min(255, Math.round(colour[2] + jitter)));
    }
  }
  return encodePng(SIZE, SIZE, pixels);
}

const FACES = [
  face({ seed: 1201, peaks: 2 }),
  face({ seed: 4407, peaks: 1 }),
  face({ seed: 9153, peaks: 3 }),
  face({ seed: 6620, peaks: 1 }),
  flat({ from: SKY_TOP, to: SKY_TOP, seed: 3311 }),
  flat({ from: GRASS, to: GRASS_FAR, seed: 8804 }),
];

mkdirSync(OUT_DIR, { recursive: true });
FACES.forEach((buffer, index) => {
  const name = `panorama_${index}.png`;
  writeFileSync(join(OUT_DIR, name), buffer);
  console.log(`${name} ${buffer.length} bytes`);
});
