"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type LucasDanielNameProps = {
  className?: string;
};

export function LucasDanielName({ className = "" }: LucasDanielNameProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block cursor-default font-semibold ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      style={{ x: springX, y: springY }}
    >
      <span className="relative z-10 bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
        Lucas Daniel
      </span>
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hover ? 1 : 0.35 }}
        transition={{ duration: 0.35 }}
      />
      <motion.svg
        className="pointer-events-none absolute -bottom-2 left-0 w-full overflow-visible"
        height="6"
        viewBox="0 0 200 6"
        initial={false}
        animate={{ opacity: hover ? 1 : 0.5 }}
      >
        <motion.path
          d="M2 4 Q50 1 100 3 T198 4"
          fill="none"
          stroke="url(#name-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="name-stroke" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.span
        className="pointer-events-none absolute inset-0 -z-10 rounded-lg blur-xl"
        animate={{
          opacity: hover ? 0.45 : 0.2,
          boxShadow: hover
            ? "0 0 32px rgba(56,189,248,0.5)"
            : "0 0 16px rgba(167,139,250,0.25)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
}
