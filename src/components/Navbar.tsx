import { Mail } from "lucide-react";
import { socialLinks } from "@/components/socialLinks";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#tools", label: "Tools" },
];

export default function Navbar() {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/85"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-3 py-4 sm:px-4">
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 sm:gap-5">
          <ul className="flex items-center gap-4">
            {socialLinks.map(({ id, href, label, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-[#252525]"
          >
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
