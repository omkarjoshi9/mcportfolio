export type ProjectStatus = "live" | "wip" | "private";

export type ProjectCategoryId = "current" | "early";

export type Project = {
  slug: string;
  category: ProjectCategoryId;
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

/** Server-list sections, in display order. */
export const PROJECT_CATEGORIES: { id: ProjectCategoryId; title: string }[] = [
  { id: "current", title: "Current Projects" },
  { id: "early", title: "early days😵" },
];

/**
 * Projects drawn from the READMEs on github.com/omkarjoshi9.
 * Static only — no runtime GitHub API.
 */
export const PROJECTS: Project[] = [
  {
    slug: "agentic-pentester",
    category: "current",
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
    slug: "job-hunt",
    category: "current",
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
    category: "current",
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
    slug: "sqli-pipeline",
    category: "current",
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
    slug: "zerodha-mcp-server",
    category: "early",
    title: "zerodha-mcp-server",
    motd: [
      "An MCP server that lets an AI assistant buy and sell stocks on Zerodha.",
      "Two tools over stdio, wired to the Kite Connect API.",
    ],
    stack: ["TypeScript", "Bun", "Model Context Protocol", "Kite Connect", "Zod"],
    version: "TypeScript",
    status: "live",
    repoUrl: "https://github.com/omkarjoshi9/zerodha-mcp-server",
    bullets: [
      "A small Model Context Protocol server, built on the official TypeScript SDK and run with Bun, that exposes a Zerodha account to an MCP client such as Claude Desktop.",
      "Registers two tools, buy-stock and sell-stock, each taking a stock symbol and a quantity validated with Zod.",
      "Both tools call the Kite Connect API to place a regular market order on NSE with the CNC (delivery) product.",
      "Talks to the client over stdio; there is no strategy logic, so every trade happens only when the assistant calls a tool.",
    ],
  },
  {
    slug: "devsync",
    category: "early",
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
    slug: "deployx",
    category: "early",
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
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
