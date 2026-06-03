import { Resend } from 'resend'
import type { ContactFormData } from './schemas/contact'
import logger from './logger'

const ADMIN_EMAIL = 'edogola4@gmail.com'
const FROM = 'onboarding@resend.dev'

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    logger.warn('RESEND_API_KEY not set — skipping email')
    return null
  }
  return new Resend(key)
}

export async function sendInquiryNotification(data: ContactFormData): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — ${data.projectType}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company ?? '—'}`,
        `Project type: ${data.projectType}`,
        `Budget range: ${data.budgetRange ?? '—'}`,
        `Timeline: ${data.timeline ?? '—'}`,
        '',
        'Project brief:',
        data.brief,
      ].join('\n'),
    })
    if (error) logger.error({ err: error }, 'resend notification error')
  } catch (e) {
    logger.error({ err: e }, 'failed to send inquiry notification email')
  }
}

export async function sendInquiryAcknowledgement(data: ContactFormData): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: ADMIN_EMAIL,
      subject: `Thanks for reaching out, ${data.name}`,
      text: `Thanks for getting in touch. I've received your message and will respond within 2 business days.\n\n— Brandon Ogola\nedogola4@gmail.com`,
    })
    if (error) logger.error({ err: error }, 'resend acknowledgement error')
  } catch (e) {
    logger.error({ err: e }, 'failed to send inquiry acknowledgement email')
  }
}
