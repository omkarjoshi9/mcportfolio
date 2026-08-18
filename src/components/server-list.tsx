import Link from "next/link";
import { McButton } from "@/components/mc-button";
import { PROJECTS, type ProjectStatus } from "@/lib/content/projects";
import { SITE } from "@/lib/site";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Online",
  wip: "WIP",
  private: "Private",
};

/**
 * Multiplayer-style server list: each project is a joinable row.
 */
export function ServerList() {
  return (
    <main className="servers">
      <h1 className="servers__title">Projects</h1>
      <div className="servers__divider" />

      <ul className="servers__list">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="servers__row">
              <span className="servers__icon" aria-hidden="true" data-status={project.status} />
              <span className="servers__copy">
                <span className="servers__name">{project.title}</span>
                <span className="servers__motd">{project.motd[0]}</span>
                <span className="servers__motd">{project.motd[1]}</span>
              </span>
              <span className="servers__meta">
                <span className="servers__version">{project.version}</span>
                <span className="servers__ping" data-status={project.status} title={STATUS_LABEL[project.status]}>
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className="servers__status">{STATUS_LABEL[project.status]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="servers__spacer" />
      <div className="servers__divider" />
      <div className="servers__actions">
        <McButton href={SITE.github}>GitHub Profile</McButton>
        <McButton href="/">Done</McButton>
      </div>
    </main>
  );
}
