"use client";

import { type ExperienceItem } from "@/components/experience-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const previewPanelClassName =
  "@container relative max-[754px]:mb-8 max-[754px]:h-[22rem] w-full min-w-0 min-[755px]:mb-0 min-[755px]:flex-[3] min-[755px]:shrink-0 min-[755px]:max-[799px]:h-[clamp(20rem,calc(100cqw*3/4),28rem)] min-[800px]:max-[859px]:h-[clamp(21rem,calc(100cqw*3/4),30rem)] min-[860px]:max-[928px]:h-[clamp(22rem,calc(100cqw*3/4),32rem)] min-[929px]:max-[935px]:h-[clamp(21rem,calc(100cqw*3/4),36rem)] min-[936px]:h-[clamp(23rem,calc(100cqw*3/4),40rem)] min-[1000px]:h-[clamp(25rem,calc(100cqw*3/4),42rem)]";

function ExperienceTags({
  tags,
  theme,
  tagRows,
}: {
  tags: string[];
  theme: "light" | "dark";
  tagRows?: boolean;
}) {
  const pillClassName =
    theme === "dark"
      ? "rounded-full border border-slate-500 bg-slate-700/80 px-4 py-2 text-sm font-medium text-slate-100"
      : "rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700";

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
                <li key={tag} className={pillClassName}>
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
        <li key={tag} className={pillClassName}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const theme = item.theme ?? "light";
  const isDark = theme === "dark";
  const hasPreview = Boolean(item.url);

  const textPanelClassName = isDark
    ? "flex min-w-0 shrink flex-col bg-transparent p-4 min-[755px]:min-w-0 min-[755px]:flex-[5] sm:p-5"
    : "flex min-w-0 shrink flex-col bg-zinc-50 p-4 min-[755px]:min-w-0 min-[755px]:flex-[5] sm:p-5 dark:bg-zinc-100";

  return (
    <div className="relative">
      {isDark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-[#1c1c1c]"
        />
      ) : null}

      <article
        className={`relative z-10 flex min-w-0 flex-col gap-6 overflow-visible${hasPreview ? " min-[755px]:flex-row min-[755px]:items-center min-[755px]:gap-8" : ""}`}
      >
        <div
          className={`${textPanelClassName}${!hasPreview ? " min-[755px]:flex-none" : ""}`}
        >
          <p
            className={
              isDark
                ? "text-sm uppercase tracking-wide text-slate-300"
                : "text-sm uppercase tracking-wide text-zinc-500"
            }
          >
            {item.period}
          </p>

          <p
            className={
              isDark
                ? "mt-2 text-lg font-semibold italic text-white sm:text-xl"
                : "mt-2 text-lg leading-snug font-semibold italic text-zinc-900 sm:text-xl"
            }
          >
            {item.intro}{" "}
            <span className={isDark ? "text-slate-300" : "text-slate-700 dark:text-slate-500"}>
              {item.highlight}
            </span>{" "}
            {item.outro}
          </p>

          {item.location ? (
            <p
              className={
                isDark
                  ? "mt-1 text-sm uppercase tracking-wide text-slate-400"
                  : "mt-1 text-sm uppercase tracking-wide text-zinc-500"
              }
            >
              {item.location}
            </p>
          ) : null}

          <ul
            className={
              isDark
                ? "mt-6 list-disc space-y-4 pl-5 text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
                : "mt-4 list-disc space-y-4 pl-5 text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8"
            }
          >
            {item.body.map((paragraph, index) => (
              <li key={index}>{paragraph}</li>
            ))}
          </ul>

          <ExperienceTags tags={item.tags} theme={theme} tagRows={item.tagRows} />
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
