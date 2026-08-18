"use client";

import { useRouter } from "next/navigation";
import { McButton } from "@/components/mc-button";
import { McCycle } from "@/components/mc-cycle";
import { McSlider } from "@/components/mc-slider";
import {
  BOOT_SESSION_KEY,
  FORCE_BOOT_KEY,
  FOV_MAX,
  FOV_MIN,
  GUI_SCALES,
  MOTION_MODES,
  THEMES,
  formatFov,
  resetSettings,
  saveSettings,
  type Settings,
} from "@/lib/settings";
import { playClick } from "@/lib/sound";
import { useSettings } from "@/lib/use-settings";

const BOOLEANS = [true, false] as const;
const titleCase = (value: string) => value[0].toUpperCase() + value.slice(1);

export function OptionsScreen() {
  const settings = useSettings();
  const router = useRouter();

  // A function declaration, not an arrow: `<K extends ...>` at the start of an
  // arrow in a .tsx file parses as JSX.
  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    saveSettings({ ...settings, [key]: value });
  }

  function replayBoot() {
    playClick();
    try {
      sessionStorage.removeItem(BOOT_SESSION_KEY);
      sessionStorage.setItem(FORCE_BOOT_KEY, "1");
    } catch {
      // Nothing stored means nothing to clear.
    }
    document.documentElement.classList.remove("booted");
    router.push("/");
  }

  return (
    <main className="options">
      <h1 className="options__title">Options</h1>
      <div className="options__divider" />

      <div className="options__grid">
        <McCycle
          label="GUI Scale"
          value={settings.gui}
          values={GUI_SCALES}
          format={(v) => (v === "auto" ? "Auto" : String(v))}
          onChange={(v) => set("gui", v)}
        />
        <McSlider
          label="FOV"
          value={settings.fov}
          min={FOV_MIN}
          max={FOV_MAX}
          format={formatFov}
          onChange={(v) => set("fov", v)}
        />
        <McCycle
          label="Motion"
          value={settings.motion}
          values={MOTION_MODES}
          format={titleCase}
          onChange={(v) => set("motion", v)}
        />
        <McCycle
          label="Sound"
          value={settings.sound}
          values={BOOLEANS}
          format={(v) => (v ? "On" : "Off")}
          onChange={(v) => set("sound", v)}
        />
        <McCycle
          label="Time"
          value={settings.theme}
          values={THEMES}
          format={titleCase}
          onChange={(v) => set("theme", v)}
        />
        <McCycle
          label="Boot Screen"
          value={settings.bootScreen}
          values={BOOLEANS}
          format={(v) => (v ? "On" : "Off")}
          onChange={(v) => set("bootScreen", v)}
        />
      </div>

      <div className="options__grid">
        <button type="button" className="mc-widget" onClick={replayBoot}>
          <span className="mc-widget__label">Replay Boot Screen</span>
        </button>
        <button
          type="button"
          className="mc-widget"
          onClick={() => {
            playClick();
            resetSettings();
          }}
        >
          <span className="mc-widget__label">Reset to Defaults</span>
        </button>
      </div>

      <div className="options__spacer" />
      <div className="options__divider" />
      <McButton href="/">Done</McButton>
    </main>
  );
}
