import { parseLeadPayload } from '../schemas/leadSchema.js'
import { appendLeadToGoogleSheet } from '../services/googleSheetsService.js'
import {
  isDuplicateIdempotencyKey,
  isDuplicatePhoneSubmission,
} from '../services/duplicateDetectionService.js'

export async function createLead(req, res, next) {
  try {
    const lead = parseLeadPayload(req.body)

    // Check for duplicate idempotency key (prevents exact replays)
    if (lead.idempotencyKey && isDuplicateIdempotencyKey(lead.idempotencyKey)) {
      console.log('⚠️ [Lead] Duplicate submission detected (idempotency key):', lead.idempotencyKey)
      return res.status(409).json({
        success: false,
        message: 'This submission was already received. Please wait before submitting again.',
      })
    }

    // Prevent repeated submissions from the same phone number within 2 hours.
    if (isDuplicatePhoneSubmission(lead.phoneNumber)) {
      console.log('⚠️ [Lead] Duplicate submission detected (phone):', lead.phoneNumber)
      return res.status(409).json({
        success: false,
        message: 'A request from this phone number was already received recently. Please try again after 2 hours.',
      })
    }

    const sheetResult = await appendLeadToGoogleSheet(lead)

    return res.status(201).json({
      success: true,
      message: 'Lead received successfully.',
      data: {
        leadId: sheetResult.leadId,
        sheet: sheetResult,
      },
    })
  }
  catch (error) {
    next(error)
  }
}
