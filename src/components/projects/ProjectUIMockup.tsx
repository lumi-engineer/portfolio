type Variant = "before" | "after";

type ProjectUIMockupProps = {
  projectId: string;
  variant: Variant;
  className?: string;
};

const palettes: Record<
  string,
  { before: { bg: string; accent: string }; after: { bg: string; accent: string } }
> = {
  "healthcare-platform": {
    before: { bg: "#1e293b", accent: "#64748b" },
    after: { bg: "#0f172a", accent: "#38bdf8" },
  },
  "fintech-dashboard": {
    before: { bg: "#1c1917", accent: "#78716c" },
    after: { bg: "#0c1222", accent: "#34d399" },
  },
  "energy-iot": {
    before: { bg: "#1a1f16", accent: "#65a30d" },
    after: { bg: "#0f1419", accent: "#fbbf24" },
  },
  "retail-commerce": {
    before: { bg: "#2a1810", accent: "#c2410c" },
    after: { bg: "#0f172a", accent: "#a78bfa" },
  },
  "ai-assistant": {
    before: { bg: "#1e1b2e", accent: "#6b7280" },
    after: { bg: "#0b1020", accent: "#e879f9" },
  },
  podia: { before: { bg: "#1e293b", accent: "#94a3b8" }, after: { bg: "#0f172a", accent: "#38bdf8" } },
  teachfloor: { before: { bg: "#1c1917", accent: "#78716c" }, after: { bg: "#0c1222", accent: "#34d399" } },
  paw: { before: { bg: "#2a1810", accent: "#c2410c" }, after: { bg: "#0f172a", accent: "#f472b6" } },
  whop: { before: { bg: "#1e1b2e", accent: "#6b7280" }, after: { bg: "#0b1020", accent: "#a78bfa" } },
  "branch-furniture": { before: { bg: "#1a1f16", accent: "#65a30d" }, after: { bg: "#0f1419", accent: "#fbbf24" } },
  revenuecat: { before: { bg: "#1c1917", accent: "#78716c" }, after: { bg: "#0c1222", accent: "#f97316" } },
  jow: { before: { bg: "#1e293b", accent: "#64748b" }, after: { bg: "#14532d", accent: "#4ade80" } },
  studypool: { before: { bg: "#1e1b2e", accent: "#6b7280" }, after: { bg: "#0b1020", accent: "#60a5fa" } },
};

function Panel({
  x,
  y,
  w,
  h,
  fill,
  rx = 6,
  opacity = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  rx?: number;
  opacity?: number;
}) {
  return (
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} opacity={opacity} />
  );
}

export function ProjectUIMockup({
  projectId,
  variant,
  className = "",
}: ProjectUIMockupProps) {
  const palette = palettes[projectId] ?? palettes.podia;
  const p = variant === "before" ? palette.before : palette.after;
  const isAfter = variant === "after";

  return (
    <svg
      viewBox="0 0 640 360"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="640" height="360" fill={p.bg} />
      <Panel x={0} y={0} w={640} h={44} fill={isAfter ? "#111827" : "#0f172a"} />
      <circle cx={24} cy={22} r={8} fill={p.accent} opacity={0.8} />
      <Panel x={48} y={14} w={120} h={16} fill={p.accent} rx={4} opacity={0.5} />
      <Panel x={520} y={14} w={96} h={16} fill={p.accent} rx={4} opacity={0.35} />

      {projectId === "healthcare-platform" && (
        <>
          <Panel x={24} y={64} w={180} h={260} fill={isAfter ? "#1e3a5f" : "#334155"} />
          <Panel x={220} y={64} w={396} h={120} fill={isAfter ? "#164e63" : "#475569"} />
          <Panel x={220} y={200} w={190} h={124} fill={isAfter ? "#0e7490" : "#64748b"} />
          <Panel x={426} y={200} w={190} h={124} fill={isAfter ? "#155e75" : "#64748b"} />
          {isAfter && (
            <>
              <circle cx={300} cy={124} r={28} fill="#38bdf8" opacity={0.6} />
              <Panel x={240} y={220} w={140} h={8} fill="#38bdf8" rx={2} />
            </>
          )}
        </>
      )}

      {projectId === "fintech-dashboard" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Panel
              key={i}
              x={24 + i * 150}
              y={64}
              w={130}
              h={72}
              fill={isAfter ? "#064e3b" : "#44403c"}
            />
          ))}
          <Panel x={24} y={152} w={592} h={172} fill={isAfter ? "#022c22" : "#292524"} />
          {isAfter &&
            [80, 140, 200, 260, 320, 380, 440].map((x, i) => (
              <rect
                key={x}
                x={x}
                y={200 - i * 8}
                width={36}
                height={100 + i * 12}
                rx={4}
                fill="#34d399"
                opacity={0.5 + i * 0.06}
              />
            ))}
        </>
      )}

      {projectId === "energy-iot" && (
        <>
          <Panel x={24} y={64} w={380} h={260} fill={isAfter ? "#1c1917" : "#365314"} />
          <Panel x={420} y={64} w={196} h={80} fill={isAfter ? "#422006" : "#4d7c0f"} />
          <Panel x={420} y={156} w={196} h={80} fill={isAfter ? "#713f12" : "#4d7c0f"} />
          <Panel x={420} y={248} w={196} h={76} fill={isAfter ? "#854d0e" : "#4d7c0f"} />
          {isAfter && (
            <>
              <circle cx={200} cy={180} r={60} fill="#fbbf24" opacity={0.25} />
              <Panel x={440} y={170} w={24} h={24} fill="#22c55e" rx={12} />
            </>
          )}
        </>
      )}

      {projectId === "retail-commerce" && (
        <>
          <Panel x={24} y={64} w={140} h={260} fill={isAfter ? "#312e81" : "#57534e"} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Panel
              key={i}
              x={180 + (i % 3) * 148}
              y={64 + Math.floor(i / 3) * 132}
              w={132}
              h={120}
              fill={isAfter ? "#4c1d95" : "#78716c"}
            />
          ))}
          {isAfter && (
            <Panel x={480} y={300} w={136} h={24} fill="#a78bfa" rx={12} />
          )}
        </>
      )}

      {projectId === "ai-assistant" && (
        <>
          <Panel x={24} y={64} w={200} h={260} fill={isAfter ? "#2e1065" : "#374151"} />
          <Panel x={240} y={64} w={376} h={260} fill={isAfter ? "#1e1b4b" : "#4b5563"} />
          {[0, 1, 2].map((i) => (
            <Panel
              key={i}
              x={260}
              y={88 + i * 72}
              w={280}
              h={48}
              fill={isAfter ? "#581c87" : "#6b7280"}
              rx={8}
            />
          ))}
          {isAfter && (
            <Panel x={260} y={300} w={336} h={8} fill="#e879f9" rx={4} opacity={0.8} />
          )}
        </>
      )}

      {!isAfter && (
        <text
          x="320"
          y="190"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="14"
          fontFamily="system-ui,sans-serif"
          opacity={0.7}
        >
          Legacy UI
        </text>
      )}
      {isAfter && (
        <text
          x="320"
          y="340"
          textAnchor="middle"
          fill={p.accent}
          fontSize="11"
          fontFamily="system-ui,sans-serif"
          opacity={0.85}
        >
          Redesigned · Production
        </text>
      )}
    </svg>
  );
}
