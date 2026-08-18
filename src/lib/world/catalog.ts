export type RoomId =
  | "overworld"
  | "academy"
  | "foundry"
  | "lab"
  | "bunker"
  | "workshop"
  | "arena"
  | "temple"
  | "end"
  | "crash";

export type ItemId =
  | "emerald"
  | "chronicle"
  | "agent_core"
  | "encrypted_note"
  | "redstone"
  | "gunpowder"
  | "azure_shard"
  | "map_fragment"
  | "diamond"
  | "omkar_key"
  | "half_agent"
  | "bunker_key";

export type AchievementId =
  | "first_step"
  | "bookworm"
  | "foundry_hand"
  | "lab_rat"
  | "ghost_in_the_wires"
  | "redstone_engineer"
  | "crowd_control"
  | "cloud_touched"
  | "how_did_we_get_here"
  | "cover_blown"
  | "creative"
  | "sleepless"
  | "herobrine"
  | "how_the_hell"
  | "completionist";

export const ITEMS: Record<ItemId, { name: string; glyph: string; lore: string }> = {
  emerald: { name: "Village Emerald", glyph: "♦", lore: "Traded, not given. The villagers do not write bios." },
  chronicle: { name: "Village Chronicle", glyph: "▬", lore: "A ledger from the stone school on the hill." },
  agent_core: { name: "Agent Core", glyph: "◉", lore: "Still warm. The last node never returned." },
  encrypted_note: { name: "Encrypted Note", glyph: "?", lore: "-----BEGIN PGP MESSAGE-----" },
  redstone: { name: "Redstone Dust", glyph: "*", lore: "It hums when you think about graphs." },
  gunpowder: { name: "Gunpowder", glyph: "·", lore: "Left behind by something that almost hissed." },
  azure_shard: { name: "Azure Shard", glyph: "◇", lore: "Certified. The sky remembers." },
  map_fragment: { name: "Map Fragment", glyph: "/", lore: "A trader's doodle of a well, a painting, a cloud." },
  diamond: { name: "Diamond", glyph: "◆", lore: "You were not supposed to find this." },
  omkar_key: { name: "Operator Key", glyph: "K", lore: "Crafted, not earned. Opens the last door." },
  half_agent: { name: "Half-Finished Agent", glyph: "¤", lore: "Planner without a Reviewer. Dangerous." },
  bunker_key: { name: "Burned Cipher", glyph: "#", lore: "Gunpowder and paranoia. Opens the inner locker." },
};

export const ACHIEVEMENTS: Record<AchievementId, { title: string; desc: string }> = {
  first_step: { title: "Adventure Time", desc: "You left spawn. Most people don't." },
  bookworm: { title: "It Compiles", desc: "You read the chronicle in the academy." },
  foundry_hand: { title: "78% More Relevant", desc: "You stood next to the reranker." },
  lab_rat: { title: "Node Never Returned", desc: "You entered the underground laboratory." },
  ghost_in_the_wires: { title: "Cover Blown", desc: "You found the bunker behind the painting." },
  redstone_engineer: { title: "Redstone Engineer", desc: "You threw the lever." },
  crowd_control: { title: "50 Students, 30 Judges", desc: "You walked the arena floor." },
  cloud_touched: { title: "Fundamentals", desc: "You touched the sky that isn't Mojang's." },
  how_did_we_get_here: { title: "How Did We Get Here?", desc: "Every door. Every hole. Every lie." },
  cover_blown: { title: "sudo", desc: "You typed something you shouldn't." },
  creative: { title: "Creative Mode", desc: "↑↑↓↓←→←→BA" },
  sleepless: { title: "Phantom", desc: "You lingered until the world grew teeth." },
  herobrine: { title: "Removed Herobrine", desc: "Clicked the campfire seven times." },
  how_the_hell: { title: "How The Hell", desc: "You crafted the Operator Key." },
  completionist: { title: "Full Inventory", desc: "Every item. Unreasonable." },
};

export const RECIPE: { need: ItemId[]; make: ItemId; toast: string }[] = [
  {
    need: ["agent_core", "redstone"],
    make: "half_agent",
    toast: "The core ticks. It has no Reviewer.",
  },
  {
    need: ["encrypted_note", "gunpowder"],
    make: "bunker_key",
    toast: "The cipher scorches. A locker clicks somewhere below.",
  },
  {
    need: ["agent_core", "encrypted_note", "redstone"],
    make: "omkar_key",
    toast: "Three fragments. One operator.",
  },
];

export const MAP_W = 16;
export const MAP_H = 10;

/**
 * Overworld tiles. Buildings are letters. Lowercase is terrain.
 * H well · V painting · L lever · O diamond ore · Y cloud · N villager
 */
export const MAP: string[] = [
  "tgggtggggggggggy",
  "gppppppppppppppt",
  "gpggAAggggHHgggt",
  "gppppppppppppppg",
  "gpggsscNggggFFpg",
  "gppppppppppppppg",
  "gpEEggggKKggVVpg",
  "gpggggggLLggggpg",
  "tgggggOggggggggt",
  "tgggtggggwgggggt",
];

export const WALKABLE = new Set(["g", "p", "s", "c", "w", "o", "l", "n", "h", "y", "v"]);

export const TILE_ROOM: Partial<Record<string, RoomId>> = {
  A: "academy",
  F: "foundry",
  K: "workshop",
  E: "arena",
  H: "lab",
  Y: "temple",
};

export const TILE_LABEL: Record<string, string> = {
  g: "grass",
  p: "path",
  t: "oak",
  w: "water",
  s: "spawn",
  c: "campfire",
  A: "stone hall",
  F: "foundry",
  K: "workshop",
  E: "arena",
  H: "well",
  V: "painting",
  L: "lever",
  O: "stone",
  N: "villager",
  Y: "cloud",
  B: "cracked wall",
};

export const SPAWN = { x: 4, y: 4 };

export const ROOM_LIST: RoomId[] = [
  "academy",
  "foundry",
  "lab",
  "bunker",
  "workshop",
  "arena",
  "temple",
  "end",
];
