import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "./motion";
import { BrandMark } from "./Brand";
import { markIntroDone } from "./intro";

/**
 * "Orbit" preloader — the Komushana sphere is drawn into existence inside two
 * orbiting rings, the wordmark rises letter by letter, the three pillars cycle,
 * a counter runs to 100, then the curtain splits open. ~4.6s on every full load.
 */
const HOLD = 4600; // ms before the curtain opens
const PILLARS = ["Structure", "Compliance", "Sustainability"];
const ORBIT = "M 20 200 A 180 64 0 1 0 380 200 A 180 64 0 1 0 20 200";

export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const [pillar, setPillar] = useState(0);
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 900 : HOLD;
    const ctl = animate(count, 100, { duration: hold / 1000 - 0.2, ease: [0.65, 0, 0.35, 1] });
    const cycle = setInterval(() => setPillar((p) => Math.min(p + 1, PILLARS.length - 1)), hold / 3.2);
    const t1 = setTimeout(() => setPhase("out"), hold);
    const t2 = setTimeout(markIntroDone, hold + 450);
    const t3 = setTimeout(() => setPhase("gone"), hold + 1500);
    return () => {
      ctl.stop();
      clearInterval(cycle);
      [t1, t2, t3].forEach(clearTimeout);
      markIntroDone();
    };
  }, [count]);

  if (phase === "gone") return null;
  const out = phase === "out";

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden role="presentation">
      {/* Split curtain */}
      <motion.div
        className="surface-ink absolute inset-x-0 top-0 h-[50.5%]"
        animate={{ y: out ? "-100%" : 0 }}
        transition={{ duration: 1, delay: out ? 0.3 : 0, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="surface-ink absolute inset-x-0 bottom-0 h-[50.5%]"
        animate={{ y: out ? "100%" : 0 }}
        transition={{ duration: 1, delay: out ? 0.3 : 0, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="grain absolute inset-0"
        animate={{ opacity: out ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-paper"
        animate={out ? { opacity: 0, scale: 0.92, filter: "blur(6px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Orbit stage */}
        <div className="relative flex size-[min(78vw,22rem)] items-center justify-center">
          <motion.svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full overflow-visible"
            initial={{ rotate: -30 }}
            animate={{ rotate: 30 }}
            transition={{ duration: 5, ease: "linear" }}
          >
            {[-22, 48].map((deg, i) => (
              <g key={deg} transform={`rotate(${deg} 200 200)`}>
                <motion.path
                  d={ORBIT}
                  fill="none"
                  className="stroke-lilac/50"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.15 + i * 0.25, ease: EASE }}
                />
                <circle r={i === 0 ? 5 : 3.5} className={i === 0 ? "fill-ochre" : "fill-lilac"} opacity={0}>
                  <animate attributeName="opacity" from="0" to="1" begin={`${1 + i * 0.3}s`} dur="0.4s" fill="freeze" />
                  <animateMotion
                    dur={i === 0 ? "2.6s" : "3.4s"}
                    begin={`${0.6 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={ORBIT}
                    keyPoints={i === 0 ? "0;1" : "1;0"}
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              </g>
            ))}
          </motion.svg>

          {/* Glow */}
          <motion.div
            className="absolute size-1/2 rounded-full bg-violet blur-3xl"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.55, 0.35], scale: [0.4, 1.1, 1] }}
            transition={{ duration: 2.4, delay: 0.4, ease: EASE }}
          />

          {/* The mark, unveiled by an iris wipe while it spins into place */}
          <motion.div
            className="relative w-[38%]"
            initial={{ clipPath: "circle(0% at 50% 50%)", rotate: -120, scale: 0.6 }}
            animate={{ clipPath: "circle(75% at 50% 50%)", rotate: 0, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrandMark className="w-full drop-shadow-[0_10px_40px_var(--violet)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Wordmark */}
        <div className="mt-2 flex flex-col items-center">
          <div className="flex overflow-hidden">
            {"KOMUSHANA".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block font-sans text-3xl font-extrabold tracking-[0.1em] md:text-5xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.3 + i * 0.05, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.span
            className="mt-2 font-sans text-[0.65rem] font-medium uppercase text-lilac md:text-xs"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.62em" }}
            transition={{ duration: 1.4, delay: 1.9, ease: EASE }}
          >
            Consultancy
          </motion.span>
        </div>

        {/* Footer row: counter · progress · cycling pillar */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-14 md:pb-12">
          <div className="flex items-end justify-between gap-6">
            <motion.span className="font-mono text-4xl font-light tabular-nums text-paper/90 md:text-6xl">
              {shown}
            </motion.span>
            <div className="h-6 overflow-hidden text-right">
              <motion.span
                key={pillar}
                className="eyebrow block text-ochre"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {String(pillar + 1).padStart(2, "0")} — {PILLARS[pillar]}
              </motion.span>
            </div>
          </div>
          <div className="mt-4 h-px w-full bg-line-dark">
            <motion.div className="h-full origin-left bg-ochre" style={{ scaleX: bar }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
