export const themeOptions = [
  "Dark",
  "Light",
  "Space",
  "Snow",
  "Rain",
  "Leaf",
  "Silk",
  "Stellar",
  "Ocean",
  "Dot Grid",
] as const;

export type ThemeId = (typeof themeOptions)[number];

export type ThemeStyle = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  navBg: string;
  navFg: string;
  navMuted: string;
  navBorder: string;
  progressTrack: string;
};

const darkNav = {
  navBg: "rgba(8, 12, 24, 0.88)",
  navFg: "#f8fafc",
  navMuted: "#94a3b8",
  navBorder: "rgba(255, 255, 255, 0.14)",
  progressTrack: "rgba(255, 255, 255, 0.12)",
};

const lightNav = {
  navBg: "rgba(255, 255, 255, 0.92)",
  navFg: "#0f172a",
  navMuted: "#475569",
  navBorder: "rgba(15, 23, 42, 0.12)",
  progressTrack: "rgba(15, 23, 42, 0.1)",
};

export const themeStyles: Record<ThemeId, ThemeStyle> = {
  Dark: {
    bg: "#030712",
    fg: "#f1f5f9",
    muted: "#94a3b8",
    accent: "#38bdf8",
    ...darkNav,
  },
  Light: {
    bg: "#BAE6FD",
    fg: "#0f172a",
    muted: "#475569",
    accent: "#0284c7",
    ...lightNav,
  },
  Space: {
    bg: "#000000",
    fg: "#f8fafc",
    muted: "#a1a1aa",
    accent: "#c084fc",
    ...darkNav,
  },
  Snow: {
    bg: "#0f172a",
    fg: "#f1f5f9",
    muted: "#cbd5e1",
    accent: "#e2e8f0",
    ...darkNav,
  },
  Rain: {
    bg: "#000000",
    fg: "#e2e8f0",
    muted: "#94a3b8",
    accent: "#60a5fa",
    ...darkNav,
  },
  Leaf: {
    bg: "#052e16",
    fg: "#ecfdf5",
    muted: "#86efac",
    accent: "#4ade80",
    navBg: "rgba(5, 46, 22, 0.9)",
    navFg: "#ecfdf5",
    navMuted: "#86efac",
    navBorder: "rgba(134, 239, 172, 0.2)",
    progressTrack: "rgba(134, 239, 172, 0.15)",
  },
  Silk: {
    bg: "#1a0a2e",
    fg: "#faf5ff",
    muted: "#d8b4fe",
    accent: "#e879f9",
    ...darkNav,
  },
  Stellar: {
    bg: "#0b0014",
    fg: "#fef3c7",
    muted: "#fcd34d",
    accent: "#fbbf24",
    navBg: "rgba(11, 0, 20, 0.9)",
    navFg: "#fef3c7",
    navMuted: "#fcd34d",
    navBorder: "rgba(252, 211, 77, 0.2)",
    progressTrack: "rgba(252, 211, 77, 0.15)",
  },
  Ocean: {
    bg: "#042f4a",
    fg: "#e0f2fe",
    muted: "#7dd3fc",
    accent: "#38bdf8",
    navBg: "rgba(4, 47, 74, 0.92)",
    navFg: "#e0f2fe",
    navMuted: "#7dd3fc",
    navBorder: "rgba(125, 211, 252, 0.22)",
    progressTrack: "rgba(125, 211, 252, 0.15)",
  },
  "Dot Grid": {
    bg: "#0a0a0a",
    fg: "#fafafa",
    muted: "#a3a3a3",
    accent: "#fafafa",
    ...darkNav,
  },
};
