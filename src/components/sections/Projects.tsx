"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, getProjectImages, type Project } from "@/data/portfolio";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { getSkillIcon } from "@/lib/skill-icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SemanticHeading } from "@/components/ui/SemanticHeading";

const collapseEase = [0.22, 1, 0.36, 1] as const;
const collapseTransition = {
  height: { duration: 0.45, ease: collapseEase },
  opacity: { duration: 0.32, ease: collapseEase },
};

function CollapsibleBlock({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={collapseTransition}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ProjectTechChips({ tech, compact }: { tech: string[]; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap ${compact ? "mt-2 gap-1" : "mt-3 gap-1.5"}`}>
      {tech.map((name) => {
        const Icon = getSkillIcon(name);
        return (
          <span
            key={name}
            className={`inline-flex items-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-900/50 text-slate-300 ${
              compact ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
            }`}
          >
            <Icon
              className={`shrink-0 text-sky-400 ${compact ? "h-3 w-3" : "h-3.5 w-3.5"}`}
              aria-hidden
            />
            <span className="leading-none">{name}</span>
          </span>
        );
      })}
    </div>
  );
}

const SIDE_W = 260;
const CENTER_W = 680;
const GAP = 36;

function cardX(offset: number) {
  if (offset === 0) return 0;
  const step = CENTER_W / 2 + GAP + SIDE_W / 2;
  const extra = (Math.abs(offset) - 1) * (SIDE_W + GAP);
  return offset > 0 ? step + extra : -(step + extra);
}

function BeforeAfterSlider({ project }: { project: Project }) {
  const [position, setPosition] = useState(50);
  const images = getProjectImages(project.id);

  return (
    <div className="relative mt-3 select-none overflow-hidden rounded-xl border border-slate-700/50">
      <div className="relative h-40 md:h-48">
        <div className="absolute inset-0">
          <ProjectScreenshot
            projectId={project.id}
            src={images.before}
            alt={`${project.title} before`}
            variant="before"
          />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ProjectScreenshot
            projectId={project.id}
            src={images.after}
            alt={`${project.title} after`}
            variant="after"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <span className="text-[10px] font-medium text-red-300/90 md:text-xs">
            {project.beforeLabel}
          </span>
          <span className="text-[10px] font-medium text-emerald-300/90 md:text-xs">
            {project.afterLabel}
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Compare before and after"
        />
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ left: `${position}%` }}
        />
      </div>
    </div>
  );
}

function ProjectPreview({ project, tall }: { project: Project; tall?: boolean }) {
  const images = getProjectImages(project.id);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-700/40 ${
        tall ? "h-36 md:h-44" : "h-28 md:h-32"
      }`}
    >
      <ProjectScreenshot
        projectId={project.id}
        src={images.preview}
        alt={`${project.title} preview`}
        variant="after"
        priority={tall}
      />
    </div>
  );
}

function ProjectCard({
  project,
  isCenter,
  expanded,
  onExpandedChange,
}: {
  project: Project;
  isCenter: boolean;
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
}) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const isExpanded = isCenter && Boolean(expanded);

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.45, ease: collapseEase } }}
      className={`glass flex shrink-0 origin-top flex-col overflow-visible rounded-2xl transition-shadow ${
        isCenter
          ? "shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:shadow-[0_0_56px_rgba(56,189,248,0.22)]"
          : "hover:shadow-[0_0_20px_rgba(56,189,248,0.06)]"
      }`}
      style={{ width: isCenter ? CENTER_W : SIDE_W }}
      whileHover={isCenter ? { y: -4 } : { y: -2 }}
    >
      <ProjectPreview project={project} tall={isCenter} />

      <div className={`flex flex-col p-4 ${isCenter ? "md:p-5" : ""}`}>
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">
          {project.category}
        </span>
        <h3
          className={`mt-1 font-semibold ${isCenter ? "text-lg md:text-xl" : "text-base"}`}
        >
          {isCenter ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-300"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        {isCenter && (
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {project.platformDescription}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{project.summary}</p>

        {!isCenter && <ProjectTechChips tech={project.tech} compact />}

        {isCenter && (
          <>
            <BeforeAfterSlider project={project} />
            <ProjectTechChips tech={project.tech} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onExpandedChange?.(!expanded)}
                className="rounded-full border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-sky-500/50"
              >
                {isExpanded ? "Collapse" : "View case study"}
              </button>
              <button
                type="button"
                onClick={() => setCaseStudyOpen((v) => !v)}
                className="rounded-full bg-sky-500/20 px-3 py-1.5 text-xs font-medium text-sky-300"
              >
                {caseStudyOpen ? "Hide impact" : "Impact metrics"}
              </button>
            </div>

            <CollapsibleBlock open={isExpanded}>
              <div className="pt-4">
                <p className="text-sm leading-relaxed text-slate-300">{project.detail}</p>
                <h4 className="mt-4 font-mono text-xs uppercase tracking-wider text-violet-400">
                  What I delivered
                </h4>
                <ul className="mt-2 space-y-2">
                  {project.whatIDid.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-slate-400 before:mr-2 before:font-bold before:text-sky-500 before:content-['▸']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleBlock>

            <CollapsibleBlock open={caseStudyOpen}>
              <div className="mt-3 grid gap-2 rounded-lg border border-violet-500/30 bg-violet-950/20 p-3 sm:grid-cols-3">
                {project.whatIDid.slice(0, 3).map((item) => (
                  <p key={item} className="text-xs leading-relaxed text-slate-300">
                    {item}
                  </p>
                ))}
              </div>
            </CollapsibleBlock>
          </>
        )}
      </div>
    </motion.article>
  );
}

