import { McButton } from "@/components/mc-button";
import { SITE } from "@/lib/site";

/**
 * Direct Connect style contact: mailto + socials, no backend form.
 */
export function ContactScreen() {
  return (
    <main className="contact">
      <h1 className="contact__title">Contact</h1>
      <div className="contact__divider" />

      <p className="contact__blurb">
        Reach me about agentic AI work, or collaborations — {SITE.location}.
      </p>

      <nav className="contact__nav" aria-label="Contact links">
        <McButton href={`mailto:${SITE.email}`}>Email</McButton>
        <McButton href={SITE.linkedin}>LinkedIn</McButton>
        <McButton href={SITE.github}>GitHub</McButton>
      </nav>

      <p className="contact__note">{SITE.email}</p>

      <div className="contact__spacer" />
      <div className="contact__divider" />
      <McButton href="/">Done</McButton>
    </main>
  );
}
