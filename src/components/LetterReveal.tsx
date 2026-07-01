"use client";

import { motion } from "framer-motion";

const letterMotion = {
  initial: { opacity: 0, y: 4 },
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
      className="inline overflow-visible"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function AnimatedWord({
  word,
  startIndex,
  delay,
  stagger,
}: {
  word: string;
  startIndex: number;
  delay: number;
  stagger: number;
}) {
  return (
    <span className="inline-block overflow-visible align-baseline">
      {word.split("").map((char, charIndex) => (
        <AnimatedChar
          key={charIndex}
          char={char}
          index={startIndex + charIndex}
          delay={delay}
          stagger={stagger}
        />
      ))}
    </span>
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
    <Tag
      className={[className, "overflow-visible break-normal"].filter(Boolean).join(" ")}
      aria-label={text}
    >
      {tokens.map((token, tokenIndex) => {
        const isSpace = /^\s+$/.test(token);

        if (isSpace) {
          return (
            <span key={`${tokenIndex}-space`} className="inline">
              {" "}
            </span>
          );
        }

        const startIndex = charIndex;
        charIndex += token.length;

        return (
          <AnimatedWord
            key={`${tokenIndex}-${token}`}
            word={token}
            startIndex={startIndex}
            delay={delay}
            stagger={stagger}
          />
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
    <Tag
      className={[className, "overflow-visible break-normal"].filter(Boolean).join(" ")}
      aria-label={fullText}
    >
      {segments.map((segment, segmentIndex) => {
        const tokens = segment.text
          .split(/(\s+)/)
          .filter((token) => token.length > 0);

        return (
          <span key={segmentIndex} className={segment.className}>
            {tokens.map((token, tokenIndex) => {
              const isSpace = /^\s+$/.test(token);

              if (isSpace) {
                return (
                  <span key={`${segmentIndex}-${tokenIndex}-space`} className="inline">
                    {" "}
                  </span>
                );
              }

              const startIndex = charOffset;
              charOffset += token.length;

              return (
                <AnimatedWord
                  key={`${segmentIndex}-${tokenIndex}-${token}`}
                  word={token}
                  startIndex={startIndex}
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
