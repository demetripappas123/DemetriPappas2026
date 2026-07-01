const toolGroups = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "Node.js"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "VS Code"],
  },
];

export default function Tools() {
  return (
    <section id="tools" className="border-t border-zinc-200 py-24 dark:border-zinc-800">
      <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {toolGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
