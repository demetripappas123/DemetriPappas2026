"use client";

import { SocialIconLink } from "@/components/SocialIconLink";
import { useSocialDock } from "@/components/SocialDockContext";
import { socialLinks } from "@/components/socialLinks";

export default function SocialSidebarDock() {
  const { placement } = useSocialDock();
  const isActive = placement === "sidebar";

  return (
    <aside
      aria-label="Social links"
      className={`fixed left-4 top-[66%] z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex${isActive ? "" : " pointer-events-none"}`}
    >
      {socialLinks.map((link, index) => (
        <div key={link.id} className="h-11 w-11 shrink-0">
          {isActive ? (
            <SocialIconLink link={link} layoutDelay={index * 0.07} />
          ) : (
            <div
              className="h-11 w-11 rounded-full bg-transparent"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </aside>
  );
}
