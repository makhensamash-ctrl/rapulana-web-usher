import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, XCircle } from "lucide-react";

export const Route = createFileRoute("/booking/cancelled")({
  head: () => ({
    meta: [{ title: "Booking Cancelled — Rapulana Attorneys" }],
  }),
  component: CancelledPage,
});

function CancelledPage() {
  return (
    <section className="container-prose py-16 md:py-24">
      <div className="mx-auto max-w-2xl rounded-sm border border-border bg-card p-6 text-center sm:p-10">
        <XCircle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-6 text-3xl text-primary sm:text-4xl">Payment cancelled</h1>
        <p className="mt-4 text-muted-foreground">
          Your payment was not completed, so your consultation has not been confirmed. You can try booking again at any time.
        </p>
        <Link
          to="/booking"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Try booking again
        </Link>
        <div className="mt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
