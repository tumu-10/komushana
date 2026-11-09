import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "./motion";

/** Short branded curtain: wordmark rises, a foundation line draws, curtain lifts. ~1.4s, once per session. */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("ks-intro");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("ks-intro", "1");
    const t = setTimeout(() => setShow(false), 1450);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="surface-ink grain fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.span
                className="block font-display text-5xl font-light tracking-tight md:text-7xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                Komushana<span className="text-ochre">.</span>
              </motion.span>
            </div>
            <motion.div
              className="mt-5 h-px w-56 origin-left bg-ochre"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
            />
            <motion.span
              className="eyebrow mt-4 text-lilac"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Structure · Compliance · Sustainability
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
