import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { services } from "@/lib/content";
import { serviceImages } from "@/lib/service-images";
import { MaskImage, Reveal, SplitHeading } from "@/components/site/motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Komushana Consultancy" },
      {
        name: "description",
        content:
          "Organisational build, HR systems, NGO & CBO compliance and registration, SME operations, and corporate event management in Uganda.",
      },
      { property: "og:title", content: "Services — Komushana Consultancy" },
      {
        property: "og:description",
        content: "Systems that let your organisation run without you in the room.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="surface-ink grain relative overflow-hidden pb-20 pt-40 md:pt-52">
        <div className="container-x relative z-10">
          <p className="eyebrow text-lilac">Services · 05 disciplines</p>
          <SplitHeading
            as="h1"
            immediate
            delay={0.2}
            text="Systems that let your organisation run without you in the room."
            className="display-lg mt-8 max-w-[18ch]"
          />
          <div className="mt-16 grid gap-10 border-t border-line-dark pt-10 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-paper/70 md:col-span-5">
              We design and implement the structures, documents, and frameworks your organisation
              needs to function consistently and accountably.
            </p>
            <nav className="flex flex-wrap gap-2 md:col-span-6 md:col-start-7 md:justify-end" aria-label="Jump to service">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="border border-line-dark px-3 py-2 text-sm text-paper/80 transition-colors hover:border-ochre hover:text-ochre"
                >
                  <span className="mr-2 font-mono text-xs text-lilac">{s.n}</span>
                  {s.title.split(" & ")[0]}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <div className="bg-paper">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} className="scroll-mt-24 border-b border-line py-24 md:py-32">
              <div className="container-x grid gap-12 md:grid-cols-12">
                <div className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
                  <div className="relative">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-16 font-display text-[9rem] font-light leading-none text-violet/10 md:text-[13rem]"
                    >
                      {s.n}
                    </span>
                    {(() => {
                      const img = serviceImages[s.slug]!;
                      return (
                        <MaskImage
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          className={`relative ${img.height > img.width ? "aspect-[4/5]" : "aspect-square"}`}
                        />
                      );
                    })()}
                  </div>
                </div>
                <div className={`md:col-span-6 ${flip ? "md:order-1" : "md:col-start-7"} flex flex-col justify-center`}>
                  <p className="eyebrow text-violet">Service {s.n}</p>
                  <SplitHeading text={s.title} className="display-md mt-5" />
                  <Reveal delay={0.15}>
                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
                  </Reveal>
                  <ul className="mt-10">
                    {s.points.map((p, j) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + j * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-4 border-t border-line py-4 text-lg"
                      >
                        <Plus className="size-4 shrink-0 text-ochre" strokeWidth={2.5} />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-bone py-28 md:py-36">
        <div className="container-x grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-violet">Not sure where to start?</p>
            <h2 className="display-lg mt-6">Start with an assessment.</h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Book a consultation and we'll assess your organisation and recommend the systems that
              will make the biggest difference first.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-5 font-semibold text-paper transition-colors hover:bg-violet"
            >
              Book a consultation
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
