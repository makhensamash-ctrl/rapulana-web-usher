import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SENDER_DOMAIN = 'notify.rapulana.co.za'
const FROM_HEADER = 'Rapulana Attorneys <info@rapulana.co.za>'

function serviceClient() {
  const url = process.env['SUPABASE_URL'] ?? import.meta.env.VITE_SUPABASE_URL
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY']
  if (!url || !key) throw new Error('Server misconfigured: missing Supabase credentials')
  return createClient(url, key, { auth: { persistSession: false } })
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function getOrCreateUnsubscribeToken(supabase: any, email: string): Promise<string> {
  const normalized = email.toLowerCase()
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existing && !existing.used_at) return existing.token
  const token = generateToken()
  await supabase
    .from('email_unsubscribe_tokens')
    .upsert({ token, email: normalized }, { onConflict: 'email', ignoreDuplicates: true })
  const { data: stored } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token')
    .eq('email', normalized)
    .maybeSingle()
  return stored?.token ?? token
}

/** Renders a registered template and enqueues it for delivery. */
export async function enqueueTemplateEmail(params: {
  templateName: string
  to: string
  data: Record<string, unknown>
  idempotencyKey: string
}) {
  const { templateName, to, data, idempotencyKey } = params
  const entry = TEMPLATES[templateName]
  if (!entry) throw new Error(`Template '${templateName}' not registered`)

  const supabase = serviceClient()
  const element = React.createElement(entry.component, data)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject = typeof entry.subject === 'function' ? entry.subject(data) : entry.subject

  const messageId = crypto.randomUUID()
  const unsubscribeToken = await getOrCreateUnsubscribeToken(supabase, to)

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
      unsubscribe_token: unsubscribeToken,
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
