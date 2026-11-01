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
      "Autonomous AI agent that plans, runs and reports web pentests.",
      "LangGraph planner, judge and summarizer driving real security tools.",
    ],
    stack: ["LangGraph", "FastAPI", "FFUF", "OWASP ZAP", "Playwright", "Python"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/agentic_pentester",
    bullets: [
      "A LangGraph orchestrator that runs penetration tests end to end: a Planner agent picks the next attacks, tools execute them, a Judge agent rejects false positives, and a Summarizer writes up what survived.",
      "Drives FFUF for endpoint fuzzing, OWASP ZAP for spidering and scanning, and Playwright for JavaScript-heavy apps, with room for custom attack scripts.",
      "A confidence engine scores every finding with CWE mappings and severity, and an evidence store ties each one to the proof that produced it.",
      "Runs as a single-shot scan, an iterative plan-execute-learn loop until findings converge, or continuous monitoring, all configured in YAML with a max-iteration cap.",
      "Guardrails skip destructive actions and respect robots.txt; reports export as HTML, JSON or Markdown.",
    ],
  },
  {
    slug: "deployx",
    title: "DeploX",
    motd: [
      "A mini Vercel: paste a GitHub URL, get a live site.",
      "Queue-based builds, S3 storage, one subdomain per deploy.",
    ],
    stack: ["TypeScript", "Node.js", "Redis", "S3 / MinIO", "Docker", "Next.js"],
    version: "TypeScript",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/DeploX",
    bullets: [
      "A deployment platform in three services: an upload service clones the repo, a deploy service builds it, and a request handler serves the result at <id>.deplox.com.",
      "POST /deploy returns a 10-character deployment id immediately; GET /status then reports cloning, queued, building, deployed or failed.",
      "Builds run off a Redis queue with in-flight and dead-letter lists plus retry counts, so a crashed or failing build is retried and then parked instead of lost.",
      "Source and built output live in S3-compatible storage (MinIO locally), and the request handler maps each subdomain to its dist folder.",
      "A Next.js frontend submits repos and polls build status; Docker Compose brings up Redis and MinIO for local development.",
    ],
  },
  {
    slug: "devsync",
    title: "DevSync",
    motd: [
      "Real-time collaborative code editor with a safe run button.",
      "Live rooms over WebSockets, code executed in Docker sandboxes.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Socket.io", "PostgreSQL", "Redis", "Docker"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/DevSync",
    bullets: [
      "Create or join a room, edit code together in real time, and run it without touching your own machine.",
      "Express backend with email/password and Google OAuth sign-in, JWT access and refresh tokens, and password reset.",
      "Password-protected rooms synchronised over Socket.io, with Redis pub/sub keeping state consistent.",
      "Code runs inside isolated Docker containers fed by a Bull job queue, covering 10+ languages.",
      "Rate limiting, input validation and a PostgreSQL schema that records every execution.",
    ],
  },
  {
    slug: "job-hunt",
    title: "jobdigest",
    motd: [
      "A daily Telegram digest of intern and new-grad jobs in India.",
      "Public job boards, hard filters, then LLM scoring. No auto-apply.",
    ],
    stack: ["Python", "OpenRouter", "GitHub Actions", "Neon Postgres", "Scrapling", "Telegram Bot API"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/job_hunt",
    bullets: [
      "A job-search pipeline that finds India-based intern and new-grad openings so I read a short ranked list instead of a dozen job sites.",
      "Collects from public ATS boards, RSS feeds and HTML portals (scraped with Scrapling); hard Python filters remove irrelevant roles before any model is called.",
      "Remaining jobs are scored with OpenRouter, and the best are sent to Telegram at 9:00 IST every day.",
      "Runs entirely on GitHub Actions; job state lives in Neon Postgres because Actions runners keep no disk between runs.",
      "Deliberately never applies on my behalf, and keeps personal search config out of the public repo.",
    ],
  },
  {
    slug: "age-of-umpires",
    title: "Age of Umpires",
    motd: [
      "Guess the umpire's age; the third umpire confirms.",
      "A cricket game with a daily challenge, free play and a campaign.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vitest"],
    version: "TypeScript",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/age_of_umpires",
    bullets: [
      "A cricket guessing game: you see an umpire and guess their age, and your score depends on how close you land.",
      "A 39-umpire roster where every date of birth is sourced and tagged with a confidence level.",
      "Three ways to play: a Daily Decision that resets at midnight IST with streaks, free play, and a levelled campaign unlocked by score and stars.",
      "Age maths is handled carefully (leap-day birthdays, no timezone shifts) and covered by Vitest tests.",
      "Cricket-flavoured commentary for exact, close and missed guesses, and animated UI built with Framer Motion.",
    ],
  },
  {
    slug: "agentic-search",
    title: "Agentic Search",
    motd: [
      "A team of AI agents that researches a question and checks its own work.",
      "Plan, search, scrape, report, review, loop.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "Groq", "Serper", "Streamlit"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/Agentic_Search",
    bullets: [
      "Turns one research question into a full pipeline: a Planner picks the query, Google Serper fetches results, a Selector chooses the best source, and a scraper reads the page.",
      "A Reporter writes a cited answer, then a Reviewer judges its comprehensiveness, citations and relevance.",
      "A Router acts on the review and sends the work back to the Planner, Selector or Reporter, or finishes, so weak answers get another pass.",
      "Agents exchange JSON-schema outputs (Groq JSON mode) so routing never depends on parsing free text.",
      "A Streamlit chat interface shows each agent's output live as the graph runs.",
    ],
  },
  {
    slug: "repo-intel-bot",
    title: "GitHub Repo Intelligence Bot",
    motd: [
      "AI summaries of new commits and pull requests, sent to Slack.",
      "LangGraph agents watching every repo you own.",
    ],
    stack: ["Python", "LangGraph", "GitHub REST API", "OpenAI API", "Slack Webhooks"],
    version: "LangGraph",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/GitHub-Repo-Intelligence-Bot",
    bullets: [
      "Watches all of my GitHub repositories and posts a short, readable summary of what changed to a Slack channel.",
      "A LangGraph orchestrator coordinates a Commit agent, a PR agent and a Notifier agent, each with one job.",
      "Uses the GitHub REST API to fetch activity and gpt-4o-mini to summarise commits and pull requests cheaply.",
      "Configurable poll interval and repo cap, with switches to skip forks and archived repos and to choose public, private or all.",
    ],
  },
  {
    slug: "sqli-pipeline",
    title: "SQLi Detection Pipeline",
    motd: [
      "Cloud-native AWS pipeline that catches SQL injection.",
      "WAF at the edge plus query analysis inside the database.",
    ],
    stack: ["AWS", "CloudFront", "WAF", "ECS", "RDS", "Lambda", "SNS", "Python"],
    version: "Python",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/SQLi-prevention-pipeline",
    bullets: [
      "A WAF alone cannot see what actually reaches the database, so this pipeline adds backend visibility to edge filtering.",
      "CloudFront with AWS WAF managed SQLi and bad-input rules blocks malicious payloads before they reach the app.",
      "The application runs on ECS against RDS; query logs stream through CloudWatch to a Lambda function that detects suspicious SQL.",
      "Detections trigger real-time alerts through SNS.",
      "Tested safely against OWASP Juice Shop, an intentionally vulnerable app that produces realistic SQL injection traffic.",
    ],
  },
  {
    slug: "psl-ai-foundry",
    title: "Windows AI Foundry Research",
    motd: [
      "Research log on local-first AI, RAG and Copilot+ PCs.",
      "Six weeks building on Windows AI Foundry.",
    ],
    stack: ["Windows AI Foundry", "Foundry Local", "ONNX Runtime", "Pinecone", "RAG", "Python"],
    version: "Python",
    status: "wip",
    repoUrl: "https://github.com/omkarjoshi9/PSL_AI_Foundry",
    bullets: [
      "A week-by-week record of a research internship exploring Microsoft's local-first AI stack, from Foundry Local and Windows ML to Copilot+ PC hardware.",
      "Compared Windows AI Foundry with Azure AI Foundry and Ollama on deployment, scalability, privacy and latency.",
      "Built a Financial Report Generator on Foundry Local, then a full RAG application using Pinecone.",
      "The RAG pipeline: query rewriting, HyDE, retrieval, reranking and fusion RAG before generation.",
      "Benchmarked Phi-3 Mini on Foundry against Ollama and explored NPU-accelerated inference on Copilot+ PCs.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
