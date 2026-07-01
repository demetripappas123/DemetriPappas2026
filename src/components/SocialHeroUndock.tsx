"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useSocialDock } from "@/components/SocialDockContext";

function shouldDock() {
  return window.matchMedia("(min-width: 640px)").matches;
}

export function SocialHeroUndock() {
  const ref = useRef<HTMLDivElement>(null);
  const { setDocked } = useSocialDock();
  const heroInView = useInView(ref, { amount: 0.35 });

  useEffect(() => {
    if (heroInView && shouldDock()) {
      setDocked(false);
    }
  }, [heroInView, setDocked]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
