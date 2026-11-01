import { McButton } from "@/components/mc-button";
import { PROFILE } from "@/lib/content/profile";
import { SITE } from "@/lib/site";

/** A relaxed first-person page, laid out with the same panel as a project detail. */
export function AboutScreen() {
  return (
    <main className="project">
      <h1 className="project__title">About Me</h1>
      <div className="project__divider" />

      <section className="about__section" aria-label="Intro">
        {PROFILE.intro.map((line) => (
          <p key={line.slice(0, 32)} className="project__motd">
            {line}
          </p>
        ))}
      </section>

      <section className="about__section" aria-labelledby="about-work">
        <h2 className="about__heading" id="about-work">
          What I&apos;ve been up to
        </h2>
        {PROFILE.experience.map((job) => (
          <article key={job.where}>
            <p className="about__role">
              {job.what} @ {job.where}
            </p>
            <p className="about__meta">{job.dates}</p>
            <ul className="project__bullets">
              {job.story.map((line) => (
                <li key={line.slice(0, 48)}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="about__section" aria-labelledby="about-stack">
        <h2 className="about__heading" id="about-stack">
          Stuff I work with
        </h2>
        {Object.entries(PROFILE.skills).map(([group, items]) => (
          <div key={group}>
            <p className="about__meta">{group}</p>
            <ul className="project__stack" aria-label={group}>
              {items.map((item) => (
                <li key={item} className="project__chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="about__section" aria-labelledby="about-offline">
        <h2 className="about__heading" id="about-offline">
          Outside the editor
        </h2>
        <ul className="project__bullets">
          {PROFILE.offline.map((line) => (
            <li key={line.slice(0, 48)}>{line}</li>
          ))}
        </ul>
      </section>

      <div className="project__spacer" />
      <div className="project__divider" />
      <div className="project__actions">
        <McButton href={SITE.resume}>Download Resume</McButton>
        <McButton href="/contact">Say Hi</McButton>
        <McButton href="/">Done</McButton>
      </div>
    </main>
  );
}
