'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { X, Mail, Check, Send, MapPin, Briefcase } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@ahmadfebriansyah.dev' },
]

const facts = [
  { icon: Briefcase, label: 'Full Stack Developer & Data Engineer' },
  { icon: MapPin, label: 'Based in Indonesia — available remotely' },
]

export function AboutModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    e.currentTarget.reset()
    window.setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About Ahmad Febriansyah"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />

      <div className="relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: About */}
        <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            About Me
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Ahmad Febriansyah
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            I&apos;m a full stack developer and data engineer who builds robust,
            end-to-end web applications and designs data pipelines that move and
            transform information at scale — turning messy systems into fast,
            reliable products.
          </p>

          <ul className="mt-6 space-y-3">
            {facts.map((fact) => (
              <li
                key={fact.label}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <fact.icon className="h-4 w-4 shrink-0 text-primary" />
                {fact.label}
              </li>
            ))}
          </ul>

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

        {/* Right: Send message */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Send a message
          </p>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <label
                htmlFor="modal-name"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Name
              </label>
              <input
                id="modal-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="modal-email"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="modal-message"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="modal-message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4" /> Message sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
