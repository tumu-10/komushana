import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./motion";

/**
 * Dimensional isometric "foundations" — five slabs (one per service) that
 * assemble from the ground up. The brand metaphor: structure, built layer by layer.
 */
const LAYERS = ["Events", "Operations", "Compliance", "People", "Structure"];

function Slab({ y, i, total, reduce }: { y: number; i: number; total: number; reduce: boolean | null }) {
  const w = 220;
  const d = 120;
  const h = 26;
  const top = `M0 ${y} L${w / 2} ${y - d / 2} L${w} ${y} L${w / 2} ${y + d / 2} Z`;
  const left = `M0 ${y} L${w / 2} ${y + d / 2} L${w / 2} ${y + d / 2 + h} L0 ${y + h} Z`;
  const right = `M${w} ${y} L${w / 2} ${y + d / 2} L${w / 2} ${y + d / 2 + h} L${w} ${y + h} Z`;
  const isTop = i === total - 1;
  return (
    <motion.g
      initial={{ opacity: 0, y: reduce ? 0 : -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.6 + (total - 1 - i) * -0.0 + i * 0.14, ease: EASE }}
    >
      <path d={left} className="fill-ink-soft stroke-lilac/40" strokeWidth={0.6} />
      <path d={right} className="fill-ink stroke-lilac/40" strokeWidth={0.6} />
      <path
        d={top}
        className={isTop ? "fill-ochre stroke-ochre" : "fill-violet stroke-lilac/60"}
        strokeWidth={0.6}
      />
    </motion.g>
  );
}

export function FoundationStack({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const gap = 38;
  const base = 250;
  return (
    <div className={className}>
      <motion.svg
        viewBox="-20 40 300 290"
        className="h-full w-full overflow-visible"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        role="img"
        aria-label="Five stacked foundation layers representing Komushana's services"
      >
        {LAYERS.map((label, i) => (
          <Slab key={label} y={base - i * gap} i={i} total={LAYERS.length} reduce={reduce} />
        ))}
        {LAYERS.map((label, i) => (
          <motion.text
            key={label}
            x={238}
            y={base - i * gap + 30}
            className="fill-lilac font-mono"
            fontSize={8}
            letterSpacing={1.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 2.4 + i * 0.1, duration: 0.6 }}
          >
            {String(i + 1).padStart(2, "0")} {label.toUpperCase()}
          </motion.text>
        ))}
      </motion.svg>
    </div>
  );
}
