"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { BottomProgress } from "@/components/layout/BottomProgress";
import { ThemeBackground } from "@/components/effects/ThemeBackground";
import { GoldCoinCursor } from "@/components/effects/GoldCoinCursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Tech } from "@/components/sections/Tech";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export function PortfolioShell() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen visible={loading} />
      {!loading && (
        <>
          <ThemeBackground />
          <GoldCoinCursor />
          <Navbar />
          <BottomProgress />
          <main className="relative z-10 pb-6 text-[var(--foreground)]">
            <Hero />
            <About />
            <Journey />
            <Tech />
            <Projects />
            <Testimonials />
            <Contact />
          </main>
        </>
      )}
    </ThemeProvider>
  );
}
