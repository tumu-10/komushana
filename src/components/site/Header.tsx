import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./motion";
import { BrandMark, Wordmark } from "./Brand";
import { WhatsAppIcon } from "./WhatsApp";
import { lockScroll } from "./SmoothScroll";
import { contact } from "@/lib/content";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
        animate={open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 right-0 h-[1.5px] bg-current"
        animate={open ? { bottom: "50%", rotate: -45, width: "100%" } : { bottom: "0%", rotate: 0, width: "60%" }}
        transition={{ duration: 0.45, ease: EASE }}
      />
    </span>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > 400 && v > prev + 2 && !open);
    if (v < prev - 2) setHidden(false);
  });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    lockScroll("menu", open);
    return () => lockScroll("menu", false);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className="site-header fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className={`container-x transition-[padding] duration-500 ${scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5"}`}>
          <div
            className={`flex items-center justify-between border px-3 py-2.5 transition-[background-color,border-color,backdrop-filter] duration-500 md:px-5 ${
              scrolled || open
                ? "border-line-dark bg-ink/85 text-paper backdrop-blur-xl"
                : "border-transparent bg-transparent text-paper"
            }`}
          >
            <Link to="/" className="group flex items-center gap-2.5" aria-label="Komushana Consultancy home">
              <BrandMark className="size-9 transition-transform duration-700 ease-out-expo group-hover:rotate-[200deg] md:size-10" />
              <Wordmark small />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {NAV.map((n) => {
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-paper ${
                      active ? "text-paper" : "text-paper/70"
                    }`}
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

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden size-10 items-center justify-center border border-line-dark text-paper/80 transition-colors hover:border-whatsapp hover:text-whatsapp sm:inline-flex"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <Link
                to="/contact"
                className="group hidden items-center gap-2 bg-ochre px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper sm:inline-flex"
              >
                Book a consultation
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
              <button
                className="inline-flex size-10 items-center justify-center border border-line-dark transition-colors hover:border-ochre lg:hidden"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <Burger open={open} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="surface-ink grain fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 sm:px-10 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <BrandMark className="pointer-events-none absolute -right-16 bottom-24 z-0 w-72 opacity-[0.07] sm:w-96" />
            <nav className="relative z-10 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => {
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.25, delay: (NAV.length - i) * 0.03 } }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: EASE }}
                    className="border-b border-line-dark"
                  >
                    <Link to={n.to} className="group flex items-baseline justify-between py-4 sm:py-5">
                      <span
                        className={`font-display text-[clamp(2.4rem,11vw,4rem)] font-light transition-colors group-hover:text-ochre ${
                          active ? "text-ochre" : ""
                        }`}
                      >
                        {n.label}
                      </span>
                      <span className="eyebrow text-lilac">0{i + 1}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              className="relative z-10 mt-10 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex flex-1 items-center justify-between bg-ochre px-5 py-4 font-semibold text-ink"
                >
                  Book a consultation <ArrowUpRight className="size-5" />
                </Link>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-between bg-whatsapp px-5 py-4 font-semibold text-whatsapp-foreground"
                >
                  Chat on WhatsApp <WhatsAppIcon className="size-5" />
                </a>
              </div>
              <div className="space-y-1 text-sm text-paper/70">
                <a href={`mailto:${contact.email}`} className="block">{contact.email}</a>
                <a href={contact.phoneHref} className="block">{contact.phone}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