function wrapOffset(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export function Projects() {
  const [active, setActive] = useState(0);
  const [centerExpanded, setCenterExpanded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = projects.length;

  useEffect(() => {
    setCenterExpanded(false);
  }, [active]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + count) % count);
    },
    [count]
  );

  return (
    <section id="projects" className="section-padding relative overflow-visible">
      <div className="section-container">
        <SectionLabel variant="projects">Projects</SectionLabel>
        
        <SemanticHeading
          as="h2"
          text="Always deliver more than expected."
          className="section-title font-quote text-[var(--muted)]"
        />

        <div className="relative mt-24 flex items-center justify-center gap-3 md:mt-28 md:gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-xl backdrop-blur transition hover:border-sky-500/50"
            aria-label="Previous project"
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="relative w-full max-w-[min(100vw-6rem,920px)] overflow-visible py-4"
          >
            <div className="relative flex min-h-[min(440px,68vh)] items-center justify-center overflow-visible pb-12 pt-6">
              {projects.map((project, index) => {
                const offset = wrapOffset(index, active, count);
                if (Math.abs(offset) > 2) return null;
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={project.id}
                    className={`absolute left-1/2 top-1/2 -translate-y-1/2 ${!isCenter ? "cursor-pointer" : ""}`}
                    style={{
                      marginLeft: isCenter ? -CENTER_W / 2 : -SIDE_W / 2,
                      width: isCenter ? CENTER_W : SIDE_W,
                      zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                    }}
                    initial={false}
                    animate={{
                      x: cardX(offset),
                      scale: isCenter ? 1 : 0.82,
                      opacity: isCenter ? 1 : 0.45 + (1 - Math.abs(offset)) * 0.15,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                    }}
                    onClick={() => !isCenter && setActive(index)}
                    role={isCenter ? undefined : "button"}
                    tabIndex={isCenter ? undefined : 0}
                    onKeyDown={(e) => {
                      if (!isCenter && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setActive(index);
                      }
                    }}
                  >
                    <ProjectCard
                      project={project}
                      isCenter={isCenter}
                      expanded={isCenter ? centerExpanded : false}
                      onExpandedChange={isCenter ? setCenterExpanded : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-xl backdrop-blur transition hover:border-sky-500/50"
            aria-label="Next project"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-sky-400" : "w-2 bg-slate-600"
              }`}
              aria-label={`Go to ${p.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
