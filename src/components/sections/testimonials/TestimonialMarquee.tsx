"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import type { Testimonial } from "@/data/portfolio";

const MARQUEE_DURATION_S = 120;

function StarRow() {
  return (
    <div className="flex gap-0.5 text-amber-400/95" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className="h-3 w-3" />
      ))}
    </div>
  );
}

function MarqueeCard({ item }: { item: Testimonial }) {
  return (
    <article
      data-marquee-card
      className="marquee-card group relative flex w-[min(88vw,400px)] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-slate-900/95 to-slate-950/98 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 will-change-transform hover:border-sky-500/25 hover:shadow-[0_28px_90px_-20px_rgba(56,189,248,0.18)]"
      style={{ transformOrigin: "center center" }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-sky-400/60 via-violet-400/40 to-amber-400/50 opacity-80 blur-[2px]" />
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/10 ring-offset-2 ring-offset-slate-950">
            <Image
              src={item.avatar}
              alt={item.author}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <StarRow />
          <p className="mt-2 font-semibold leading-tight text-slate-100">{item.author}</p>
          <p className="mt-0.5 text-xs leading-snug text-slate-500">
            {item.role}
            <span className="text-slate-600"> · </span>
            <span className="text-sky-400/90">{item.company}</span>
          </p>
        </div>
        <FaQuoteLeft className="mt-1 h-5 w-5 shrink-0 text-amber-400/40" aria-hidden />
      </div>

      <blockquote className="relative mt-5 text-[15px] leading-relaxed text-slate-300/95">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
    </article>
  );
}

export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items];

  useEffect(() => {
    let frame = 0;

    const updateDepth = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        frame = requestAnimationFrame(updateDepth);
        return;
      }

      const viewportRect = viewport.getBoundingClientRect();
      const centerX = viewportRect.left + viewportRect.width / 2;
      const falloff = viewportRect.width * 0.48;

      viewport.querySelectorAll<HTMLElement>("[data-marquee-card]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        const t = Math.min(dist / falloff, 1);
        const scale = 1.08 - t * 0.2;
        const opacity = 1 - t * 0.42;
        const blur = t * 1.25;

        card.style.transform = `scale(${scale.toFixed(3)}) translateZ(0)`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
        card.style.zIndex = String(Math.round((1 - t) * 20));
      });

      frame = requestAnimationFrame(updateDepth);
    };

    frame = requestAnimationFrame(updateDepth);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={viewportRef}
      className="testimonial-marquee-viewport relative mt-14 w-full overflow-hidden [perspective:1200px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[min(18vw,140px)] bg-gradient-to-r from-[var(--background)] via-[var(--background)]/90 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[min(18vw,140px)] bg-gradient-to-l from-[var(--background)] via-[var(--background)]/90 to-transparent"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(420px,70%)] w-[min(520px,55vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.07] blur-3xl"
        aria-hidden
      />

      <div
        className="testimonial-marquee-track flex w-max gap-6 py-6 md:gap-7"
        style={
          {
            "--marquee-duration": `${MARQUEE_DURATION_S}s`,
            animationPlayState: paused ? "paused" : "running",
          } as CSSProperties
        }
      >
        {loop.map((item, index) => (
          <MarqueeCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>

      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
        {paused ? "Paused · hover to read" : "Hover to pause"}
      </p>
    </div>
  );
}
