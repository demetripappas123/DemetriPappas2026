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
    <div className="flex h-full min-h-0 flex-col text-center sm:text-left">
      <div>
        <LetterReveal
          as="p"
          text={nameText}
          delay={0}
          stagger={nameStagger}
          className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500"
        />

        <h1 className="mt-3 text-6xl font-semibold uppercase tracking-tight text-foreground sm:text-7xl lg:text-8xl">
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
          className="mt-6 max-w-2xl text-xl leading-8 text-zinc-600 sm:text-2xl sm:leading-9 dark:text-zinc-400"
        />
      </div>

      <div className="mt-4 min-h-0 flex-1" aria-hidden="true" />

      <div className="grid shrink-0 grid-cols-3 gap-2 sm:gap-3">
        {stats.map(({ value, label, href }, index) => {
          const blockDelay = index * statsStagger;

          return (
            <a
              key={label}
              href={href}
              aria-label={`+${value} ${label}`}
              className="group flex h-full min-w-0 flex-col bg-[#1c1c1c] p-3 transition-colors hover:bg-[#252525] sm:p-4"
            >
              <CountUp
                value={value}
                delay={blockDelay}
                duration={countDuration}
                className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl"
              />

              <div
                className="my-2 h-px w-full bg-zinc-200/35"
                aria-hidden="true"
              />

              <LetterReveal
                as="span"
                text={label}
                delay={blockDelay}
                stagger={0.012}
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-sm"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
