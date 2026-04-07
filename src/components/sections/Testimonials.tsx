"use client";

import { testimonials, testimonialsSection } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SemanticHeading } from "@/components/ui/SemanticHeading";
import { TestimonialMarquee } from "@/components/sections/testimonials/TestimonialMarquee";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(56,189,248,0.06),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <SectionLabel variant="testimonials">Testimonials</SectionLabel>

        <SemanticHeading
          as="h2"
          text={testimonialsSection.headline}
          className="section-title font-quote text-[var(--muted)]"
        />

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500 md:text-base">
          {testimonialsSection.subline}
        </p>

        <TestimonialMarquee items={testimonials} />
      </div>
    </section>
  );
}
