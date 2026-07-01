"use client";

import { motion, type Variants } from "framer-motion";

type FadeInProps = {
  as?: "div" | "li" | "h2" | "ul";
  delay?: number;
  className?: string;
  variants?: Variants;
  children: React.ReactNode;
};

export function FadeIn({
  as = "div",
  delay = 0,
  className,
  variants,
  children,
}: FadeInProps) {
  const Component = motion[as];

  if (variants) {
    return (
      <Component className={className} variants={variants}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
