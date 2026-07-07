"use client";

import { type ExperienceItem } from "@/components/experience-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const previewPanelClassName =
  "@container relative max-[754px]:mb-8 max-[754px]:h-[22rem] w-full min-w-0 min-[755px]:mb-0 min-[755px]:flex-[3] min-[755px]:shrink-0 min-[755px]:max-[799px]:h-[clamp(20rem,calc(100cqw*3/4),28rem)] min-[800px]:max-[859px]:h-[clamp(21rem,calc(100cqw*3/4),30rem)] min-[860px]:max-[928px]:h-[clamp(22rem,calc(100cqw*3/4),32rem)] min-[929px]:max-[935px]:h-[clamp(21rem,calc(100cqw*3/4),36rem)] min-[936px]:h-[clamp(23rem,calc(100cqw*3/4),40rem)] min-[1000px]:h-[clamp(25rem,calc(100cqw*3/4),42rem)]";

const experienceTagClassName =
  "rounded-full border border-slate-400/60 bg-slate-600/70 px-4 py-2 text-sm font-medium text-zinc-50";

const experienceTextPanelClassName =
  "flex min-w-0 shrink flex-col rounded-2xl bg-slate-700 p-4 min-[755px]:min-w-0 min-[755px]:flex-[5] sm:p-5";

function ExperienceTags({
  tags,
  tagRows,
}: {
  tags: string[];
  tagRows?: boolean;
}) {
  if (tagRows) {
    return (
      <div className="mt-6 flex flex-col gap-2.5">
        {[0, 1].map((rowIndex) => {
          const rowTags = tags.slice(
            rowIndex * Math.ceil(tags.length / 2),
            (rowIndex + 1) * Math.ceil(tags.length / 2),
          );

          return (
            <ul key={rowIndex} className="flex flex-wrap gap-2.5">
              {rowTags.map((tag) => (
                <li key={tag} className={experienceTagClassName}>
                  {tag}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    );
  }

  return (
    <ul className="mt-6 flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <li key={tag} className={experienceTagClassName}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const hasPreview = Boolean(item.url);

  return (
    <div className="relative">
      <article
        className={`relative z-10 flex min-w-0 flex-col gap-6 overflow-visible${hasPreview ? " min-[755px]:flex-row min-[755px]:items-center min-[755px]:gap-8" : ""}`}
      >
        <div
          className={`${experienceTextPanelClassName}${!hasPreview ? " min-[755px]:flex-none" : ""}`}
        >
          <p className="text-sm uppercase tracking-wide text-slate-200">
            {item.period}
          </p>

          <p className="mt-2 text-lg font-semibold italic leading-snug text-white sm:text-xl">
            {item.intro}{" "}
            <span className="text-zinc-100">{item.highlight}</span> {item.outro}
          </p>

          {item.location ? (
            <p className="mt-1 text-sm uppercase tracking-wide text-slate-300">
              {item.location}
            </p>
          ) : null}

          <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-7 text-zinc-50 marker:text-slate-300 sm:text-base sm:leading-8">
            {item.body.map((paragraph, index) => (
              <li key={index}>{paragraph}</li>
            ))}
          </ul>

          <ExperienceTags tags={item.tags} tagRows={item.tagRows} />
        </div>

        {hasPreview ? (
          <div className={previewPanelClassName}>
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <iframe
                src={item.url}
                title={`${item.previewLabel ?? item.highlight} preview`}
                className="absolute inset-0 h-full w-full border-0 bg-background"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 z-10 rounded-full border border-zinc-200 bg-white/95 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-700 shadow-sm transition-colors hover:bg-white"
              >
                Open app
              </a>
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}

type ExperienceCarouselProps = {
  items: ExperienceItem[];
};

const carouselArrowClassName =
  "cursor-pointer rounded-full bg-zinc-800/70 p-2 text-zinc-100 shadow-md backdrop-blur-sm transition-colors hover:bg-zinc-800/90 disabled:pointer-events-none disabled:opacity-30";

export default function ExperienceCarousel({ items }: ExperienceCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  }, [items.length]);

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

    const nextIndex = Math.min(Math.max(index, 0), items.length - 1);
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
          aria-label="Previous experience"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={carouselArrowClassName}
        >
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next experience"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          className={carouselArrowClassName}
        >
          <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <ul
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.id} className="w-full shrink-0 snap-start snap-always">
            <ExperienceCard item={item} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.highlight} experience`}
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
