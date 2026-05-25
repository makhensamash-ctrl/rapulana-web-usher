import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Loader2, Paperclip, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Rapulana Attorneys" },
      { name: "description", content: "Schedule a consultation with Rapulana Attorneys. Pick a date and time that suits you." },
      { property: "og:title", content: "Book a Consultation — Rapulana Attorneys" },
      { property: "og:description", content: "Schedule a one-hour consultation with Rapulana Attorneys." },
    ],
  }),
  component: BookingPage,
});


const SLOT_HOURS = [8, 9, 10, 11, 12, 13, 14, 15];

const formSchema = z.object({
  client_name: z.string().trim().min(2, "Please enter your full name").max(100),
  client_email: z.string().trim().email("Please enter a valid email").max(255),
  client_phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  matter: z.string().trim().max(1000).optional(),
});

function startOfDay(d: Date) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

function getNextWeekdays(count: number) {
  const days: Date[] = [];
  const cursor = startOfDay(new Date());
  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function fmtDateLong(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function fmtDayShort(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short" });
}

function BookingPage() {
  const days = useMemo(() => getNextWeekdays(14), []);
  const [selectedDate, setSelectedDate] = useState<Date>(days[0]);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [takenHours, setTakenHours] = useState<Set<number>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ name: string; date: string; time: string } | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  

  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB

  // Fetch taken + blocked slots for selected date
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingSlots(true);
      setSelectedHour(null);
      const from = new Date(selectedDate); from.setHours(0, 0, 0, 0);
      const to = new Date(selectedDate); to.setHours(23, 59, 59, 999);

      const [{ data: taken }, { data: blocked }] = await Promise.all([
        supabase.rpc("get_taken_slots", { _from: from.toISOString(), _to: to.toISOString() }),
        supabase.from("blocked_slots").select("starts_at,ends_at")
          .gte("starts_at", from.toISOString()).lte("starts_at", to.toISOString()),
      ]);

      if (cancelled) return;
      const hours = new Set<number>();
      for (const row of taken ?? []) hours.add(new Date(row.starts_at).getHours());
      for (const row of blocked ?? []) hours.add(new Date(row.starts_at).getHours());
      setTakenHours(hours);
      setLoadingSlots(false);
    }
    load();
    return () => { cancelled = true; };
  }, [selectedDate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    if (selectedHour === null) {
      setErrors({ slot: "Please pick a time slot" });
      return;
    }
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const starts = new Date(selectedDate);
    starts.setHours(selectedHour, 0, 0, 0);
    const ends = new Date(starts);
    ends.setHours(starts.getHours() + 1);

    let attachmentUrl: string | null = null;
    if (attachment) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        setSubmitting(false);
        setSubmitError("Attachment is too large. Maximum size is 10 MB.");
        return;
      }
      const ext = attachment.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
      const path = `${starts.toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("booking-attachments")
        .upload(path, attachment, { contentType: attachment.type || undefined });
      if (uploadError) {
        setSubmitting(false);
        setSubmitError("We couldn't upload your document. Please try again.");
        return;
      }
      attachmentUrl = path;
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      client_name: parsed.data.client_name,
      client_email: parsed.data.client_email,
      client_phone: parsed.data.client_phone,
      matter: parsed.data.matter ?? null,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
      payment_status: "pending",
      attachment_url: attachmentUrl,
    });
    setSubmitting(false);
    if (insertError) {
      console.error(insertError);
      setSubmitError("We couldn't submit your booking. Please try again.");
      return;
    }
    setConfirmed({
      name: parsed.data.client_name,
      date: fmtDateLong(selectedDate),
      time: `${String(selectedHour).padStart(2, "0")}:00`,
    });
  };

  if (confirmed) {
    return (
      <section className="container-prose py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-sm border border-secondary/30 bg-secondary/5 p-6 text-center sm:p-10">
          <CheckCircle2 className="mx-auto h-12 w-12 text-secondary" />
          <h1 className="mt-6 text-3xl text-primary sm:text-4xl">Booking received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you, {confirmed.name}. We've reserved <span className="font-semibold text-primary">{confirmed.date} at {confirmed.time}</span>.
            Our team will email you shortly to confirm the consultation.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-prose w-full max-w-full overflow-x-hidden py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-4">
          <p className="eyebrow">Rapulana Attorneys</p>
          <h1 className="mt-3 text-3xl text-primary sm:text-4xl">Book a Consultation</h1>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-secondary" />
              <div>
                <p className="font-semibold text-primary">60 minutes</p>
                <p>Hourly consultation with a senior attorney.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-secondary" />
              <div>
                <p className="font-semibold text-primary">Mon – Fri · 08:00 – 16:00</p>
                <p>Choose any open slot in the next two weeks.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Picker + form */}
        <div className="min-w-0 space-y-8 md:col-span-8">
          {/* Date picker */}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">1. Select a date</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((d) => {
                const active = d.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`flex min-w-[72px] flex-col items-center rounded-sm border px-3 py-3 transition ${
                      active
                        ? "border-secondary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-secondary"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-widest">{fmtDayShort(d)}</span>
                    <span className="mt-1 text-xl font-semibold">{d.getDate()}</span>
                    <span className="text-xs">{d.toLocaleDateString("en-GB", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">2. Pick a time</h2>
            <p className="mt-2 text-sm text-muted-foreground">{fmtDateLong(selectedDate)}</p>
            {loadingSlots ? (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading availability…
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {SLOT_HOURS.map((h) => {
                  const taken = takenHours.has(h);
                  const active = selectedHour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={taken}
                      onClick={() => setSelectedHour(h)}
                      className={`rounded-sm border px-3 py-2.5 text-sm font-medium transition ${
                        taken
                          ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                          : active
                          ? "border-secondary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-secondary"
                      }`}
                    >
                      {String(h).padStart(2, "0")}:00
                    </button>
                  );
                })}
              </div>
            )}
            {errors.slot && <p className="mt-2 text-xs text-destructive">{errors.slot}</p>}
          </div>

          {/* Details form */}
          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-sm border border-border bg-card p-4 sm:p-6 md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">3. Your details</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="client_name" error={errors.client_name} />
              <Field label="Email" name="client_email" type="email" error={errors.client_email} />
              <Field label="Phone" name="client_phone" type="tel" error={errors.client_phone} />
            </div>
            <Field as="textarea" label="Briefly describe your matter (optional)" name="matter" error={errors.matter} />

            <div>
              <label className="block text-sm font-semibold text-foreground">
                Attach a document (optional)
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  PDF, Word, or image. Max 10 MB.
                </span>
              </label>
              {attachment ? (
                <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-input bg-background px-4 py-2.5 text-sm">
                  <span className="flex min-w-0 items-center gap-2 text-foreground">
                    <Paperclip className="h-4 w-4 shrink-0 text-secondary" />
                    <span className="truncate">{attachment.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="shrink-0 rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-primary"
                    aria-label="Remove attachment"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition hover:border-secondary hover:text-primary">
                  <Paperclip className="h-4 w-4" />
                  <span>Choose a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      if (file && file.size > MAX_ATTACHMENT_BYTES) {
                        setSubmitError("Attachment is too large. Maximum size is 10 MB.");
                        e.target.value = "";
                        return;
                      }
                      setSubmitError(null);
                      setAttachment(file);
                    }}
                  />
                </label>
              )}
            </div>

            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Booking
            </button>
          </form>
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
  as?: "input" | "textarea";
}

function Field({ label, name, type = "text", error, as = "input" }: FieldProps) {
  const base = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring/30 transition focus:border-secondary focus:ring-2";
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      {as === "textarea" ? (
        <textarea name={name} rows={4} maxLength={1000} className={base} />
      ) : (
        <input name={name} type={type} className={base} />
      )}
      {error && <span className="mt-1 block text-xs font-normal text-destructive">{error}</span>}
    </label>
  );
}
