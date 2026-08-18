/** Profile facts from OmkarJoshiResume.pdf and github.com/omkarjoshi9. */

export const PROFILE = {
  fullName: "Omkar Joshi",
  location: "Pune, India",
  email: "omkarnjoshi9@gmail.com",
  github: "https://github.com/omkarjoshi9",
  linkedin: "https://www.linkedin.com/in/omkarjoshi9/",
  bio: "Agentic AI enthusiast and Gen AI intern building multi-node LangGraph systems, RAG pipelines, and full-stack tools. Studying Electronics and Telecommunication at PICT.",
  education: {
    school: "Pune Institute of Computer Technology",
    degree: "B.E. Electronics and Telecommunication",
    dates: "2023 – 2027",
    detail: "CGPA: 8.87 / 10",
  },
  experience: [
    {
      company: "Froncort AI",
      role: "AI Intern",
      dates: "Apr 2026 – Present",
      bullets: [
        "Built an end-to-end agentic data analysis system with FastAPI, LangGraph, and Vertex AI (Gemini Pro/Flash), using PostgreSQL for metadata and GCS for blob storage.",
        "Designed a LangGraph multi-node pipeline with guardrail, file selection, retrieval, sandboxed code execution, and response formatting; ran LLM-generated Python in a Docker sandbox with concurrency controls.",
        "Engineered LLM-driven document cleaning that auto-parses heterogeneous Excel workbooks, self-repairs cleaning code via Gemini Pro, persists to GCS, and streams results over SSE with sliding-window memory in Postgres.",
      ],
    },
    {
      company: "Persistent Systems",
      role: "Gen AI Intern",
      dates: "Aug 2025 – Nov 2025",
      bullets: [
        "Developed Generative AI systems using advanced LLM techniques for enterprise knowledge automation.",
        "Built an internal knowledge automation tool with LangChain for document parsing and conversational retrieval.",
        "Designed a Windows AI Foundry RAG system with query rewriting, HyDE, and reranking — improving retrieval accuracy by 78% while optimizing latency and contextual relevance.",
      ],
    },
  ],
  skills: {
    "Gen AI": ["LangChain", "LangGraph", "n8n", "Prompt Engineering"],
    Languages: ["Python", "C++", "JavaScript"],
    "Core Subjects": [
      "Data Structures and Algorithms",
      "Computer Networks",
      "Object-Oriented Programming",
    ],
    Databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Pinecone", "ChromaDB"],
    Cloud: ["AWS", "Azure", "Vertex AI"],
  },
  extracurricular: [
    {
      title: "Escort Team Lead, InC Technical Flagship Event",
      dates: "2024",
      detail:
        "Coordinated logistics and scheduling for 50+ students and 30+ judges, ensuring smooth execution of the event.",
    },
    {
      title: "Technical Head, PICT Cybercell",
      dates: "",
      detail:
        "Managed technical operations and infrastructure for the club, including platforms, tools, and technical initiatives.",
    },
  ],
  certifications: ["Microsoft Azure Fundamentals (AZ-900)"],
} as const;
