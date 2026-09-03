"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. One primitive for the whole site so the rhythm stays
 * consistent.
 *
 * Reduced motion is handled in CSS (see `[data-reveal]` in globals.css), not by
 * branching on `useReducedMotion()`. A JS branch would change what the server
 * renders versus the first client render, and React would keep the server's
 * `opacity: 0` — hiding the content permanently. The CSS rule cannot desync.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children that are themselves <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  style,
  y = 20,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Carries the per-programme `--accent` custom property. */
  style?: React.CSSProperties;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}
