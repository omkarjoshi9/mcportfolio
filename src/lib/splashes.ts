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
  "No AI was harmed (the agents are fine)",
  "No LLM hallucinated this splash",
  "No tokens were wasted. Okay, some",
  "No AI was harmed, only prompted",
  "No intern was harmed making this site",
  "No rubber duck was harmed debugging",
  "My agent wrote this. It's lying",
  "Powered by LangGraph and caffeine",
  "Temperature 0.0 and still wrong",
  "It's not a bug, it's an agent",
  "Prompt engineer, tragically",
  "RAG to riches!",
  "HyDE and seek!",
  "Rerank me, I dare you",
  "Pentested by my own robot",
  "Hacked myself first, you're welcome",
  "Solved the cube, not the merge conflict",
  "Sub-20 on a good day",
  "Pune: chai, traffic, deployments",
  "Vibes verified by unit tests",
  "154 KPIs and zero vibes",
  "Docker sandbox, trust issues included",
  "git push --force (just kidding)",
  "Stack Overflow was consulted",
  "Have you tried turning it off and on?",
  "sudo make me a sandwich",
  "404: sleep not found",
  "Compiles on the third try",
  "Now with 100% more agents!",
  "Ctrl+Z is my best friend",
  "Mining diamonds, shipping code",
  "Don't dig straight down",
  "Creeper? Aww man",
] as const;

/** Deterministic default so the server and the first client paint agree. */
export const DEFAULT_SPLASH = SPLASHES[0];

export function randomSplash(): string {
  return SPLASHES[Math.floor(Math.random() * SPLASHES.length)];
}
