import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { z } from "zod";
import { verifyYocoCheckout } from "@/lib/yoco.functions";

export const Route = createFileRoute("/booking/success")({
  validateSearch: z.object({ booking_id: z.string().uuid().optional() }),
  head: () => ({
    meta: [{ title: "Booking Confirmed — Rapulana Attorneys" }],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { booking_id } = Route.useSearch();
  const verify = useServerFn(verifyYocoCheckout);
  const [status, setStatus] = useState<"checking" | "paid" | "pending" | "error">("checking");

  useEffect(() => {
    if (!booking_id) {
      setStatus("error");
      return;
    }
    verify({ data: { bookingId: booking_id } })
      .then((res) => setStatus(res.status === "paid" ? "paid" : "pending"))
      .catch(() => setStatus("error"));
  }, [booking_id, verify]);

  return (
    <section className="container-prose py-16 md:py-24">
      <div className="mx-auto max-w-2xl rounded-sm border border-secondary/30 bg-secondary/5 p-6 text-center sm:p-10">
        {status === "checking" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-secondary" />
            <h1 className="mt-6 text-3xl text-primary">Confirming your payment…</h1>
          </>
        )}
        {status === "paid" && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-secondary" />
            <h1 className="mt-6 text-3xl text-primary sm:text-4xl">Booking confirmed</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you. Your payment has been received and your consultation is booked. We'll email you the details shortly.
            </p>
          </>
        )}
        {status === "pending" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 text-secondary" />
            <h1 className="mt-6 text-3xl text-primary sm:text-4xl">Payment processing</h1>
            <p className="mt-4 text-muted-foreground">
              We've received your booking but the payment is still being processed. You'll get a confirmation email shortly.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-6 text-3xl text-primary sm:text-4xl">Something went wrong</h1>
            <p className="mt-4 text-muted-foreground">
              We couldn't verify your payment. Please contact us if you were charged.
            </p>
          </>
        )}
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
