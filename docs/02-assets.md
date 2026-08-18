# Assets — fonts, textures, sounds, panorama

Everything here is open-licensed. Nothing comes from Mojang's files.
Licenses checked at time of writing; re-verify before shipping.

## Fonts

### Monocraft — primary UI font

- Repo: <https://github.com/IdreesInc/Monocraft>
- License: **SIL Open Font License 1.1** — commercial use allowed, must ship the license text, cannot be sold on its own.
- ~10.9k stars, actively maintained, 1500+ glyphs redesigned for readability.
- The author states it emulates the Minecraft UI typeface but contains **no assets or font files from the game**. That is exactly the provenance we want.

Self-host it rather than hotlinking the CDN, so the font is covered by our own
caching and stays available offline:

```css
@font-face {
  font-family: "Monocraft";
  src: url("/fonts/Monocraft.woff2") format("woff2");
  font-display: swap;
}
```

Convert the shipped TTF to WOFF2 before use — the TTF is much larger over the wire.

### Minecraft-Font — optional proportional variant

- Repo: <https://github.com/IdreesInc/Minecraft-Font>
- Same author, non-monospaced rendition of the typeface.
- **Action needed:** confirm the license in the repo before using. Monocraft's OFL does not automatically cover this one.

Monocraft alone is enough to start. Being monospaced actually suits both the
game UI and the code/tech half of the portfolio.

### Pairing

Use Monocraft for headings, buttons, and UI chrome. For long-form reading
(blog posts, photo captions) drop to a normal sans — the existing Geist from the
scaffold is fine. Pixel fonts at paragraph length are painful to read.

## Block & UI textures (CC0)

| Pack | Contents | License | Link |
| --- | --- | --- | --- |
| Kenney Block Pack | 100+ block-style tiles, buildings, objects, vector sources | CC0 1.0 | <https://kenney-assets.itch.io/block-pack> |
| Screaming Brain Studios — Sandbox Terrain | 204 isometric cubes + **96 textures for 3D blocks** (16×16 upscaled to 64×64), top and side per biome | CC0 | <https://screamingbrainstudios.itch.io/sbst-pack> |
| 16×16 Block Texture Set | Block and plant textures, Comfy52 palette | CC0 | <https://opengameart.org/content/16x16-block-texture-set> |
| Assorted Minecraft-style textures | Two zips of misc blocks | CC0 | <https://opengameart.org/content/assorted-minecraft-style-textures> |
| Too Many Stones | 350+ stone variants, 16× | MIT, author says treat as CC0 | <https://opengameart.org/content/too-many-stones-just-the-assets-16x-minecraft-style> |

The Screaming Brain pack is the most useful one — it ships separate top/side
textures per biome, which is exactly what a 3D block needs.

**Avoid** Faithful, Pixel Perfection, and similar "resource packs". They are
derivative works of Mojang's original textures regardless of how they are
labelled.

### Rendering rule

Every pixel texture needs this or it turns into blurry mush when scaled:

```css
image-rendering: pixelated;
```

## Sound effects (CC0)

| Pack | Contents | License | Link |
| --- | --- | --- | --- |
| blip8 sounds | 181 chiptune SFX, **32 in the `ui` folder**, includes RECIPES.txt to regenerate variants | CC0 | <https://sindriax.itch.io/blip8-sounds> |
| UI Sounds (StumpyStrust) | Clean UI click/transition set | CC0 | <https://opengameart.org/content/ui-sounds> |
| UI Sound Effects | Button clicks, notifications, OGG + WAV | CC0 (public-domain sources) | <https://opengameart.org/content/ui-sound-effects-button-clicks-user-feedback-notifications> |
| Kenney audio packs | UI, impact, retro | CC0 | <https://kenney.nl/assets> |

We need very few: button click, button hover, page/screen open, and an
achievement chime. Four files.

Sound must be **off by default** and toggleable — an unprompted click sound is a
fast way to lose a visitor. Store the preference in `localStorage`.

## Panorama images

The main menu background. Three options, best first:

1. **Your own photography, cube-mapped.** Six faces, `panorama_0` … `panorama_5`. Ties the photography half of the site into the landing page and is 100% yours.
2. **A CC0 voxel scene we render** in Three.js and capture to six faces.
3. Not an option: real Minecraft screenshots (see [01-licensing.md](./01-licensing.md)).

Reference implementations:

- `@atestacraft/panorama` — drop-in library, expects the six `panorama_N` files. <https://github.com/atestacraft/panorama>
- SkylaDev's proof of concept — plain Three.js, no library. <https://github.com/SkylaDev/threejs-minecraft-menu-panorama>

The menu applies a blur and darken over the panorama so text stays readable.
Match that; it also hides compression artifacts.

## Splash text

The bobbing yellow line under the logo. Facts worth matching:

- Pulses at **2 Hz (120 bpm)**, rendered at an angle, colour `#FFFF00`.
- Picked at random on each load.
- Java stores them in `assets/minecraft/texts/splashes.txt`; there are ~454 in current Java Edition.

**Write our own list.** Mojang's splash strings are their copy, and ours will be
funnier because they can be about you:

- "Now with 100% more RAW files!"
- "Shot on a real camera!"
- "npm run dev"
- "Deployed on a Friday!"
- "f/1.8 and be there"
- "It compiles!"

Source for how the mechanic works: <https://minecraft.wiki/w/Splash>

## Asset folder layout

```
public/
  fonts/      Monocraft.woff2 + OFL.txt
  textures/   blocks/  ui/
  audio/      click.ogg  hover.ogg  open.ogg  achievement.ogg
  panorama/   panorama_0.webp … panorama_5.webp
  photos/     the actual photography, WebP/AVIF
docs/
  LICENSES.md   every asset, its source URL, and its license
```

Keep `docs/LICENSES.md` accurate as assets are added. It is the file that proves
we did this properly.
