'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Check, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { sendContact } from '@/app/actions/send-contact'

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/AhmadFebriansyah' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmad-febriansyah/' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@ahmadfebriansyah662@gmail.com' },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget // simpan referensi form dulu, sebelum await
    setSending(true)
    setError(null)

    const formData = new FormData(form)
    const result = await sendContact({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    })

    setSending(false)

    if (result.ok) {
      setSubmitted(true)
      form.reset() // pakai variabel form, bukan e.currentTarget
      window.setTimeout(() => setSubmitted(false), 4000)
    } else {
      setError(result.error)
      window.setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Have a project in mind or just want to say hi? Drop me a message
              and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {submitted ? (
                  <><Check className="h-4 w-4" /> Message sent</>
                ) : sending ? (
                  'Sending...'
                ) : (
                  <><Send className="h-4 w-4" /> Send message</>
                )}
              </button>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
