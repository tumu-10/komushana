import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { contact, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="surface-ink grain overflow-hidden">
      <div className="container-x relative z-10 pt-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-lilac">Start a conversation</p>
            <Link to="/contact" className="group mt-6 block">
              <span className="display-lg block">
                Let's build your <em className="text-ochre">foundations.</em>
              </span>
              <span className="mt-8 inline-flex items-center gap-3 border-b border-ochre pb-1 text-lg">
                Book a consultation
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm md:col-span-6 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5 text-lilac">Pages</p>
              <ul className="space-y-3 text-paper/80">
                <li><Link to="/" className="link-underline">Home</Link></li>
                <li><Link to="/services" className="link-underline">Services</Link></li>
                <li><Link to="/about" className="link-underline">About</Link></li>
                <li><Link to="/contact" className="link-underline">Contact</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 md:order-last">
              <p className="eyebrow mb-5 text-lilac">Reach us</p>
              <ul className="space-y-3 text-paper/80">
                <li>{contact.office}</li>
                <li><a href={`mailto:${contact.email}`} className="link-underline break-all">{contact.email}</a></li>
                <li><a href={contact.phoneHref} className="link-underline">{contact.phone}</a></li>
                <li>{contact.hours}</li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-lilac">Services</p>
              <ul className="space-y-3 text-paper/80">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to="/services" hash={s.slug} className="link-underline">
                      {s.title.split(" & ")[0]?.split(" and ")[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none mt-24 select-none font-display text-[22vw] font-light leading-[0.75] tracking-[-0.06em] text-paper/[0.06]"
        >
          Komushana
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-line-dark py-6 text-xs text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Komushana Consultancy. Kampala, Uganda.</span>
          <span className="eyebrow">Structure · Compliance · Sustainability</span>
        </div>
      </div>
    </footer>
  );
}
