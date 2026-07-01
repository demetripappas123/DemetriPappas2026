const links = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-zinc-200 py-24 dark:border-zinc-800">
      <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        Open to opportunities and collaborations. Reach out through any of the
        links below.
      </p>
      <ul className="mt-8 flex flex-wrap gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
