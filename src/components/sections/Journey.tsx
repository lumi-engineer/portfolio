"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SemanticHeading } from "@/components/ui/SemanticHeading";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <SectionLabel variant="journey">My Journey</SectionLabel>
        <SemanticHeading
          as="h2"
          text="The best way to predict the future is to invent it."
          className="section-title font-quote text-[var(--muted)]"
        />

        <div className="relative mt-16">
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-sky-500 via-violet-500 to-emerald-400 md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-12">
            {journey.map((item, index) => (
              <li
                key={item.year}
                className={`timeline-item relative flex flex-col gap-4 pl-12 md:w-1/2 ${
                  index % 2 === 0
                    ? "md:ml-0 md:pr-12 md:pl-0 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                <div
                  className={`absolute top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-400 bg-slate-950 md:left-auto ${
                    index % 2 === 0 ? "md:-right-4" : "md:-left-4"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                </div>

                <motion.div
                  className="glass rounded-xl p-5"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-mono text-base text-sky-400">{item.year}</span>
                  <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base text-slate-400">{item.description}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
