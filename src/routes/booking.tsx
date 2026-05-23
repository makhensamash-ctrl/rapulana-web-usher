import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
    <section className="container-prose w-full max-w-full overflow-x-hidden py-10 md:py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-6">
        <p className="eyebrow">Rapulana Attorneys</p>
        <h1 className="mt-3 text-3xl text-primary sm:text-4xl">Book a Consultation</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Pick a date and time that suits you. One-hour consultations with a senior attorney.
        </p>

        <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
          <iframe
            src={BOOKING_URL}
            title="Book a consultation with Rapulana Attorneys"
            className="h-[1400px] w-full md:h-[1200px]"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Trouble loading the form?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
            Open the booking page in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}
