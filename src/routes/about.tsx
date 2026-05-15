import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import fileClipboard from "@/assets/file-clipboard.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rapulana Attorneys" },
      { name: "description", content: "Founded in 2008, Rapulana Attorneys is a boutique South African firm built on integrity, precision and partner-led counsel." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A firm where the partner you meet is the partner who handles your matter."
        description="Rapulana Attorneys was founded in Johannesburg in 2008 with a simple thesis: senior counsel should be accessible, transparent, and unwaveringly principled."
      />

      <section className="container-prose grid gap-16 py-24 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground">
          <p>
            For over fifteen years we have advised entrepreneurs, family
            offices, listed corporates and private individuals across South
            Africa and the SADC region. Our work spans the boardroom and the
            courtroom — but our values remain the same: clarity, candour and
            craftsmanship.
          </p>
          <p>
            We are deliberately a boutique. Our partners hand-pick every
            matter we accept, ensuring focused attention and an
            uncompromising standard of work. When you instruct Rapulana, you
            instruct a partner — not a file number.
          </p>
          <p>
            Beyond practice, we invest meaningfully in pro bono work,
            supporting community legal clinics across Gauteng and mentoring
            the next generation of South African attorneys.
          </p>
        </div>

        <aside className="md:col-span-5">
          <img
            src={fileClipboard}
            alt="Hand signing a legal document with a fountain pen"
            width={1600}
            height={1024}
            loading="lazy"
            className="rounded-sm object-cover shadow-md"
          />
        </aside>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-prose grid gap-12 py-20 md:grid-cols-3">
          {[
            { k: "15+", v: "Years in practice" },
            { k: "400+", v: "Matters resolved" },
            { k: "98%", v: "Client retention" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-serif text-6xl text-gold">{s.k}</p>
              <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-24">
        <p className="eyebrow">Our values</p>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {[
            { t: "Integrity", d: "We say what we mean and we keep our word — to clients, to courts, to colleagues." },
            { t: "Precision", d: "Every clause, every citation, every comma is considered. The detail is the work." },
            { t: "Partnership", d: "We sit on the same side of the table as our clients. Their outcome is our outcome." },
          ].map((v) => (
            <div key={v.t} className="border-t border-border pt-6">
              <h3 className="text-2xl text-primary">{v.t}</h3>
              <p className="mt-3 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
