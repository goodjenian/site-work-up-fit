"use client";

import { motion } from "motion/react";
import { programs } from "@/data/programs";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

/** Infinite strip of the real programme names — literal movement, real data. */
export function ProgramMarquee() {
  const scroll = useMotionAllowed();
  const items = [...programs, ...programs];

  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-void py-5"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-8 md:gap-12"
        animate={scroll ? { x: ["0%", "-50%"] } : undefined}
        transition={scroll ? { duration: 42, repeat: Infinity, ease: "linear" } : undefined}
      >
        {items.map((p, i) => (
          <span key={`${p.slug}-${i}`} className="flex items-center gap-8 md:gap-12">
            <span
              className="font-display-italic text-2xl leading-none whitespace-nowrap md:text-3xl"
              style={{ color: p.accentInk }}
            >
              {p.name}
            </span>
            <span className="size-1.5 shrink-0 rounded-full bg-ink-500" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
