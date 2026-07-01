export type Project = {
  title: string;
  subtitle?: string;
  period: string;
  body: string[];
  tags: string[];
  url?: string;
  readmeUrl?: string;
  repoUrl?: string;
  previewFirst?: boolean;
};

export type ProjectWithPreview = Project & {
  readmeContent?: string;
};

export const projects: Project[] = [
  {
    title: "CertForge",
    subtitle: "Microsoft Agents League Hackathon",
    period: "Jun 2026",
    url: "https://certforge.livelycoast-b6b388e8.eastus.azurecontainerapps.io/",
    body: [
      "Engineered a typed multi-agent orchestration framework in Python that coordinates project intake, knowledge retrieval, planning, assessment, and validation through modular Pydantic v2 data models and deterministic execution pipelines.",
      "Implemented retrieval-augmented generation infrastructure using Azure AI Search and local semantic knowledge stores, with fail-safe fallback mechanisms, lazy-loaded cloud dependencies, and managed-identity authentication.",
      "Containerized and deployed an application on Azure Container Apps with CI/CD-ready infrastructure, structured telemetry logging, RBAC, and Azure OpenAI integration for intelligent workflows.",
    ],
    tags: [
      "Python",
      "Pydantic",
      "Multi-Agent Systems",
      "Azure AI Search",
      "RAG",
      "Azure Container Apps",
      "Azure OpenAI",
      "CI/CD",
    ],
  },
  {
    title: "High Performance Memory Allocator",
    subtitle: "C",
    period: "Mar 2026",
    body: [
      "Built a custom memory allocator that reclassifies blocks between size buckets and a red-black tree for larger blocks.",
      "Designed test suites demonstrating 97.8% reuse rates, 1.66x faster speeds than glibc's malloc for small and random allocations, and perfect 1.0 internal fragmentation and 0.91 external fragmentation.",
      "Added a union between heap pointers for small blocks and tree metadata for larger blocks in the block header, and bit-packed free and color flags for tree blocks reducing overhead from 20% to 14% without increasing fragmentation.",
    ],
    tags: ["C", "Memory Management", "Red-Black Tree", "Systems Programming"],
    readmeUrl:
      "https://raw.githubusercontent.com/demetripappas123/high-performance-malloc/main/README.md",
    repoUrl: "https://github.com/demetripappas123/high-performance-malloc",
  },
];

export async function loadProjectsWithPreviews(): Promise<ProjectWithPreview[]> {
  return Promise.all(
    projects.map(async (project) => {
      if (!project.readmeUrl) {
        return project;
      }

      try {
        const response = await fetch(project.readmeUrl, {
          next: { revalidate: 86400 },
        });

        if (!response.ok) {
          return project;
        }

        return {
          ...project,
          readmeContent: await response.text(),
        };
      } catch {
        return project;
      }
    }),
  );
}
