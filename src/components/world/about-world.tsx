"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { McButton } from "@/components/mc-button";
import { WorldRooms } from "@/components/world/world-rooms";
import { playClick } from "@/lib/sound";
import {
  ACHIEVEMENTS,
  ITEMS,
  MAP,
  MAP_H,
  MAP_W,
  RECIPE,
  ROOM_LIST,
  SPAWN,
  TILE_LABEL,
  TILE_ROOM,
  WALKABLE,
  type AchievementId,
  type ItemId,
  type RoomId,
} from "@/lib/world/catalog";
import type { WorldApi, WorldFlags } from "@/lib/world/types";

type Toast = { id: number; title: string; desc: string };

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function tileAt(x: number, y: number): string {
  return MAP[y]?.[x] ?? "t";
}

function isNightNow(): boolean {
  if (typeof document !== "undefined" && document.documentElement.dataset.theme === "night") return true;
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6;
}

function subscribeNight(cb: () => void): () => void {
  const id = window.setInterval(cb, 30_000);
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    window.clearInterval(id);
    obs.disconnect();
  };
}

function canWalk(ch: string, flags: WorldFlags): boolean {
  if (ch === "B") return true;
  if (ch === "H") return true;
  if (WALKABLE.has(ch.toLowerCase()) || WALKABLE.has(ch)) return true;
  if ("AFKEY".includes(ch)) return true;
  if (ch === "V" && flags.bunkerOpen) return true;
  return false;
}

