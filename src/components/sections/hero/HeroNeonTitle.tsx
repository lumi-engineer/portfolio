"use client";

import { motion } from "framer-motion";
import { DarknessFlameWord } from "./DarknessFlameWord";

export function HeroNeonTitle() {
  return (
    <div className="relative z-20 flex w-full items-center justify-center px-4">
      <h1
        className="flex flex-nowrap items-center justify-center overflow-visible text-center font-bold leading-none tracking-[0.08em] sm:tracking-[0.1em] md:tracking-[0.14em]"
        style={{ fontSize: "clamp(1.35rem, 4.5vw, 3.5rem)" }}
        aria-label="FROM DARKNESS TO LAUNCH"
      >
        <span className="whitespace-nowrap text-[var(--foreground)]">FROM </span>
        <DarknessFlameWord />
        <span className="whitespace-nowrap text-[var(--foreground)]"> TO </span>
        <motion.span
          className="relative whitespace-nowrap bg-gradient-to-r from-amber-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent"
          animate={{
            y: [6, 0, -2, 0],
            opacity: [0.55, 1, 1, 0.9],
            filter: [
              "drop-shadow(0 0 8px rgba(56,189,248,0.2))",
              "drop-shadow(0 0 28px rgba(251,191,36,0.55))",
              "drop-shadow(0 0 32px rgba(52,211,153,0.45))",
              "drop-shadow(0 0 20px rgba(56,189,248,0.35))",
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          LAUNCH
        </motion.span>
      </h1>
    </div>
  );
}
