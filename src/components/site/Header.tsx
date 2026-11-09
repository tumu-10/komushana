import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { EASE } from "./motion";
import { contact } from "@/lib/content";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > 400 && v > prev && !open);
  });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`container-x transition-all duration-500 ${scrolled ? "pt-3" : "pt-5"}`}
        >
          <div
            className={`flex items-center justify-between border px-4 py-3 transition-all duration-500 md:px-6 ${
              scrolled
                ? "border-line-dark bg-ink/90 text-paper backdrop-blur-md"
                : "border-transparent bg-transparent text-paper"
            }`}
          >
            <Link to="/" className="group flex items-baseline gap-2" aria-label="Komushana Consultancy home">
              <span className="font-display text-2xl font-light tracking-tight">
                Komushana<span className="text-ochre">.</span>
              </span>
              <span className="eyebrow hidden text-lilac sm:inline">Consultancy</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {NAV.map((n) => {
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="relative px-4 py-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-ochre"
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    )}
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="group hidden items-center gap-2 bg-ochre px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper sm:inline-flex"
              >
                Book a consultation
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
              <button
                className="inline-flex size-10 items-center justify-center border border-line-dark md:hidden"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="surface-ink grain fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="relative z-10 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="border-b border-line-dark"
                >
                  <Link to={n.to} className="flex items-baseline justify-between py-5">
                    <span className="font-display text-5xl font-light">{n.label}</span>
                    <span className="eyebrow text-lilac">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative z-10 space-y-2 text-sm text-paper/70">
              <a href={`mailto:${contact.email}`} className="block">{contact.email}</a>
              <a href={contact.phoneHref} className="block">{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
