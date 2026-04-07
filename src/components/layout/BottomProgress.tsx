"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NavDog } from "@/components/layout/NavDog";

const DOG_PAD_START = 0;
const DOG_PAD_END = 100;

export function BottomProgress() {
  const scrollProgress = useScrollProgress();
  const dogLeft =
    DOG_PAD_START + scrollProgress * (DOG_PAD_END - DOG_PAD_START);

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-50"
      aria-hidden
    >
      <div className="relative h-1.5 w-full bg-[var(--progress-track)]">
        <NavDog leftPercent={dogLeft} pose="walk" placement="bottom" />
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>
    </div>
  );
}
