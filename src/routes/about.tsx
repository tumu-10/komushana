import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import handover from "@/assets/about-handover.jpg.asset.json";
import limelight from "@/assets/limelight.png.asset.json";
import dawinci from "@/assets/dawinci.png.asset.json";
import hero from "@/assets/hero-kampala.jpg";
import { MaskImage, Reveal, SplitHeading } from "@/components/site/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Komushana Consultancy, Kampala" },
      {
        name: "description",
        content:
          "A Kampala-based organisational development and systems consultancy building the operational foundations organisations need to grow.",
      },
      { property: "og:title", content: "About Komushana Consultancy" },
      {
        property: "og:description",
        content: "We don't just advise — we build the systems, frameworks and governance structures organisations run on.",
      },
    ],
  }),
  component: About,
});

const values = [
  { t: "We build, we don't just advise", d: "Our deliverables are working systems — policies, frameworks, structures — not recommendations alone." },
  { t: "Accountability by design", d: "We embed reporting cultures and governance so organisations stay consistent and transparent." },
  { t: "Context first", d: "Everything is tailored to your size, sector, and Ugandan legal requirements." },
  { t: "Sustainable independence", d: "We design organisations that run with or without the founder in the room." },
];

function About() {
  return (
    <>
      <section className="surface-ink grain relative overflow-hidden pt-40 md:pt-52">
        <div className="container-x relative z-10 grid gap-12 pb-24 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-lilac">About us</p>
            <SplitHeading
              as="h1"
              immediate
              delay={0.2}
              text="An organisational development and systems consultancy."
              className="display-lg mt-8"
            />
          </div>
          <Reveal delay={0.8} className="self-end md:col-span-4">
            <p className="border-l border-ochre pl-6 text-lg leading-relaxed text-paper/75">
              Kampala-based. Specialising in the operational foundations organisations need to run
              professionally, grow sustainably, and deliver results.
            </p>
          </Reveal>
        </div>
        <MaskImage
          src={hero}
          alt="Kampala office architecture at golden hour"
          width={1600}
          height={1920}
          eager
          className="relative z-10 h-[50vh] md:h-[70vh]"
          imgClassName="object-[center_35%]"
        />
      </section>

      <section className="bg-paper py-28 md:py-40">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <p className="eyebrow text-violet md:col-span-3">( The story )</p>
          <div className="space-y-10 md:col-span-8">
            <Reveal>
              <p className="display-md">
                We work with NGOs, community-based organisations, and growing businesses — particularly
                startups and SMEs.
              </p>
            </Reveal>
            <div className="grid gap-10 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
              <Reveal delay={0.1}>
                <p>
                  We meet organisations at the stage where they need to move from informal,
                  founder-dependent operations to structured, system-driven institutions.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  That means we don't just advise — we build. We design and implement the actual
                  systems, documents, frameworks, and governance structures that allow an organisation to
                  function consistently and accountably, with or without the founder in the room.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="container-x grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <MaskImage
              src={handover.url}
              alt="Three colleagues presenting the DaWinçi HR Policy and Procedures Manual at its handover"
              width={1200}
              height={928}
              className="aspect-[1200/928]"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="eyebrow text-violet">In practice</p>
            <p className="display-md mt-6">The deliverable is the system itself.</p>
            <p className="mt-6 text-muted-foreground">
              Handover of the DaWinçi HR Policy and Procedures Manual — a working framework, not a
              recommendation.
            </p>
          </div>
        </div>
      </section>

      <section className="surface-ink grain py-28 md:py-40">
        <div className="container-x relative z-10">
          <p className="eyebrow text-lilac">Our approach</p>
          <SplitHeading text="What guides our work." className="display-lg mt-6" />
          <div className="mt-20 grid border-t border-line-dark md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.t}
                delay={(i % 2) * 0.1}
                className={`group border-b border-line-dark py-12 md:px-10 ${i % 2 === 0 ? "md:border-r md:pl-0" : ""}`}
              >
                <span className="font-mono text-sm text-ochre">0{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl font-light md:text-4xl">{v.t}</h3>
                <p className="mt-5 max-w-md text-paper/65">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-28 md:py-36">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-violet">Who we work with</p>
            <h2 className="display-md mt-6">Organisations we've partnered with.</h2>
            <p className="mt-6 text-muted-foreground">
              NGOs, community-based organisations and growing businesses across Uganda that have trusted
              us to build their foundations.
            </p>
          </div>
          <ul className="grid grid-cols-2 border-l border-t border-line md:col-span-6 md:col-start-7">
            {[
              { src: limelight.url, alt: "Limelight Chemicals and Equipment Limited logo" },
              { src: dawinci.url, alt: "DaWinçi Architecture | Civil Engineering logo" },
            ].map((l) => (
              <li key={l.alt} className="flex aspect-[4/3] items-center justify-center border-b border-r border-line p-10">
                <img
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  className="max-h-24 w-auto object-contain grayscale transition duration-500 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-24">
          <Link to="/contact" className="group flex items-center justify-between border-y border-line py-10">
            <span className="display-md">Work with us</span>
            <ArrowUpRight className="size-12 text-violet transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </section>
    </>
  );
}
