import ExperienceSiteCards from "@/components/ExperienceSiteCards";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-zinc-200 py-24 dark:border-zinc-800">
      <h2 className="text-left text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        <span className="text-foreground">Three years of making software. </span>
        <span className="text-slate-700 dark:text-slate-500">
          Three experiences that say the most.
        </span>
      </h2>

      <ExperienceSiteCards />
    </section>
  );
}
