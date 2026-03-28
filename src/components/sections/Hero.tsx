"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero } from "@/data/portfolio";

export function Hero() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotateX: -75 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.85,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.25,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-start justify-center px-4 pb-20 pt-[28vh] md:pt-[26vh]"
    >
      <h1
        ref={ref}
        className="relative z-10 max-w-5xl text-center text-4xl font-bold leading-[1.2] tracking-[0.08em] text-[var(--foreground)] perspective-[800px] sm:text-5xl md:text-6xl md:tracking-[0.14em] lg:text-7xl"
        aria-label={hero.title}
        style={{ transformStyle: "preserve-3d" }}
      >
        {hero.title.split("").map((char, i) => (
          <span key={`${char}-${i}`} className="hero-char inline-block origin-bottom">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </section>
  );
}
