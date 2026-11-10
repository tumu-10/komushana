import { useSyncExternalStore } from "react";

/**
 * Tiny store that flips once the opening preloader starts lifting.
 * Entrance animations wait on it so they play when the page is actually visible.
 */
let done = false;
const subs = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  subs.forEach((fn) => fn());
}

export function subscribeIntro(fn: () => void) {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

export function isIntroDone() {
  return done;
}

export function useIntroDone() {
  return useSyncExternalStore(subscribeIntro, isIntroDone, () => false);
}
