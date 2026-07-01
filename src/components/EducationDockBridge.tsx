"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

type EducationDockBridgeProps = {
  className?: string;
  children: React.ReactNode;
};

export function EducationDockBridge({
  className,
  children,
}: EducationDockBridgeProps) {
  return (
    <ScrollReveal className={className}>{children}</ScrollReveal>
  );
}
