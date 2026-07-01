import SkillBinGrid from "@/components/SkillBinGrid";
import { FadeIn } from "@/components/FadeIn";
import { skillBins } from "@/components/tools-data";

export default function Tools() {
  return (
    <FadeIn as="section" id="tools" className="relative z-10 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-[#1c1c1c]"
      />

      <div className="relative z-10 mx-6 sm:mx-8">
        <h2 className="text-left text-3xl font-bold uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl">
          <span className="text-zinc-50">Parts Inventory.</span>
        </h2>
        <p className="mt-2 text-base italic text-slate-400 sm:text-lg">
          Technologies and skills I specialize in.
        </p>

        <SkillBinGrid bins={skillBins} />
      </div>
    </FadeIn>
  );
}
