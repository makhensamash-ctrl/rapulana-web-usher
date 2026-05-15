import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowRight, Scale, Shield, Gavel, Briefcase, Home, Users, FileText, Building2,
  Mail, Phone, MapPin, Clock, CheckCircle2, Wallet, Lightbulb, Coins,
} from "lucide-react";
import heroLaptop from "@/assets/hero-laptop.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import fileClipboard from "@/assets/file-clipboard.jpg";
import rethabilePortrait from "@/assets/rethabile-rapulana.jpeg";
import rethabilePortrait2 from "@/assets/rethabile-portrait-2.jpeg";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rapulana Attorneys — Trusted Legal Counsel in South Africa" },
      { name: "description", content: "Boutique South African law firm. Corporate, commercial, family and litigation services delivered by senior attorneys." },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: Lightbulb,
    title: "Intellectual Property",
    desc: "We help companies and businesses protect their ideas and brands.",
    items: ["Trademarks", "Copyrights", "Patents", "Designs"],
  },
  {
    icon: Gavel,
    title: "Civil Litigation",
    desc: "Effective and efficient legal solutions across the courts.",
    items: [
      "Magistrate Court and High Court appearances",
      "Dispute resolution",
      "Review applications for PAJA and PAIA",
      "Instituting and defending legal actions (summons)",
      "Instituting and opposing legal motion applications",
    ],
  },
  {
    icon: Briefcase,
    title: "Corporate & Commercial",
    desc: "Agreements, contracts and corporate advisory.",
    items: [
      "Commercial and contract drafting and reviewing",
      "Company registrations",
      "Legal opinions",
      "Corporate structuring",
      "Competition",
      "Company secretarial services",
    ],
  },
  {
    icon: FileText,
    title: "Trusts & Estate Planning",
    desc: "Sound legal assistance for proper estate planning.",
    items: [
      "Drafting of wills",
      "Registration and amendment of trusts",
      "Aligning estate planning with business interests",
    ],
  },
  {
    icon: Coins,
    title: "Legal Collections",
    desc: "We assist with the recovery of funds through letters of demand and legal action in both the Magistrate and High Courts.",
    items: [],
  },
];

const team = [
  { img: t1, name: "Thabo Rapulana", role: "Founding Partner", bio: "Senior commercial and M&A attorney with 20+ years across SADC." },
  { img: t2, name: "Nomsa Dlamini", role: "Partner — Family & Estates", bio: "Trusted counsel on sensitive family, trust and estate matters." },
  { img: t3, name: "Daniel van Wyk", role: "Partner — Litigation", bio: "Seasoned litigator across High Court, urgent applications and arbitration." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroLaptop}
          alt="Laptop displaying Rapulana Attorneys website on a desk with city view"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/20" />
        <div className="container-prose relative grid gap-10 py-28 md:grid-cols-12 md:py-40">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold">Est. 2008 · Johannesburg</p>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">
              Counsel built on
              <span className="block text-gold">conviction & care.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/80">
              Rapulana Attorneys partners with founders, families and
              corporates to navigate the law with clarity — from the
              boardroom to the bench.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#booking" className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:bg-gold/90">
                Book a consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">
                Our practice areas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO TILES */}
      <section className="container-prose py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Scale, title: "Partner-led", text: "Every matter is handled by a senior partner. No layers, no hand-offs." },
            { icon: Shield, title: "Confidential", text: "Discreet, privileged counsel from first call to final resolution." },
            { icon: Gavel, title: "Battle-tested", text: "Decades of combined courtroom and boardroom experience." },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-t border-border pt-8">
              <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
              <h3 className="mt-6 text-2xl text-primary">{title}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 border-y border-border bg-secondary/5">
        <div className="container-prose grid gap-16 py-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">About Us</p>
            <h2 className="mt-3 text-4xl text-primary md:text-5xl">
              A vibrant law firm partnering with businesses and entrepreneurs.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p>
                Rapulana Attorneys is a vibrant law firm led by{" "}
                <span className="font-semibold text-primary">Rethabile Rapulana</span>.
                The firm operates with a vision to serve businesses and
                entrepreneurs by providing appropriate and effective legal
                solutions of high quality.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow text-secondary">Our Approach</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: Users,
                    title: "Partnership",
                    desc: "We are committed to partnering with our clients and walking alongside each one in building impactful businesses.",
                  },
                  {
                    icon: Wallet,
                    title: "Transparent Fees",
                    desc: "We aim to eliminate the anxiety of unexpected legal costs through clear, transparent fee structures.",
                  },
                  {
                    icon: Scale,
                    title: "Sound Counsel",
                    desc: "We are equipped to adequately and appropriately advise our clients with sound legal solutions for all their needs.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-sm border border-border bg-background p-6"
                  >
                    <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                    <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="md:col-span-5">
            <div className="overflow-hidden rounded-sm bg-muted shadow-md">
              <img
                src={rethabilePortrait}
                alt="Portrait of Rethabile Rapulana, founder of Rapulana Attorneys"
                width={940}
                height={1410}
                loading="lazy"
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-primary">Rethabile Rapulana</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Founder & Principal Attorney</p>
          </aside>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24">
        <div className="container-prose py-24">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Practice Areas</p>
              <h2 className="mt-3 text-4xl text-primary md:text-5xl">
                Comprehensive counsel across the matters that matter most.
              </h2>
            </div>
            <div className="md:col-span-5">
              <img
                src={fileClipboard}
                alt="Rapulana Attorneys letterhead on a clipboard"
                width={1500}
                height={1050}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover shadow-md"
              />
            </div>
          </div>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc, items }) => (
              <article key={title} className="flex flex-col bg-background p-10 transition hover:bg-secondary/5">
                <Icon className="h-9 w-9 text-secondary" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl text-primary">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                {items.length > 0 && (
                  <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={1.75} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="scroll-mt-24 border-y border-border bg-secondary/5">
        <div className="container-prose py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Our People</p>
            <h2 className="mt-3 text-4xl text-primary md:text-5xl">
              Meet the attorney behind Rapulana.
            </h2>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="aspect-[2/3] overflow-hidden rounded-sm bg-muted shadow-md">
                <img
                  src={rethabilePortrait2}
                  alt="Portrait of Rethabile Rapulana"
                  width={940}
                  height={1410}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">Founder & Principal Attorney</p>
              <h3 className="mt-2 text-3xl text-primary md:text-4xl">Rethabile Rapulana</h3>
              <p className="mt-5 text-lg text-muted-foreground">
                Rethabile Rapulana is an admitted attorney with experience in
                Intellectual Property Law and Commercial Law. Her experience
                includes working with business owners, entrepreneurs and
                individuals on contracts and agreements, trade marks and
                copyrights, commercial law, civil litigation and estate planning.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-sm border border-border bg-background p-5">
                  <p className="eyebrow text-secondary">Qualifications</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>B.Com Law (UFS)</li>
                    <li>B.Com (Hons) Financial Economics &amp; Investment Management (UFS)</li>
                    <li>LLB (Unisa)</li>
                  </ul>
                </div>
                <div className="rounded-sm border border-border bg-background p-5">
                  <p className="eyebrow text-secondary">Professional Designation</p>
                  <p className="mt-3 text-sm text-foreground/80">
                    Admitted Attorney with Right of Appearance in the High Court of South Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM MEETING FEATURE */}
      <section className="container-prose py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={teamMeeting}
            alt="Attorneys collaborating around a conference table"
            width={1600}
            height={1024}
            loading="lazy"
            className="rounded-sm object-cover shadow-md"
          />
          <div>
            <p className="eyebrow">Why Rapulana</p>
            <h2 className="mt-3 text-3xl text-primary md:text-4xl">
              Boutique by design. Fierce by reputation.
            </h2>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Partner-led on every matter",
                "Transparent fixed-fee engagements where possible",
                "Multilingual: English, Sesotho, isiZulu, Afrikaans",
                "Twenty-four hour response on urgent matters",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-6 bg-secondary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      {/* BOOKING */}
      <BookingSection />
    </>
  );
}

