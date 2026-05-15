import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rapulana Attorneys" },
      { name: "description", content: "Get in touch with Rapulana Attorneys. Visit our Sandton office or contact our team by phone or email." },
    ],
  }),
  component: ContactPage,
});

const items = [
  { icon: MapPin, title: "Office", lines: ["14th Floor, Sandton Central", "Maude Street, Sandton", "Johannesburg, 2196"] },
  { icon: Phone, title: "Telephone", lines: ["+27 11 555 0142", "+27 82 555 0142 (urgent)"] },
  { icon: Mail, title: "Email", lines: ["hello@rapulana.law", "litigation@rapulana.law"] },
  { icon: Clock, title: "Hours", lines: ["Mon – Fri · 08:00 – 17:30", "Saturday · by appointment"] },
];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're a phone call, an email, or a short walk away."
        description="Reach out for general queries, media enquiries or to brief us on a matter. For consultations please use the booking page."
      />

      <section className="container-prose py-24">
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="bg-background p-8">
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl text-primary">{title}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {lines.map((l) => <p key={l}>{l}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="overflow-hidden rounded-sm border border-border">
          <iframe
            title="Rapulana Attorneys office location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.040%2C-26.110%2C28.070%2C-26.090&amp;layer=mapnik"
            className="h-[400px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
