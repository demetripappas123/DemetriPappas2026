import Image from "next/image";

const experienceSites = [
  {
    label: "Puretalk AI",
    url: "https://puretalk.ai/",
    period: "Jan – May 2025",
    body: [
      "I led agile development of the company's landing page and onboarding flow prior to going to market through scrum cycles using Jira. Improved UI/UX helped the business grow from ~40 to 150+ clients following launch, at which point I continued with CI/CD updates.",
      "In addition to managing the scrum cycles, a figma designer, and communicating with the CTO and CEO on time, scope, and resources, I implemented all code changes to the frontend.",
      "This included implementing API-driven interactive components and improved UI/UX, developing dashboards and AI-Agent interfaces with React, Tailwind, and Next.js, and implementing Websocket integrations with Azure endpoints to facilitate low-latency AI chatbot, voice agent, and text-to-speech interactions.",
    ],
  },
];

export default function ExperienceSiteCards() {
  return (
    <ul className="mt-16 flex flex-col gap-3 sm:mt-20">
      {experienceSites.map((site) => (
        <li
          key={site.url}
          className="flex min-h-[28rem] flex-col lg:flex-row lg:items-stretch"
        >
          <div className="flex min-w-0 flex-[5] flex-col bg-zinc-50 p-4 sm:p-5 dark:bg-zinc-100">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {site.period}
            </p>

            <p className="mt-2 text-lg leading-snug font-semibold italic text-zinc-900 sm:text-xl">
              As a{" "}
              <span className="text-slate-700 dark:text-slate-500">
                Full-stack Developer
              </span>{" "}
              Intern at Puretalk AI,
            </p>

            {site.body.map((paragraph, index) => (
              <p
                key={index}
                className="mt-4 text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative isolate flex min-h-[28rem] min-w-0 flex-[3] flex-col self-stretch overflow-hidden bg-[#1c1c1c]">
            <div className="relative z-0 flex shrink-0 items-center justify-between border-b border-zinc-200/10 px-4 py-2.5">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-100">
                {site.label}
              </span>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 text-xs font-medium uppercase tracking-wide text-slate-500 transition-colors hover:text-zinc-100"
              >
                Open
              </a>
            </div>

            <iframe
              src={site.url}
              title={`${site.label} preview`}
              className="relative z-0 min-h-0 flex-1 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-10">
              <div className="relative mx-auto mt-[7%] aspect-[1024/1536] w-full">
                <Image
                  src="/phonewireframe.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
