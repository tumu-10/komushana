import Lenis from "lenis";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { isIntroDone, subscribeIntro } from "./intro";

let lenis: Lenis | null = null;
const locks = new Set<string>();

/** Pause / resume smooth scrolling (menu open, preloader). Keyed so callers don't clash. */
export function lockScroll(key: string, locked: boolean) {
  if (locked) locks.add(key);
  else locks.delete(key);
  const any = locks.size > 0;
  document.documentElement.style.overflow = any ? "hidden" : "";
  if (!lenis) return;
  if (any) lenis.stop();
  else lenis.start();
}

export function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        wheelMultiplier: 0.95,
        anchors: { offset: -96 },
        stopInertiaOnNavigate: true,
      });
      if (locks.size > 0) lenis.stop();
    }
    if (!isIntroDone()) lockScroll("intro", true);
    const offIntro = subscribeIntro(() => lockScroll("intro", false));
    const offNav = router.subscribe("onBeforeNavigate", () => {
      lenis?.stop();
      if (locks.size === 0) lenis?.start();
    });
    const offResolved = router.subscribe("onResolved", () => lenis?.resize());
    return () => {
      offIntro();
      offNav();
      offResolved();
      lenis?.destroy();
      lenis = null;
    };
  }, [router]);

  return null;
}
