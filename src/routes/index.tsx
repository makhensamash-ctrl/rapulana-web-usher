import { createFileRoute, Link } from "@tanstack/react-router";
import heroLaptop from "@/assets/hero-laptop.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import fileClipboard from "@/assets/file-clipboard.jpg";
import { ArrowRight, Scale, Shield, Gavel } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rapulana Attorneys — Trusted Legal Counsel" },
      { name: "description", content: "Boutique South African law firm delivering precise, principled legal counsel across corporate, commercial, family and litigation matters." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroLaptop}
          alt="Modern corporate office building at blue hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="container-prose relative grid gap-10 py-28 md:grid-cols-12 md:py-40">
          <div className="md:col-span-8">
            <p className="eyebrow">Est. 2008 · Johannesburg</p>
            <h1 className="mt-5 text-5xl font-medium leading-[1.05] md:text-7xl">
              Counsel built on
              <span className="block italic text-gold">conviction & care.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/80">
              Rapulana Attorneys partners with founders, families and
              corporates to navigate the law with clarity — from the
              boardroom to the bench.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition hover:bg-gold/90"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10"
              >
                Our practice areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-b border-border">
        <div className="container-prose grid gap-10 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              The right counsel, written plainly.
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-12">
            <p className="text-lg text-muted-foreground">
              We are a small bench of senior attorneys who believe that the
              best legal advice is the one you understand. Every matter is
              partner-led. Every brief is treated like our own.
            </p>
          </div>
        </div>
      </section>

      {/* PRACTICE TILES */}
      <section className="container-prose py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Scale, title: "Corporate & Commercial", text: "Mergers, acquisitions, structuring and shareholder agreements for growing companies." },
            { icon: Shield, title: "Family & Estates", text: "Wills, trusts, divorce and matrimonial property — handled with discretion and warmth." },
            { icon: Gavel, title: "Dispute Resolution", text: "Skilled litigation, arbitration and mediation across the High Court and CCMA." },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="group border-t border-border pt-8">
              <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-6 text-2xl text-primary">{title}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-gold">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* IMAGE FEATURE */}
      <section className="bg-secondary/40">
        <div className="container-prose grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <img
            src={teamMeeting}
            alt="Attorneys collaborating around a conference table"
            width={1600}
            height={1024}
            loading="lazy"
            className="h-full w-full rounded-sm object-cover shadow-lg"
          />
          <div>
            <p className="eyebrow">Why Rapulana</p>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              Boutique by design. Fierce by reputation.
            </h2>
            <p className="mt-6 text-muted-foreground">
              We deliberately stay small so that every client speaks directly
              with the attorney handling their matter. No layers. No
              hand-offs. Just considered, accountable counsel.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Partner-led on every matter",
                "Transparent fixed-fee engagements where possible",
                "Multilingual: English, Sesotho, isiZulu, Afrikaans",
                "Twenty-four hour response on urgent matters",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-6 bg-gold" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose py-24">
        <div className="relative overflow-hidden rounded-sm bg-primary p-12 text-primary-foreground md:p-20">
          <img
            src={fileClipboard}
            alt=""
            width={1600}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative max-w-2xl">
            <p className="eyebrow">Begin</p>
            <h2 className="mt-4 text-3xl font-medium md:text-5xl">
              Tell us about your matter.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Book a confidential consultation and we'll get back to you
              within one business day.
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:bg-gold/90"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
