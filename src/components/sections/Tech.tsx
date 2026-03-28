"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { techStacks } from "@/data/portfolio";

const orbitGroups = [
  { key: "frontend" as const, label: "Frontend", color: "#38bdf8", radius: 120 },
  { key: "backend" as const, label: "Backend", color: "#a78bfa", radius: 155 },
  { key: "database" as const, label: "Database", color: "#34d399", radius: 190 },
  { key: "mobile" as const, label: "Mobile", color: "#f472b6", radius: 225 },
];

export function Tech() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbitRef.current) return;
    const rings = orbitRef.current.querySelectorAll(".orbit-ring");
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: 360,
        duration: 18 + i * 6,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });
  }, []);

  return (
    <section id="tech" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <span className="section-label text-violet-400">Tech Stack</span>
        <h2 className="section-title">
          Skills in orbit
        </h2>

        <div className="mt-16 flex flex-col items-center gap-16 lg:flex-row lg:justify-between">
          <div
            ref={orbitRef}
            className="relative mx-auto h-[min(90vw,480px)] w-[min(90vw,480px)] shrink-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-sky-500/40 bg-slate-900/80 text-center shadow-[0_0_60px_rgba(56,189,248,0.2)]"
                animate={{ boxShadow: ["0 0 40px rgba(56,189,248,0.15)", "0 0 80px rgba(167,139,250,0.25)", "0 0 40px rgba(56,189,248,0.15)"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="font-mono text-sm font-bold text-sky-300">CORE</span>
              </motion.div>
            </div>

            {orbitGroups.map((group, gi) => {
              const skills = techStacks[group.key];
              return (
                <div
                  key={group.key}
                  className="orbit-ring absolute inset-0"
                  style={{ animationDirection: gi % 2 === 0 ? "normal" : "reverse" }}
                >
                  <div
                    className="absolute inset-0 rounded-full border border-dashed opacity-30"
                    style={{
                      margin: `${(240 - group.radius) / 2}px`,
                      borderColor: group.color,
                    }}
                  />
                  {skills.map((skill, si) => {
                    const angle = (360 / skills.length) * si;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + (group.radius / 240) * 50 * Math.cos(rad);
                    const y = 50 + (group.radius / 240) * 50 * Math.sin(rad);
                    return (
                      <span
                        key={skill}
                        className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-1 text-xs font-medium md:text-sm"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          borderColor: `${group.color}55`,
                          color: group.color,
                          background: "rgba(3,7,18,0.85)",
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <motion.div
            className="grid w-full max-w-md gap-4 sm:grid-cols-2 lg:max-w-sm lg:grid-cols-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {orbitGroups.map((g) => (
              <motion.div
                key={g.key}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="glass rounded-xl p-4"
              >
                <h3 className="font-mono text-base" style={{ color: g.color }}>
                  {g.label}
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  {techStacks[g.key].join(" · ")}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
