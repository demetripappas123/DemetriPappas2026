import ProjectCarousel from "@/components/ProjectCarousel";
import { FadeIn } from "@/components/FadeIn";
import { loadProjectsWithPreviews } from "@/components/projects-data";

export default async function Projects() {
  const projectItems = await loadProjectsWithPreviews();

  return (
    <FadeIn as="section" id="projects" className="relative z-10 pb-24 pt-24 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-zinc-50"
      />

      <div className="relative z-10">
        <h2 className="text-left text-3xl font-bold uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl">
          <span className="text-foreground">Projects I&apos;m </span>
          <span className="text-slate-700 dark:text-slate-500">working on.</span>
        </h2>

        <ProjectCarousel projects={projectItems} />
      </div>
    </FadeIn>
  );
}
