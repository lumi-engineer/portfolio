"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { hero } from "@/data/portfolio";

const stormWords = hero.stormWords;

function GlowingTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <h1
      ref={ref}
      className="relative z-30 px-4 text-center font-bold leading-tight tracking-[0.12em] md:tracking-[0.2em]"
      aria-label={hero.title}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 blur-2xl">
        <span className="gradient-text block text-2xl opacity-60 sm:text-3xl md:text-4xl lg:text-5xl">
          {hero.title}
        </span>
      </span>
      <span className="gradient-text relative block text-2xl drop-shadow-[0_0_24px_rgba(56,189,248,0.5)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {hero.title.split("").map((char, i) => (
          <span key={`${char}-${i}`} className="hero-char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </h1>
  );
}

function StormPanel() {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/90 to-black md:min-h-0">
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent"
            style={{ top: `${10 + i * 11}%` }}
            animate={{ x: ["-20%", "20%"], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
          />
        ))}
        <motion.div
          className="absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-indigo-900/50 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/3 top-0 h-32 w-32 rounded-full bg-violet-900/40 blur-2xl"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center gap-3 p-4 md:p-6">
        {stormWords.map((word, i) => (
          <motion.span
            key={word}
            className="w-fit rounded-lg border border-red-500/25 bg-red-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-red-300/90 shadow-[0_0_20px_rgba(239,68,68,0.15)] md:text-xs"
            initial={{ opacity: 0, x: -24 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              x: [0, 6, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.25,
            }}
            style={{ marginLeft: `${(i % 3) * 12}%` }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent" />
    </div>
  );
}

function EngineerCenter() {
  return (
    <div className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-900/80 md:min-h-0">
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute h-48 w-48 rounded-full bg-violet-500/15 blur-2xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <svg
        viewBox="0 0 200 280"
        className="relative z-10 h-[min(50vh,320px)] w-auto drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="visor-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body / shoulders — back view */}
        <path
          d="M40 120 Q100 90 160 120 L175 200 Q100 240 25 200 Z"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M55 200 L55 260 M145 200 L145 260"
          stroke="#334155"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Head from behind — face hidden */}
        <ellipse cx="100" cy="75" rx="38" ry="42" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        {/* Visor band hides face */}
        <rect
          x="62"
          y="58"
          width="76"
          height="22"
          rx="4"
          fill="url(#visor-glow)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <motion.rect
          x="62"
          y="58"
          width="76"
          height="22"
          rx="4"
          fill="url(#visor-glow)"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Laptop / code glow */}
        <rect x="70" y="155" width="60" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
        <motion.line
          x1="78"
          y1="168"
          x2="122"
          y2="168"
          stroke="#38bdf8"
          strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.line
          x1="78"
          y1="178"
          x2="110"
          y2="178"
          stroke="#a78bfa"
          strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.line
          x1="78"
          y1="188"
          x2="115"
          y2="188"
          stroke="#34d399"
          strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-sky-900/40 to-transparent" />
    </div>
  );
}

function LaunchPanel() {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-sky-300/20 via-amber-100/10 to-emerald-200/15 md:min-h-0">
      <motion.div
        className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-amber-300/40 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-4 top-1/4 h-20 w-full max-w-[200px] rounded-xl border border-sky-400/30 bg-sky-950/40 p-3 backdrop-blur-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-sky-300">
          Growth
        </p>
        <div className="mt-2 flex h-16 items-end gap-1">
          {[35, 55, 48, 72, 65, 88, 95].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-sky-600 to-emerald-400"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-4 left-4 rounded-xl border border-emerald-400/25 bg-white/5 p-3 backdrop-blur-sm md:left-auto md:w-48"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-300">
          Company
        </p>
        <svg viewBox="0 0 120 80" className="mt-2 w-full">
          <rect x="50" y="8" width="20" height="14" rx="2" fill="#38bdf8" opacity="0.8" />
          <line x1="60" y1="22" x2="60" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="32" x2="30" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="32" x2="90" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="30" y1="48" x2="20" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="30" y1="48" x2="40" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="90" y1="48" x2="80" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="90" y1="48" x2="100" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
          {[
            [20, 68],
            [40, 68],
            [80, 68],
            [100, 68],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill="#34d399" opacity="0.7" />
          ))}
          <motion.circle
            cx="60"
            cy="8"
            r="4"
            fill="#fbbf24"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sky-950/50 to-transparent" />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 md:pt-32"
    >
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_1.1fr_1fr]">
        <StormPanel />
        <EngineerCenter />
        <LaunchPanel />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      <div className="relative z-30 flex min-h-[40vh] items-center justify-center py-16 md:min-h-0 md:py-24">
        <GlowingTitle />
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border border-slate-500/50 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-sky-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
