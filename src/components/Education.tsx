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

function CardLabel({
  children,
  large = false,
  prominent = false,
  white = false,
}: {
  children: React.ReactNode;
  large?: boolean;
  prominent?: boolean;
  white?: boolean;
}) {
  return (
    <p
      className={
        prominent
          ? "text-lg font-medium uppercase tracking-wide text-white sm:text-xl"
          : white
            ? "text-xs font-medium uppercase tracking-wide text-white"
            : large
              ? "text-sm font-medium uppercase tracking-wide text-slate-500 sm:text-base dark:text-slate-400"
              : "text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
      }
    >
      {children}
    </p>
  );
}

function CourseCode({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </p>
  );
}

function SchoolHeader({
  item,
  large = false,
}: {
  item: School;
  large?: boolean;
}) {
  return (
    <>
      <h3
        className={
          large
            ? "text-lg font-semibold uppercase leading-snug tracking-wide text-zinc-100 sm:text-xl"
            : "text-base font-semibold uppercase leading-snug tracking-wide text-zinc-100 sm:text-lg"
        }
      >
        {item.school}
        {item.subtitle && (
          <>
            {" · "}
            {item.subtitle}
          </>
        )}
      </h3>
      <ul className="mt-1.5 space-y-1">
        {item.degrees.map((degree) => (
          <li key={degree} className="text-sm leading-6 text-zinc-100">
            {degree}
          </li>
        ))}
        <li className="text-sm leading-6 text-zinc-100">{item.dates}</li>
      </ul>
    </>
  );
}

function GpaLine({ gpa, large = false }: { gpa: string; large?: boolean }) {
  if (large) {
    return (
      <div>
        <p className="text-4xl leading-none font-semibold tracking-tight text-zinc-100 sm:text-5xl">
          {gpa}
        </p>
        <p className="mt-1 text-lg font-medium uppercase tracking-[0.15em] text-zinc-100 sm:text-xl">
          /4.0 GPA
        </p>
      </div>
    );
  }

  return (
    <p className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
      {gpa}
    </p>
  );
}

function HonorsList({
  honors,
  largeLabel = false,
  largeText = false,
  prominent = false,
  whiteLabel = false,
}: {
  honors: string[];
  largeLabel?: boolean;
  largeText?: boolean;
  prominent?: boolean;
  whiteLabel?: boolean;
}) {
  return (
    <>
      <CardLabel large={largeLabel} prominent={prominent} white={whiteLabel}>
        Honors
      </CardLabel>
      <ul
        className={
          prominent
            ? "mt-3 list-disc space-y-5 pl-5 marker:text-white"
            : largeText
              ? "mt-2 list-disc space-y-1.5 pl-5 marker:text-zinc-100"
              : "mt-2 space-y-1.5"
        }
      >
        {honors.map((honor) => (
          <li
            key={honor}
            className={
              prominent
                ? "text-base leading-snug text-white sm:text-lg"
                : largeText
                  ? "text-base leading-7 text-zinc-100"
                  : "text-sm leading-6 text-zinc-100"
            }
          >
            {honor}
          </li>
        ))}
      </ul>
    </>
  );
}

function CourseList({ courses }: { courses: Course[] }) {
  return (
    <ul className="space-y-4">
      {courses.map((course) => (
        <li key={course.code}>
          <CourseCode>{course.code}</CourseCode>
          <p className="mt-1 text-sm leading-6 text-zinc-100">
            <span className="font-medium">{course.name}</span>
            {" — "}
            <span className="italic">{course.description}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function UcfCard({
  item,
  variants = fadeUpItem,
}: {
  item: School;
  variants?: typeof fadeUpItem;
}) {
  const [classColOne, classColTwo] = [
    item.classes.slice(0, 2),
    item.classes.slice(2, 4),
  ];

  return (
    <FadeIn as="li" variants={variants} className="bg-[#1c1c1c] p-4 sm:p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="flex min-h-[14rem] flex-1 flex-col lg:min-h-[16rem]">
          <div className="flex flex-1 flex-col">
            <SchoolHeader item={item} large />
          </div>
          <div className="flex flex-1 items-center">
            <GpaLine gpa={item.gpa} large />
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:border-l lg:border-zinc-200/35 lg:pl-8">
          <HonorsList honors={item.honors} prominent />
        </div>

        <div className="flex flex-1 flex-col lg:border-l lg:border-zinc-200/35 lg:pl-8">
          <CourseList courses={classColOne} />
        </div>

        <div className="flex flex-1 flex-col lg:border-l lg:border-zinc-200/35 lg:pl-8">
          <CourseList courses={classColTwo} />
        </div>
      </div>
    </FadeIn>
  );
}

function MiamiCard({
  item,
  variants = fadeUpItem,
}: {
  item: School;
  variants?: typeof fadeUpItem;
}) {
  return (
    <FadeIn
      as="li"
      variants={variants}
      className="flex min-w-0 flex-col bg-[#1c1c1c] p-4 sm:p-5"
    >
      <div className="flex h-full flex-col gap-6 sm:flex-row sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <SchoolHeader item={item} large />
        </div>

        <div className="min-w-0 flex-1 sm:border-l sm:border-zinc-200/35 sm:pl-6">
          <HonorsList honors={item.honors} largeText whiteLabel />
        </div>
      </div>
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

        <FadeIn
          as="ul"
          variants={staggerGroup}
          className="mt-10 flex flex-col gap-3"
        >
          <UcfCard item={ucf} />

          <MiamiCard item={miami} />
        </FadeIn>
      </EducationDockBridge>
    </FadeIn>
  );
}
