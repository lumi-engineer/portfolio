"use client";

import { useEffect, useRef } from "react";
import {
  GOLD_COIN_MAX_COUNT,
  GOLD_COIN_SIZE,
  GOLD_COINS_PER_MOVE,
} from "@/config/effects";

type Coin = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  life: number;
  maxLife: number;
};

/** Don't spawn on buttons, links, cards, nav, or text blocks. */
const BLOCK_SELECTOR =
  "button, a, input, textarea, select, label, [role='button'], .glass, article, nav, h1, h2, h3, h4, p, .semantic-heading, .semantic-word, .typewriter-text, .section-label-wrap";

function canSpawnCoins(clientX: number, clientY: number): boolean {
  const el = document.elementFromPoint(clientX, clientY);
  if (!el) return false;
  if (el.closest(BLOCK_SELECTOR)) return false;
  return true;
}

function drawCoin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  alpha: number
) {
  const r = size / 2;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;

  const grad = ctx.createRadialGradient(-r * 0.2, -r * 0.2, 0, 0, 0, r);
  grad.addColorStop(0, "#FEF08A");
  grad.addColorStop(0.45, "#FACC15");
  grad.addColorStop(0.85, "#CA8A04");
  grad.addColorStop(1, "#A16207");

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = "#92400E";
  ctx.lineWidth = Math.max(1, size * 0.06);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(146, 64, 14, 0.5)";
  ctx.lineWidth = Math.max(1, size * 0.04);
  ctx.stroke();

  ctx.fillStyle = "#92400E";
  ctx.font = `bold ${size * 0.42}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", 0, 1);

  ctx.restore();
}

export function GoldCoinCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coinsRef = useRef<Coin[]>([]);
  const rafRef = useRef(0);
  const lastSpawnRef = useRef(0);

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

    const spawnCoin = (x: number, y: number) => {
      const coins = coinsRef.current;
      if (coins.length >= GOLD_COIN_MAX_COUNT) coins.shift();

      coins.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(Math.random() * 2 + 1),
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 70 + Math.random() * 40,
      });
    };

    const onMove = (e: MouseEvent) => {
      if (!canSpawnCoins(e.clientX, e.clientY)) return;

      const now = performance.now();
      if (now - lastSpawnRef.current < 24) return;
      lastSpawnRef.current = now;

      for (let i = 0; i < GOLD_COINS_PER_MOVE; i++) {
        spawnCoin(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", onMove);

    const gravity = 0.22;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height;

      coinsRef.current = coinsRef.current.filter((coin) => {
        coin.life += 1;
        coin.vy += gravity;
        coin.x += coin.vx;
        coin.y += coin.vy;
        coin.rotation += coin.spin;

        const lifeRatio = 1 - coin.life / coin.maxLife;
        if (lifeRatio <= 0 || coin.y > h + GOLD_COIN_SIZE) return false;

        drawCoin(ctx, coin.x, coin.y, GOLD_COIN_SIZE, coin.rotation, lifeRatio);
        return true;
      });

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
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  );
}
