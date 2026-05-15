import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Rapulana Attorneys" },
      { name: "description", content: "Book a confidential consultation with a senior attorney at Rapulana. We respond within one business day." },
    ],
  }),
  component: BookingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a practice area"),
  date: z.string().min(1, "Please choose a preferred date"),
  time: z.string().min(1, "Please choose a preferred time"),
  message: z.string().trim().max(1000).optional(),
});

const services = [
  "Corporate & Commercial",
  "Litigation & Dispute Resolution",
  "Family & Matrimonial",
  "Wills, Trusts & Estates",
  "Property & Conveyancing",
  "Labour & Employment",
  "Other / Not sure",
];

function BookingPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Tell us about your matter."
        description="Submit the form below and a member of our team will confirm your appointment within one business day. All consultations are strictly confidential."
      />

      <section className="container-prose grid gap-16 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">What to expect</p>
          <ul className="mt-6 space-y-6">
            {[
              { t: "Confidential by default", d: "Every conversation is privileged and strictly between you and your attorney." },
              { t: "Partner-led", d: "Your consultation will be with a senior partner — never a junior intake." },
              { t: "Clear pricing", d: "We'll outline our fees and approach before any work begins." },
            ].map((i) => (
              <li key={i.t}>
                <p className="font-serif text-xl text-primary">{i.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-8">
          {submitted ? (
            <div className="flex flex-col items-start gap-4 rounded-sm border border-gold/40 bg-gold/10 p-10">
              <CheckCircle2 className="h-10 w-10 text-gold" />
              <h2 className="text-3xl text-primary">Thank you.</h2>
              <p className="text-muted-foreground">
                Your booking request has been received. A member of the
                Rapulana team will be in touch within one business day to
                confirm your appointment.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-sm border border-border bg-card p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" name="name" error={errors.name} />
                <Field label="Email address" name="email" type="email" error={errors.email} />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} />
                <Field label="Practice area" name="service" as="select" options={services} error={errors.service} />
                <Field label="Preferred date" name="date" type="date" error={errors.date} />
                <Field label="Preferred time" name="time" type="time" error={errors.time} />
              </div>
              <Field label="Briefly describe your matter (optional)" name="message" as="textarea" error={errors.message} />

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Request Consultation
              </button>
            </form>
          )}
        </div>
      </section>
    </>
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
  const base = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring/30 transition focus:border-gold focus:ring-2";
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {as === "textarea" && (
        <textarea name={name} rows={4} maxLength={1000} className={base} />
      )}
      {as === "select" && (
        <select name={name} className={base} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )}
      {as === "input" && (
        <input name={name} type={type} className={base} />
      )}
      {error && <span className="mt-1 block text-xs font-normal text-destructive">{error}</span>}
    </label>
  );
}
