import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import hero from "@/assets/hero-kampala.jpg";
import desk from "@/assets/systems-desk.jpg";
import workshop from "@/assets/workshop.jpg";
import event from "@/assets/event.jpg";
import { services } from "@/lib/content";
import { EASE, MaskImage, Reveal, SplitHeading } from "@/components/site/motion";
import { FoundationStack } from "@/components/site/FoundationStack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Komushana Consultancy — Building the foundations organisations need to grow" },
      {
        name: "description",
        content:
          "Kampala-based consultancy helping NGOs, CBOs, startups and SMEs move from informal, founder-dependent operations to structured, system-driven institutions.",
      },
      { property: "og:title", content: "Komushana Consultancy — Building foundations to grow" },
      {
        property: "og:description",
        content: "Organisational structure, HR systems, NGO compliance and SME operations — built, not just advised.",
      },
    ],
  }),
  component: Home,
});

const serviceImages = [workshop, desk, desk, workshop, event];

function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Principles />
      <ServicesIndex />
      <Audience />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);

  return (
    <section ref={ref} className="surface-ink grain relative min-h-[100svh] overflow-hidden">
      <div className="blueprint absolute inset-0 opacity-40" aria-hidden />
      {/* Image panel — right, tall, offset */}
      <motion.div
        className="absolute right-0 top-0 h-full w-full md:w-[46%]"
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        animate={{ clipPath: "inset(0 0 0 0%)" }}
        transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
      >
        <motion.img
          src={hero}
          alt="Modern Kampala office building at golden hour"
          width={1600}
          height={1920}
          style={{ y: imgY }}
          className="h-[115%] w-full object-cover opacity-40 md:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-14 pt-36">
        <motion.p
          className="eyebrow mb-8 flex items-center gap-3 text-lilac"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="h-px w-10 bg-ochre" /> Organisational development · Kampala
        </motion.p>
        <SplitHeading
          as="h1"
          immediate
          delay={0.35}
          text="Building the foundations"
          className="display-xl max-w-[12ch]"
        />
        <div className="mt-2 flex flex-wrap items-end gap-x-8 gap-y-6">
          <SplitHeading
            as="h2"
            immediate
            delay={0.6}
            text="organisations need to grow."
            className="display-xl italic text-lilac"
          />
        </div>

        <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-paper/75 md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
          >
            We help NGOs, community-based organisations, startups and SMEs move from informal,
            founder-dependent operations to structured, system-driven institutions.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-ochre px-6 py-4 font-semibold text-ink transition-colors hover:bg-paper"
            >
              Book a consultation
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 border border-line-dark px-6 py-4 font-medium text-paper transition-colors hover:border-paper"
            >
              Explore services
            </Link>
          </motion.div>
          <FoundationStack className="hidden h-56 md:col-span-3 md:block" />
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-line-dark pt-5 text-paper/50">
          <span className="eyebrow">Structure · Compliance · Sustainability</span>
          <span className="eyebrow flex items-center gap-2">
            Scroll <ArrowDown className="size-3 animate-bounce" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const text =
    "We do not just advise — we build the actual systems, frameworks, and governance structures that allow an organisation to function consistently and accountably.";
  const words = text.split(" ");
  return (
    <section className="bg-paper py-32 md:py-48">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <p className="eyebrow text-violet md:col-span-3">( Our conviction )</p>
        <div ref={ref} className="md:col-span-9">
          <p className="display-md text-ink">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

const principles = [
  {
    k: "Build",
    t: "We build, not just advise",
    d: "We design and implement the actual systems, documents, and frameworks — not slide decks that sit on a shelf.",
  },
  {
    k: "Independence",
    t: "Founder-independent by design",
    d: "Your organisation should function consistently and accountably, with or without the founder in the room.",
  },
  {
    k: "Context",
    t: "Tailored to Uganda",
    d: "Frameworks built for your size, sector, and Ugandan legal requirements — from NGO Bureau to employment law.",
  },
];

function Principles() {
  return (
    <section className="border-y border-line bg-bone">
      <div className="container-x grid md:grid-cols-12">
        <div className="relative hidden md:col-span-5 md:block">
          <MaskImage
            src={desk}
            alt="Policy manuals, an organisational chart and registration papers on a desk"
            width={1600}
            height={1104}
            className="sticky top-0 h-screen"
          />
        </div>
        <div className="md:col-span-7 md:pl-16">
          {principles.map((p, i) => (
            <Reveal key={p.k} className="border-b border-line py-16 last:border-b-0 md:py-24">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-violet">0{i + 1}</span>
                <span className="eyebrow text-muted-foreground">{p.k}</span>
              </div>
              <h3 className="display-md mt-6 max-w-[16ch]">{p.t}</h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesIndex() {
  const [active, setActive] = useState(0);
  return (
    <section className="surface-ink grain relative overflow-hidden py-28 md:py-40">
      <div className="container-x relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow text-lilac">What we do</p>
            <SplitHeading text="Five core specialisations." className="display-lg mt-6 max-w-[14ch]" />
          </div>
          <Link to="/services" className="group inline-flex items-center gap-2 border-b border-ochre pb-1 text-paper">
            View all services
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-7" onMouseLeave={() => undefined}>
            {services.map((s, i) => (
              <li key={s.slug} className="border-t border-line-dark last:border-b">
                <Link
                  to="/services"
                  hash={s.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-6 py-7 md:py-9"
                >
                  <span className={`font-mono text-sm transition-colors ${active === i ? "text-ochre" : "text-paper/40"}`}>
                    {s.n}
                  </span>
                  <span
                    className={`font-display text-2xl font-light leading-tight transition-all duration-500 md:text-4xl ${
                      active === i ? "translate-x-3 text-paper" : "text-paper/55"
                    }`}
                  >
                    {s.title}
                  </span>
                  <ArrowUpRight
                    className={`ml-auto size-6 shrink-0 transition-all duration-500 ${
                      active === i ? "rotate-45 text-ochre opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden">
                {services.map((s, i) => (
                  <motion.img
                    key={s.slug}
                    src={serviceImages[i]}
                    alt=""
                    loading="lazy"
                    width={1600}
                    height={1104}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-x-6 bottom-6 text-lg leading-relaxed text-paper/90"
                >
                  {services[active].short}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const audience = [
  "NGOs registering or strengthening governance",
  "Community-based organisations seeking compliance",
  "Startups building their first internal systems",
  "Growing SMEs formalising operations",
];

function Audience() {
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-violet">Who we serve</p>
            <SplitHeading text="Organisations ready to formalise and scale." className="display-lg mt-6" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                We partner with organisations at the stage where they need to move from informal,
                founder-dependent operations to structured, system-driven institutions.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <MaskImage
              src={workshop}
              alt="A team mapping an organisational structure on a whiteboard"
              width={1600}
              height={1104}
              className="aspect-[16/11]"
            />
            <ol className="mt-12">
              {audience.map((a, i) => (
                <Reveal key={a} delay={i * 0.08}>
                  <li className="flex items-baseline gap-6 border-t border-line py-5">
                    <span className="font-mono text-xs text-violet">{String.fromCharCode(65 + i)}</span>
                    <span className="text-xl">{a}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-violet py-28 text-paper md:py-36">
      <div className="blueprint absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow text-lilac">Where is your organisation today?</p>
          <SplitHeading text="Tell us. We'll map the systems that get you where you want to be." className="display-md mt-6 max-w-[22ch]" />
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-paper px-7 py-5 font-semibold text-ink transition-colors hover:bg-ochre"
          >
            Start a conversation
            <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
