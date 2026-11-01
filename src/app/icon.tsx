import { ImageResponse } from "next/og";
import { PixelFace } from "@/lib/pixel-face";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<PixelFace cell={4} />, { ...size });
}
