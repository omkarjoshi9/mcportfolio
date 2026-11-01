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
 * Projects drawn from the READMEs on github.com/omkarjoshi9.
 * Static only — no runtime GitHub API.
 */
export const PROJECTS: Project[] = [
  {
    slug: "agentic-pentester",
    title: "Agentic Pentester",
    motd: [
      "An autonomous AI agent that plans, runs and reports web pentests.",
      "LangGraph + FFUF, OWASP ZAP and Playwright.",
    ],
    stack: ["LangGraph", "FastAPI", "FFUF", "OWASP ZAP", "Playwright", "Python"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/agentic_pentester",
    bullets: [
      "LangGraph orchestrator that runs multi-stage penetration tests on its own: plan, attack, judge, summarise, repeat until findings converge.",
      "Planner, Judge and Summarizer agents coordinate FFUF (fuzzing), OWASP ZAP (spidering) and Playwright (JavaScript-heavy apps).",
      "A confidence engine scores each finding with CWE mappings and severity; every finding is tied to an evidence store entry.",
      "Guardrails and sandboxed execution keep the agent in scope. Reports export as HTML, JSON or Markdown.",
    ],
  },
  {
    slug: "deployx",
    title: "DeploX",
    motd: [
      "Vercel-style deploys: paste a repo URL, get a live site.",
      "Clone, queue, build, serve from S3 on a subdomain.",
    ],
    stack: ["TypeScript", "Node.js", "Redis", "S3 / MinIO", "Docker", "Next.js"],
    version: "TypeScript",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/DeploX",
    bullets: [
      "Small deployment platform split into upload, deploy and request-handler services.",
      "POST /deploy clones the repo and enqueues a job; GET /status reports cloning, queued, building, deployed or failed.",
      "Redis queue with in-flight and dead-letter lists and retry counts; workers run npm install and build, then upload to S3 / MinIO.",
      "Request handler maps <id>.deplox.com to the built files. Docker Compose runs Redis and MinIO locally.",
    ],
  },
  {
    slug: "devsync",
    title: "DevSync",
    motd: [
      "Real-time collaborative code editor.",
      "Sandboxed execution in Docker, 10+ languages.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Socket.io", "PostgreSQL", "Redis", "Docker"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/DevSync",
    bullets: [
      "Join a room, edit code together live, and run it safely.",
      "Email/password and Google OAuth sign-in with JWT sessions, refresh tokens and password reset.",
      "Password-protected rooms synced over Socket.io and Redis pub/sub.",
      "Code runs in isolated Docker containers through a Bull job queue, with rate limiting and input validation.",
    ],
  },
  {
    slug: "job-hunt",
    title: "jobdigest",
    motd: [
      "Daily intern + new-grad job digest for India, on Telegram.",
      "ATS boards, hard filters, LLM scoring. No auto-apply.",
    ],
    stack: ["Python", "OpenRouter", "GitHub Actions", "Neon Postgres", "Scrapling", "Telegram Bot API"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/job_hunt",
    bullets: [
      "Collects openings from public ATS boards, RSS feeds and HTML portals (scraped with Scrapling).",
      "Python hard filters cut noise first; OpenRouter then scores each remaining job against my profile.",
      "Sends the best matches to Telegram at 9:00 IST, scheduled on GitHub Actions with job state in Neon Postgres.",
      "Private hunt config stays out of the public repo; only example YAML is committed.",
    ],
  },
  {
    slug: "age-of-umpires",
    title: "Age of Umpires",
    motd: [
      "Guess the umpire's age; the third umpire confirms.",
      "Daily challenge, free play and a levelled campaign.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vitest"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/age_of_umpires",
    bullets: [
      "Cricket guessing game with a Daily Decision that resets at midnight IST and tracks streaks.",
      "Campaign mode unlocks levels by score and stars; scoring logic is unit-tested with Vitest.",
      "Build step syncs umpire photos from Wikimedia Commons; credits are kept in data. UI animated with Framer Motion.",
    ],
  },
  {
    slug: "agentic-search",
    title: "Agentic Search",
    motd: [
      "Multi-agent research: plan, search, read, report, review.",
      "Cited answers refined in a review loop.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "Groq", "Serper", "Streamlit"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/Agentic_Search",
    bullets: [
      "Planner, Selector, Reporter, Reviewer and Router agents wired as a LangGraph workflow.",
      "Google Serper supplies live results; BeautifulSoup scrapes the chosen page with error handling and length limits.",
      "The Reviewer scores each report and the Router loops back to the right step until quality is acceptable.",
      "Agents return JSON-schema outputs (Groq JSON mode) and a Streamlit chat UI shows each agent as it runs.",
    ],
  },
  {
    slug: "repo-intel-bot",
    title: "GitHub Repo Intelligence Bot",
    motd: [
      "AI summaries of new commits and PRs, sent to Slack.",
      "LangGraph agents over the GitHub REST API.",
    ],
    stack: ["Python", "LangGraph", "GitHub REST API", "OpenAI API", "Slack Webhooks"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/GitHub-Repo-Intelligence-Bot",
    bullets: [
      "Polls your GitHub repos on a schedule and summarises what changed with an LLM.",
      "Separate Commit, PR and Notifier agents under one LangGraph orchestrator.",
      "Configurable poll interval, repo cap, and filters for forks, archived and private repos.",
    ],
  },
  {
    slug: "sqli-pipeline",
    title: "SQLi Detection Pipeline",
    motd: [
      "Cloud-native AWS pipeline that catches SQL injection.",
      "WAF at the edge, query analysis inside the database.",
    ],
    stack: ["AWS", "CloudFront", "WAF", "ECS", "RDS", "Lambda", "SNS", "Python"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/SQLi-prevention-pipeline",
    bullets: [
      "CloudFront with AWS WAF managed SQLi rules filters payloads at the edge.",
      "The app runs on ECS against RDS; query logs stream to CloudWatch and a Lambda function flags anomalies.",
      "SNS delivers real-time alerts. OWASP Juice Shop generates realistic attack traffic for testing.",
    ],
  },
  {
    slug: "psl-ai-foundry",
    title: "Windows AI Foundry Research",
    motd: [
      "Week-by-week research on local-first AI and RAG.",
      "Foundry Local, Windows ML, on-device inference.",
    ],
    stack: ["Windows AI Foundry", "Foundry Local", "ONNX Runtime", "Ollama", "RAG", "Python"],
    version: "Python",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/PSL_AI_Foundry",
    bullets: [
      "Research-internship log comparing Windows AI Foundry with Azure AI Foundry on deployment, scalability and privacy.",
      "Worked with the Foundry Local CLI, Windows ML and the AI Toolkit for VS Code.",
      "Benchmarked Phi-3 Mini on Foundry against Ollama on a single request and measured much lower latency, attributed to ONNX Runtime with DirectML.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
