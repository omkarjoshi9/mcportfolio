export const STORAGE_KEY = "mc-settings";
export const BOOT_SESSION_KEY = "mc-booted";
/** Set by Replay Boot Screen so LoadingScreen plays once even when Boot is Off. */
export const FORCE_BOOT_KEY = "mc-force-boot";

export const GUI_SCALES = ["auto", 1, 2, 3, 4] as const;
export const MOTION_MODES = ["auto", "on", "off"] as const;
export const THEMES = ["day", "night"] as const;

export type GuiScale = (typeof GUI_SCALES)[number];
export type MotionMode = (typeof MOTION_MODES)[number];
export type Theme = (typeof THEMES)[number];

export const FOV_MIN = 30;
export const FOV_MAX = 110;
export const FOV_DEFAULT = 70;

/**
 * Perspective is the inverse of field of view: a narrow FOV means the camera
 * sits further back. 15400 at FOV 70 still yields 220vmax — a stronger zoom
 * range than the original 110vmax so 30 vs Quake Pro is obvious on a soft cube.
 */
export const FOV_CONSTANT = 15400;

export type Settings = {
  gui: GuiScale;
  fov: number;
  motion: MotionMode;
  sound: boolean;
  theme: Theme;
  bootScreen: boolean;
};

export const DEFAULTS: Settings = {
  gui: "auto",
  fov: FOV_DEFAULT,
  motion: "auto",
  sound: true,
  theme: "day",
  bootScreen: true,
};

export function fovToPerspective(fov: number): string {
  return `${(FOV_CONSTANT / fov).toFixed(2)}vmax`;
}

/**
 * Wider FOV tilts the camera down more so the warp reads even on a blurred
 * skybox. Mapped linearly from FOV_MIN→2° to FOV_MAX→12°.
 */
export function fovToPitch(fov: number): string {
  const t = (fov - FOV_MIN) / (FOV_MAX - FOV_MIN);
  const degrees = 2 + t * 10;
  return `${degrees.toFixed(2)}deg`;
}

export function formatFov(fov: number): string {
  if (fov === FOV_MAX) return "Quake Pro";
  if (fov === FOV_DEFAULT) return "Normal";
  return String(fov);
}

/** Anything in localStorage is untrusted — a previous version may have written it. */
function coerce(raw: unknown): Settings {
  const o = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const fov =
    typeof o.fov === "number" && Number.isFinite(o.fov)
      ? Math.min(FOV_MAX, Math.max(FOV_MIN, Math.round(o.fov)))
      : DEFAULTS.fov;

  return {
    gui: GUI_SCALES.find((value) => value === o.gui) ?? DEFAULTS.gui,
    fov,
    motion: MOTION_MODES.find((value) => value === o.motion) ?? DEFAULTS.motion,
    theme: THEMES.find((value) => value === o.theme) ?? DEFAULTS.theme,
    sound: typeof o.sound === "boolean" ? o.sound : DEFAULTS.sound,
    bootScreen: typeof o.bootScreen === "boolean" ? o.bootScreen : DEFAULTS.bootScreen,
  };
}

/**
 * Apply settings as attributes and inline custom properties on <html>.
 * removeProperty is the important part: leaving --gui set on "auto" would
 * stick the scale, because an inline style always outranks the media query.
 *
 * Boot Screen Off adds `booted` immediately so Done → / skips LoadingScreen
 * without a hard reload. Boot Screen On never removes `booted` mid-session —
 * only Replay Boot Screen clears it.
 */
export function applySettings(el: HTMLElement, s: Settings): void {
  if (s.gui === "auto") el.style.removeProperty("--gui");
  else el.style.setProperty("--gui", String(s.gui));

  if (s.fov === FOV_DEFAULT) {
    el.style.removeProperty("--panorama-perspective");
    el.style.removeProperty("--panorama-pitch");
  } else {
    el.style.setProperty("--panorama-perspective", fovToPerspective(s.fov));
    el.style.setProperty("--panorama-pitch", fovToPitch(s.fov));
  }

  el.dataset.theme = s.theme;
  el.dataset.motion = s.motion;
  el.dataset.sound = s.sound ? "on" : "off";

  if (!s.bootScreen) el.classList.add("booted");
}

let cache: Settings | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

/** Cached because useSyncExternalStore compares snapshots by reference. */
export function getSettings(): Settings {
  if (cache) return cache;
  try {
    cache = coerce(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"));
  } catch {
    cache = DEFAULTS;
  }
  return cache;
}

export function getServerSettings(): Settings {
  return DEFAULTS;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = null;
    applySettings(document.documentElement, getSettings());
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveSettings(next: Settings): void {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing can refuse writes; the setting still applies this visit.
  }
  applySettings(document.documentElement, next);
  emit();
}

/**
 * Restores DEFAULTS. Does not clear `booted` when bootScreen defaults to true —
 * the user already saw the boot screen this session; only Replay clears it.
 */
export function resetSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to undo if the write never landed.
  }
  cache = DEFAULTS;
  applySettings(document.documentElement, DEFAULTS);
  emit();
}

/**
 * Shipped as an inline <script> via Function.prototype.toString, so it must not
 * reference module scope or use anything the bundler might rewrite into a
 * helper. Keys and constants arrive as arguments to keep one source of truth.
 * Written in ES5 (`var`) on purpose so the emitted source stays portable.
 *
 * Argument 5 is the FOV default pitch in degrees (unused for math here — pitch
 * is derived inline the same way applySettings does).
 */
/* eslint-disable no-var, @typescript-eslint/no-unused-vars -- inline bootstrap must stay ES5 and swallow all errors */
export function bootstrapSettings(
  storageKey: string,
  sessionKey: string,
  fovDefault: number,
  fovConstant: number,
): void {
  try {
    var el = document.documentElement;
    var raw = localStorage.getItem(storageKey);
    var s = raw ? JSON.parse(raw) : {};

    if (s.gui && s.gui !== "auto") el.style.setProperty("--gui", String(s.gui));
    if (typeof s.fov === "number" && s.fov !== fovDefault) {
      el.style.setProperty("--panorama-perspective", fovConstant / s.fov + "vmax");
      // Same linear map as fovToPitch: 2deg at 30 → 12deg at 110.
      var pitch = 2 + ((s.fov - 30) / 80) * 10;
      el.style.setProperty("--panorama-pitch", pitch + "deg");
    }

    el.setAttribute("data-theme", s.theme === "night" ? "night" : "day");
    el.setAttribute("data-motion", s.motion === "on" || s.motion === "off" ? s.motion : "auto");
    el.setAttribute("data-sound", s.sound === false ? "off" : "on");

    if (
      s.bootScreen === false ||
      sessionStorage.getItem(sessionKey) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("booted");
    }
  } catch (e) {
    // A blocked storage API must never stop the page from rendering.
  }
}
/* eslint-enable no-var, @typescript-eslint/no-unused-vars */
