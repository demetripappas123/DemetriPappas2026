"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

type ScrollRevealProps = {
  className?: string;
  children: React.ReactNode;
  onInViewChange?: (inView: boolean) => void;
};

export function ScrollReveal({
  className,
  children,
  onInViewChange,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.12 });

  useEffect(() => {
    onInViewChange?.(inView);
  }, [inView, onInViewChange]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={staggerGroup}
    >
      {children}
    </motion.div>
  );
}
