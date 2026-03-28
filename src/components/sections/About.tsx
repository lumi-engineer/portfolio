"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/useTypewriter";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { displayed, done } = useTypewriter(about.intro, 22, 600);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-stagger > *", {
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
      className="section-padding relative"
    >
      <div className="about-stagger mx-auto max-w-6xl">
        <motion.span
          className="section-label text-violet-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About
        </motion.span>

        <h2 className="section-title">
          <span className="gradient-text">{about.punchline}</span>
        </h2>

        <div className="mt-10">
          <div className="glass rounded-2xl p-6 md:p-10">
            <p className="min-h-[12rem] font-mono text-base leading-relaxed text-slate-300 md:text-lg">
              {displayed}
              {!done && (
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-sky-400 align-middle" />
              )}
            </p>

            <motion.div
              className="mt-8 inline-block rounded-full border border-emerald-500/40 bg-emerald-950/40 px-5 py-2"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-mono text-sm font-bold tracking-[0.25em] text-emerald-400">
                {about.brand}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
