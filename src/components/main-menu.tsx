import { Avatar } from "@/components/avatar/avatar";
import { McButton } from "@/components/mc-button";
import { SplashText } from "@/components/splash-text";
import { SITE } from "@/lib/site";

/**
 * The main menu. Server-rendered on purpose: the name, the tagline, and every
 * navigation link sit in the initial HTML, so crawlers and anyone who skips
 * the boot screen get the real page immediately.
 */
export function MainMenu() {
  return (
    <main className="menu">
      <div className="menu__brand">
        <h1 className="wordmark">
          <span className="wordmark__line">{SITE.firstName}</span>
          <span className="wordmark__line">{SITE.lastName}</span>
        </h1>
        <p className="menu__tagline">{SITE.tagline}</p>
        <SplashText />
      </div>

      <nav className="menu__nav" aria-label="Main menu">
        <McButton href="/projects">Projects</McButton>
        <div className="menu__row">
          <McButton href="/options" variant="narrow">
            Options
          </McButton>
          <McButton href="/contact" variant="narrow">
            Contact
          </McButton>
        </div>
      </nav>

      <Avatar />

      <footer className="menu__footer">
        <span>
          {SITE.version} ({SITE.framework})
        </span>
        <span className="menu__disclaimer">{SITE.disclaimer}</span>
      </footer>
    </main>
  );
}
