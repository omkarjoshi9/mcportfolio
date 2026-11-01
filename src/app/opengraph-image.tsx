import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PixelFace } from "@/lib/pixel-face";
import { SITE } from "@/lib/site";

export const alt = `${SITE.fullName} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const monocraft = await readFile(join(process.cwd(), "public/fonts/Monocraft.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "linear-gradient(180deg, #2c3e55 0%, #1f2d20 100%)",
          color: "#ffffff",
          fontFamily: "Monocraft",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1.05 }}>{SITE.firstName}</div>
          <div style={{ fontSize: 104, lineHeight: 1.05 }}>{SITE.lastName}</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#e0e0e0" }}>{SITE.tagline}</div>
        </div>
        <div style={{ display: "flex", border: "8px solid #1f1f1f" }}>
          <PixelFace cell={50} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Monocraft", data: monocraft, style: "normal", weight: 400 }] },
  );
}
