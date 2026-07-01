"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type FadeInElement = "div" | "li" | "h2" | "ul" | "section";

type FadeInProps = {
  as?: FadeInElement;
  id?: string;
  delay?: number;
  className?: string;
  variants?: Variants;
  children: React.ReactNode;
};

export function FadeIn({
  as = "div",
  id,
  delay = 0,
  className,
  variants,
  children,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (variants) {
    return (
      <Component id={id} className={className} variants={variants}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
