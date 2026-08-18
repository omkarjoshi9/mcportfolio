"use client";

import { useEffect } from "react";
import { applySettings, getSettings } from "@/lib/settings";

/**
 * Post-bootstrap safety net: re-applies stored settings once React mounts.
 * The inline script still owns the no-flash path; this covers private-mode
 * races and keeps the booted class in sync with Boot Screen Off.
 */
export function SettingsHydrator() {
  useEffect(() => {
    applySettings(document.documentElement, getSettings());
  }, []);

  return null;
}
