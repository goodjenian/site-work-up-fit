"use client";

import { useReducedMotion } from "motion/react";
import { useMounted } from "./use-mounted";

/**
 * True only after mount, and only when the visitor has not asked for reduced
 * motion. Returning false on the server and on the first client render keeps
 * the two in sync — see `useMounted`.
 *
 * Use it for decorative motion that is safe to simply not exist: infinite
 * marquees, parallax, floating. Never use it to decide whether content is
 * rendered or visible.
 */
export function useMotionAllowed() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return mounted && !reduced;
}