export function AboutWorld() {
  const [room, setRoom] = useState<RoomId>("overworld");
  const [pos, setPos] = useState(SPAWN);
  const [inventory, setInventory] = useState<ItemId[]>([]);
  const [unlocked, setUnlocked] = useState<Set<AchievementId>>(new Set());
  const [visited, setVisited] = useState<Set<RoomId>>(new Set(["overworld"]));
  const [flagState, setFlags] = useState<WorldFlags>({
    painting: 0,
    grass: 0,
    campfire: 0,
    lever: false,
    bunkerOpen: false,
    traded: false,
    ore: 0,
    creeper: false,
    tree: false,
    f3: false,
    creative: false,
    cmd: false,
    craft: false,
    term: false,
    night: false,
  });
  const night = useSyncExternalStore(subscribeNight, isNightNow, () => false);
  const flags: WorldFlags = useMemo(() => ({ ...flagState, night }), [flagState, night]);
  const [dialogue, setDialogue] = useState<{ speaker: string; text: string } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cmd, setCmd] = useState("");
  const [logs, setLogs] = useState<string[]>(["[boot] world seed = pune_highlands:2023"]);
  const konami = useRef<string[]>([]);
  const idle = useRef<number>(0);
  const toastId = useRef(0);

  const pushToast = useCallback((title: string, desc: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-3), { id, title, desc }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const achieve = useCallback(
    (id: AchievementId) => {
      setUnlocked((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        const a = ACHIEVEMENTS[id];
        pushToast(a.title, a.desc);
        playClick();
        return next;
      });
    },
    [pushToast],
  );

  const grant = useCallback(
    (id: ItemId, silent?: boolean) => {
      setInventory((prev) => {
        if (prev.includes(id)) return prev;
        if (!silent) pushToast("Item acquired", ITEMS[id].name);
        const next = [...prev, id];
        if (next.length >= 10) queueMicrotask(() => achieve("completionist"));
        if (id === "omkar_key") queueMicrotask(() => achieve("how_the_hell"));
        return next;
      });
    },
    [pushToast, achieve],
  );

  const has = useCallback((id: ItemId) => inventory.includes(id), [inventory]);

  const enter = useCallback(
    (next: RoomId) => {
      playClick();
      setRoom(next);
      setVisited((v) => {
        const nextSet = new Set(v).add(next);
        if (ROOM_LIST.every((r) => nextSet.has(r))) {
          queueMicrotask(() => achieve("how_did_we_get_here"));
        }
        return nextSet;
      });
      setDialogue(null);
      if (next === "lab") achieve("lab_rat");
      if (next === "foundry") achieve("foundry_hand");
      if (next === "arena") achieve("crowd_control");
      if (next === "temple") {
        achieve("cloud_touched");
        grant("azure_shard");
      }
      if (next === "bunker") achieve("ghost_in_the_wires");
    },
    [achieve, grant],
  );

  const say = useCallback((speaker: string, text: string) => {
    playClick();
    setDialogue({ speaker, text });
  }, []);

  const setFlag = useCallback(<K extends keyof WorldFlags>(key: K, value: WorldFlags[K]) => {
    setFlags((f) => ({ ...f, [key]: value }));
  }, []);

  const inspect = useCallback(
    (ch: string) => {
      if (ch === "c") {
        const n = flags.campfire + 1;
        setFlags((f) => ({ ...f, campfire: n }));
        if (n === 1) say("campfire", "Smoke. Someone was here. They left no name, only heat.");
        if (n === 7) {
          achieve("herobrine");
          say("campfire", "Removed Herobrine. The fire does not agree.");
          grant("map_fragment");
        }
        return;
      }
      if (ch === "N") {
        if (!flags.traded) {
          say(
            "villager",
            "Hrm. I do not sell summaries. Trade an emerald and I will tell you who lives here. You do not have an emerald. Punch the grass. The earth is generous if you are annoying.",
          );
        } else {
          say(
            "villager",
            "He builds things that talk to other things that talk to other things. He will not say that. I just did. Hrm.",
          );
        }
        return;
      }
      if (ch === "g") {
        const n = flags.grass + 1;
        setFlags((f) => ({ ...f, grass: n }));
        if (n === 5 && !has("emerald")) {
          grant("emerald");
          say("grass", "An emerald, because you insisted.");
        }
        if (n === 13) {
          setFlags((f) => ({ ...f, tree: true }));
          say("sapling", "A tree grows. In the branches: 8.87 / 10. Nobody asked.");
        }
        return;
      }
      if (ch === "O") {
        const n = flags.ore + 1;
        setFlags((f) => ({ ...f, ore: n }));
        if (n === 1) say("stone", "It looks like stone. It is not entirely stone.");
        if (n === 3) {
          grant("diamond");
          say("stone", "You were not supposed to find this.");
        }
        return;
      }
      if (ch === "L") {
        setFlags((f) => ({ ...f, lever: true }));
        achieve("redstone_engineer");
        grant("redstone");
        say("lever", "A red line crawls toward the workshop. Something down there is still compiling.");
        return;
      }
      if (ch === "V") {
        const n = flags.painting + 1;
        setFlags((f) => ({ ...f, painting: n }));
        if (n < 3) say("painting", "A landscape of Pune that is also, somehow, not Pune.");
        if (n === 3) {
          setFlags((f) => ({ ...f, bunkerOpen: true }));
          say("painting", "The canvas peels. Cold air. Someone has been running nmap in here.");
        }
        return;
      }
      if (ch === "w") say("water", "Pune is inland. This pond is a lie. You respect it anyway.");
    },
    [flags.traded, flags.campfire, flags.grass, flags.ore, flags.painting, achieve, say, grant, has],
  );

  const tryMove = useCallback(
    (nx: number, ny: number, clicked = false) => {
      if (room !== "overworld") return;
      if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) return;
      const ch = tileAt(nx, ny);
      if (clicked && nx === pos.x && ny === pos.y) {
        inspect(ch);
        return;
      }
      if (ch === "t") {
        say("oak", "The bark is carved: 'PICT 2023—' and then the knife slipped.");
        return;
      }
      if (!canWalk(ch, flags) && !flags.creative) return;
      setPos({ x: nx, y: ny });
      idle.current = 0;
      achieve("first_step");
      if (ch === "Y") {
        enter(has("omkar_key") && visited.has("temple") ? "end" : "temple");
      } else if ((ch === "V" || ch === "B") && flags.bunkerOpen) {
        enter("bunker");
      } else {
        const dest = TILE_ROOM[ch];
        if (dest) enter(dest);
      }
      if (ch === "N" || ch === "L" || ch === "w") inspect(ch);
      if (ch === "c" && flags.campfire === 0) inspect(ch);
      if (ch === "V" && flags.painting === 0) inspect(ch);
    },
    [room, pos, flags, visited, achieve, enter, say, inspect, has],
  );

  const api: WorldApi = useMemo(
    () => ({ flags, inventory, room, has, grant, achieve, enter, say, setFlag }),
    [flags, inventory, room, has, grant, achieve, enter, say, setFlag],
  );

  useEffect(() => {
    const t = window.setInterval(() => {
      idle.current += 1;
      if (idle.current === 70 && !flags.creeper) {
        setFlags((f) => ({ ...f, creeper: true }));
        achieve("sleepless");
        say("???", "ssssssssss— it leaves gunpowder and a dent in the dirt.");
        grant("gunpowder");
      }
    }, 1000);
    return () => window.clearInterval(t);
  }, [flags.creeper, achieve, say, grant]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      idle.current = 0;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      konami.current = [...konami.current, e.key].slice(-10);
      if (KONAMI.every((k, i) => konami.current[i] === k)) {
        setFlags((f) => ({ ...f, creative: true }));
        achieve("creative");
        say("game mode", "Creative. The map no longer argues.");
      }

      if (e.key === "F3") {
        e.preventDefault();
        setFlags((f) => ({ ...f, f3: !f.f3 }));
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        setFlags((f) => ({ ...f, cmd: true }));
        return;
      }
      if (e.key === "e" || e.key === "E") {
        setFlags((f) => ({ ...f, craft: !f.craft }));
        return;
      }
      if (e.key === "Escape") {
        if (flags.cmd || flags.craft || flags.term || dialogue) {
          setFlags((f) => ({ ...f, cmd: false, craft: false, term: false }));
          setDialogue(null);
          return;
        }
        if (room !== "overworld") {
          enter("overworld");
          return;
        }
      }

      const dir: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        a: [-1, 0],
        s: [0, 1],
        d: [1, 0],
        W: [0, -1],
        A: [-1, 0],
        S: [0, 1],
        D: [1, 0],
      };
      const d = dir[e.key];
      if (d) {
        e.preventDefault();
        tryMove(pos.x + d[0], pos.y + d[1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos, flags.cmd, flags.craft, flags.term, dialogue, room, tryMove, enter, achieve, say]);

  function runCommand(raw: string) {
    const line = raw.trim();
    const add = (s: string) => setLogs((l) => [...l.slice(-24), s]);
    add(`> ${line}`);
    const [head, ...rest] = line.replace(/^\//, "").split(/\s+/);
    const arg = rest.join(" ");
    switch (head) {
      case "help":
        add("tp <lab|bunker|academy|foundry|workshop|arena|temple|end> · give · whoami · seed · gamemode · sudo");
        break;
      case "tp": {
        const map: Record<string, RoomId> = {
          lab: "lab",
          bunker: "bunker",
          academy: "academy",
          foundry: "foundry",
          workshop: "workshop",
          arena: "arena",
          temple: "temple",
          end: "end",
          spawn: "overworld",
          overworld: "overworld",
        };
        const dest = map[arg];
        if (!dest) add("Unknown waypoint. The world is not a résumé.");
        else {
          if (dest === "end" && !has("omkar_key") && !flags.creative) add("The portal is quiet. Craft the Operator Key.");
          else enter(dest);
          add(`Teleported to ${arg}.`);
        }
        break;
      }
      case "give":
        grant("diamond");
        add("Given [Diamond] x1. Cheater.");
        break;
      case "whoami":
        add(flags.traded ? "omkar@pune ~ agentic" : "player. The villager knows. You do not, yet.");
        break;
      case "seed":
        add("pune_highlands:2023  biome=campus  weather=argumentative");
        break;
      case "gamemode":
        setFlags((f) => ({ ...f, creative: true }));
        achieve("creative");
        add("Set own game mode to Creative Mode");
        break;
      case "sudo":
        achieve("cover_blown");
        enter("crash");
        add("rm: refusing to delete / : this is a website. or is it.");
        break;
      default:
        add(`Unknown command '${head}'. Try /help. Or don't.`);
    }
    setCmd("");
  }

  function craft() {
    playClick();
    let made = false;
    for (const r of RECIPE) {
      if (r.need.every((id) => has(id)) && !has(r.make)) {
        grant(r.make);
        pushToast("Crafted", r.toast);
        made = true;
        if (r.make === "omkar_key") achieve("how_the_hell");
      }
    }
    if (!made) say("crafting table", "The grid is empty of meaning. Bring cores, ciphers, dust.");
  }

  function trade() {
    if (!has("emerald")) {
      say("villager", "Hrm. No emerald. The grass remembers your fingers.");
      return;
    }
    setFlags((f) => ({ ...f, traded: true }));
    say(
      "villager",
      "He is Omkar. He lives in Pune. He builds agents that clean spreadsheets and argue with other agents. He will not introduce himself. That was the deal.",
    );
  }

  const look = tileAt(pos.x, pos.y);

  return (
    <main className="world" data-night={flags.night || undefined} data-room={room}>
      <h1 className="world__visually-hidden">A world. Not a biography.</h1>

      {room === "overworld" ? (
        <div className="world__stage">
          <div className="world__sky" aria-hidden="true">
            {flags.night
              ? Array.from({ length: 18 }, (_, i) => <span key={i} className="world__star" style={{ left: `${(i * 17) % 100}%`, top: `${(i * 13) % 40}%` }} />)
              : null}
          </div>
          <div
            className="world__map"
            role="application"
            aria-label="Overworld. Arrow keys or WASD to walk. Click a tile to step. F3 debug. Slash for commands. E to craft."
          >
            {MAP.map((row, y) =>
              row.split("").map((ch, x) => {
                const here = pos.x === x && pos.y === y;
                const showB = ch === "V" && flags.bunkerOpen;
                const showOre = ch === "O" && (flags.f3 || flags.ore >= 1);
                const redstone = flags.lever && y === 7 && x >= 8 && x <= 11;
                return (
                  <button
                    key={`${x}-${y}`}
                    type="button"
                    className="world__tile"
                    data-tile={showB ? "B" : ch}
                    data-here={here || undefined}
                    data-ore={showOre || undefined}
                    data-redstone={redstone || undefined}
                    data-tree={ch === "g" && flags.tree && x === 5 && y === 8 ? true : undefined}
                    aria-label={TILE_LABEL[ch] ?? ch}
                    onClick={() => tryMove(x, y, true)}
                  />
                );
              }),
            )}
          </div>
          {flags.creeper ? <div className="world__creeper" aria-hidden="true" /> : null}
        </div>
      ) : (
        <WorldRooms api={api} onBack={() => enter("overworld")} onEnd={() => enter("end")} />
      )}

      <div className="world__hud">
        <p className="world__hint">
          {room === "overworld"
            ? `wasd · click · / · e · f3 · look: ${TILE_LABEL[look] ?? look}`
            : "esc returns you to the grass"}
        </p>
        <div className="world__hotbar" aria-label="Inventory">
          {Array.from({ length: 9 }, (_, i) => {
            const item = inventory[i];
            return (
              <span key={i} className="world__slot">
                {item ? <abbr title={ITEMS[item].lore}>{ITEMS[item].glyph}</abbr> : null}
              </span>
            );
          })}
        </div>
        <div className="world__hud-row">
          <button type="button" className="mc-widget" onClick={() => setFlag("craft", !flags.craft)}>
            <span className="mc-widget__label">Craft</span>
          </button>
          <McButton href="/">Title Screen</McButton>
        </div>
      </div>

      {flags.f3 ? (
        <pre className="world__f3" aria-hidden="true">
          {`Minecraft-ish 1.0.0
xyz: ${pos.x} / 64 / ${pos.y}
chunk: 0 0  biome: pune_highlands
facing: curiosity
fps: 60 (lying)
room: ${room}
seed: pune_highlands:2023
advancements: ${unlocked.size}/${Object.keys(ACHIEVEMENTS).length}
Removed Herobrine: ${flags.campfire >= 7}`}
        </pre>
      ) : null}

      {dialogue ? (
        <button type="button" className="world__dialogue" onClick={() => setDialogue(null)}>
          <strong>{dialogue.speaker}</strong>
          <span>{dialogue.text}</span>
          <em>click to close</em>
        </button>
      ) : null}

      {flags.traded && room === "overworld" && look === "N" ? (
        <button type="button" className="world__ghost-btn" onClick={trade}>
          already traded
        </button>
      ) : null}
      {room === "overworld" && look === "N" && !flags.traded ? (
        <button type="button" className="mc-widget world__trade" onClick={trade}>
          <span className="mc-widget__label">Trade emerald</span>
        </button>
      ) : null}

      {flags.craft ? (
        <div className="world__panel">
          <h2>Crafting</h2>
          <p>The grid does not explain itself. Combine what the world hid.</p>
          <ul>
            {inventory.map((id) => (
              <li key={id}>
                {ITEMS[id].glyph} {ITEMS[id].name}
              </li>
            ))}
          </ul>
          <button type="button" className="mc-widget" onClick={craft}>
            <span className="mc-widget__label">Assemble</span>
          </button>
          <button type="button" className="mc-widget" onClick={() => setFlag("craft", false)}>
            <span className="mc-widget__label">Close</span>
          </button>
        </div>
      ) : null}

      {flags.cmd ? (
        <form
          className="world__cmd"
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(cmd);
          }}
        >
          <label>
            /
            <input
              autoFocus
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              aria-label="Command"
              placeholder="help"
            />
          </label>
        </form>
      ) : null}

      {flags.term || room === "lab" ? (
        <div className="world__term" hidden={room !== "lab" && !flags.term}>
          {room === "lab" ? (
            <pre>
              {logs.join("\n")}
              {`
[guardrail] ok
[file_select] workbook_03.xlsx (hostile headers)
[retrieve] chroma://local
[sandbox] docker exec python -c "clean()"
[format] sse stream… still open
[reviewer] MISSING
[note] intern@froncort  Apr 2026—present`}
            </pre>
          ) : null}
        </div>
      ) : null}

      <ul className="world__toasts" aria-live="polite">
        {toasts.map((t) => (
          <li key={t.id}>
            <strong>Advancement made!</strong>
            <span>{t.title}</span>
            <small>{t.desc}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
