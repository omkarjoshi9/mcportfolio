# Reference projects

Existing Minecraft-styled portfolios worth studying before we write code.

## andrewwoan/woan-minecraft-folio

<https://github.com/andrewwoan/woan-minecraft-folio> · live: <http://woanminecraftfolio.com/>

**The bar.** Won FWA of the Day, an Awwwards Honorable Mention, and CSSDA awards
for UI/UX and Innovation. Three.js, HTML/SCSS/JS, **MIT licensed**, Blender source
files shared publicly.

Worth reading for the author's own notes in the README: set `flat={true}` on the
Canvas to avoid tonemapping issues, add a rotation buffer to smooth rotations,
and use a camera group so offsets apply on the local axis.

MIT means we can legitimately learn from the code. Study it, don't copy it.

## arshadakl/Minecraft-portfolio

<https://github.com/arshadakl/Minecraft-portfolio>

Closest to our stack: **Next.js 16 App Router, React 19, React Three Fiber,
drei, Zustand, Tailwind 4**. A scroll-driven camera moves along a Catmull-Rom
curve through a voxel house, one room per portfolio section.

Notable: all geometry is procedurally generated, no external models. Audio is
synthesized via Web Audio API, no files. Includes a GitHub contribution wall
rendered as redstone lamps.

The scope here is enormous. Useful as proof that Next 16 + R3F works well
together; not a model for v1.

## keyyard/keyyard.github.io

<https://github.com/keyyard/keyyard.github.io>

Next.js + React Three Fiber + Tailwind, by an actual Minecraft Marketplace
developer. Interactive 3D player head that tracks the mouse, an RPG character
sheet for skills, an expandable career timeline, a `/trophies` page, and a
markdown blog with RSS.

The **trophy cabinet** and **character sheet** ideas are close to our
`/skills` advancement tree. Also has Konami-code and birthday easter eggs.

## parsakhaz/mc-portfolio

<https://github.com/parsakhaz/mc-portfolio>

Next.js, React, Framer Motion, Tailwind. Built fast and it shows, but it has the
pieces we care about: a custom loading screen, chunk-loading effects, a day/night
cycle, floating blocks, and experience orbs.

Caveat: the README credits "Minecraft-inspired assets and ideas courtesy of
Mojang Studios", which suggests actual game assets are in there. Do not copy
assets out of this repo — see [01-licensing.md](./01-licensing.md).

## SkylaDev/threejs-minecraft-menu-panorama

<https://github.com/SkylaDev/threejs-minecraft-menu-panorama> · live: <https://panorama.skyla.moe/>

Tiny, single-purpose proof of concept for the rotating menu panorama in Three.js.
The most directly reusable reference for our landing page. The author explicitly
invites reuse.

## What to take from each

| Source | Take |
| --- | --- |
| woan-minecraft-folio | Polish bar, R3F gotchas, MIT code to learn from |
| arshadakl | Next 16 + R3F + Zustand integration patterns |
| keyyard | Skills-as-character-sheet, trophies, 3D head |
| parsakhaz | Loading screen and day/night structure (not its assets) |
| SkylaDev | Panorama implementation |

Common thread: every one of these leads with **one strong interactive idea** and
keeps the rest conventional. Ours is the loading screen into the server list.
