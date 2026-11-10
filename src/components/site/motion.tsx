import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useIntroDone } from "./intro";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Plays once the element is in view AND the opening preloader has lifted,
 * so entrance motion is never wasted behind the curtain.
 */
function usePlay<T extends Element>(immediate: boolean, margin: string, amount?: number) {
  const ref = useRef<T>(null);
  const ready = useIntroDone();
  const inView = useInView(ref, { once: true, margin: margin as never, amount: amount ?? "some" });
  return { ref, play: ready && (immediate || inView) };
}

/** Word-by-word masked rise. Used for every display headline. */
export function SplitHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, play } = usePlay<HTMLHeadingElement>(immediate, "-10% 0px");
  const Tag = motion[as];
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: reduce ? 0 : "110%" },
    show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
  };
  return (
    <Tag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={play ? "show" : "hidden"}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, play } = usePlay<HTMLDivElement>(false, "-8% 0px");
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : y }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Image revealed by a clip-path wipe, with a slow settle-in scale. */
export function MaskImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width: number;
  height: number;
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  // The observed wrapper keeps its full box; only the inner layer is clipped,
  // otherwise a fully-clipped element never registers as "in view".
  const { ref, play } = usePlay<HTMLDivElement>(false, "0px", 0.15);
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial="hidden"
      animate={play ? "show" : "hidden"}
    >
      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { clipPath: reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" },
          show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.3, ease: EASE } },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          className={`h-full w-full object-cover ${imgClassName ?? ""}`}
          variants={{
            hidden: { scale: reduce ? 1 : 1.25 },
            show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
