import { z } from 'zod'

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phoneNumber: z.string().trim().regex(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 digits.',
  }),
  emailAddress: z.string().trim().email().refine((email) => email.toLowerCase().endsWith('@gmail.com'), {
    message: 'Only @gmail.com email addresses are allowed.',
  }),
  serviceType: z.string().trim().min(2).max(100),
  additionalInfo: z.string().trim().max(1000).optional().default(''),
  sourcePage: z.string().trim().max(120).optional().default('contact'),
  consent: z.boolean(),
  idempotencyKey: z.string().trim().optional(),
}).refine((data) => data.consent === true, {
  message: 'Consent is required before submitting the form.',
  path: ['consent'],
})

export function parseLeadPayload(payload) {
  return leadSchema.parse(payload)
}
