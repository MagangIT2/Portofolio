'use server'

import { Resend } from 'resend'

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string }

type ContactPayload = {
  name: string
  email: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const message = payload.message?.trim() ?? ''

  // Server-side validation (never trust the client)
  if (!name || !email || !message) {
    return { ok: false, error: 'All fields are required.' }
  }
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      ok: false,
      error: 'Email service is not configured. Please try again later.',
    }
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      // Resend's shared onboarding sender works without domain verification.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ahmadfebriansyah662@gmail.com'],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    })

    if (error) {
      console.log('[v0] Resend error:', error)
      return { ok: false, error: 'Failed to send message. Please try again.' }
    }

    return { ok: true }
  } catch (err) {
    console.log('[v0] sendContact exception:', err)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
