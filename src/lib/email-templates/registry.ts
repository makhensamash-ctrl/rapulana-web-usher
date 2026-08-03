import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as bookingConfirmation } from './booking-confirmation'
import { template as bookingNotification } from './booking-notification'
import { template as bookingDecision } from './booking-decision'
import { template as bookingDecisionAdmin } from './booking-decision-admin'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-confirmation': bookingConfirmation,
  'booking-notification': bookingNotification,
  'booking-decision': bookingDecision,
  'booking-decision-admin': bookingDecisionAdmin,
}

