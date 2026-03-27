"use client";

import { motion } from "framer-motion";

type NavDogProps = {
  leftPercent: number;
  pose?: "walk" | "theme";
};

/** Scroll-following dog; theme pose = sitting with raised paws + sparkle. */
export function NavDog({ leftPercent, pose = "walk" }: NavDogProps) {
  const isTheme = pose === "theme";

  return (
    <motion.div
      className="pointer-events-none absolute -top-12 z-20 md:-top-14"
      style={{ left: `${leftPercent}%` }}
      animate={{ left: `${leftPercent}%` }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <motion.div
        className="relative -translate-x-1/2"
        animate={
          isTheme
            ? { y: [0, -2, 0], rotate: [0, -4, 4, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: isTheme ? 1.2 : 0.75,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {isTheme && (
          <>
            <motion.span
              className="absolute -left-3 -top-1 text-sm"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -right-2 top-0 text-xs"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎨
            </motion.span>
          </>
        )}

        <svg
          width={isTheme ? 42 : 36}
          height={isTheme ? 38 : 32}
          viewBox="0 0 42 38"
          fill="none"
          aria-hidden
        >
          {isTheme ? (
            <>
              {/* Sitting theme pose — paws up, happy */}
              <ellipse cx="21" cy="28" rx="11" ry="8" fill="#f97316" />
              <circle cx="21" cy="14" r="10" fill="#fb923c" />
              <path
                d="M12 10 Q10 4 14 6 M30 10 Q32 4 28 6"
                stroke="#fb923c"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="17" cy="12" r="1.8" fill="#1e293b" />
              <circle cx="25" cy="12" r="1.8" fill="#1e293b" />
              <path
                d="M17 17 Q21 21 25 17"
                stroke="#7c2d12"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="24" cy="16" rx="2" ry="1" fill="#fda4af" opacity="0.6" />
              <path
                d="M14 22 L10 14 M28 22 L32 14"
                stroke="#fb923c"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect x="14" y="20" width="14" height="5" rx="2" fill="#dc2626" />
              <rect x="26" y="19" width="5" height="6" rx="1" fill="#22c55e" />
              <circle cx="21" cy="8" r="2" fill="#fde047" opacity="0.8" />
            </>
          ) : (
            <>
              {/* Walking scroll pose */}
              <ellipse cx="18" cy="22" rx="10" ry="7" fill="#f97316" />
              <circle cx="18" cy="12" r="9" fill="#fb923c" />
              <circle cx="14" cy="10" r="1.5" fill="#1e293b" />
              <circle cx="22" cy="10" r="1.5" fill="#1e293b" />
              <ellipse cx="18" cy="14" rx="2" ry="1.2" fill="#7c2d12" />
              <path
                d="M10 8 L6 4 M26 8 L30 4"
                stroke="#fb923c"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect x="12" y="18" width="12" height="4" rx="2" fill="#dc2626" />
              <rect x="22" y="17" width="4" height="5" rx="1" fill="#22c55e" />
              <path
                d="M8 26 L12 30 M28 26 L24 30"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
