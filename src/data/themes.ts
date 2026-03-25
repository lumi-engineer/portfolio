export const themeOptions = [
  "Dark",
  "light",
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

export const themeStyles: Record<
  ThemeId,
  { bg: string; fg: string; muted: string; accent: string }
> = {
  Dark: {
    bg: "#030712",
    fg: "#f1f5f9",
    muted: "#94a3b8",
    accent: "#38bdf8",
  },
  light: {
    bg: "#f8fafc",
    fg: "#0f172a",
    muted: "#64748b",
    accent: "#0ea5e9",
  },
  Space: {
    bg: "#000000",
    fg: "#f8fafc",
    muted: "#a1a1aa",
    accent: "#c084fc",
  },
  Snow: {
    bg: "#0f172a",
    fg: "#f1f5f9",
    muted: "#cbd5e1",
    accent: "#e2e8f0",
  },
  Rain: {
    bg: "#0c1222",
    fg: "#e2e8f0",
    muted: "#94a3b8",
    accent: "#60a5fa",
  },
  Leaf: {
    bg: "#052e16",
    fg: "#ecfdf5",
    muted: "#86efac",
    accent: "#4ade80",
  },
  Silk: {
    bg: "#1a0a2e",
    fg: "#faf5ff",
    muted: "#d8b4fe",
    accent: "#e879f9",
  },
  Stellar: {
    bg: "#0b0014",
    fg: "#fef3c7",
    muted: "#fcd34d",
    accent: "#fbbf24",
  },
  Ocean: {
    bg: "#041c38",
    fg: "#e0f2fe",
    muted: "#7dd3fc",
    accent: "#38bdf8",
  },
  "Dot Grid": {
    bg: "#0a0a0a",
    fg: "#fafafa",
    muted: "#a3a3a3",
    accent: "#fafafa",
  },
};
