"use client";

import { useEffect, useRef } from "react";
import { SocialIconLink } from "@/components/SocialIconLink";
import { useSocialDock } from "@/components/SocialDockContext";
import { socialLinks } from "@/components/socialLinks";

const waveStagger = 0.09;

export default function HeroSocialLinks() {
  const { placement } = useSocialDock();
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return (
    <ul className="mt-4 flex items-center justify-center gap-7">
      {socialLinks.map((link, index) => (
        <li key={link.id} className="h-11 w-11 shrink-0">
          {placement === "hero" ? (
            <SocialIconLink
              link={link}
              enableWave={isInitialMount.current}
              waveDelay={index * waveStagger}
            />
          ) : (
            <div
              className="h-11 w-11 rounded-full bg-black/40"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
