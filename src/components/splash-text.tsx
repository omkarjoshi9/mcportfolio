"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_SPLASH, randomSplash } from "@/lib/splashes";

let clientSplash: string | null = null;

function getClientSplash(): string {
  if (!clientSplash) clientSplash = randomSplash();
  return clientSplash;
}

/**
 * The bobbing yellow line beside the wordmark.
 *
 * Randomising via useSyncExternalStore keeps the server markup stable (default
 * splash) and swaps to a random one after hydration, with no effect and no
 * mismatch warning. Hidden from assistive tech because it is a running joke,
 * not navigation.
 */
export function SplashText() {
  const splash = useSyncExternalStore(() => () => {}, getClientSplash, () => DEFAULT_SPLASH);

  return (
    <p className="splash" aria-hidden="true">
      {splash}
    </p>
  );
}
