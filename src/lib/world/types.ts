import type { AchievementId, ItemId, RoomId } from "@/lib/world/catalog";

export type WorldFlags = {
  painting: number;
  grass: number;
  campfire: number;
  lever: boolean;
  bunkerOpen: boolean;
  traded: boolean;
  ore: number;
  creeper: boolean;
  tree: boolean;
  f3: boolean;
  creative: boolean;
  cmd: boolean;
  craft: boolean;
  term: boolean;
  night: boolean;
};

export type WorldApi = {
  flags: WorldFlags;
  inventory: ItemId[];
  room: RoomId;
  has: (id: ItemId) => boolean;
  grant: (id: ItemId, silent?: boolean) => void;
  achieve: (id: AchievementId) => void;
  enter: (room: RoomId) => void;
  say: (speaker: string, text: string) => void;
  setFlag: <K extends keyof WorldFlags>(key: K, value: WorldFlags[K]) => void;
};
