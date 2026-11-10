import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { contact, services } from "@/lib/content";
import { Reveal, SplitHeading } from "@/components/site/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Book a consultation | Komushana Consultancy" },
      {
        name: "description",
        content: "Tell us where your organisation is today. Komushana Consultancy, Kampala - email, phone and consultation form.",
      },
      { property: "og:title", content: "Contact Komushana Consultancy" },
      { property: "og:description", content: "Let's build your organisation's foundations. Book a consultation." },
    ],
  }),
  component: Contact,
});

const field =
  "peer w-full border-0 border-b border-line-dark bg-transparent px-0 pb-3 pt-7 text-lg text-paper placeholder-transparent outline-none transition-colors focus:border-ochre";
const label =
  "pointer-events-none absolute left-0 top-1 eyebrow text-lilac transition-all";

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Consultation enquiry - ${f.get("service") || "General"}`;
    const body = [
      `Name: ${f.get("name")}`,
      `Organisation: ${f.get("organisation") || "-"}`,
      `Email: ${f.get("email")}`,
      `Service of interest: ${f.get("service") || "-"}`,
      "",
      `${f.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="surface-ink grain relative min-h-screen overflow-hidden pb-24 pt-40 md:pt-52">
      <div className="blueprint absolute inset-0 opacity-30" aria-hidden />
      <div className="container-x relative z-10 grid gap-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-lilac">Contact</p>
          <SplitHeading
            as="h1"
            immediate
            delay={0.2}
            text="Let's build your organisation's foundations."
            className="display-lg mt-8"
          />
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">
              Tell us where your organisation is today and what you'd like to achieve. We'll get back to
              you to arrange a consultation.
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-dark pt-10">
            {[
              { k: "Office", v: contact.office },
              { k: "Hours", v: contact.hours },
              { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
              { k: "Phone", v: contact.phone, href: contact.phoneHref },
            ].map((c) => (
              <div key={c.k}>
                <dt className="eyebrow text-lilac">{c.k}</dt>
                <dd className="mt-3 break-words text-paper">
                  {c.href ? (
                    <a href={c.href} className="link-underline">{c.v}</a>
                  ) : (
                    c.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.3} className="border border-line-dark bg-ink-soft/60 p-6 md:p-12">
            {sent ? (
              <div className="py-16 text-center">
                <span className="mx-auto flex size-14 items-center justify-center bg-ochre text-ink">
                  <Check className="size-6" />
                </span>
                <h2 className="mt-8 font-display text-3xl font-light">Your email is ready to send.</h2>
                <p className="mx-auto mt-4 max-w-sm text-paper/70">
                  We opened your email app with your message. If nothing appeared, write to{" "}
                  <a href={`mailto:${contact.email}`} className="text-ochre underline">{contact.email}</a>.
                </p>
                <button onClick={() => setSent(false)} className="eyebrow mt-10 text-lilac underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative">
                    <input id="name" name="name" required placeholder="Full name" className={field} />
                    <label htmlFor="name" className={label}>Full name *</label>
                  </div>
                  <div className="relative">
                    <input id="organisation" name="organisation" placeholder="Organisation" className={field} />
                    <label htmlFor="organisation" className={label}>Organisation</label>
                  </div>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" required placeholder="Email" className={field} />
                  <label htmlFor="email" className={label}>Email *</label>
                </div>
                <div className="relative">
                  <select id="service" name="service" defaultValue="" className={`${field} appearance-none`}>
                    <option value="" className="bg-ink">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title} className="bg-ink">{s.title}</option>
                    ))}
                    <option value="Other / Not sure yet" className="bg-ink">Other / Not sure yet</option>
                  </select>
                  <label htmlFor="service" className={label}>Service of interest</label>
                </div>
                <div className="relative">
                  <textarea id="message" name="message" rows={5} placeholder="How can we help?" className={`${field} resize-none`} />
                  <label htmlFor="message" className={label}>How can we help?</label>
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-between bg-ochre px-6 py-5 font-semibold text-ink transition-colors hover:bg-paper"
                >
                  Send message
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
