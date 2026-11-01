"use client";

import dynamic from "next/dynamic";

/** three.js is client-only, so the scene loads after hydration and never blocks the menu. */
const AvatarScene = dynamic(() => import("./avatar-scene"), { ssr: false });

export function Avatar() {
  return (
    <div className="avatar">
      <AvatarScene />
    </div>
  );
}
