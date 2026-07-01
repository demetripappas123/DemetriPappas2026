import { type SkillBin } from "@/components/tools-data";

function SkillBinCard({ bin }: { bin: SkillBin }) {
  return (
    <article className="relative flex min-h-[11rem] flex-col border border-zinc-700/80 bg-[#232323] p-4 sm:p-5">
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-cyan-400/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyan-400/50"
      />

      <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wide text-zinc-500 sm:text-xs">
        <span>{bin.id}</span>
        <span>N={bin.items.length}</span>
        <span>{bin.revision ?? "REV.A"}</span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-tight text-zinc-50 sm:text-xl">
          {bin.title}
        </h3>
        <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wide text-zinc-500 sm:text-xs">
          {bin.bin}
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {bin.items.map((item) => (
          <li
            key={item}
            className="rounded border border-zinc-600/80 bg-[#2a2a2a] px-2.5 py-1.5 text-xs font-medium text-zinc-100 sm:px-3 sm:text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

type SkillBinGridProps = {
  bins: SkillBin[];
};

export default function SkillBinGrid({ bins }: SkillBinGridProps) {
  return (
    <div className="mt-16 grid gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {bins.map((bin) => (
        <SkillBinCard key={bin.id} bin={bin} />
      ))}
    </div>
  );
}
