"use client";

import { motion } from "framer-motion";

/** Animated dark void inside letterforms — light rim, shifting inner shadow */
export function DarknessFlameWord() {
  return (
    <span className="relative mx-1 inline-block whitespace-nowrap align-baseline">
      <motion.span
        aria-hidden
        className="inner-dark-word-glow pointer-events-none absolute inset-0 font-bold leading-none text-white blur-[6px]"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        DARKNESS
      </motion.span>
      <span className="inner-dark-word relative z-10 font-bold leading-none">DARKNESS</span>
    </span>
  );
}
