"use client";

import { motion } from "framer-motion";

type NavDogProps = {
  leftPercent: number;
  pose?: "walk" | "theme";
};

/** Cute chibi anime dog — walks on top of the navbar surface. */
export function NavDog({ leftPercent, pose = "walk" }: NavDogProps) {
  const isTheme = pose === "theme";

  return (
    <motion.div
      className="pointer-events-none absolute top-0 z-30"
      style={{ left: `${leftPercent}%` }}
      animate={{ left: `${leftPercent}%` }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-[82%]"
        animate={
          isTheme
            ? { rotate: [0, -3, 3, 0], y: [0, -1, 0] }
            : { y: [0, -1.5, 0] }
        }
        transition={{
          duration: isTheme ? 1.4 : 0.45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {isTheme && (
          <>
            <motion.span
              className="absolute -left-4 -top-2 text-base"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -right-3 -top-1 text-sm"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              🎨
            </motion.span>
          </>
        )}

        <svg
          width={isTheme ? 48 : 44}
          height={isTheme ? 44 : 40}
          viewBox="0 0 48 44"
          fill="none"
          aria-hidden
          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        >
          {isTheme ? (
            <g>
              {/* Sitting — paws up, anime sparkle eyes */}
              <ellipse cx="24" cy="32" rx="12" ry="9" fill="#FDBA74" />
              <ellipse cx="24" cy="32" rx="10" ry="7" fill="#FED7AA" />
              <circle cx="24" cy="16" r="12" fill="#FED7AA" />
              <ellipse cx="11" cy="14" rx="5" ry="7" fill="#FB923C" transform="rotate(-20 11 14)" />
              <ellipse cx="37" cy="14" rx="5" ry="7" fill="#FB923C" transform="rotate(20 37 14)" />
              <circle cx="19" cy="15" r="3.5" fill="white" />
              <circle cx="29" cy="15" r="3.5" fill="white" />
              <circle cx="20" cy="15" r="2" fill="#1e293b" />
              <circle cx="30" cy="15" r="2" fill="#1e293b" />
              <circle cx="21" cy="14" r="0.8" fill="white" />
              <circle cx="31" cy="14" r="0.8" fill="white" />
              <path d="M19 20 Q24 24 29 20" stroke="#C2410C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <ellipse cx="31" cy="18" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.7" />
              <path d="M14 26 L9 16 M34 26 L39 16" stroke="#FB923C" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="16" y="24" width="16" height="5" rx="2.5" fill="#EF4444" />
              <circle cx="36" cy="23" r="3" fill="#22C55E" />
            </g>
          ) : (
            <g>
              {/* Walking — chibi shiba */}
              <motion.g
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 0.45, repeat: Infinity }}
                style={{ originX: "24px", originY: "28px" }}
              >
                <ellipse cx="24" cy="30" rx="11" ry="8" fill="#FDBA74" />
                <ellipse cx="24" cy="30" rx="9" ry="6.5" fill="#FED7AA" />
                <circle cx="24" cy="15" r="11" fill="#FED7AA" />
                <ellipse cx="12" cy="13" rx="4.5" ry="6.5" fill="#FB923C" transform="rotate(-22 12 13)" />
                <ellipse cx="36" cy="13" rx="4.5" ry="6.5" fill="#FB923C" transform="rotate(22 36 13)" />
                <circle cx="19" cy="14" r="3" fill="white" />
                <circle cx="29" cy="14" r="3" fill="white" />
                <circle cx="19.5" cy="14" r="1.8" fill="#1e293b" />
                <circle cx="29.5" cy="14" r="1.8" fill="#1e293b" />
                <circle cx="20" cy="13" r="0.7" fill="white" />
                <circle cx="30" cy="13" r="0.7" fill="white" />
                <ellipse cx="24" cy="18" rx="2" ry="1.2" fill="#F97316" />
                <rect x="17" y="22" width="14" height="4.5" rx="2" fill="#EF4444" />
                <circle cx="35" cy="21" r="2.5" fill="#22C55E" />
              </motion.g>
              <motion.g
                animate={{ rotate: [8, -8, 8] }}
                transition={{ duration: 0.22, repeat: Infinity }}
                style={{ originX: "16px", originY: "36px" }}
              >
                <ellipse cx="16" cy="36" rx="3" ry="2" fill="#FB923C" />
              </motion.g>
              <motion.g
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 0.22, repeat: Infinity }}
                style={{ originX: "32px", originY: "36px" }}
              >
                <ellipse cx="32" cy="36" rx="3" ry="2" fill="#FB923C" />
              </motion.g>
              <motion.path
                d="M8 38 L12 42 M40 38 L36 42"
                stroke="#EA580C"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 0.22, repeat: Infinity }}
              />
            </g>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
