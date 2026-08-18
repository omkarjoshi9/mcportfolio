# Licensing — what we can and cannot use

Source: [Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines) (Mojang AB / Microsoft).
These replaced the older separate Brand Guidelines and Commercial Usage Guidelines.

## How Mojang defines things

- **Their name** — the name of any game, tagline, feature, event, or company identity, plus confusingly similar names.
- **Their brand** — names, logos, **fonts, textures**, and other distinctive characteristics.
- **Their assets** — code, software, graphics, **textures, images, models, sounds**, and any video or screenshots taken from the game.

Note that fonts and textures are explicitly listed. The pixel typeface and the
dirt/grass textures are not free-floating internet clip art.

## Why a portfolio is not a "fan site"

The guidelines permit running a website "centered around information regarding
the Minecraft game." A personal portfolio is centered around *you*, so it does
not sit inside that permission. Two clauses are also awkward for a portfolio:

- The site must relate to Minecraft "in a fair, reasonable, and appropriate way and not to other third-party games."
- You may not run it "principally to make money."

A portfolio exists to get you hired, which is commercial intent.

**Conclusion: do not rely on the fan-site clause.** Build a Minecraft-*inspired*
site out of assets we are independently licensed to use. This is the same posture
every serious Minecraft-styled portfolio takes, and it removes the legal question
entirely.

## Hard rules for this repo

Do not ship:

- Any file extracted from `minecraft.jar`, a resource pack, or the game's assets.
- The Minecraft logo or wordmark as our own logo.
- The Mojang Studios logo or its loading animation.
- Real Minecraft screenshots used as decoration or as the panorama.
- The name "Minecraft" in the site title, domain, or anywhere it could read as official.

Safe to ship:

- Open-licensed pixel fonts *inspired by* the game typeface (see [02-assets.md](./02-assets.md)).
- CC0 voxel/block textures from Kenney, OpenGameArt, and itch.io.
- CC0 UI sound effects.
- Our own recreations of UI *layouts*. Interface layout is not copyrightable the way an image file is, and a beveled grey button is a widely reused pattern.
- A panorama rendered from your own screenshots — but see the caveat below.

### The panorama caveat

Screenshots of your own gameplay *are* permitted by the guidelines, including
monetised video. But a panorama built from game screenshots still embeds Mojang
textures. Two safer options:

1. Render the panorama from a CC0 voxel scene we build ourselves in Three.js.
2. Use your own **photography** as the panorama. This is the better idea — it ties the two halves of the site together and is fully yours.

Option 2 is the recommendation.

## Required disclaimer

The guidelines specify wording. Put this in the site footer and the credits page:

> NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.

## Naming

Keep "Minecraft" out of the product name. The repo can stay `mcportfolio`
internally. Public-facing, name it after yourself. Good: "Omkar Joshi — a blocky
portfolio". Not good: "Omkar's Minecraft Portfolio".

## Also worth knowing

The guidelines state Mojang reserves the right to change them at any time and to
revoke permissions. Another reason to depend on assets we own or that are CC0.
