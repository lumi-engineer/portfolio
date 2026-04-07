"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/portfolio";
import { useTypewriterInView } from "@/hooks/useTypewriterInView";
import { SectionLabel } from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_WORDS = ["AI", "FULL-STACK", "MOBILE"] as const;
const CYCLE_MS = 3000;

function RoleHeadline() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % ROTATING_WORDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const activeWord = ROTATING_WORDS[step];
  const showRaisedAi = step > 0;

  return (
    <div className="section-title flex flex-col items-center text-center">
      <div className="relative flex min-h-[5rem] flex-col items-center justify-center md:min-h-[6rem]">

        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 pt-6 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeWord}
              className="inline-block whitespace-nowrap bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-3xl font-bold uppercase text-transparent md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeWord}
            </motion.span>
          </AnimatePresence>
          <span className="whitespace-nowrap text-3xl font-bold uppercase tracking-[0.15em] text-[var(--muted)] md:text-4xl lg:text-5xl">
            ENGINEER
          </span>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { displayed, done, ref: introRef } = useTypewriterInView(about.intro, 22);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-stagger > *:not(.about-headline-wrap)", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative font-about"
    >
      <div className="about-stagger section-container">
        <SectionLabel variant="about">About</SectionLabel>

        <div className="about-headline-wrap">
          <RoleHeadline />
        </div>

        <p
          ref={introRef}
          className="typewriter-text mx-auto mt-10 min-h-[10rem] max-w-3xl text-center text-xl leading-relaxed text-[var(--foreground)] md:text-2xl lg:text-[1.65rem] lg:leading-relaxed"
        >
          {displayed.split("Lucas Daniel").map((chunk, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {chunk}
                <span className="font-name-display text-4xl font-bold text-sky-300 md:text-5xl">
                  Lucas Daniel
                </span>
              </span>
            ) : (
              <span key={i}>{chunk}</span>
            )
          )}
          {!done && (
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-[var(--accent)] align-middle" />
          )}
        </p>

        <div className="mt-8 flex justify-center">
          <motion.a
            href={about.resumeUrl}
            download={about.resumeDownloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold tracking-wide text-[var(--foreground)] transition hover:border-sky-500/50 hover:text-sky-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-sky-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            RESUME DOWNLOAD
          </motion.a>
        </div>
      </div>
    </section>
  );
}
