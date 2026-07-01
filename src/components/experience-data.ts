export type ExperienceItem = {
  id: string;
  period: string;
  intro: string;
  highlight: string;
  outro: string;
  location?: string;
  body: string[];
  tags: string[];
  url?: string;
  previewLabel?: string;
  theme?: "light" | "dark";
  tagRows?: boolean;
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "puretalk-fullstack",
    period: "Jan – May 2025",
    intro: "As a",
    highlight: "Full-stack Developer",
    outro: "Intern at Puretalk AI,",
    body: [
      "I led agile development of the company's landing page and onboarding flow prior to going to market through scrum cycles using Jira.",
      "Improved UI/UX helped the business grow from ~40 to 150+ clients following launch, at which point I continued with CI/CD updates.",
      "In addition to managing the scrum cycles, a figma designer, and communicating with the CTO and CEO on time, scope, and resources, I implemented all code changes to the frontend.",
      "This included implementing API-driven interactive components and improved UI/UX, developing dashboards and AI-Agent interfaces with React, Tailwind, and Next.js, and implementing Websocket integrations with Azure endpoints to facilitate low-latency AI chatbot, voice agent, and text-to-speech interactions.",
    ],
    tags: [
      "Next.js",
      "Node.js",
      "Tailwind",
      "REST APIs",
      "Websockets",
      "CI/CD",
      "UI/UX",
    ],
    url: "https://puretalk.ai/",
    previewLabel: "Puretalk AI",
    tagRows: true,
  },
  {
    id: "puretalk-ml",
    period: "May – Sep 2025",
    intro: "As an",
    highlight: "ML Engineer",
    outro: "at Puretalk AI,",
    location: "Orlando, FL",
    body: [
      "Built Python-based evaluation pipelines to benchmark proprietary LLM (RUTH©) performance across reasoning, retrieval, and instruction-following tasks, enabling rapid regression testing between model versions.",
      "Performed large-scale error analysis across thousands of model outputs, developing failure-mode taxonomies that guided improvements to prompting and retrieval systems.",
      "Conducted comparative benchmarking of proprietary transformer models and retrieval-augmented generation systems, analyzing tradeoffs between factual accuracy, inference latency, and operational cost.",
    ],
    tags: [
      "Python",
      "LLMs",
      "RAG",
      "Transformers",
      "Benchmarking",
      "Prompt Engineering",
      "Error Analysis",
    ],
  },
  {
    id: "flexpt",
    period: "May 2025 – Current",
    intro: "As the",
    highlight: "Founder and Solo Dev",
    outro: "for FlexPT,",
    location: "Orlando, FL",
    body: [
      "Built the frontend with React using dynamic UI components and state management for realtime data.",
      "Designed backend services with Supabase (PostgreSQL), implementing authentication, database operations, and server-side business logic.",
      "Deployed the application on Vercel, optimizing request routing and helper functions for scale, and deploying serverless functions for low-latency business logic operations.",
      "Implemented AI workout program generation and editing with the Open AI API, designing custom system prompts and a context-retrieval pipeline to minimize token usage and reduce latency.",
    ],
    tags: [
      "React",
      "Next.js",
      "PostgreSQL",
      "Supabase",
      "Relational Database Design",
      "Software Security",
    ],
    url: "https://deebo-eosin.vercel.app/",
    previewLabel: "FlexPT",
  },
];
