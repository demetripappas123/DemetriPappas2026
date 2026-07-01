"use client";

import MarkdownPreview from "@/components/MarkdownPreview";
import { type ProjectWithPreview } from "@/components/projects-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const previewPanelClassName =
  "relative w-full min-w-0 h-80 max-h-[42vh] min-[755px]:mb-0 min-[755px]:flex-[3] min-[755px]:shrink-0 min-[755px]:h-[22rem] min-[755px]:max-h-[52vh] lg:h-[24rem] lg:max-h-[56vh]";

function ProjectPreviewPanel({
  project,
}: {
  project: ProjectWithPreview;
}) {
  return (
    <div className="h-full min-h-[16rem] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {project.readmeContent ? (
        <MarkdownPreview
          content={project.readmeContent}
          repoUrl={project.repoUrl}
        />
      ) : (
        <div className="relative h-full min-h-[16rem]">
          <iframe
            src={project.url}
            title={`${project.title} preview`}
            className="h-full w-full border-0 bg-background"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="absolute top-3 right-3 rounded-full border border-zinc-200 bg-white/95 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-700 shadow-sm transition-colors hover:bg-white"
          >
            Open app
          </a>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectWithPreview }) {
  const previewFirst = Boolean(project.previewFirst);
  const hasPreview = Boolean(project.readmeContent || project.url);

  return (
    <article className="flex min-w-0 flex-col gap-6 overflow-visible min-[755px]:flex-row min-[755px]:items-center min-[755px]:gap-8">
      <div
        className={`flex min-w-0 shrink flex-col bg-zinc-50 p-4 min-[755px]:min-w-0 min-[755px]:flex-[5] sm:p-5 dark:bg-zinc-100${previewFirst ? " order-2" : ""}`}
      >
        <p className="text-sm uppercase tracking-wide text-zinc-500">
          {project.period}
        </p>

        <p className="mt-2 text-lg leading-snug font-semibold italic text-zinc-900 sm:text-xl">
          <span className="text-slate-700 dark:text-slate-500">
            {project.title}
          </span>
          {project.subtitle ? ` – ${project.subtitle}` : null}
        </p>

        <ul className="mt-4 list-disc space-y-4 pl-5 text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8">
          {project.body.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {hasPreview ? (
        <div
          className={`${previewPanelClassName}${previewFirst ? " order-1" : ""}`}
        >
          <ProjectPreviewPanel project={project} />
        </div>
      ) : null}
    </article>
  );
}

type ProjectCarouselProps = {
  projects: ProjectWithPreview[];
};

const carouselArrowClassName =
  "cursor-pointer rounded-full bg-zinc-800/70 p-2 text-zinc-100 shadow-md backdrop-blur-sm transition-colors hover:bg-zinc-800/90 disabled:pointer-events-none disabled:opacity-30";

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
  }, [projects.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  const goTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const nextIndex = Math.min(Math.max(index, 0), projects.length - 1);
    container.scrollTo({
      left: nextIndex * container.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  };

  return (
    <div className="relative mt-16 sm:mt-20">
      <div className="mb-5 hidden items-center justify-center gap-2 sm:flex">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={carouselArrowClassName}
        >
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next project"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          className={carouselArrowClassName}
        >
          <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <ul
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <li
            key={project.title}
            className="w-full shrink-0 snap-start snap-always"
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Go to ${project.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-8 bg-zinc-800"
                : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
