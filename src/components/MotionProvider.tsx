"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes the animation library skip transform-based
 * animations for visitors who asked for reduced motion, without any component
 * having to branch on it.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
