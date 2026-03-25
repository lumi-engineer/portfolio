"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; age: number };

/** Classic canvas particle cursor trail (popular portfolio effect). */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (pointsRef.current.length > 48) {
        pointsRef.current.shift();
      }
    };

    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const points = pointsRef.current;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;
        const life = 1 - p.age / 48;
        if (life <= 0) continue;

        const size = 6 + life * 14;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${life * 0.9})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${life * 0.5})`);
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (i > 0) {
          const prev = points[i - 1];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${life * 0.35})`;
          ctx.lineWidth = life * 3;
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      pointsRef.current = points.filter((p) => p.age < 48);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
      aria-hidden
    />
  );
}
