import sgMail from '@sendgrid/mail'
import type { ContactFormData } from './schemas/contact'

const ADMIN_EMAIL = 'edogola4@gmail.com'

function getSendGridKey(): string | undefined {
  return process.env.SENDGRID_API_KEY
}

export async function sendInquiryNotification(data: ContactFormData): Promise<void> {
  const key = getSendGridKey()
  if (!key) {
    console.warn('SENDGRID_API_KEY not set; skipping notification email')
    return
  }
  try {
    sgMail.setApiKey(key)
    const subject = `New inquiry from ${data.name} — ${data.projectType}`
    const bodyLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company ?? ''}`,
      `Project type: ${data.projectType}`,
      `Budget range: ${data.budgetRange ?? ''}`,
      `Timeline: ${data.timeline ?? ''}`,
      '',
      'Project brief:',
      data.brief,
    ]

    await sgMail.send({
      to: ADMIN_EMAIL,
      from: ADMIN_EMAIL,
      subject,
      text: bodyLines.join('\n'),
    })
  } catch (e) {
    console.warn('Failed to send notification email', e)
  }
}

export async function sendInquiryAcknowledgement(data: ContactFormData): Promise<void> {
  const key = getSendGridKey()
  if (!key) {
    console.warn('SENDGRID_API_KEY not set; skipping acknowledgement email')
    return
  }
  try {
    sgMail.setApiKey(key)
    const subject = `Thanks for reaching out, ${data.name}`
    const body = `Thanks for getting in touch. I've received your message and will respond within 2 business days. — Brandon Ogola`
    await sgMail.send({
      to: data.email,
      from: ADMIN_EMAIL,
      subject,
      text: body,
    })
  } catch (e) {
    console.warn('Failed to send acknowledgement email', e)
  }
}
