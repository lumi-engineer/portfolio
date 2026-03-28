"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { contact } from "@/data/portfolio";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!blobRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(blobRef.current, {
      x: x - 120,
      y: y - 120,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={onMove}
      className="section-padding relative overflow-hidden"
    >
      <div
        ref={blobRef}
        className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-sky-500/30 via-violet-500/20 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          className="section-label text-pink-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.span>

        <h2 className="section-title">
          <span className="gradient-text">{contact.headline}</span>
        </h2>
        <p className="mt-4 text-lg text-slate-400">{contact.subtext}</p>

        <motion.a
          href={`mailto:${contact.email}`}
          className="group relative mt-12 inline-block"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 block rounded-2xl border border-slate-600 bg-slate-900/60 px-10 py-6 font-mono text-xl text-sky-300 backdrop-blur transition group-hover:border-sky-500/50 group-hover:text-white md:text-2xl">
            {contact.email}
          </span>
          <motion.span
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 opacity-0 blur-md transition group-hover:opacity-60"
            animate={{ opacity: hover ? 0.5 : 0 }}
          />
        </motion.a>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {["LinkedIn", "GitHub", "Twitter"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="glass rounded-full px-5 py-2.5 text-base text-slate-400 transition hover:text-white"
              whileHover={{ y: -4, color: "#38bdf8" }}
              transition={{ delay: i * 0.05 }}
            >
              {social}
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-20 font-mono text-xs uppercase tracking-[0.4em] text-slate-600">
          © {new Date().getFullYear()} · Engineered with Next.js & passion
        </p>
      </div>
    </section>
  );
}
