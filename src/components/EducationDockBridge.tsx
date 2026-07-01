"use client";

import { useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useSocialDock } from "@/components/SocialDockContext";

type EducationDockBridgeProps = {
  className?: string;
  children: React.ReactNode;
};

function shouldDock() {
  return window.matchMedia("(min-width: 640px)").matches;
}

export function EducationDockBridge({
  className,
  children,
}: EducationDockBridgeProps) {
  const { setDocked } = useSocialDock();

  const handleInViewChange = useCallback(
    (inView: boolean) => {
      if (inView && shouldDock()) {
        setDocked(true);
      }
    },
    [setDocked],
  );

  return (
    <ScrollReveal className={className} onInViewChange={handleInViewChange}>
      {children}
    </ScrollReveal>
  );
}
