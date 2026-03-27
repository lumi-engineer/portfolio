"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { hero } from "@/data/portfolio";

export function Hero() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.045,
        ease: "power3.out",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 pt-36 pb-20 md:pt-40"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,520px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(60vw,400px)] w-[min(70vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[80px]"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <h1
        ref={ref}
        className="relative z-10 max-w-5xl text-center font-bold leading-[1.15] tracking-[0.1em] md:tracking-[0.18em]"
        aria-label={hero.title}
      >
        <span
          className="pointer-events-none absolute inset-0 select-none gradient-text text-3xl opacity-50 blur-2xl sm:text-4xl md:text-5xl lg:text-6xl"
          aria-hidden
        >
          {hero.title}
        </span>
        <span className="gradient-text relative block text-3xl drop-shadow-[0_0_32px_rgba(56,189,248,0.55)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {hero.title.split("").map((char, i) => (
            <span key={`${char}-${i}`} className="hero-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </h1>
    </section>
  );
}
