"use client";

import { useEffect, useState } from "react";
import { SocialIconLink } from "@/components/SocialIconLink";
import { useSocialDock } from "@/components/SocialDockContext";
import { socialLinks } from "@/components/socialLinks";

function useDesktopDock() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function ContactSocialLinks() {
  const { placement } = useSocialDock();
  const isDesktop = useDesktopDock();
  const showIcons = !isDesktop || placement === "contact";

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:flex-col sm:items-start sm:gap-3">
      {socialLinks.map((link, index) => {
        const displayLabel = link.id === "connect" ? "Handshake" : link.label;

        return (
          <li key={link.id} className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0">
              {showIcons ? (
                <SocialIconLink link={link} layoutDelay={index * 0.07} />
              ) : (
                <div
                  className="h-11 w-11 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80"
                  aria-hidden="true"
                />
              )}
            </div>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              {displayLabel}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
