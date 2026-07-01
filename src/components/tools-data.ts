export type SkillBin = {
  id: string;
  bin: string;
  title: string;
  items: string[];
  revision?: string;
};

export const skillBins: SkillBin[] = [
  {
    id: "SKL-A",
    bin: "BIN A",
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C"],
  },
  {
    id: "SKL-B",
    bin: "BIN B",
    title: "AI / ML",
    items: [
      "LLMs",
      "RAG",
      "Transformers",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Benchmarking",
    ],
  },
  {
    id: "SKL-C",
    bin: "BIN C",
    title: "Web & Backend",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "Websockets",
      "Tailwind",
    ],
  },
  {
    id: "SKL-D",
    bin: "BIN D",
    title: "Mobile",
    items: ["React", "Responsive UI", "UI/UX", "Realtime State"],
  },
  {
    id: "SKL-E",
    bin: "BIN E",
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "Azure Container Apps",
      "Azure OpenAI",
      "CI/CD",
      "Vercel",
      "RBAC",
    ],
  },
  {
    id: "SKL-F",
    bin: "BIN F",
    title: "Data Engineering",
    items: [
      "Azure AI Search",
      "Semantic Search",
      "PostgreSQL",
      "Supabase",
      "Pydantic",
    ],
  },
  {
    id: "SKL-G",
    bin: "BIN G",
    title: "Databases",
    items: [
      "PostgreSQL",
      "Supabase",
      "Relational Database Design",
      "Auth & RLS",
    ],
  },
  {
    id: "SKL-H",
    bin: "BIN H",
    title: "Security",
    items: ["Software Security", "RBAC", "Managed Identity", "Auth Flows"],
  },
  {
    id: "SKL-I",
    bin: "BIN I",
    title: "Domains",
    items: [
      "Agentic AI",
      "Full-stack Web",
      "Cloud Infrastructure",
      "Systems Programming",
    ],
  },
];
