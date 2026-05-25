import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Yoco uses Svix-style webhook signatures
// Headers: webhook-id, webhook-timestamp, webhook-signature
// Signature: base64(HMAC_SHA256(secret_bytes, `${id}.${timestamp}.${body}`))
// Where secret_bytes = base64decode(YOCO_WEBHOOK_SECRET without the "whsec_" prefix)

function verifySignature(opts: {
  secret: string;
  id: string;
  timestamp: string;
  body: string;
  header: string;
}): boolean {
  const rawSecret = opts.secret.startsWith("whsec_") ? opts.secret.slice(6) : opts.secret;
  let key: Buffer;
  try {
    key = Buffer.from(rawSecret, "base64");
  } catch {
    key = Buffer.from(rawSecret, "utf8");
  }
  const signed = `${opts.id}.${opts.timestamp}.${opts.body}`;
  const expected = createHmac("sha256", key).update(signed).digest("base64");

  // Header looks like: "v1,<sig1> v1,<sig2>"
  const sigs = opts.header.split(" ").map((s) => s.split(",")[1]).filter(Boolean);
  return sigs.some((s) => {
    try {
      const a = Buffer.from(s);
      const b = Buffer.from(expected);
      return a.length === b.length && timingSafeEqual(a, b);
    } catch {
      return false;
    }
  });
}

export const Route = createFileRoute("/api/public/yoco-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.YOCO_WEBHOOK_SECRET;
        if (!secret) return new Response("Webhook not configured", { status: 500 });

        const id = request.headers.get("webhook-id");
        const timestamp = request.headers.get("webhook-timestamp");
        const signature = request.headers.get("webhook-signature");
        const body = await request.text();

        if (!id || !timestamp || !signature) {
          return new Response("Missing signature headers", { status: 400 });
        }
        if (!verifySignature({ secret, id, timestamp, body, header: signature })) {
          return new Response("Invalid signature", { status: 401 });
        }

        const payload = JSON.parse(body) as {
          type?: string;
          payload?: {
            metadata?: { bookingId?: string };
            checkoutId?: string;
            status?: string;
            id?: string;
          };
        };

        const bookingId = payload.payload?.metadata?.bookingId;
        const checkoutId = payload.payload?.checkoutId;
        const eventType = payload.type || "";

        if (!bookingId && !checkoutId) {
          return new Response("ok", { status: 200 });
        }

        let payment_status: string | null = null;
        if (eventType.includes("succeeded") || payload.payload?.status === "successful") {
          payment_status = "paid";
        } else if (eventType.includes("failed") || payload.payload?.status === "failed") {
          payment_status = "failed";
        }

        if (payment_status) {
          const query = supabaseAdmin.from("bookings").update({
            payment_status,
            payfast_pf_payment_id: payload.payload?.id ?? null,
          });
          if (bookingId) await query.eq("id", bookingId);
          else if (checkoutId) await query.eq("yoco_checkout_id", checkoutId);
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
