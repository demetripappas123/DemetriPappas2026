"use client";

import { SocialIconLink } from "@/components/SocialIconLink";
import { useSocialDock } from "@/components/SocialDockContext";
import { socialLinks } from "@/components/socialLinks";

export default function SocialSidebarDock() {
  const { docked } = useSocialDock();

  if (!docked) {
    return null;
  }

  return (
    <aside
      aria-label="Social links"
      className="fixed left-4 top-[66%] z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
    >
      {socialLinks.map((link, index) => (
        <SocialIconLink
          key={link.id}
          link={link}
          layoutDelay={index * 0.07}
        />
      ))}
    </aside>
  );
}
