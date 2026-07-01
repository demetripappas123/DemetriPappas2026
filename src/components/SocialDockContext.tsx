"use client";

import { LayoutGroup } from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SocialPlacement = "hero" | "sidebar" | "contact";

type SocialDockContextValue = {
  placement: SocialPlacement;
  setPlacement: (placement: SocialPlacement) => void;
};

const SocialDockContext = createContext<SocialDockContextValue | null>(null);

export function SocialDockProvider({ children }: { children: ReactNode }) {
  const [placement, setPlacement] = useState<SocialPlacement>("hero");

  const value = useMemo(
    () => ({
      placement,
      setPlacement,
    }),
    [placement],
  );

  return (
    <SocialDockContext.Provider value={value}>
      <LayoutGroup id="hero-social-dock">{children}</LayoutGroup>
    </SocialDockContext.Provider>
  );
}

export function useSocialDock() {
  const context = useContext(SocialDockContext);

  if (!context) {
    throw new Error("useSocialDock must be used within SocialDockProvider");
  }

  return context;
}
