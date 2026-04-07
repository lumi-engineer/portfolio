"use client";

import { useEffect, useRef } from "react";

type RainSceneProps = {
  className?: string;
  fullBleed?: boolean;
};

export function RainScene({ className = "", fullBleed }: RainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Drop = {
      x: number;
      y: number;
      len: number;
      speed: number;
      width: number;
      opacity: number;
    };
    let drops: Drop[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, window.innerWidth);
      height = Math.max(rect.height, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(400, Math.floor((width * height) / 5000));
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        len: 10 + Math.random() * 14,
        speed: 10 + Math.random() * 14,
        width: 0.5 + Math.random() * 0.8,
        opacity: 0.55 + Math.random() * 0.45,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      if (!width || !height) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (const d of drops) {
        d.y += d.speed;
        if (d.y > height + d.len) {
          d.y = -d.len - Math.random() * height * 0.2;
          d.x = Math.random() * width;
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black ${fullBleed ? "h-full w-full" : "absolute inset-0"} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] block h-full w-full"
      />
    </div>
  );
}
