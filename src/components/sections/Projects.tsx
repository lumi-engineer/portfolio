"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";

function PlaceholderShimmer() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-800/80 md:h-48">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-sm text-slate-500">Project preview</span>
      </div>
    </div>
  );
}

function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
}: {
  beforeLabel: string;
  afterLabel: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mt-4 select-none overflow-hidden rounded-xl border border-slate-700/50">
      <div className="relative h-32 md:h-36">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950/60 to-slate-900 p-4 text-center">
          <p className="text-sm text-red-300/90 md:text-base">{beforeLabel}</p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950/60 to-sky-950/40 p-4 text-center"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <p className="text-sm text-emerald-300/90 md:text-base">{afterLabel}</p>
        </div>
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Before and after comparison"
        />
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ left: `${position}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[10px] text-white"
          style={{ left: `${position}%` }}
        >
          ↔
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
      <motion.article
        layout
        className="glass overflow-hidden rounded-2xl"
      >
        <PlaceholderShimmer />

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-sky-400">
                {project.category}
              </span>
              <h3 className="mt-1 text-2xl font-semibold">{project.title}</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 text-base text-slate-400">{project.summary}</p>

          <BeforeAfterSlider
            beforeLabel={project.beforeLabel}
            afterLabel={project.afterLabel}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-sky-500/50"
            >
              {expanded ? "Collapse" : "Expand details"}
            </button>
            <button
              type="button"
              onClick={() => setCaseStudyOpen((v) => !v)}
              className="rounded-full bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-500/30"
            >
              {caseStudyOpen ? "Close case study" : "Interactive case study"}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  {project.detail}
                </p>
                <h4 className="mt-4 font-mono text-sm uppercase tracking-wider text-violet-400">
                  What I did
                </h4>
                <ul className="mt-2 space-y-2">
                  {project.whatIDid.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-base text-slate-400 before:content-['→']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {caseStudyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 rounded-xl border border-violet-500/30 bg-violet-950/20 p-4"
              >
                <p className="font-mono text-sm text-violet-300">Case study mode</p>
                <p className="mt-2 text-base text-slate-300">
                  Drag the slider above to compare legacy vs shipped outcomes.
                  This project demonstrates measurable impact across stack, UX,
                  and operations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <span className="section-label text-emerald-400">Projects</span>
        <h2 className="section-title">
          Selected work & case studies
        </h2>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className={project.id === "fintech-dashboard" ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
