"use client";

import { useEffect } from "react";
import {
  useSocialDock,
  type SocialPlacement,
} from "@/components/SocialDockContext";

const DESKTOP_DOCK_QUERY = "(min-width: 640px)";

export function shouldSocialDock() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(DESKTOP_DOCK_QUERY).matches;
}

function computePlacement(
  hero: HTMLElement,
  contact: HTMLElement,
): SocialPlacement {
  if (!shouldSocialDock()) {
    return "hero";
  }

  const viewportHeight = window.innerHeight;
  const heroRect = hero.getBoundingClientRect();
  const contactRect = contact.getBoundingClientRect();

  const contactVisible =
    contactRect.top < viewportHeight * 0.72 &&
    contactRect.bottom > viewportHeight * 0.18;

  const heroVisible =
    heroRect.top < viewportHeight * 0.55 &&
    heroRect.bottom > viewportHeight * 0.35;

  if (contactVisible) {
    return "contact";
  }

  if (heroVisible) {
    return "hero";
  }

  return "sidebar";
}

export function SocialPlacementController() {
  const { setPlacement } = useSocialDock();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");

    if (!hero || !contact) {
      return;
    }

    let frameId = 0;

    const syncPlacement = () => {
      frameId = 0;
      setPlacement(computePlacement(hero, contact));
    };

    const scheduleSync = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(syncPlacement);
    };

    syncPlacement();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);

    const mediaQuery = window.matchMedia(DESKTOP_DOCK_QUERY);
    mediaQuery.addEventListener("change", scheduleSync);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      mediaQuery.removeEventListener("change", scheduleSync);
    };
  }, [setPlacement]);

  return null;
}
