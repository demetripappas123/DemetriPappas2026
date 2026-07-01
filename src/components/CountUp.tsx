"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  delay?: number;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  prefix = "+",
  delay = 0,
  duration = 0.45,
  className,
}: CountUpProps) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) =>
    `${prefix}${Math.round(latest)}`,
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      delay,
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue, value, delay, duration]);

  return (
    <motion.span className={className} aria-hidden="true">
      {display}
    </motion.span>
  );
}
