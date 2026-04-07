"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themeOptions } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeId } from "@/data/themes";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#tech", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Feedback" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [activeHref, setActiveHref] = useState<(typeof navItems)[number]["href"]>("#hero");
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map((n) => n.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            if (sections.includes(id as (typeof navItems)[number]["href"]))
              setActiveHref(id as (typeof navItems)[number]["href"]);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-8 md:pt-10">
      <div className="relative w-fit max-w-[calc(100vw-2rem)]">
        <motion.nav
          layout
          className="relative w-fit overflow-hidden border shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
          style={{
            borderRadius: themeOpen ? 28 : 9999,
            background: "var(--nav-bg)",
            borderColor: "var(--nav-border)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        >
          <div className="px-3 py-3 md:px-5 md:py-3.5">
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
                    className={`whitespace-nowrap rounded-full px-3.5 py-2.5 text-base transition-colors md:px-4 ${
                      isActive
                        ? "font-semibold text-[var(--nav-fg)]"
                        : "font-medium text-[var(--nav-muted)] hover:text-[var(--nav-fg)]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <button
                type="button"
                onClick={() => setThemeOpen((v) => !v)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2.5 text-base transition-colors md:px-4 ${
                  themeOpen
                    ? "font-semibold text-[var(--nav-fg)]"
                    : "font-medium text-[var(--nav-muted)] hover:text-[var(--nav-fg)]"
                }`}
              >
                Theme
              </button>

              <button
                type="button"
                className="ml-0.5 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                style={{ color: "var(--nav-fg)" }}
              >
                <span className="h-0.5 w-4 bg-current" />
                <span className="h-0.5 w-4 bg-current" />
              </button>
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
                <div
                  className="mx-4 border-t md:mx-5"
                  style={{ borderColor: "var(--nav-border)" }}
                />
                <div className="grid grid-cols-3 gap-x-5 gap-y-2.5 px-5 pb-4 pt-3 sm:grid-cols-5 md:px-6 md:pb-5 md:pt-4">
                  {themeOptions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setTheme(name as ThemeId);
                        setThemeOpen(false);
                      }}
                      className={`rounded-md py-1.5 text-left text-base transition ${
                        theme === name
                          ? "font-semibold text-[var(--nav-fg)]"
                          : "text-[var(--nav-muted)] hover:text-[var(--nav-fg)]"
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
              className="mt-2 w-full overflow-hidden rounded-2xl border backdrop-blur-xl md:hidden"
              style={{
                background: "var(--nav-bg)",
                borderColor: "var(--nav-border)",
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[var(--nav-fg)]"
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