function ContactSection() {
  const items = [
    { icon: MapPin, title: "Office", lines: ["14th Floor, Sandton Central", "Maude Street, Sandton", "Johannesburg, 2196"] },
    { icon: Phone, title: "Telephone", lines: ["+27 11 555 0142", "+27 82 555 0142 (urgent)"] },
    { icon: Mail, title: "Email", lines: ["hello@rapulana.law", "litigation@rapulana.law"] },
    { icon: Clock, title: "Hours", lines: ["Mon – Fri · 08:00 – 17:30", "Sat · by appointment"] },
  ];
  return (
    <section id="contact" className="scroll-mt-24 border-y border-border bg-secondary/5">
      <div className="container-prose py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">
            We're a phone call, an email, or a short walk away.
          </h2>
        </div>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="bg-background p-8">
              <Icon className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl text-primary">{title}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {lines.map((l) => <p key={l}>{l}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a practice area"),
  date: z.string().min(1, "Please choose a preferred date"),
  time: z.string().min(1, "Please choose a preferred time"),
  message: z.string().trim().max(1000).optional(),
});

const serviceOptions = [
  "Corporate & Commercial",
  "Litigation & Dispute Resolution",
  "Family & Matrimonial",
  "Wills, Trusts & Estates",
  "Property & Conveyancing",
  "Labour & Employment",
  "Other / Not sure",
];

function BookingSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="booking" className="scroll-mt-24">
      <div className="container-prose grid gap-16 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Book a Consultation</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Tell us about your matter.</h2>
          <p className="mt-6 text-muted-foreground">
            Submit the form and a senior attorney will confirm your appointment within one business day. All consultations are strictly confidential.
          </p>
        </div>

        <div className="md:col-span-8">
          {submitted ? (
            <div className="flex flex-col items-start gap-4 rounded-sm border border-secondary/30 bg-secondary/5 p-10">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
              <h3 className="text-3xl text-primary">Thank you.</h3>
              <p className="text-muted-foreground">
                Your booking request has been received. A member of the Rapulana team will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-sm border border-border bg-card p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" name="name" error={errors.name} />
                <Field label="Email address" name="email" type="email" error={errors.email} />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} />
                <Field label="Practice area" name="service" as="select" options={serviceOptions} error={errors.service} />
                <Field label="Preferred date" name="date" type="date" error={errors.date} />
                <Field label="Preferred time" name="time" type="time" error={errors.time} />
              </div>
              <Field label="Briefly describe your matter (optional)" name="message" as="textarea" error={errors.message} />
              <button type="submit" className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Request Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  options?: string[];
}

function Field({ label, name, type = "text", error, as = "input", options }: FieldProps) {
  const base = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring/30 transition focus:border-secondary focus:ring-2";
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      {as === "textarea" && <textarea name={name} rows={4} maxLength={1000} className={base} />}
      {as === "select" && (
        <select name={name} className={base} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )}
      {as === "input" && <input name={name} type={type} className={base} />}
      {error && <span className="mt-1 block text-xs font-normal text-destructive">{error}</span>}
    </label>
  );
}
