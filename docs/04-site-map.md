# Site map

The organising idea: **every page is a screen that already exists in Minecraft.**
Visitors already know how to read these layouts, so the theme carries navigation
instead of fighting it.

## Route table

| Route | Minecraft screen | Content |
| --- | --- | --- |
| `/` | Loading screen → Main Menu | Landing. See [05-landing-screen.md](./05-landing-screen.md) |
| `/about` | Singleplayer → world select | **Built.** Bio, education, internships, skills, certs from resume |
| `/projects` | Multiplayer → server list | **Built.** Resume projects + pinned GitHub repos |
| `/projects/[slug]` | Server MOTD / advancement | **Built.** Project detail with stack + bullets |
| `/photography` | Creative inventory | Photo categories as tabs |
| `/photography/[album]` | Item-frame wall | One album + lightbox |
| `/skills` | Advancements tree | Skills as unlockable advancements |
| `/uses` | Inventory + armour slots | Gear, camera body, lenses, editor, dotfiles |
| `/blog` | Bookshelf | Post index |
| `/blog/[slug]` | Book and Quill | One post, page-turn UI |
| `/contact` | Direct Connect | **Built.** Email, LinkedIn, GitHub (no phone on public site) |
| `/options` | Options screen | **Built.** GUI Scale, FOV, Motion, Sound, Day/Night, Boot Screen — all persisted in `localStorage` and applied before first paint |
| `/credits` | End poem | Asset attributions and the disclaimer |
| `404` | "Connection Lost" | Disconnect screen |

## The mappings worth explaining

### `/projects` — the server list

This is the strongest idea in the whole design. Minecraft's multiplayer server
list is *already* a list of cards with an icon, a title, a two-line description,
a player count, and a signal-strength ping indicator. It maps onto a project
index with nothing forced:

| Server list element | Project data |
| --- | --- |
| Server icon (64×64) | Project logo / screenshot |
| Server name | Project name |
| MOTD (2 lines, colour codes) | One-line pitch |
| Player count `12/20` | GitHub stars, or users |
| Ping bars | Build status — green live, yellow WIP, grey archived |
| Version tag | Primary language or framework |

Hovering a row previews it. Clicking "joins" the server and routes to the detail
page. Add a "Direct Connect" button that goes to `/contact`.

### `/photography` — the creative inventory

The creative-mode inventory has **tabs down the side** and a grid of items. That
is a category filter and a photo grid. Categories become tabs: Landscape,
Street, Portrait, Night, Travel, Macro.

Hovering a photo shows the Minecraft item tooltip — but populated with real EXIF:

```
Sunset at Sinhagad
Shot on: Nikon Z6 II
50mm · f/1.8 · 1/250s · ISO 100
March 2026
```

That tooltip is where the theme stops being decoration and starts being useful.
Photographers actually want that metadata, and the item-tooltip layout is a
genuinely good way to present it.

Clicking opens the lightbox.

### `/skills` — the advancement tree

Minecraft's advancement screen is a connected tree with icons, titles,
descriptions, and locked/unlocked states. Skills map exactly: "Hello World" →
"It Compiles" → "Shipped to Production". Photography gets its own tab: "First
Roll" → "Manual Mode" → "Golden Hour".

Use the real advancement frame shapes — square for normal, notched for goal,
spiky for challenge — to signal weight.

### `/uses` — the inventory screen

The 36-slot inventory plus four armour slots. Armour slots hold your primary
gear (camera body, main lens, laptop, keyboard). The rest of the grid is
software, with a tooltip per item. The hotbar along the bottom holds the nine
things you touch daily.

### `/blog` — book and quill

Minecraft's written book UI is a two-page spread with page-turn arrows and a
page counter. It suits essays. Keep it optional though: give every post a plain
reading mode, because a pixel-font book spread is hard work for 2000 words.

### `404` — connection lost

The disconnect screen, verbatim in spirit:

```
        Connection Lost

  Chunk not found at this coordinate

      [ Back to Main Menu ]
```

## Build order

**Phase 1 — the spine.** `/` loading + menu, `/about`, `/projects`, `/photography`, `404`, footer disclaimer. About, Projects (+ detail), and Contact now carry resume + GitHub content.

**Phase 2 — the depth.** `/photography/[album]`, `/skills`. `/options` and `/contact` are done.

**Phase 3 — the extras.** `/uses`, `/blog`, `/credits`, 3D panorama, sound.

Resist building Phase 3 first. The loading screen and the server list carry the
concept; everything after that is elaboration.

## Easter eggs

Cheap to build, high delight:

- **F3** toggles a debug overlay with real values — FPS, viewport, route, build SHA.
- Typing `/` opens a fake command palette that actually navigates. `/tp projects` works.
- Konami code grants an advancement toast.
- The day/night toggle in `/options` genuinely re-skins the panorama and palette.
- A single hidden diamond ore block somewhere in the site; finding it unlocks an advancement.

## Mobile

The whole design is desktop-game-shaped, so plan the collapse deliberately:

- Main menu buttons stack full-width. They already do in game.
- Server list rows go single-column, ping bars move under the title.
- Creative inventory tabs become a horizontal scroll strip.
- Advancement tree becomes a vertical list — a pannable tree on a phone is misery.
- Inventory grid drops from 9 columns to 4.
