import type { Transition, Variants } from "framer-motion";

export type SemanticMotionKey =
  | "emerge"
  | "darkness"
  | "bridge"
  | "launch"
  | "glow"
  | "construct"
  | "snap"
  | "slide"
  | "rise"
  | "step"
  | "forward"
  | "shake"
  | "expand"
  | "connect"
  | "default";

/** Style + behavior + timing + constraints per motion type. */
export const MOTION_SPEC: Record<
  SemanticMotionKey,
  {
    style: string;
    behavior: string;
    timing: { duration: number; ease: number[] };
    constraints: string;
  }
> = {
  emerge: {
    style: "Soft lift from below",
    behavior: "opacity 0→1, y 28→0",
    timing: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    constraints: "No rotation; whole word only",
  },
  darkness: {
    style: "Heavy, muted arrival",
    behavior: "blur 10→0, opacity 0→0.85, slight sink",
    timing: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
    constraints: "No letter split; max y 12px",
  },
  bridge: {
    style: "Horizontal pass-through",
    behavior: "x -18→0, opacity fade",
    timing: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    constraints: "Single axis x only",
  },
  launch: {
    style: "Upward burst",
    behavior: "y 36→0, scale 0.92→1, opacity snap",
    timing: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    constraints: "No blur; y max 36px",
  },
  glow: {
    style: "AI / tech pulse",
    behavior: "scale pulse 0.96→1, opacity breathe",
    timing: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    constraints: "scale 0.94–1.04 only",
  },
  construct: {
    style: "Stacked build",
    behavior: "y 20→0, opacity stagger feel",
    timing: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    constraints: "Whole word block",
  },
  snap: {
    style: "Crisp modern snap",
    behavior: "scale 0.88→1, opacity 0→1",
    timing: { duration: 0.45, ease: [0.34, 1.4, 0.64, 1] },
    constraints: "Short duration",
  },
  slide: {
    style: "Mobile / lateral",
    behavior: "x 24→0, opacity in",
    timing: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    constraints: "x max 24px",
  },
  rise: {
    style: "Gentle rise",
    behavior: "y 16→0, opacity in",
    timing: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    constraints: "Default fallback",
  },
  step: {
    style: "Milestone step",
    behavior: "y 12→0 with slight delay feel",
    timing: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    constraints: "y max 12px",
  },
  forward: {
    style: "Future / predict",
    behavior: "x -12→0, opacity",
    timing: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    constraints: "Forward bias +x",
  },
  shake: {
    style: "Failure then settle",
    behavior: "x oscillate ±4→0, opacity in",
    timing: { duration: 0.7, ease: [0.36, 0, 0.2, 1] },
    constraints: "x max ±6px",
  },
  expand: {
    style: "Ambitious widen",
    behavior: "scale 0.9→1, opacity",
    timing: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    constraints: "scale min 0.88",
  },
  connect: {
    style: "Bridge / link",
    behavior: "opacity + subtle y",
    timing: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    constraints: "Calm motion",
  },
  default: {
    style: "Neutral reveal",
    behavior: "y 14→0, opacity",
    timing: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    constraints: "Whole words only",
  },
};

const WORD_KEYS: Record<string, SemanticMotionKey> = {
  from: "emerge",
  darkness: "darkness",
  to: "bridge",
  launch: "launch",
  ai: "glow",
  building: "construct",
  modern: "snap",
  mobile: "slide",
  web: "snap",
  apps: "launch",
  engineer: "construct",
  "full-stack": "glow",
  milestones: "step",
  shaped: "rise",
  predict: "forward",
  future: "forward",
  invent: "launch",
  failed: "shake",
  ways: "step",
  wont: "shake",
  work: "rise",
  ambitious: "expand",
  something: "expand",
  lets: "connect",
  bridge: "connect",
  engineering: "connect",
  business: "construct",
  outcomes: "launch",
};

export function getWordMotionKey(word: string): SemanticMotionKey {
  const key = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  return WORD_KEYS[key] ?? "default";
}

export function wordVariants(motionKey: SemanticMotionKey): Variants {
  const t = MOTION_SPEC[motionKey].timing;
  const transition: Transition = {
    duration: t.duration,
    ease: t.ease as [number, number, number, number],
  };

  switch (motionKey) {
    case "darkness":
      return {
        hidden: { opacity: 0, y: 12, filter: "blur(10px)" },
        visible: { opacity: 0.92, y: 0, filter: "blur(0px)" },
      };
    case "bridge":
      return {
        hidden: { opacity: 0, x: -18 },
        visible: { opacity: 1, x: 0 },
      };
    case "launch":
      return {
        hidden: { opacity: 0, y: 36, scale: 0.92 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    case "glow":
      return {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { opacity: 1, scale: 1 },
      };
    case "snap":
      return {
        hidden: { opacity: 0, scale: 0.88 },
        visible: { opacity: 1, scale: 1 },
      };
    case "slide":
      return {
        hidden: { opacity: 0, x: 24 },
        visible: { opacity: 1, x: 0 },
      };
    case "shake":
      return {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 },
      };
    case "expand":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };
    case "forward":
      return {
        hidden: { opacity: 0, x: -12 },
        visible: { opacity: 1, x: 0 },
      };
    case "construct":
    case "step":
    case "emerge":
    case "rise":
    case "connect":
    default:
      return {
        hidden: { opacity: 0, y: motionKey === "emerge" ? 28 : 14 },
        visible: { opacity: 1, y: 0 },
      };
  }
}

/** Split into whole words and whitespace — words never broken. */
export function tokenizeText(text: string): { type: "word" | "space"; value: string }[] {
  return text.split(/(\s+)/).filter((p) => p.length > 0).map((part) => ({
    type: /^\s+$/.test(part) ? "space" : "word",
    value: part,
  }));
}
