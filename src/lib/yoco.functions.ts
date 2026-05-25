import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const YOCO_API = "https://payments.yoco.com/api";

export const createYocoCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      bookingId: z.string().uuid(),
      origin: z.string().url(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const secret = process.env.YOCO_SECRET_KEY;
    if (!secret) throw new Error("YOCO_SECRET_KEY is not configured");

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("id, client_email, amount_cents, payment_status")
      .eq("id", data.bookingId)
      .single();
    if (error || !booking) throw new Error("Booking not found");
    if (booking.payment_status === "paid") throw new Error("Booking already paid");

    const res = await fetch(`${YOCO_API}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        "Idempotency-Key": booking.id,
      },
      body: JSON.stringify({
        amount: booking.amount_cents || 200000,
        currency: "ZAR",
        successUrl: `${data.origin}/booking/success?booking_id=${booking.id}`,
        cancelUrl: `${data.origin}/booking/cancelled?booking_id=${booking.id}`,
        failureUrl: `${data.origin}/booking/cancelled?booking_id=${booking.id}`,
        metadata: { bookingId: booking.id, clientEmail: booking.client_email },
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error("Yoco checkout error", res.status, json);
      throw new Error(`Yoco checkout failed (${res.status})`);
    }

    await supabaseAdmin
      .from("bookings")
      .update({ yoco_checkout_id: json.id })
      .eq("id", booking.id);

    return { redirectUrl: json.redirectUrl as string, checkoutId: json.id as string };
  });

export const verifyYocoCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ bookingId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const secret = process.env.YOCO_SECRET_KEY;
    if (!secret) throw new Error("YOCO_SECRET_KEY is not configured");

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("id, yoco_checkout_id, payment_status")
      .eq("id", data.bookingId)
      .single();
    if (error || !booking) throw new Error("Booking not found");
    if (booking.payment_status === "paid") return { status: "paid" as const };
    if (!booking.yoco_checkout_id) return { status: booking.payment_status as string };

    const res = await fetch(`${YOCO_API}/checkouts/${booking.yoco_checkout_id}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Yoco verify error", res.status, json);
      throw new Error(`Yoco verification failed (${res.status})`);
    }

    // Yoco statuses: "created" | "completed" | "cancelled" (or processing)
    let payment_status = booking.payment_status;
    if (json.status === "completed") payment_status = "paid";
    else if (json.status === "cancelled") payment_status = "cancelled";

    if (payment_status !== booking.payment_status) {
      await supabaseAdmin
        .from("bookings")
        .update({ payment_status, payfast_pf_payment_id: json.paymentId ?? null })
        .eq("id", booking.id);
    }

    return { status: payment_status };
  });
