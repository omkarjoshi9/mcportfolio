export type ProjectStatus = "live" | "wip" | "private";

export type Project = {
  slug: string;
  title: string;
  /** Two short MOTD lines for the server list. */
  motd: [string, string];
  stack: string[];
  /** Primary tag shown as the “version” in the server list. */
  version: string;
  status: ProjectStatus;
  repoUrl?: string;
  bullets: string[];
};

/**
 * Featured projects from the resume plus pinned GitHub repos.
 * Static only — no runtime GitHub API.
 */
export const PROJECTS: Project[] = [
  {
    slug: "agentic-pentester",
    title: "Agentic AI Web Application Pentester",
    motd: [
      "Autonomous web app scanning with AI reasoning workflows.",
      "Structured vulnerability reports and remediation insights.",
    ],
    stack: ["LangGraph", "FastAPI", "Python"],
    version: "Python",
    status: "private",
    bullets: [
      "Developed an Agentic AI Web Application Pentester capable of autonomously scanning web applications and identifying vulnerabilities.",
      "Implemented AI reasoning workflows to simulate penetration testing strategies and dynamically generate attack vectors.",
      "Built automated vulnerability detection pipelines with monitoring and alerting mechanisms.",
      "Generated structured vulnerability reports with remediation insights.",
    ],
  },
  {
    slug: "agentic-search",
    title: "AI Agentic Search Engine",
    motd: [
      "LangGraph multi-agent search: Planner, Selector, Reporter, Reviewer.",
      "Serper + scraping with automated quality review.",
    ],
    stack: ["LangChain", "LangGraph", "Serper", "Scraper"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/Agentic_Search",
    bullets: [
      "Built an intelligent search engine using a LangGraph multi-node workflow with specialized agents (Planner, Selector, Reporter, Reviewer) for automated data retrieval and processing.",
      "Integrated Serper API for web search and custom scraping to gather data from multiple sources with automated quality review.",
    ],
  },
  {
    slug: "repo-intel-bot",
    title: "GitHub Repo Intelligence Bot",
    motd: [
      "LangGraph monitoring for commits and pull requests.",
      "OpenAI summaries and developer notifications.",
    ],
    stack: ["LangGraph", "GitHub REST API", "OpenAI API"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/GitHub-Repo-Intelligence-Bot",
    bullets: [
      "Built an automated repository monitoring system using LangGraph.",
      "Integrated the GitHub REST API to track commits and pull requests.",
      "Leveraged the OpenAI API for commit summarization and code analysis.",
      "Generated automated commit insights and developer notifications.",
    ],
  },
  {
    slug: "deployx",
    title: "DeploX",
    motd: [
      "TypeScript deployment / infra tooling.",
      "Pinned on GitHub.",
    ],
    stack: ["TypeScript"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/DeploX",
    bullets: [
      "TypeScript deployment and infrastructure tooling (pinned on GitHub).",
      "Open the repository for the latest README and setup notes.",
    ],
  },
  {
    slug: "devsync",
    title: "DevSync",
    motd: [
      "TypeScript developer sync tooling.",
      "Pinned on GitHub.",
    ],
    stack: ["TypeScript"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/DevSync",
    bullets: [
      "TypeScript developer sync tooling (pinned on GitHub).",
      "Open the repository for the latest README and setup notes.",
    ],
  },
  {
    slug: "sqli-pipeline",
    title: "SQLi Prevention Pipeline",
    motd: [
      "Python pipeline for SQL injection prevention.",
      "Pinned on GitHub.",
    ],
    stack: ["Python"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/SQLi-prevention-pipeline",
    bullets: [
      "Python pipeline focused on SQL injection prevention (pinned on GitHub).",
      "Open the repository for architecture details and usage.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
