import { McButton } from "@/components/mc-button";

/**
 * Placeholder for routes the menu links to but that are not built yet.
 * Better than a 404 from your own navigation, and it keeps typed routes valid.
 */
export function ChunkPending({ title, blurb }: { title: string; blurb: string }) {
  return (
    <main className="screen">
      <div className="mc-panel">
        <h1 className="mc-panel__title">{title}</h1>
        <p className="mc-panel__body">{blurb}</p>
        <p className="mc-panel__note">This chunk hasn&apos;t generated yet.</p>
        <McButton href="/">Back to Main Menu</McButton>
      </div>
    </main>
  );
}
