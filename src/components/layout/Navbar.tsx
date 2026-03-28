"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themeOptions } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeId } from "@/data/themes";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NavDog } from "@/components/layout/NavDog";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const DOG_PAD_START = 8;
const DOG_PAD_END = 92;

export function Navbar() {
  const scrollProgress = useScrollProgress();
  const { theme, setTheme } = useTheme();
  const [activeHref, setActiveHref] = useState("#hero");
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const [themeDogLeft, setThemeDogLeft] = useState(88);

  const scrollDogLeft =
    DOG_PAD_START + scrollProgress * (DOG_PAD_END - DOG_PAD_START);

  useEffect(() => {
    const sections = [...navItems.map((n) => n.href), "#journey"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            if (sections.includes(id)) setActiveHref(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!themeOpen) return;
    const updateThemeDog = () => {
      const nav = navRef.current;
      const btn = themeBtnRef.current;
      if (!nav || !btn) return;
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const center = btnRect.left + btnRect.width / 2 - navRect.left;
      setThemeDogLeft((center / navRect.width) * 100);
    };
    updateThemeDog();
    window.addEventListener("resize", updateThemeDog);
    return () => window.removeEventListener("resize", updateThemeDog);
  }, [themeOpen]);

  const dogLeft = themeOpen ? themeDogLeft : scrollDogLeft;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-10 md:pt-12">
      <div className="relative w-fit max-w-[calc(100vw-2rem)]">
        <motion.nav
          ref={navRef}
          layout
          className="relative w-fit overflow-visible border border-white/10 bg-black/50 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          style={{ borderRadius: themeOpen ? 28 : 9999 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        >
          <NavDog
            leftPercent={dogLeft}
            pose={themeOpen ? "theme" : "walk"}
          />

          <div className="relative z-10 px-3 pt-2 md:px-5 md:pt-2.5">
            <div className="flex items-center justify-center gap-1 md:gap-1.5">
              {navItems.map((item) => {
                const isActive = activeHref === item.href && !themeOpen;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveHref(item.href);
                      setThemeOpen(false);
                      setMobileOpen(false);
                    }}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-base font-medium transition-colors md:px-4 md:py-2.5 ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-glow"
                        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(251,113,133,0.5)_0%,_rgba(139,92,246,0.35)_55%,_transparent_75%)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}

              <button
                ref={themeBtnRef}
                type="button"
                onClick={() => setThemeOpen((v) => !v)}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-base font-medium transition-colors md:px-4 md:py-2.5 ${
                  themeOpen ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {themeOpen && (
                  <motion.span
                    layoutId="nav-glow"
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(251,113,133,0.5)_0%,_rgba(139,92,246,0.35)_55%,_transparent_75%)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Theme</span>
              </button>

              <button
                type="button"
                className="ml-0.5 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                <span className="h-0.5 w-4 bg-slate-300" />
                <span className="h-0.5 w-4 bg-slate-300" />
              </button>
            </div>

            {/* Scroll progress inside navbar */}
            <div className="mx-2 mt-1 h-1 overflow-hidden rounded-full bg-slate-700/60 md:mx-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 24 }}
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {themeOpen && (
              <motion.div
                key="theme-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mx-4 border-t border-white/10 md:mx-5" />
                <div className="grid grid-cols-3 gap-x-5 gap-y-2.5 px-5 pb-4 pt-3 sm:grid-cols-5 md:px-6 md:pb-5 md:pt-4">
                  {themeOptions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setTheme(name as ThemeId)}
                      className={`rounded-md py-1.5 text-left text-base transition ${
                        theme === name
                          ? "font-medium text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <AnimatePresence>
          {mobileOpen && !themeOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base text-slate-300"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
