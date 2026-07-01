"use client";

import { LayoutGroup } from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SocialDockContextValue = {
  docked: boolean;
  setDocked: (docked: boolean) => void;
};

const SocialDockContext = createContext<SocialDockContextValue | null>(null);

export function SocialDockProvider({ children }: { children: ReactNode }) {
  const [docked, setDocked] = useState(false);

  const value = useMemo(
    () => ({
      docked,
      setDocked,
    }),
    [docked],
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
