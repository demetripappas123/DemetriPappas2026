import { EducationDockBridge } from "@/components/EducationDockBridge";
import { FadeIn } from "@/components/FadeIn";
import { fadeUpItem, staggerGroup } from "@/components/ScrollReveal";

type Course = {
  code: string;
  name: string;
  description: string;
};

type School = {
  school: string;
  subtitle?: string;
  dates: string;
  degrees: string[];
  gpa: string;
  honors: string[];
  classes: Course[];
};

const ucf: School = {
  school: "University of Central Florida",
  dates: "Grad. Spring 2027",
  degrees: ["B.S. in Computer Science"],
  gpa: "3.8",
  honors: [
    "President's Honor Roll Spring 2025.",
    "President's Honor Roll Spring 2026.",
  ],
  classes: [
    {
      code: "CAP 4611",
      name: "Algorithms in Machine Learning",
      description:
        "Supervised, unsupervised, ensemble and reinforcement learning algorithms.",
    },
    {
      code: "CIS 3360",
      name: "Security in Computing",
      description:
        "Number theory, cryptography, software security, networking.",
    },
    {
      code: "COP 3402",
      name: "System Software",
      description:
        "Unix, process management, compilers, macro-processors, linkers and loaders.",
    },
    {
      code: "COP 3503",
      name: "CSII",
      description:
        "Dynamic programming, greedy algorithms, network flows, string matching.",
    },
  ],
};

const miami: School = {
  school: "University of Miami",
  subtitle: "Herbert Business School",
  dates: "Transferred 2024",
  degrees: ["B.S. in Computer Science"],
  gpa: "3.0",
  honors: [
    "Presidential Scholar.",
    "National Merit Finalist.",
    "Benacquisto Scholar.",
    "Foote Fellow Honors Student.",
  ],
  classes: [],
};

const educationCardClassName =
  "flex flex-col rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-4";

const educationCardCompactClassName =
  "flex flex-col rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-4";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
      {children}
    </p>
  );
}

function EducationCard({
  children,
  className = "",
  compact = false,
  variants = fadeUpItem,
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  variants?: typeof fadeUpItem;
}) {
  return (
    <FadeIn
      as="li"
      variants={variants}
      className={`${compact ? educationCardCompactClassName : `${educationCardClassName} h-full`} ${className}`.trim()}
    >
      {children}
    </FadeIn>
  );
}

function SchoolOverviewCard({
  item,
  className = "",
  compact = false,
  variants = fadeUpItem,
}: {
  item: School;
  className?: string;
  compact?: boolean;
  variants?: typeof fadeUpItem;
}) {
  return (
    <EducationCard className={className} compact={compact} variants={variants}>
      <h3 className="text-base font-semibold uppercase leading-snug tracking-wide text-zinc-900 sm:text-lg">
        {item.school}
      </h3>
      {item.subtitle ? (
        <p className="mt-0.5 text-sm leading-snug text-zinc-600">{item.subtitle}</p>
      ) : null}

      <ul className="mt-2.5 space-y-0.5 border-t border-zinc-100 pt-2.5">
        {item.degrees.map((degree) => (
          <li key={degree} className="text-sm leading-snug text-zinc-700">
            {degree}
          </li>
        ))}
        <li className="text-sm leading-snug text-zinc-500">{item.dates}</li>
      </ul>
    </EducationCard>
  );
}

function GpaInline({ gpa }: { gpa: string }) {
  return (
    <div className="shrink-0 self-start text-left leading-none sm:text-right">
      <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">
        GPA
      </p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {gpa}
        <span className="ml-0.5 text-sm font-medium text-zinc-400 sm:text-base">
          /4.0
        </span>
      </p>
    </div>
  );
}

