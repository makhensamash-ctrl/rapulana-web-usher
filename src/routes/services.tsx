import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Briefcase, Home, Gavel, Users, FileText, Building2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Rapulana Attorneys" },
      { name: "description", content: "Corporate, commercial, family, estates, property and litigation services delivered by senior South African attorneys." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Briefcase, title: "Corporate & Commercial", desc: "Company formations, M&A, joint ventures, shareholder agreements, BEE structuring and commercial contracts.", items: ["Mergers & acquisitions", "Shareholder agreements", "Commercial contracts", "Corporate governance"] },
  { icon: Gavel, title: "Litigation & Dispute Resolution", desc: "High Court litigation, urgent applications, arbitration, mediation and CCMA representation.", items: ["High Court litigation", "Arbitration", "Mediation", "CCMA disputes"] },
  { icon: Home, title: "Family & Matrimonial", desc: "Sensitive counsel through divorce, ante-nuptial contracts, custody and maintenance disputes.", items: ["Divorce", "Ante-nuptial contracts", "Custody & care", "Maintenance"] },
  { icon: FileText, title: "Wills, Trusts & Estates", desc: "Estate planning, will drafting, trust formation, and the administration of deceased estates.", items: ["Will drafting", "Trust formation", "Estate administration", "Tax planning"] },
  { icon: Building2, title: "Property & Conveyancing", desc: "Residential and commercial transfers, bond registrations, sectional title and lease agreements.", items: ["Property transfers", "Bond registration", "Sectional title", "Lease agreements"] },
  { icon: Users, title: "Labour & Employment", desc: "Employment contracts, retrenchments, disciplinary matters and workplace policy advisory.", items: ["Employment contracts", "Retrenchments", "Disciplinary hearings", "Policy advisory"] },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Comprehensive counsel across the matters that matter most."
        description="From boardroom strategy to the bench, our team brings considered, senior expertise to every brief."
      />

      <section className="container-prose py-24">
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, items }) => (
            <article key={title} className="group bg-background p-10 transition hover:bg-secondary/40">
              <Icon className="h-9 w-9 text-gold" strokeWidth={1.5} />
              <h3 className="mt-6 text-2xl text-primary">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <span className="h-px w-4 bg-gold" />{i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-prose flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Need something specific?</p>
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">Let's talk through your matter.</h2>
          </div>
          <Link to="/booking" className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:bg-gold/90">
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
