/** Profile facts from the résumé and github.com/omkarjoshi9, written the way I'd say them. */

export const PROFILE = {
  fullName: "Omkar Joshi",
  location: "Pune, India",
  email: "omkarnjoshi9@gmail.com",
  github: "https://github.com/omkarjoshi9",
  linkedin: "https://www.linkedin.com/in/omkarjoshi9/",
  intro: [
    "Hey, I'm Omkar. I'm an engineering student in Pune who got hooked on building AI agents that actually do things instead of just chatting.",
    "Most days that means LangGraph, FastAPI and a lot of testing so the model can't quietly make stuff up. I'm in my final year at PICT studying Electronics and Telecom (CGPA 8.88), and I'm looking for full-time work in Bengaluru from January 2027.",
  ],
  education: "Pune Institute of Computer Technology, B.E. Electronics & Telecommunication, 2023 – 2027",
  experience: [
    {
      where: "Froncort AI",
      what: "AI Engineer Intern",
      dates: "Apr – Aug 2026",
      story: [
        "Built a data-analysis product from scratch where an LLM writes its own analysis code, fixes it when it breaks, and runs it safely inside a Docker sandbox.",
        "Wrote 154 KPIs as plain tested formulas, so the numbers come from code instead of the model's imagination.",
        "Also looked after releases through a CI pipeline to GCP and built the streaming chat API.",
      ],
    },
    {
      where: "Persistent Systems",
      what: "Gen AI Intern",
      dates: "Aug – Nov 2025",
      story: [
        "Built a RAG service on Windows AI Foundry with query rewriting, HyDE and reranking.",
        "Set up an evaluation harness to prove it worked: +61% relevance and 83% fewer hallucinations.",
        "Wrote a 43-test suite that blocks bad merges in CI.",
      ],
    },
    {
      where: "PICT Pune",
      what: "Project Intern, Agentic Pentester",
      dates: "Jan – Mar 2026",
      story: [
        "Made a multi-agent security tester that goes from recon to exploitation to a written report, with Nmap, FFUF and OWASP ZAP behind guardrails.",
      ],
    },
  ],
  skills: {
    "Gen AI": ["LangChain", "LangGraph", "n8n", "Prompt Engineering"],
    "Languages": ["Python", "C++", "JavaScript"],
    "Databases": ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Pinecone", "ChromaDB"],
    "Cloud": ["AWS", "Azure", "Vertex AI"],
  },
  offline: [
    "I'm a competitive speedcuber and have been to 4 World Cube Association competitions (ID 2019JOSH02).",
    "I was Technical Head of PICT Cybercell, running the club's platforms and tools.",
    "In 2024 I led the escort team at a technical flagship event, keeping 50+ students and 30+ judges on schedule.",
    "I have the Microsoft Azure Fundamentals (AZ-900) certification.",
  ],
} as const;
