"use client";

import { HeroNeonTitle } from "./hero/HeroNeonTitle";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="relative z-20 flex w-full justify-center pt-[min(12vh,5.5rem)] md:pt-[min(14vh,6.5rem)]">
        <HeroNeonTitle />
      </div>
    </section>
  );
}
