"use client";

import { CountUp } from "@/components/CountUp";
import { LetterReveal, LetterRevealSegments } from "@/components/LetterReveal";

const stats = [
  { value: 3, label: "Years", href: "#experience" },
  { value: 28, label: "Projects", href: "#projects" },
  { value: 2, label: "Shipped Products", href: "#projects" },
];

const countDuration = 0.45;

const nameText = "Demetri Pappas";
const titleText = "Software Engineer.";
const summaryText =
  "Software engineer shipping full-stack web and mobile applications, secure cloud infrastructure, and applied AI orchestration systems.";

const nameStagger = 0.032;
const titleStagger = 0.028;
const summaryStagger = 0.008;
const statsStagger = 0.18;
const nameDuration = nameText.length * nameStagger;
const titleDelay = nameDuration + 0.06;
const titleDuration = titleText.length * titleStagger;
const summaryDelay = titleDelay + titleDuration + 0.06;

export default function HeroContent() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-visible text-center sm:text-left">
      <div className="overflow-visible">
        <LetterReveal
          as="p"
          text={nameText}
          delay={0}
          stagger={nameStagger}
          className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zinc-500 min-[400px]:text-sm min-[400px]:tracking-[0.15em] sm:tracking-[0.2em]"
        />

        <h1 className="mt-2 overflow-visible text-3xl font-semibold uppercase leading-[1.12] tracking-tight text-foreground min-[400px]:text-5xl min-[520px]:text-[3.25rem] min-[600px]:text-6xl sm:text-[2.75rem] md:text-5xl min-[850px]:text-6xl lg:text-7xl 2xl:text-8xl">
          <LetterRevealSegments
            as="span"
            delay={titleDelay}
            stagger={titleStagger}
            segments={[
              { text: "Software " },
              {
                text: "Engineer.",
                className: "text-slate-700 dark:text-slate-500",
              },
            ]}
          />
        </h1>

        <LetterReveal
          as="p"
          text={summaryText}
          delay={summaryDelay}
          stagger={summaryStagger}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 min-[400px]:text-lg min-[520px]:text-xl sm:mx-0 sm:mt-6 sm:text-xl md:text-2xl lg:text-2xl dark:text-zinc-400"
        />
      </div>

      <div className="mt-4 min-h-0 flex-1 max-sm:hidden" aria-hidden="true" />

      <div className="mt-6 grid shrink-0 grid-cols-3 gap-1.5 min-[360px]:gap-2 sm:mt-0 sm:gap-3">
        {stats.map(({ value, label, href }, index) => {
          const blockDelay = index * statsStagger;

          return (
            <a
              key={label}
              href={href}
              aria-label={`+${value} ${label}`}
              className="group flex h-full min-w-0 flex-col overflow-visible bg-[#1c1c1c] p-2 transition-colors hover:bg-[#252525] min-[360px]:p-2.5 sm:p-4"
            >
              <CountUp
                value={value}
                delay={blockDelay}
                duration={countDuration}
                className="text-xl font-semibold tracking-tight text-zinc-100 min-[400px]:text-3xl min-[520px]:text-4xl sm:text-4xl md:text-[2.75rem] lg:text-5xl"
              />

              <div
                className="my-1.5 h-px w-full bg-zinc-200/35 min-[360px]:my-2"
                aria-hidden="true"
              />

              <span className="text-[0.65rem] font-medium uppercase leading-snug tracking-wide text-slate-500 min-[400px]:text-xs min-[520px]:text-sm dark:text-slate-400">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
