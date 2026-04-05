import { useState } from 'react'
import styles from './ContactPage.module.css'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

const getApiBaseUrl = () => {
  const envUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()
  if (envUrl) {
    if (/^https?:\/\//i.test(envUrl)) {
      try {
        const url = new URL(envUrl)
        if (import.meta.env.PROD && !LOCAL_HOSTS.has(url.hostname)) {
          url.protocol = 'https:'
        }
        return url.toString().replace(/\/+$/, '')
      } catch {
        return envUrl.replace(/\/+$/, '')
      }
    }

    return import.meta.env.PROD ? `https://${envUrl.replace(/\/+$/, '')}` : envUrl.replace(/\/+$/, '')
  }

  const hostname = window.location.hostname
  const isLocalHost = LOCAL_HOSTS.has(hostname)

  if (import.meta.env.PROD) {
    console.error('Missing VITE_API_BASE_URL in production. Set it to your HTTPS backend origin.')
    return ''
  }

  if (!isLocalHost) {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
    return `${protocol}//${hostname}:8080`
  }

  return 'http://localhost:8080'
}

const API_BASE_URL = getApiBaseUrl()
const IS_API_CONFIGURED = Boolean(API_BASE_URL)

const CLINIC_PHONE = '+91 8329467612'
const CLINIC_PHONE_HREF = 'tel:+918329467612'
const CLINIC_EMAIL = 'drkapuresclinic1@gmail.com'
const CLINIC_EMAIL_HREF = 'mailto:drkapuresclinic1@gmail.com'

const infoItems = [
  {
    label: 'Working Hours',
    value: 'Morning 10:00 AM to 2:00 PM and Evening 5:00 PM to 9:00 PM. Sunday by prior appointment.',
  },
  {
    label: 'Location',
    value: 'Shivaji Park Trail, Sambhajinagar, Chinchwad, Pune, Vitthal Nagar, Maharashtra 411019, India.',
  },
  {
    label: 'Phone',
    value: CLINIC_PHONE,
    href: CLINIC_PHONE_HREF,
  },
  {
    label: 'Email',
    value: CLINIC_EMAIL,
    href: CLINIC_EMAIL_HREF,
  },
  {
    label: 'Appointment Policy',
    value: 'Please share your concern in advance. Timely arrival helps us serve you better.',
  },
]

const serviceOptions = [
  'Skin Consultation',
  'Hair Treatment',
  'Laser Treatment',
  'Follow-up Visit',
  'General Inquiry',
]

