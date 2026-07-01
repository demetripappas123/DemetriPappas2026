const projects = [
  {
    title: "Project Name",
    description: "Short description of what the project does and why it matters.",
    tags: ["React", "TypeScript", "Next.js"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-zinc-200 py-24 dark:border-zinc-800">
      <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.title}
            className="rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <a href={project.href} className="block">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
