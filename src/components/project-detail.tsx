import { McButton } from "@/components/mc-button";
import type { Project } from "@/lib/content/projects";

/**
 * Server MOTD / detail panel for one project.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="project">
      <h1 className="project__title">{project.title}</h1>
      <div className="project__divider" />

      <p className="project__motd">
        {project.motd[0]} {project.motd[1]}
      </p>

      <ul className="project__stack" aria-label="Stack">
        {project.stack.map((tech) => (
          <li key={tech} className="project__chip">
            {tech}
          </li>
        ))}
      </ul>

      <ul className="project__bullets">
        {project.bullets.map((bullet) => (
          <li key={bullet.slice(0, 48)}>{bullet}</li>
        ))}
      </ul>

      <div className="project__spacer" />
      <div className="project__divider" />
      <div className="project__actions">
        {project.repoUrl ? <McButton href={project.repoUrl}>Open Repository</McButton> : null}
        <McButton href="/projects">Back to Projects</McButton>
      </div>
    </main>
  );
}
