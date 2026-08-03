import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const decideBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        bookingId: z.string().uuid(),
        decision: z.enum(["accepted", "declined"]),
        note: z.string().trim().max(1000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { enqueueTemplateEmail } = await import("@/lib/email/enqueue.server");
    const { TEMPLATES } = await import("@/lib/email-templates/registry");

    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden: admin role required");

    const { data: booking, error: readError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", data.bookingId)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!booking) throw new Error("Booking not found");

    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({ payment_status: data.decision })
      .eq("id", data.bookingId);
    if (updateError) throw new Error(updateError.message);

    const starts = new Date(booking.starts_at);
    const dateStr = starts.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Johannesburg",
    });
    const timeStr = starts.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Johannesburg",
    });

    const emailErrors: string[] = [];

    try {
      await enqueueTemplateEmail({
        templateName: "booking-decision",
        to: booking.client_email,
        idempotencyKey: `booking-${data.decision}-client-${booking.id}`,
        data: {
          name: booking.client_name,
          date: dateStr,
          time: timeStr,
          decision: data.decision,
          note: data.note,
        },
      });
    } catch (err) {
      emailErrors.push(err instanceof Error ? err.message : "client email failed");
    }

    try {
      await enqueueTemplateEmail({
        templateName: "booking-decision-admin",
        to: TEMPLATES["booking-decision-admin"]?.to || "info@rapulana.co.za",
        idempotencyKey: `booking-${data.decision}-admin-${booking.id}`,
        data: {
          name: booking.client_name,
          email: booking.client_email,
          phone: booking.client_phone,
          date: dateStr,
          time: timeStr,
          decision: data.decision,
          note: data.note,
          actedBy: (context.claims as { email?: string } | undefined)?.email,
        },
      });
    } catch (err) {
      emailErrors.push(err instanceof Error ? err.message : "admin email failed");
    }

    return {
      success: true,
      decision: data.decision,
      emailErrors,
    };
  });
