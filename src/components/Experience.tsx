import ExperienceCarousel from "@/components/ExperienceCarousel";
import { experienceItems } from "@/components/experience-data";
import { FadeIn } from "@/components/FadeIn";

export default function Experience() {
  return (
    <FadeIn
      as="section"
      id="experience"
      className="border-t border-zinc-200 pb-20 pt-24 dark:border-zinc-800 sm:pb-24"
    >
      <h2 className="text-left text-3xl font-bold uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl">
        <span className="text-foreground">Three years of making software. </span>
        <span className="text-slate-700 dark:text-slate-500">
          Three experiences that say the most.
        </span>
      </h2>

      <ExperienceCarousel items={experienceItems} />
    </FadeIn>
  );
}
