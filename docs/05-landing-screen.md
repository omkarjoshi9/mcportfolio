# Landing screen — loading → main menu

The landing page is two states in sequence: a loading screen that plays once,
then the main menu, which is the real navigation hub.

## Accuracy notes from the wiki

From <https://minecraft.wiki/w/Loading_world_screen> and <https://minecraft.wiki/w/Splash>:

- The dirt background got darker and gained a progress bar in **Classic 0.0.13a_03**.
- **12w18a** removed the singleplayer progress bar; a later version brought it back.
- **24w09a** replaced the dirt background with a blurred, darkened panorama. Dirt still ships in the Programmer Art pack.
- Java's loading screen draws a **chunk colormap** — a square of pixels, one per chunk, that change colour and expand as chunks load.
- Bedrock uses the panorama plus an XP-style bar and rotating loading tips.
- Splash text pulses at **2 Hz / 120 bpm**.

Two eras are available to us. The **dirt + progress bar** era reads as
"Minecraft" to everyone instantly, so use that for the loading screen, then
transition into the modern **blurred panorama** menu. We get both, and the
visual change marks the transition.

## State 1 — loading screen

```
┌──────────────────────────────────────┐
│  (tiled dirt texture, darkened)      │
│                                      │
│            ▓▓▓░░░░░░░░               │  ← chunk colormap, fills outward
│                                      │
│         Building terrain...          │
│       ▐████████████░░░░░░░▌          │  ← progress bar
└──────────────────────────────────────┘
```

Behaviour:

- Tiled CC0 dirt texture, `image-rendering: pixelated`, darkened overlay.
- The chunk colormap is a small grid of divs filling outward from centre. It is more interesting than a bar and it is the authentic Java detail almost nobody recreates.
- Status line cycles: `Loading terrain` → `Building terrain` → `Loading photos` → `Joining world`.
- Progress must reflect **real work** — font loading, panorama images, first-paint assets — via the actual load promises. A fake 3-second timer is a 3-second tax on your visitor.
- Hard cap the whole thing at ~2.5s regardless.

Non-negotiable behaviours:

- A **Skip** button, visible immediately, bottom right.
- Plays **once per session**. Persist a flag in `sessionStorage`; on repeat visits go straight to the menu.
- Under `prefers-reduced-motion`, skip entirely.
- Deep links (`/projects` from search results) never see it.

That last group matters. A loading screen is charming on visit one and hostile
on visit four, and a recruiter who bounces during your loading animation never
sees the portfolio.

## State 2 — main menu

```
┌──────────────────────────────────────┐
│   (panorama, slow rotate, blur)      │
│                                      │
│         OMKAR  JOSHI                 │  ← blocky wordmark, our own
│                  Shot on a real camera! │  ← splash, yellow, bobbing
│                                      │
│      ┌────────────────────────┐      │
│      │      Singleplayer      │      │  → /about
│      ├────────────────────────┤      │
│      │      Multiplayer       │      │  → /projects
│      ├────────────────────────┤      │
│      │       Gallery          │      │  → /photography
│      ├──────────┬─────────────┤      │
│      │ Options  │  Quit Game  │      │  → /options · /contact
│      └──────────┴─────────────┘      │
│                                      │
│ v1.0.0 (Next.js 16)   Not affiliated │
│                       with Mojang    │
└──────────────────────────────────────┘
```

Details:

- Panorama rotates slowly (~0.3 speed), blurred and darkened behind the UI.
- The wordmark is **your name**, not the Minecraft logo. Blocky, but ours.
- Splash text sits at an angle, `#FFFF00`, scaling pulse at 2 Hz, random per load, from our own list.
- Buttons use the beveled grey style and highlight on hover.
- Bottom-left version string is real: package version and Next.js version.
- Bottom-right carries the disclaimer, which is also where the guidelines want it.

"Quit Game" → `/contact` is the joke that lands. Consider a confirm dialog:
*"Are you sure you want to quit? / Yes, hire me · Cancel"*.

## Transition

Loading → menu should feel like the game: a quick fade with the panorama already
rotating underneath. Don't animate the buttons in one by one; it reads slow.

## Technical notes

- Both states live in `/` as client components; the menu is the default and the loader is an overlay above it. This way the menu is server-rendered and in the HTML — good for SEO and for anyone who skips.
- Preload the panorama faces during the loading screen. That is the honest work the progress bar should be measuring.
- Panorama is the heaviest asset on the page. Six WebP faces, sized to viewport, and a static blurred still as the fallback for reduced-motion and low-power devices.
- If WebGL is unavailable, fall back to a single static blurred image. Never a blank screen.

## SEO

A loading screen plus a canvas is a bad look to a crawler. Make sure the page's
server-rendered HTML contains your name, a one-line bio, and real `<a>` tags to
every main route. The menu buttons should *be* those links.