function HonorsCard({
  honors,
  label = "Honors",
  gpa,
  compact = false,
  columns = false,
  fillHeight = false,
  className = "",
  variants = fadeUpItem,
}: {
  honors: string[];
  label?: string;
  gpa?: string;
  compact?: boolean;
  columns?: boolean;
  fillHeight?: boolean;
  className?: string;
  variants?: typeof fadeUpItem;
}) {
  return (
    <EducationCard
      compact={compact}
      className={`${fillHeight ? "h-full" : ""} ${className}`.trim()}
      variants={variants}
    >
      <SectionLabel>{label}</SectionLabel>
      <div
        className={`mt-2.5 flex flex-col gap-4 sm:mt-3 sm:flex-row sm:items-start sm:gap-5${fillHeight ? " flex-1" : ""}`}
      >
        <ul
          className={
            columns
              ? "min-w-0 flex-1 list-disc pl-5 marker:text-zinc-400 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 sm:gap-y-3"
              : "min-w-0 flex-1 list-disc space-y-2 pl-5 marker:text-zinc-400"
          }
        >
          {honors.map((honor) => (
            <li key={honor} className="text-sm leading-snug text-zinc-700 sm:text-[0.9375rem]">
              {honor}
            </li>
          ))}
        </ul>
        {gpa ? <GpaInline gpa={gpa} /> : null}
      </div>
    </EducationCard>
  );
}

function CoursesCard({
  courses,
  label = "Coursework",
  variants = fadeUpItem,
}: {
  courses: Course[];
  label?: string;
  variants?: typeof fadeUpItem;
}) {
  return (
    <EducationCard variants={variants}>
      <SectionLabel>{label}</SectionLabel>
      <ul className="mt-3 space-y-3">
        {courses.map((course) => (
          <li key={course.code}>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {course.code}
            </p>
            <p className="mt-1 text-sm leading-snug text-zinc-700">
              <span className="font-medium">{course.name}</span>
              {" — "}
              <span className="italic text-zinc-600">{course.description}</span>
            </p>
          </li>
        ))}
      </ul>
    </EducationCard>
  );
}

function splitInHalf<T>(items: T[]): [T[], T[]] {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

function SchoolEducationGrid({ item }: { item: School }) {
  const [coursesOne, coursesTwo] = splitInHalf(item.classes);
  const hasCourses = item.classes.length > 0;

  if (hasCourses) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        <FadeIn
          as="ul"
          variants={staggerGroup}
          className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4"
        >
          <SchoolOverviewCard item={item} compact />
          <HonorsCard honors={item.honors} gpa={item.gpa} compact />
        </FadeIn>

        <FadeIn
          as="ul"
          variants={staggerGroup}
          className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          <CoursesCard courses={coursesOne} label="Coursework I" />
          <CoursesCard courses={coursesTwo} label="Coursework II" />
        </FadeIn>
      </div>
    );
  }

  return (
    <FadeIn
      as="ul"
      variants={staggerGroup}
      className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4"
    >
      <SchoolOverviewCard item={item} compact className="h-full" />
      <HonorsCard honors={item.honors} compact columns fillHeight className="h-full" />
    </FadeIn>
  );
}

export default function Education() {
  return (
    <FadeIn
      as="section"
      id="education"
      className="relative isolate border-t border-zinc-200 py-24 dark:border-zinc-800"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden"
        aria-hidden
      >
        <img
          src="/education-bg.png"
          alt=""
          className="h-full w-full scale-110 object-cover opacity-35 blur-[7px] dark:opacity-25"
        />
      </div>

      <EducationDockBridge className="relative z-10">
        <FadeIn
          as="h2"
          variants={fadeUpItem}
          className="text-left text-3xl font-bold uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl"
        >
          <span className="text-foreground">
            A summary of my formal education{" "}
          </span>
          <span className="text-slate-700 dark:text-slate-500">and honors.</span>
        </FadeIn>

        <div className="mt-10 flex flex-col gap-8 sm:gap-10">
          <SchoolEducationGrid item={ucf} />
          <SchoolEducationGrid item={miami} />
        </div>
      </EducationDockBridge>
    </FadeIn>
  );
}
