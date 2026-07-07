"use client";

import { motion, type Transition } from "framer-motion";
import type { SocialLink } from "@/components/socialLinks";

const layoutTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};

type SocialIconLinkProps = {
  link: SocialLink;
  waveDelay?: number;
  enableWave?: boolean;
  layoutDelay?: number;
};

export function SocialIconLink({
  link,
  waveDelay = 0,
  enableWave = false,
  layoutDelay = 0,
}: SocialIconLinkProps) {
  const Icon = link.icon;

  return (
    <motion.a
      layoutId={`social-${link.id}`}
      layout
      href={link.href}
      aria-label={link.label}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={
        enableWave
          ? { opacity: 0, y: 10, scale: 0.85 }
          : false
      }
      animate={
        enableWave
          ? { opacity: 1, y: [10, -7, 0], scale: 1 }
          : undefined
      }
      transition={
        enableWave
          ? {
              layout: layoutTransition,
              opacity: { duration: 0.42, delay: waveDelay, ease: "easeOut" },
              y: { duration: 0.42, delay: waveDelay, ease: "easeOut" },
              scale: { duration: 0.42, delay: waveDelay, ease: "easeOut" },
            }
          : { layout: { ...layoutTransition, delay: layoutDelay } }
      }
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-zinc-100 transition-colors hover:bg-[#1a1a1a] hover:text-white"
    >
      <Icon />
    </motion.a>
  );
}
