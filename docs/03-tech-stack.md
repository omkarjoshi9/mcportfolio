# Tech stack

Already in the repo: Next.js 16.3.1 (App Router, Turbopack), React 19.2.8,
TypeScript 5, Tailwind CSS 4, ESLint 9. Deployed on Vercel.

Versions below were resolved from the npm registry, not guessed.

## Recommended additions

| Package | Version | Purpose |
| --- | --- | --- |
| `motion` | 13.1.0 | Animation. This is the current package name for Framer Motion. Screen transitions, splash bob, button presses. |
| `zustand` | 5.0.15 | Small global store: sound on/off, day/night, reduced motion, whether the loading screen has already played. |
| `yet-another-react-lightbox` | 3.32.2 | Photography lightbox — keyboard nav, zoom, captions, thumbnails. |
| `react-photo-album` | 3.6.1 | Justified/masonry photo grid that respects real aspect ratios. Pairs with the lightbox. |

## 3D — only if we commit to it

| Package | Version | Purpose |
| --- | --- | --- |
| `@react-three/fiber` | 9.7.0 | React renderer for Three.js. |
| `@react-three/drei` | 10.7.8 | Helpers — `PerspectiveCamera`, `Sky`, loaders. |

Use 3D for the **panorama** and optionally a **rotating player head**. Do not
build a walkable voxel world for v1; it is a project on its own.

### Voxel performance rules

Gathered from the R3F issue tracker and the Three.js forum. These are the
mistakes that tank frame rate:

- **One `InstancedMesh` per block type.** Not one component per voxel. A working reference hits **5 draw calls total** for a whole scene.
- Update transforms with `setMatrixAt` through a ref. Never re-render React per voxel.
- Never construct geometry or materials inside render — they get rebuilt every pass. Memoize or hoist them.
- Drei's `<Instances>`/`<Instance>` has a [known performance gap](https://github.com/pmndrs/react-three-fiber/issues/3306) versus a raw `instancedMesh`. Use the raw one for anything large.
- Chunk the world if it ever gets big.

400+ geometries and 800 draw calls is already "bad" territory per the Three.js
maintainers, so budget accordingly.

## Minecraft UI component libraries

These exist. My recommendation is to **study them and write our own**, because
our UI needs to be ours anyway and these carry unknown texture provenance.

| Package | Version | Notes |
| --- | --- | --- |
| `mc-ui-comatv` | 1.1.4 | React MC-styled buttons, containers, scrollbars, dropdown, LoadingBar. TypeScript types included. |
| `minecraft-inventory` | 0.1.47 | Full inventory system — cursor-following tooltips, drag/drop, keyboard 1–9, JEI panel. Most complete, but pre-1.0. |
| `minecraft-inventory-ui` | 1.0.1 | Simple 36-slot inventory renderer with stack counts. Targets v1.8 item types. |
| `Minecraft-CSS` | — | Plain CSS framework, no CDN yet. <https://github.com/Jiyath5516F/Minecraft-CSS> |

The button bevel is genuinely just a box-shadow, which is why writing our own is
cheap:

```css
box-shadow:
  inset 4px 4px 0 hsl(0 0% 100% / 0.7),
  inset -4px -4px 0 hsl(0 0% 22% / 0.7);
```

## Content

Start with typed data in TS files — projects, photos, and posts as arrays. Add
MDX for the blog only when you actually want to write long posts. A CMS is
premature; if it ever becomes annoying, revisit then.

## Photography performance

This is the part most likely to make the site slow.

- Serve **AVIF with WebP fallback**. Next.js `<Image>` handles this.
- Pre-resize exports out of Lightroom. Do not ship 8 MB JPEGs and hope the optimizer saves you.
- Always set `sizes` — without it Next serves the largest candidate to every device.
- `priority` only on the one image above the fold.
- Generate blurhash/LQIP placeholders. A pixelated low-res placeholder fits the theme perfectly — the aesthetic and the performance win point the same direction.
- Lazy-load with an Intersection Observer beyond the first batch.

## Accessibility, and why it matters more here

A pixel-art site is a minefield. Non-negotiables:

- Respect `prefers-reduced-motion` — kill the panorama rotation, the splash bob, and screen transitions.
- The loading screen must be **skippable** and must never replay on repeat visits. Store a flag.
- Every "block" button is a real `<button>` or `<a>`. Keep focus rings.
- Check contrast on the grey-on-grey panels; Minecraft's real UI often fails WCAG AA.
- Pixel fonts need generous size and letter-spacing. Never below 16px.
- The whole site must work with sound off and 3D disabled.
