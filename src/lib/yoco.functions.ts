import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const YOCO_API = "https://payments.yoco.com/api";
const CONSULTATION_FEE_CENTS = 200000; // R2000

const bookingInput = z.object({
  client_name: z.string().trim().min(2).max(100),
  client_email: z.string().trim().email().max(255),
  client_phone: z.string().trim().min(7).max(20),
  matter: z.string().trim().max(1000).nullable().optional(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  attachment_url: z.string().max(500).nullable().optional(),
  origin: z.string().url(),
});

export const createBookingAndCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => bookingInput.parse(input))
  .handler(async ({ data }) => {
    const secret = process.env.YOCO_SECRET_KEY;
    if (!secret) throw new Error("YOCO_SECRET_KEY is not configured");

    // Prevent double-booking the same slot
    const { data: existing } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .in("payment_status", ["pending", "paid"])
      .eq("starts_at", data.starts_at)
      .maybeSingle();
    if (existing) throw new Error("That time slot is no longer available.");

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        client_name: data.client_name,
        client_email: data.client_email,
        client_phone: data.client_phone,
        matter: data.matter ?? null,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        amount_cents: CONSULTATION_FEE_CENTS,
        payment_status: "pending",
        attachment_url: data.attachment_url ?? null,
      })
      .select("id")
      .single();
    if (error || !booking) throw new Error(error?.message ?? "Could not create booking");

    const res = await fetch(`${YOCO_API}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        "Idempotency-Key": booking.id,
      },
      body: JSON.stringify({
        amount: CONSULTATION_FEE_CENTS,
        currency: "ZAR",
        successUrl: `${data.origin}/booking/success?booking_id=${booking.id}`,
        cancelUrl: `${data.origin}/booking/cancelled?booking_id=${booking.id}`,
        failureUrl: `${data.origin}/booking/cancelled?booking_id=${booking.id}`,
        metadata: { bookingId: booking.id, clientEmail: data.client_email },
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Yoco checkout error", res.status, json);
      throw new Error(`Payment provider error (${res.status})`);
    }

    await supabaseAdmin
      .from("bookings")
      .update({ yoco_checkout_id: json.id })
      .eq("id", booking.id);

    return { bookingId: booking.id, redirectUrl: json.redirectUrl as string };
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
    if (!booking.yoco_checkout_id) return { status: booking.payment_status };

    const res = await fetch(`${YOCO_API}/checkouts/${booking.yoco_checkout_id}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Yoco verify error", res.status, json);
      throw new Error(`Verification failed (${res.status})`);
    }

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
