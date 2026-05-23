import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, ExternalLink } from "lucide-react";

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

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/70f5bc35f4354e1ba458f8d1f4d28616@rapulana.co.za/meetingtype/eSpSk0ROK024pj7t-WEOfg2?bookingcode=0b88ffc2-77cb-4b64-bf82-a9464a952d13&anonymous&ismsaljsauthenabled&ep=mlink";

function BookingPage() {
  return (
    <section className="container-prose w-full max-w-full overflow-x-hidden py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <p className="eyebrow">Rapulana Attorneys</p>
        <h1 className="mt-3 text-3xl text-primary sm:text-4xl md:text-5xl">Book a Consultation</h1>
        <p className="mt-5 text-muted-foreground">
          Pick a date and time that suits you. One-hour consultations with a senior attorney,
          booked through our secure Microsoft Bookings page.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-sm border border-border bg-card p-5 text-left">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">60 minutes</p>
              <p className="text-sm text-muted-foreground">Hourly consultation with a senior attorney.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-sm border border-border bg-card p-5 text-left">
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Mon – Fri</p>
              <p className="text-sm text-muted-foreground">Choose any open slot that suits you.</p>
            </div>
          </div>
        </div>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
        >
          Open Booking Page
          <ExternalLink className="h-4 w-4" />
        </a>

        <p className="mt-4 text-xs text-muted-foreground">
          Opens in a new tab on outlook.office.com
        </p>
      </div>
    </section>
  );
}