export default function ContactInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')

  const generateIdempotencyKey = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const rawPhone = String(formData.get('phoneNumber') || '').trim()
    const normalizedPhone = rawPhone
    const emailAddress = String(formData.get('emailAddress') || '').trim()

    setSubmitStatus('idle')
    setSubmitProgress('')
    setSubmitMessage('')

    if (!/^\d{10}$/.test(normalizedPhone)) {
      setSubmitStatus('error')
      setSubmitMessage('Phone number must be exactly 10 digits.')
      return
    }

    if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(emailAddress)) {
      setSubmitStatus('error')
      setSubmitMessage('Only @gmail.com email addresses are allowed.')
      return
    }

    if (!IS_API_CONFIGURED) {
      setSubmitStatus('error')
      setSubmitMessage('Booking is temporarily unavailable due to configuration. Please call +91 83294 67612.')
      return
    }

    const payload = {
      fullName: String(formData.get('fullName') || '').trim(),
      phoneNumber: normalizedPhone,
      emailAddress,
      serviceType: String(formData.get('serviceType') || '').trim(),
      additionalInfo: String(formData.get('additionalInfo') || '').trim(),
      sourcePage: 'contact',
      consent: formData.get('consent') === 'on',
      idempotencyKey: generateIdempotencyKey(),
    }

    let timeoutId

    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')
      setSubmitMessage('')
      setSubmitProgress('Submitting your request...')

      const controller = new AbortController()
      timeoutId = window.setTimeout(() => controller.abort(), 12000)

      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result?.success) {
        const errorMessage = result?.errors?.[0]?.message || result?.message || 'Unable to submit your request right now.'
        throw new Error(errorMessage)
      }

      const storedInSheet = result?.data?.sheet?.storedInSheet === true

      setSubmitStatus('success')
      setSubmitProgress('')
      setSubmitMessage(
        storedInSheet
          ? 'Your appointment request has been submitted. Our team will contact you shortly.'
          : 'Your request was received successfully. Our team will contact you shortly.',
      )
      form.reset()
    }
    catch (error) {
      const rawMessage = String(error?.message || '').toLowerCase()
      const isTimedOut = error?.name === 'AbortError'
      const isBackendUnavailable =
        isTimedOut
        || rawMessage.includes('aborted')
        || rawMessage.includes('failed to fetch')
        || rawMessage.includes('networkerror')
        || rawMessage.includes('network request failed')
        || rawMessage.includes('load failed')

      setSubmitStatus('error')
      setSubmitProgress('')
      setSubmitMessage(
        isBackendUnavailable
          ? 'Our booking server is temporarily unavailable. Please call us at +91 83294 67612 or try again in a few minutes.'
          : (error.message || 'Submission failed. Please try again in a moment.')
      )
      // Clear form on error too (e.g., duplicate submission, rate limit)
      form.reset()
    }
    finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <aside className={styles.infoPanel}>
            <h2 className={styles.infoPanelTitle}>Clinic Information</h2>
            {infoItems.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <p className={styles.infoLabel}>{item.label}</p>
                <p className={styles.infoValue}>
                  {item.href ? (
                    <a className={styles.infoLink} href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            ))}
          </aside>

          <section className={styles.formPanel} aria-label="Appointment form">
            <h2 className={styles.formTitle}>Request an Appointment</h2>

            <form onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="fullName">Full Name</label>
                <input className={styles.fieldControl} id="fullName" name="fullName" type="text" required disabled={isSubmitting} />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="phoneNumber">Phone Number</label>
                <input
                  className={styles.fieldControl}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  pattern="^\d{10}$"
                  title="Enter exactly 10 digits"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="emailAddress">Email Address</label>
                <input
                  className={styles.fieldControl}
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  pattern="^[A-Za-z0-9._%+-]+@gmail\.com$"
                  title="Only @gmail.com email addresses are allowed"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="serviceType">Service Interested In</label>
                <select className={styles.fieldControl} id="serviceType" name="serviceType" defaultValue="" required disabled={isSubmitting}>
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="additionalInfo">Additional Information</label>
                <textarea className={styles.fieldControl} id="additionalInfo" name="additionalInfo" rows={4} placeholder="Tell us more about your concern" disabled={isSubmitting} />
              </div>

              <div className={styles.formField}>
                <label className={styles.consentWrap} htmlFor="consent">
                  <input id="consent" name="consent" type="checkbox" required disabled={isSubmitting} />
                  <span>I agree to be contacted by the clinic regarding this request.</span>
                </label>
              </div>

              <button className={styles.submitBtn} type="submit" disabled={isSubmitting || !IS_API_CONFIGURED}>
                {isSubmitting ? (
                  <span className={styles.submitBtnContent}>
                    <span className={styles.loadingDot} aria-hidden="true" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </button>

              {!IS_API_CONFIGURED ? (
                <p className={`${styles.submitMessage} ${styles.submitError}`} aria-live="polite">
                  Booking service is not configured. Please call +91 83294 67612.
                </p>
              ) : null}

              {isSubmitting && submitProgress ? (
                <p className={styles.submitProgress} aria-live="polite">
                  {submitProgress}
                </p>
              ) : null}

              {submitMessage ? (
                <p
                  className={`${styles.submitMessage} ${
                    submitStatus === 'success' ? styles.submitSuccess : styles.submitError
                  }`}
                  aria-live="polite"
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      </div>
    </section>
  )
}
