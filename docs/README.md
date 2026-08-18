# mcportfolio — design & research docs

Research notes for a Minecraft-inspired portfolio site covering tech work and photography.

| Doc | What's in it |
| --- | --- |
| [01-licensing.md](./01-licensing.md) | What Mojang allows, what we must not ship, required disclaimer |
| [02-assets.md](./02-assets.md) | Fonts, textures, sounds, panorama images — with licenses and download links |
| [03-tech-stack.md](./03-tech-stack.md) | Verified npm packages, versions, and what each is for |
| [04-site-map.md](./04-site-map.md) | Every page, its Minecraft screen metaphor, and its content |
| [05-landing-screen.md](./05-landing-screen.md) | Loading screen + main menu spec (the landing page) |
| [06-reference-projects.md](./06-reference-projects.md) | Existing Minecraft portfolios worth studying |

## The one-line concept

The site is a Minecraft *client*, not a Minecraft *page*. You boot into a loading
screen, land on a main menu, and every section of the portfolio is a screen that
already exists in the game — the server list is the project index, the creative
inventory tabs are the photo categories, the advancement tree is the skill set.

## Ground rule that shapes everything

We build a **look-alike from open-licensed parts**. No Mojang texture, font,
sound, or logo file ever enters this repo. See [01-licensing.md](./01-licensing.md).
