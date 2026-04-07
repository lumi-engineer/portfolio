"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type SectionLabelVariant =
  | "about"
  | "journey"
  | "tech"
  | "projects"
  | "testimonials"
  | "contact";

type SectionLabelProps = {
  children: ReactNode;
  variant: SectionLabelVariant;
  className?: string;
};

const accent: Record<SectionLabelVariant, string> = {
  about: "text-violet-400",
  journey: "text-sky-400",
  tech: "text-violet-400",
  projects: "text-emerald-400",
  testimonials: "text-amber-400",
  contact: "text-pink-400",
};

export function SectionLabel({ children, variant, className = "" }: SectionLabelProps) {
  return (
    <motion.div
      className={`section-label-wrap mb-6 flex flex-col items-center text-center ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {variant === "about" && (
        <motion.span
          className="mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"
          animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {variant === "journey" && (
        <div className="mb-3 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-sky-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}

      {variant === "tech" && (
        <motion.span
          className="relative mb-3 flex h-10 w-10 items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-violet-400/60" />
          <span className="h-2 w-2 rounded-full bg-violet-400" />
        </motion.span>
      )}

      {variant === "projects" && (
        <motion.div
          className="relative mb-3 h-1 w-32 overflow-hidden rounded-full bg-slate-700/50"
        >
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {variant === "testimonials" && (
        <motion.div className="mb-3 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="text-amber-400"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>
      )}

      {variant === "contact" && (
        <motion.span
          className="mb-3 inline-block text-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ✦
        </motion.span>
      )}

      <motion.h2
        className={`font-mono text-2xl font-bold uppercase tracking-[0.35em] md:text-3xl lg:text-4xl ${accent[variant]}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        animate={
          variant === "projects"
            ? { letterSpacing: ["0.3em", "0.38em", "0.3em"] }
            : undefined
        }
      >
        <span className="semantic-word inline-block whitespace-nowrap">{children}</span>
      </motion.h2>

      <motion.span
        className={`mt-3 h-px w-16 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${accent[variant]}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
    </motion.div>
  );
}
