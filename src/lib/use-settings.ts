"use client";

import { useSyncExternalStore } from "react";
import { getServerSettings, getSettings, subscribe, type Settings } from "@/lib/settings";

/**
 * The value legitimately differs between server and client, because the server
 * has no localStorage. This renders defaults during hydration and swaps to the
 * stored values immediately after, with no mismatch and no manual effect.
 */
export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, getSettings, getServerSettings);
}
