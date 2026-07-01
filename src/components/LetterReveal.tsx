"use client";

import { motion } from "framer-motion";

const letterMotion = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  duration: 0.1,
};

function AnimatedChar({
  char,
  index,
  delay,
  stagger,
}: {
  char: string;
  index: number;
  delay: number;
  stagger: number;
}) {
  return (
    <motion.span
      initial={letterMotion.initial}
      animate={letterMotion.animate}
      transition={{
        duration: letterMotion.duration,
        delay: delay + index * stagger,
        ease: "easeOut",
      }}
      className="inline-block"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

type LetterRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "p" | "h1" | "dt" | "dd";
};

export function LetterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  as: Tag = "span",
}: LetterRevealProps) {
  const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
  let charIndex = 0;

  return (
    <Tag className={className} aria-label={text}>
      {tokens.map((token, tokenIndex) => {
        const isSpace = /^\s+$/.test(token);

        return (
          <span
            key={`${tokenIndex}-${token}`}
            className={isSpace ? "inline" : "inline-block whitespace-nowrap"}
          >
            {token.split("").map((char, charIndexInToken) => {
              const index = charIndex++;

              return (
                <AnimatedChar
                  key={charIndexInToken}
                  char={char}
                  index={index}
                  delay={delay}
                  stagger={stagger}
                />
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

type LetterRevealSegmentsProps = {
  segments: { text: string; className?: string }[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1";
};

export function LetterRevealSegments({
  segments,
  className,
  delay = 0,
  stagger = 0.02,
  as: Tag = "span",
}: LetterRevealSegmentsProps) {
  const fullText = segments.map((s) => s.text).join("");
  let charOffset = 0;

  return (
    <Tag className={className} aria-label={fullText}>
      {segments.map((segment, segmentIndex) => (
        <span key={segmentIndex} className={segment.className}>
          {segment.text.split("").map((char, charIndex) => {
            const index = charOffset++;

            return (
              <AnimatedChar
                key={charIndex}
                char={char}
                index={index}
                delay={delay}
                stagger={stagger}
              />
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
