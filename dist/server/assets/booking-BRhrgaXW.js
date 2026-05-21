import { W as reactExports, L as jsxRuntimeExports } from "./server-ASaDeMZs.js";
import { c as createLucideIcon, L as Link, X } from "./router-CO9yg4eA.js";
import { s as supabase } from "./client-5KSn606E.js";
import { C as CircleCheck, a as Clock } from "./clock-l5rSbZZi.js";
import { A as ArrowLeft } from "./arrow-left-C5TTuicD.js";
import { o as objectType, s as stringType } from "./types-DBxYw-g_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DdGN5IVl.js";
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode);
const SLOT_HOURS = [8, 9, 10, 11, 12, 13, 14, 15];
const formSchema = objectType({
  client_name: stringType().trim().min(2, "Please enter your full name").max(100),
  client_email: stringType().trim().email("Please enter a valid email").max(255),
  client_phone: stringType().trim().min(7, "Please enter a valid phone number").max(20),
  matter: stringType().trim().max(1e3).optional()
});
function startOfDay(d) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}
function getNextWeekdays(count) {
  const days = [];
  const cursor = startOfDay(/* @__PURE__ */ new Date());
  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}
function fmtDateLong(d) {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function fmtDayShort(d) {
  return d.toLocaleDateString("en-GB", {
    weekday: "short"
  });
}
function BookingPage() {
  const days = reactExports.useMemo(() => getNextWeekdays(14), []);
  const [selectedDate, setSelectedDate] = reactExports.useState(days[0]);
  const [selectedHour, setSelectedHour] = reactExports.useState(null);
  const [takenHours, setTakenHours] = reactExports.useState(/* @__PURE__ */ new Set());
  const [loadingSlots, setLoadingSlots] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [confirmed, setConfirmed] = reactExports.useState(null);
  const [attachment, setAttachment] = reactExports.useState(null);
  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
  reactExports.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingSlots(true);
      setSelectedHour(null);
      const from = new Date(selectedDate);
      from.setHours(0, 0, 0, 0);
      const to = new Date(selectedDate);
      to.setHours(23, 59, 59, 999);
      const [{
        data: taken
      }, {
        data: blocked
      }] = await Promise.all([supabase.rpc("get_taken_slots", {
        _from: from.toISOString(),
        _to: to.toISOString()
      }), supabase.from("blocked_slots").select("starts_at,ends_at").gte("starts_at", from.toISOString()).lte("starts_at", to.toISOString())]);
      if (cancelled) return;
      const hours = /* @__PURE__ */ new Set();
      for (const row of taken ?? []) hours.add(new Date(row.starts_at).getHours());
      for (const row of blocked ?? []) hours.add(new Date(row.starts_at).getHours());
      setTakenHours(hours);
      setLoadingSlots(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (selectedHour === null) {
      setErrors({
        slot: "Please pick a time slot"
      });
      return;
    }
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const errs = {};
      for (const issue of parsed.error.issues) errs[issue.path[0]] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const starts = new Date(selectedDate);
    starts.setHours(selectedHour, 0, 0, 0);
    const ends = new Date(starts);
    ends.setHours(starts.getHours() + 1);
    let attachmentUrl = null;
    if (attachment) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        setSubmitting(false);
        setSubmitError("Attachment is too large. Maximum size is 10 MB.");
        return;
      }
      const ext = attachment.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
      const path = `${starts.toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const {
        error: uploadError
      } = await supabase.storage.from("booking-attachments").upload(path, attachment, {
        contentType: attachment.type || void 0
      });
      if (uploadError) {
        setSubmitting(false);
        setSubmitError("We couldn't upload your document. Please try again.");
        return;
      }
      attachmentUrl = path;
    }
    const {
      error
    } = await supabase.from("bookings").insert({
      client_name: parsed.data.client_name,
      client_email: parsed.data.client_email,
      client_phone: parsed.data.client_phone,
      matter: parsed.data.matter ?? null,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
      amount_cents: 0,
      payment_status: "pending",
      attachment_url: attachmentUrl
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("We couldn't create your booking. Please try another time slot.");
      return;
    }
    setConfirmed({
      name: parsed.data.client_name,
      date: fmtDateLong(selectedDate),
      time: `${String(selectedHour).padStart(2, "0")}:00`
    });
  };
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl rounded-sm border border-secondary/30 bg-secondary/5 p-6 text-center sm:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl text-primary sm:text-4xl", children: "Booking received" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground", children: [
        "Thank you, ",
        confirmed.name,
        ". We've reserved ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
          confirmed.date,
          " at ",
          confirmed.time
        ] }),
        ". Our team will email you shortly to confirm the consultation."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to home"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose w-full max-w-full overflow-x-hidden py-16 md:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-8 md:grid-cols-12 md:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Rapulana Attorneys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl text-primary sm:text-4xl", children: "Book a Consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-0.5 h-5 w-5 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary", children: "60 minutes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hourly consultation with a senior attorney." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "mt-0.5 h-5 w-5 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary", children: "Mon – Fri · 08:00 – 16:00" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Choose any open slot in the next two weeks." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-8 md:col-span-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "1. Select a date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1", children: days.map((d) => {
            const active = d.toDateString() === selectedDate.toDateString();
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedDate(d), className: `flex min-w-[72px] flex-col items-center rounded-sm border px-3 py-3 transition ${active ? "border-secondary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-secondary"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest", children: fmtDayShort(d) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-xl font-semibold", children: d.getDate() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: d.toLocaleDateString("en-GB", {
                month: "short"
              }) })
            ] }, d.toISOString());
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "2. Pick a time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: fmtDateLong(selectedDate) }),
          loadingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Loading availability…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4", children: SLOT_HOURS.map((h) => {
            const taken = takenHours.has(h);
            const active = selectedHour === h;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: taken, onClick: () => setSelectedHour(h), className: `rounded-sm border px-3 py-2.5 text-sm font-medium transition ${taken ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through" : active ? "border-secondary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-secondary"}`, children: [
              String(h).padStart(2, "0"),
              ":00"
            ] }, h);
          }) }),
          errors.slot && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: errors.slot })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, noValidate: true, className: "space-y-5 rounded-sm border border-border bg-card p-4 sm:p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "3. Your details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", name: "client_name", error: errors.client_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "client_email", type: "email", error: errors.client_email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", name: "client_phone", type: "tel", error: errors.client_phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { as: "textarea", label: "Briefly describe your matter (optional)", name: "matter", error: errors.matter }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-foreground", children: [
              "Attach a document (optional)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs font-normal text-muted-foreground", children: "PDF, Word, or image. Max 10 MB." })
            ] }),
            attachment ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between gap-3 rounded-sm border border-input bg-background px-4 py-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4 shrink-0 text-secondary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: attachment.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-xs text-muted-foreground", children: [
                  "(",
                  (attachment.size / 1024 / 1024).toFixed(2),
                  " MB)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAttachment(null), className: "shrink-0 rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-primary", "aria-label": "Remove attachment", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition hover:border-secondary hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Choose a file" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "sr-only", accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*", onChange: (e) => {
                const file = e.target.files?.[0] ?? null;
                if (file && file.size > MAX_ATTACHMENT_BYTES) {
                  setSubmitError("Attachment is too large. Maximum size is 10 MB.");
                  e.target.value = "";
                  return;
                }
                setSubmitError(null);
                setAttachment(file);
              } })
            ] })
          ] }),
          submitError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: submitError }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-8", children: [
            submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Confirm Booking"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  error,
  as = "input"
}) {
  const base = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring/30 transition focus:border-secondary focus:ring-2";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-foreground", children: [
    label,
    as === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name, rows: 4, maxLength: 1e3, className: base }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, className: base }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs font-normal text-destructive", children: error })
  ] });
}
export {
  BookingPage as component
};
