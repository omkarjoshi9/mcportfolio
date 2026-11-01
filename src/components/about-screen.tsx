import { McButton } from "@/components/mc-button";
import { PROFILE } from "@/lib/content/profile";

/** A plain résumé page, laid out with the same panel as a project detail. */
export function AboutScreen() {
  const { education } = PROFILE;

  return (
    <main className="project">
      <h1 className="project__title">About Me</h1>
      <div className="project__divider" />

      <p className="project__motd">{PROFILE.bio}</p>

      <section className="about__section" aria-labelledby="about-education">
        <h2 className="about__heading" id="about-education">
          Education
        </h2>
        <p className="about__role">{education.school}</p>
        <p className="about__meta">
          {education.degree} · {education.dates} · {education.detail}
        </p>
      </section>

      <section className="about__section" aria-labelledby="about-experience">
        <h2 className="about__heading" id="about-experience">
          Experience
        </h2>
        {PROFILE.experience.map((job) => (
          <article key={job.company}>
            <p className="about__role">
              {job.role} · {job.company}
            </p>
            <p className="about__meta">{job.dates}</p>
            <ul className="project__bullets">
              {job.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="about__section" aria-labelledby="about-skills">
        <h2 className="about__heading" id="about-skills">
          Skills
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

      <section className="about__section" aria-labelledby="about-more">
        <h2 className="about__heading" id="about-more">
          Leadership &amp; Certifications
        </h2>
        <ul className="project__bullets">
          {PROFILE.extracurricular.map((item) => (
            <li key={item.title}>
              {item.title}
              {item.dates ? ` (${item.dates})` : ""}. {item.detail}
            </li>
          ))}
          {PROFILE.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      <div className="project__spacer" />
      <div className="project__divider" />
      <div className="project__actions">
        <McButton href="/contact">Contact</McButton>
        <McButton href="/">Done</McButton>
      </div>
    </main>
  );
}
