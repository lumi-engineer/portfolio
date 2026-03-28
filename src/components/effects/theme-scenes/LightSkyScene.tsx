"use client";

import { motion } from "framer-motion";

const clouds = [
  { top: "12%", left: "8%", w: 120, delay: 0 },
  { top: "22%", left: "55%", w: 160, delay: 1.2 },
  { top: "8%", left: "78%", w: 100, delay: 0.6 },
  { top: "35%", left: "25%", w: 140, delay: 2 },
  { top: "18%", left: "38%", w: 90, delay: 1.8 },
];

function Cloud({ w, className }: { w: number; className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ width: w, height: w * 0.45 }}>
      <div
        className="absolute rounded-full bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.5)]"
        style={{ width: w * 0.5, height: w * 0.35, left: 0, bottom: 0 }}
      />
      <div
        className="absolute rounded-full bg-white/95"
        style={{ width: w * 0.38, height: w * 0.32, left: w * 0.28, bottom: w * 0.06 }}
      />
      <div
        className="absolute rounded-full bg-white/90"
        style={{ width: w * 0.42, height: w * 0.3, left: w * 0.52, bottom: 0 }}
      />
    </div>
  );
}

export function LightSkyScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#7DD3FC] via-[#BAE6FD] to-[#E0F2FE]">
      <motion.div
        className="absolute right-[8%] top-[6%] h-24 w-24 rounded-full md:h-32 md:w-32"
        style={{
          background:
            "radial-gradient(circle, #FDE047 0%, #FBBF24 45%, #F59E0B 70%, transparent 72%)",
          boxShadow: "0 0 60px rgba(251, 191, 36, 0.7), 0 0 120px rgba(253, 224, 71, 0.4)",
        }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, left: c.left }}
          animate={{ x: [0, 40, 0] }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          <Cloud w={c.w} />
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#93C5FD]/30 to-transparent" />
    </div>
  );
}
