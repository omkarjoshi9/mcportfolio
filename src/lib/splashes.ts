/**
 * Splash lines for the main menu.
 *
 * Written from scratch — Mojang's splash strings are their copy, and ours can
 * be about the actual person behind the site. See docs/02-assets.md.
 */
export const SPLASHES = [
  "npm run dev",
  "It compiles!",
  "Deployed on a Friday!",
  "Works on my machine!",
  "No AI was harmed making this splash",
  "Rendered at 60fps, probably",
  "Blame the compiler",
  "Ship it!",
  "Still not a Minecraft product",
  "Try pressing F3",
  "git commit -m 'final final v2'",
  "Backing up to three drives!",
  "Made of blocks and bad decisions",
  "Type / to open the console",
  "Made in Pune!",
  "Zero dependencies were added today",
  "Lighthouse approved!",
  "Hire me?",
] as const;

/** Deterministic default so the server and the first client paint agree. */
export const DEFAULT_SPLASH = SPLASHES[0];

export function randomSplash(): string {
  return SPLASHES[Math.floor(Math.random() * SPLASHES.length)];
}
