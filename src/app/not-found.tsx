import type { Metadata } from "next";
import { McButton } from "@/components/mc-button";

export const metadata: Metadata = {
  title: "Connection Lost",
};

export default function NotFound() {
  return (
    <main className="screen">
      <div className="mc-panel">
        <h1 className="mc-panel__title">Connection Lost</h1>
        <p className="mc-panel__body">Chunk not found at this coordinate.</p>
        <McButton href="/">Back to Main Menu</McButton>
      </div>
    </main>
  );
}
