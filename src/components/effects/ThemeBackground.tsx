"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeId } from "@/data/themes";
import { LightSkyScene } from "@/components/effects/theme-scenes/LightSkyScene";
import { RainScene } from "@/components/effects/theme-scenes/RainScene";
import { OceanFishScene } from "@/components/effects/theme-scenes/OceanFishScene";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  char?: string;
};

function initParticles(
  count: number,
  w: number,
  h: number,
  mode: ThemeId
): Particle[] {
  return Array.from({ length: count }, () => {
    const base: Particle = {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 1.2 + 0.3,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    };
    if (mode === "Rain") {
      base.vy = Math.random() * 12 + 8;
      base.vx = 0.5;
      base.size = Math.random() * 1.5 + 0.5;
    }
    if (mode === "Snow") {
      base.vy = Math.random() * 1.5 + 0.4;
      base.vx = (Math.random() - 0.5) * 0.8;
    }
    if (mode === "Leaf") {
      base.char = ["🍃", "🍂", "🌿"][Math.floor(Math.random() * 3)];
      base.vy = Math.random() * 1.2 + 0.5;
      base.size = Math.random() * 14 + 10;
    }
    if (mode === "Dot Grid") {
      base.vy = 0;
      base.vx = 0;
      base.size = 2;
      base.opacity = 0.25;
    }
    return base;
  });
}

export function ThemeBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  const canvasThemes: ThemeId[] = [
    "Space",
    "Snow",
    "Leaf",
    "Stellar",
    "Dot Grid",
    "Dark",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!canvasThemes.includes(theme)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count =
        theme === "Dot Grid"
          ? 120
          : theme === "Space" || theme === "Stellar"
            ? 220
            : theme === "Rain"
              ? 180
              : 100;
      particlesRef.current = initParticles(
        count,
        canvas.width,
        canvas.height,
        theme
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const particles = particlesRef.current;

      if (theme === "Dot Grid") {
        const gap = 28;
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        for (let x = 0; x < w; x += gap) {
          for (let y = 0; y < h; y += gap) {
            const pulse =
              0.5 +
              0.5 * Math.sin((x + y) * 0.02 + performance.now() * 0.001);
            ctx.globalAlpha = pulse * 0.35;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      } else {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (theme === "Rain") {
            if (p.y > h) {
              p.y = -10;
              p.x = Math.random() * w;
            }
            ctx.strokeStyle = `rgba(147, 197, 253, ${p.opacity})`;
            ctx.lineWidth = p.size;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + 2, p.y + 14);
            ctx.stroke();
            continue;
          }

          if (theme === "Leaf" && p.char) {
            if (p.y > h + 20) {
              p.y = -20;
              p.x = Math.random() * w;
            }
            ctx.globalAlpha = 0.7;
            ctx.font = `${p.size}px serif`;
            ctx.fillText(p.char, p.x, p.y);
            ctx.globalAlpha = 1;
            continue;
          }

          if (p.y > h) {
            p.y = -5;
            p.x = Math.random() * w;
          }
          if (p.x > w) p.x = 0;
          if (p.x < 0) p.x = w;

          let color = "rgba(255,255,255,0.8)";
          if (theme === "Snow") color = "rgba(255,255,255,0.9)";
          if (theme === "Stellar")
            color = `rgba(251, 191, 36, ${p.opacity})`;
          if (theme === "Dark" || theme === "Space")
            color = `rgba(255,255,255, ${p.opacity})`;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{ background: "var(--background)" }}
        >
          {theme === "Light" && <LightSkyScene />}
          {theme === "Ocean" && <OceanFishScene />}
          {theme === "Silk" && (
            <div className="absolute inset-0">
              <motion.div
                className="absolute -left-1/4 top-0 h-full w-[150%] bg-gradient-to-r from-fuchsia-600/30 via-violet-500/20 to-transparent blur-3xl"
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -right-1/4 bottom-0 h-2/3 w-[120%] bg-gradient-to-l from-pink-500/25 to-transparent blur-3xl"
                animate={{ x: [0, -60, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}
          {theme === "Snow" && (
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
          )}
          {theme === "Rain" && <RainScene />}
          {theme === "Leaf" && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 to-green-900" />
          )}
          {theme === "Stellar" && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#312e81_0%,_#0b0014_50%)]" />
          )}
        </motion.div>
      </AnimatePresence>

      {canvasThemes.includes(theme) && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
