"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BOOT_SESSION_KEY, FORCE_BOOT_KEY, getSettings, subscribe } from "@/lib/settings";

/**
 * The boot screen: tiled dirt, a chunk colormap, and a progress bar.
 *
 * Java's loading screen draws one pixel per chunk, filling outward in square
 * rings as terrain generates. That is what the grid below is imitating.
 *
 * Three rules this obeys, because a loading screen is charming once and
 * hostile on the fourth visit:
 *   - it plays at most once per session (see the inline script in layout.tsx)
 *   - it is skippable at any moment
 *   - the bar tracks real asset loading, not a fake timer
 */

const GRID = 11;
const CELL_COUNT = GRID * GRID;

/**
 * Cells ordered by Chebyshev distance from the centre, which fills the grid in
 * expanding squares the way chunk loading actually radiates from spawn.
 */
const CELL_ORDER: number[] = (() => {
  const centre = (GRID - 1) / 2;
  return Array.from({ length: CELL_COUNT }, (_, index) => index)
    .sort((a, b) => {
      const distance = (i: number) =>
        Math.max(Math.abs((i % GRID) - centre), Math.abs(Math.floor(i / GRID) - centre));
      return distance(a) - distance(b) || a - b;
    })
    .reduce<number[]>((order, cellIndex, rank) => {
      order[cellIndex] = rank;
      return order;
    }, []);
})();

const STAGES = [
  { at: 0, label: "Loading terrain" },
  { at: 0.35, label: "Building terrain" },
  { at: 0.62, label: "Loading photos" },
  { at: 0.85, label: "Joining world" },
] as const;

const MIN_DURATION = 900;
const MAX_DURATION = 2500;
const PANORAMA_FACES = 6;

function isBooted(): boolean {
  return document.documentElement.classList.contains("booted");
}

/** Skip when already booted this session, or when Boot Screen is turned Off.
 *  Replay sets FORCE_BOOT_KEY so a forced play still works with Boot Off. */
function shouldSkipBoot(): boolean {
  try {
    if (sessionStorage.getItem(FORCE_BOOT_KEY)) return false;
  } catch {
    // Private browsing — fall through.
  }
  if (isBooted()) return true;
  try {
    return getSettings().bootScreen === false;
  } catch {
    return false;
  }
}

export function LoadingScreen() {
  // Prefer the live settings store so Boot Screen Off skips without waiting for
  // the booted class; fall back to the class for session / reduced-motion skips.
  const skip = useSyncExternalStore(subscribe, shouldSkipBoot, () => false);
  const [gone, setGone] = useState(false);
  const [closing, setClosing] = useState(false);
  const [stage, setStage] = useState<string>(STAGES[0].label);
  const rootRef = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, "1");
      sessionStorage.removeItem(FORCE_BOOT_KEY);
    } catch {
      // Private browsing can throw here; the screen just replays next visit.
    }
    document.documentElement.classList.add("booted");
    rootRef.current?.style.setProperty("--progress", "1");
    setClosing(true);
    window.setTimeout(() => setGone(true), 420);
  }, []);

  useEffect(() => {
    if (skip) return;

    let loaded = 0;
    const total = PANORAMA_FACES + 1;
    const countOne = () => {
      loaded += 1;
    };

    document.fonts.ready.then(countOne, countOne);
    for (let face = 0; face < PANORAMA_FACES; face++) {
      const image = new Image();
      image.onload = countOne;
      image.onerror = countOne;
      image.src = `/panorama/panorama_${face}.png`;
    }

    const start = performance.now();
    let shown = 0;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Whichever is further along: real work, or the patience ceiling.
      const target = Math.min(1, Math.max(loaded / total, elapsed / MAX_DURATION));
      shown += (target - shown) * 0.12;
      rootRef.current?.style.setProperty("--progress", shown.toFixed(4));

      const reached = [...STAGES].reverse().find((s) => shown >= s.at);
      if (reached) setStage((current) => (current === reached.label ? current : reached.label));

      if (elapsed >= MIN_DURATION && (loaded >= total || elapsed >= MAX_DURATION)) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish, skip]);

  if (skip || gone) return null;

  return (
    <div
      ref={rootRef}
      className="loading-screen"
      data-closing={closing || undefined}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loading-screen__inner">
        <div className="chunk-map" aria-hidden="true">
          {CELL_ORDER.map((order, index) => (
            <span
              key={index}
              className="chunk-map__cell"
              style={{ "--order": order } as React.CSSProperties}
              data-tone={order % 4}
            />
          ))}
        </div>

        <p className="loading-screen__stage">{stage}&hellip;</p>

        <div className="progress">
          <div className="progress__fill" />
        </div>
      </div>

      <button type="button" className="mc-widget loading-screen__skip" onClick={finish}>
        <span className="mc-widget__label">Skip</span>
      </button>
    </div>
  );
}
