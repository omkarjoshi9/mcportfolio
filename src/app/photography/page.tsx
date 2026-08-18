import type { Metadata } from "next";
import { ChunkPending } from "@/components/chunk-pending";

export const metadata: Metadata = { title: "Photography" };

export default function Photography() {
  return (
    <ChunkPending
      title="Photography"
      blurb="Photographs sorted by series, each one carrying the camera and lens it was shot on."
    />
  );
}
