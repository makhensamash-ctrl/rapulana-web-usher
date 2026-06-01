import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SENDER_DOMAIN = 'notify.rapulana.co.za'
const FROM_HEADER = 'Rapulana Attorneys <info@rapulana.co.za>'

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(50),
  matter: z.string().trim().max(2000).optional().nullable(),
  date: z.string().trim().min(1).max(100),
  time: z.string().trim().min(1).max(50),
  bookingId: z.string().trim().min(1).max(100),
  attachmentUrl: z.string().trim().max(2000).optional().nullable(),
})

async function enqueue(params: {
  supabase: ReturnType<typeof createClient>
  templateName: string
  to: string
  data: Record<string, unknown>
  idempotencyKey: string
}) {
  const { supabase, templateName, to, data, idempotencyKey } = params
  const entry = TEMPLATES[templateName]
  if (!entry) throw new Error(`Template '${templateName}' not registered`)

  const element = React.createElement(entry.component, data)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof entry.subject === 'function' ? entry.subject(data) : entry.subject

  const messageId = crypto.randomUUID()

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: to,
    status: 'pending',
  })

  const { error } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to,
      from: FROM_HEADER,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey,
      queued_at: new Date().toISOString(),
    },
  })
  if (error) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: to,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    throw new Error(`Enqueue failed: ${error.message}`)
  }
}

export const Route = createFileRoute('/api/public/booking-emails')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        let payload: z.infer<typeof bodySchema>
        try {
          const raw = await request.json()
          const parsed = bodySchema.safeParse(raw)
          if (!parsed.success) {
            return Response.json(
              { error: 'Invalid input', issues: parsed.error.issues },
              { status: 400 },
            )
          }
          payload = parsed.data
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        try {
          // Client confirmation
          await enqueue({
            supabase,
            templateName: 'booking-confirmation',
            to: payload.email,
            idempotencyKey: `booking-confirm-${payload.bookingId}`,
            data: {
              name: payload.name,
              date: payload.date,
              time: payload.time,
              matter: payload.matter ?? undefined,
            },
          })

          // Admin notification (template has fixed `to`)
          const adminTemplate = TEMPLATES['booking-notification']
          await enqueue({
            supabase,
            templateName: 'booking-notification',
            to: adminTemplate?.to || 'info@rapulana.co.za',
            idempotencyKey: `booking-notify-${payload.bookingId}`,
            data: {
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              matter: payload.matter ?? undefined,
              date: payload.date,
              time: payload.time,
              attachmentUrl: payload.attachmentUrl ?? undefined,
            },
          })

          return Response.json({ success: true })
        } catch (err) {
          console.error('Booking emails failed', err)
          return Response.json(
            { error: err instanceof Error ? err.message : 'Failed to send' },
            { status: 500 },
          )
        }
      },
    },
  },
})
