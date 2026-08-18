"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { playClick } from "@/lib/sound";

/** Derived from Link so this compiles with or without typed routes enabled. */
type Href = ComponentProps<typeof Link>["href"];

type McButtonProps = {
  href: Href | string;
  children: ReactNode;
  variant?: "default" | "narrow";
};

function isExternal(href: string): boolean {
  return /^(https?:|mailto:)/i.test(href);
}

/**
 * A menu button at Minecraft's real widget proportion (200x20 game pixels).
 *
 * Internal routes use Next Link; http(s)/mailto use a plain anchor.
 */
export function McButton({ href, children, variant = "default" }: McButtonProps) {
  const className = "mc-widget mc-button";
  const label = <span className="mc-widget__label">{children}</span>;

  if (typeof href === "string" && isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        data-variant={variant}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        onClick={() => playClick()}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href as Href}
      className={className}
      data-variant={variant}
      onClick={() => playClick()}
    >
      {label}
    </Link>
  );
}
