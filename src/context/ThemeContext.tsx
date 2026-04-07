"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themeOptions, themeStyles, type ThemeId } from "@/data/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("Dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && themeOptions.includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const vars = themeStyles[theme];
    document.documentElement.style.setProperty("--background", vars.bg);
    document.documentElement.style.setProperty("--foreground", vars.fg);
    document.documentElement.style.setProperty("--muted", vars.muted);
    document.documentElement.style.setProperty("--accent", vars.accent);
    document.documentElement.style.setProperty("--nav-bg", vars.navBg);
    document.documentElement.style.setProperty("--nav-fg", vars.navFg);
    document.documentElement.style.setProperty("--nav-muted", vars.navMuted);
    document.documentElement.style.setProperty("--nav-border", vars.navBorder);
    document.documentElement.style.setProperty("--progress-track", vars.progressTrack);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
