"use client";

import { useEffect, useRef } from "react";

type Fish = {
  x: number;
  y: number;
  vx: number;
  size: number;
  hue: number;
  phase: number;
  flip: boolean;
};

function drawFish(
  ctx: CanvasRenderingContext2D,
  f: Fish,
  t: number
) {
  const wobble = Math.sin(t * 0.004 + f.phase) * 3;
  const dir = f.flip ? -1 : 1;

  ctx.save();
  ctx.translate(f.x, f.y + wobble);
  ctx.scale(dir, 1);

  const body = f.size;
  ctx.fillStyle = `hsl(${f.hue}, 75%, 58%)`;
  ctx.beginPath();
  ctx.ellipse(0, 0, body, body * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `hsl(${f.hue}, 70%, 68%)`;
  ctx.beginPath();
  ctx.ellipse(body * 0.15, -body * 0.1, body * 0.35, body * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `hsl(${f.hue}, 80%, 48%)`;
  ctx.beginPath();
  ctx.moveTo(-body * 0.9, 0);
  ctx.lineTo(-body * 1.5, -body * 0.5);
  ctx.lineTo(-body * 1.5, body * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(body * 0.45, -body * 0.12, body * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(body * 0.5, -body * 0.1, body * 0.09, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function initFish(w: number, h: number, count: number): Fish[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: h * 0.25 + Math.random() * h * 0.65,
    vx: (Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1),
    size: Math.random() * 10 + 8,
    hue: Math.random() * 60 + 175,
    phase: Math.random() * Math.PI * 2,
    flip: Math.random() > 0.5,
  }));
}

export function OceanFishScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishRef = useRef<Fish[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fishRef.current = initFish(canvas.width, canvas.height, 14);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#0c4a6e");
      grad.addColorStop(0.45, "#075985");
      grad.addColorStop(1, "#042f4a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 20; i++) {
        const bx = (i * 137) % w;
        const by = h * 0.7 + ((i * 53) % (h * 0.3));
        ctx.fillStyle = `rgba(6, 78, 99, ${0.15 + (i % 3) * 0.05})`;
        ctx.beginPath();
        ctx.ellipse(bx, by, 30 + i * 2, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const f of fishRef.current) {
        f.x += f.vx;
        if (f.x > w + 40) {
          f.x = -40;
          f.y = h * 0.25 + Math.random() * h * 0.65;
        }
        if (f.x < -40) {
          f.x = w + 40;
          f.y = h * 0.25 + Math.random() * h * 0.65;
        }
        f.flip = f.vx < 0;
        drawFish(ctx, f, t);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/80 via-[#0369a1]/60 to-[#042f4a]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#38bdf8]/15 to-transparent" />
    </div>
  );
}
