"use client";

import { motion } from "framer-motion";
import {
  getWordMotionKey,
  tokenizeText,
  wordVariants,
  MOTION_SPEC,
  type SemanticMotionKey,
} from "@/lib/semantic-motion";

type SemanticHeadingProps = {
  as?: "h1" | "h2";
  text: string;
  className?: string;
  gradient?: boolean;
  trigger?: "mount" | "inView";
  wordOverrides?: Record<string, SemanticMotionKey>;
  stagger?: number;
};

export function SemanticHeading({
  as: Tag = "h2",
  text,
  className = "",
  gradient = false,
  trigger = "inView",
  wordOverrides = {},
  stagger = 0.08,
}: SemanticHeadingProps) {
  const tokens = tokenizeText(text);

  const Wrapper = trigger === "mount" ? motion.div : motion.div;
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-40px" as const },
        };

  return (
    <Wrapper
      className="semantic-heading-wrap"
      {...triggerProps}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.08 } },
      }}
    >
      <Tag
        className={`semantic-heading mx-auto flex max-w-5xl flex-wrap justify-center text-center leading-[1.2] ${className}`}
        aria-label={text}
      >
        {tokens.map((token, i) => {
          if (token.type === "space") {
            return (
              <span key={`sp-${i}`} className="whitespace-pre" aria-hidden>
                {token.value}
              </span>
            );
          }

          const normalized = token.value.toLowerCase().replace(/[^a-z0-9'-]/g, "");
          const motionKey = wordOverrides[normalized] ?? getWordMotionKey(token.value);
          const spec = MOTION_SPEC[motionKey];

          return (
            <motion.span
              key={`${token.value}-${i}`}
              className={`semantic-word inline-block whitespace-nowrap ${
                gradient ? "gradient-text" : ""
              }`}
              variants={wordVariants(motionKey)}
              transition={{
                duration: spec.timing.duration,
                ease: spec.timing.ease as [number, number, number, number],
              }}
            >
              {token.value}
            </motion.span>
          );
        })}
      </Tag>
    </Wrapper>
  );
}
