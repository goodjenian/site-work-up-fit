"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR and on the first client render, true afterwards.
 *
 * Anything that depends on a client-only signal (a media query, window size)
 * must be gated on this. Branching render output directly on such a signal
 * makes the server and the first client render disagree, and React then keeps
 * the server markup — which is how an entire section can end up frozen at
 * `opacity: 0`.
 *
 * Implemented with `useSyncExternalStore` rather than `useState` + `useEffect`:
 * the two snapshots (`false` on the server, `true` on the client) express the
 * intent directly, with no state write during an effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
