"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getAllSkills } from "@/data/portfolio";
import { getSkillIcon, LuBrain } from "@/lib/skill-icons";
import { SectionLabel } from "@/components/ui/SectionLabel";

import { SemanticHeading } from "@/components/ui/SemanticHeading";

const skills = getAllSkills();

const ORBIT_RINGS = [
  { radius: 88, speed: 0.22, maxIcons: 10 },
  { radius: 118, speed: -0.17, maxIcons: 12 },
  { radius: 148, speed: 0.13, maxIcons: 14 },
  { radius: 178, speed: -0.1, maxIcons: 16 },
] as const;

const OUTER_RADIUS = ORBIT_RINGS[ORBIT_RINGS.length - 1].radius;
const ORBIT_BOX = OUTER_RADIUS * 2 + 140;

function SkillIconBadge({
  name,
  color,
  size = "orbit",
}: {
  name: string;
  color: string;
  size?: "orbit" | "list";
}) {
  const Icon = getSkillIcon(name);
  const dim =
    size === "orbit"
      ? "h-12 w-12 md:h-14 md:w-14"
      : "h-7 w-7 shrink-0";
  const iconSize = size === "orbit" ? 26 : 14;

  return (
    <span
      className={`flex ${dim} items-center justify-center rounded-2xl border border-white/15 bg-black/40 shadow-lg backdrop-blur-md`}
      style={{
        color,
        boxShadow: `0 0 28px ${color}44`,
        borderColor: `${color}55`,
      }}
    >
      <Icon size={iconSize} aria-hidden />
    </span>
  );
}

function BrainCenter() {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center md:h-36 md:w-36">
      <motion.div
        className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-sky-400/40 bg-black/50 md:h-28 md:w-28">
        <LuBrain className="text-sky-200" size={52} strokeWidth={1.1} />
      </div>
    </div>
  );
}

function OrbitRing({
  speed,
  ringSkills,
  ringIndex,
}: {
  speed: number;
  ringSkills: typeof skills;
  ringIndex: number;
}) {
  const ringRef = useRef<HTMLDivElement>(null);
  const radius = ORBIT_RINGS[ringIndex]?.radius ?? 150;
  const size = radius * 2 + 72;

  useEffect(() => {
    if (!ringRef.current) return;
    let raf = 0;
    let angle = ringIndex * 35;
    const tick = () => {
      angle += speed;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, ringIndex]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
      style={{ width: size, height: size }}
    >
      <div
        ref={ringRef}
        className="absolute inset-0"
        style={{ transformOrigin: "50% 50%" }}
      >
        {ringSkills.map((skill, i) => {
          const angle = (360 / ringSkills.length) * i;
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 50 * Math.cos(rad);
          const cy = 50 + 50 * Math.sin(rad);
          return (
            <div
              key={`${ringIndex}-${skill.name}`}
              className="absolute"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <SkillIconBadge name={skill.name} color={skill.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MultiRingOrbit() {
  let offset = 0;
  const rings = ORBIT_RINGS.map((ring) => {
    const slice = skills.slice(offset, offset + ring.maxIcons);
    offset += ring.maxIcons;
    return { ...ring, skills: slice };
  });

  return (
    <div
      className="relative shrink-0"
      style={{ width: ORBIT_BOX, height: ORBIT_BOX }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <BrainCenter />
      </div>
      {rings.map(
        (ring, i) =>
          ring.skills.length > 0 && (
            <OrbitRing
              key={i}
              speed={ring.speed}
              ringSkills={ring.skills}
              ringIndex={i}
            />
          )
      )}
    </div>
  );
}

function SkillProgressBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function NaturalSkillList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const doubled = [...skills, ...skills];

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollProgress(max > 0 ? el.scrollTop / max : 0);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      el.scrollTop += 0.28;
      if (el.scrollTop >= el.scrollHeight / 2) el.scrollTop = 0;
      updateProgress();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="relative flex w-full max-w-lg items-center justify-center">
      <div
        ref={scrollRef}
        className="hide-scrollbar h-[min(400px,50vh)] w-full overflow-y-auto overflow-x-hidden pl-5 pr-4 md:pl-8"
      >
        <ul className="space-y-0">
          {doubled.map((skill, i) => (
            <li
              key={`${skill.name}-${i}`}
              className="border-b border-white/[0.06] py-2 last:border-b-0"
            >
              <div className="flex items-center gap-2.5">
                <SkillIconBadge name={skill.name} color={skill.color} size="list" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">{skill.name}</p>
                    <span className="shrink-0 text-[10px] tabular-nums text-[var(--muted)]">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--muted)]">
                    {skill.category}
                  </p>
                  <SkillProgressBar level={skill.level} color={skill.color} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-1 overflow-hidden rounded-full bg-white/[0.08]"
        aria-hidden
      >
        <motion.div
          className="absolute left-0 right-0 top-0 rounded-full bg-gradient-to-b from-sky-400 via-violet-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          style={{
            height: `${Math.max(scrollProgress * 100, 8)}%`,
          }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

export function Tech() {
  return (
    <section id="tech" className="section-padding relative overflow-visible">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
        <SectionLabel variant="tech">Skills</SectionLabel>

        <SemanticHeading
          as="h2"
          text="I have not failed. I’ve just found 10,000 ways that won’t work."
          className="section-title font-quote text-[var(--muted)]"
        />

        <div
          className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12"
          style={{ minHeight: ORBIT_BOX }}
        >
          <div className="flex w-full justify-center overflow-visible">
            <MultiRingOrbit />
          </div>
          <div className="flex min-h-[min(400px,50vh)] items-center justify-center lg:min-h-0 lg:h-full">
            <NaturalSkillList />
          </div>
        </div>
      </div>
    </section>
  );
}
