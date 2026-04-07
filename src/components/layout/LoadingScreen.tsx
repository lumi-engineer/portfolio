"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE = "Hi, I'm Lucas Daniel.";

function StrokeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [length, setLength] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLength(text.length * 42), 100);
    return () => clearTimeout(t);
  }, [text]);

  useEffect(() => {
    if (!length) return;
    const t = setTimeout(() => setFilled(true), delay * 1000 + 2200);
    return () => clearTimeout(t);
  }, [length, delay]);

  return (
    <div className="relative flex w-full items-center justify-center px-4">
      <svg
        viewBox="0 0 1000 140"
        className="h-auto w-full max-w-5xl overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.text
          x="50%"
          y="78"
          textAnchor="middle"
          className="font-sign text-[clamp(3.5rem,12vw,7.5rem)]"
          fill="transparent"
          stroke="url(#stroke-grad)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDashoffset: 2800, strokeDasharray: 2800 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: length || 2800,
          }}
          transition={{
            strokeDashoffset: { duration: 2.2, delay, ease: [0.65, 0, 0.35, 1] },
            strokeDasharray: { duration: 0.3 },
          }}
          style={{ paintOrder: "stroke fill" }}
        >
          {text}
        </motion.text>
        <motion.text
          x="50%"
          y="78"
          textAnchor="middle"
          className="font-sign text-[clamp(3.5rem,12vw,7.5rem)]"
          fill="url(#stroke-grad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: filled ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          filter="url(#glow-filter)"
        >
          {text}
        </motion.text>
      </svg>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: filled ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="h-16 w-[88%] max-w-3xl rounded-full bg-sky-400/12 blur-3xl"
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.98, 1.04, 0.98] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

type LoadingScreenProps = {
  visible: boolean;
};

export function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="relative z-10 flex w-full flex-col items-center justify-center">
            <StrokeLine text={LINE} />
          </div>

          <motion.div
            className="relative z-10 mt-16 h-0.5 w-64 overflow-hidden rounded-full bg-slate-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-violet-400 to-emerald-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
