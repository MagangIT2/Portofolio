'use client'
import Image from 'next/image'

import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  User,
  Briefcase,
  Wrench,
  Target,
  Heart,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { sendContact } from '@/app/actions/send-contact'

type AboutModalProps = {
  open: boolean
  onClose: () => void
}

const bioSections = [
  {
    icon: User,
    title: 'About Me',
    body: "Hi, I am Ryan, a Full Stack Developer with over 4 years of experience in building web applications and business solutions. I specialize in developing scalable web applications, optimizing SQL databases, performing database migrations, and analyzing data to deliver efficient and reliable solutions. Beyond software development, I'm passionate about sharing knowledge. I'm currently growing as a content creator, creating content about the latest trends in IT, software development, and technology to help others learn and stay updated. If you're interested in collaborating or need assistance with a project, feel free to reach out with your project details. I'd be happy to discuss how I can help. Thank you!.",
  }
]

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [feedback, setFeedback] = useState('')

  // close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  function validate(): boolean {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')
    setFeedback('')

    const result = await sendContact(values)

    if (result.ok) {
      setStatus('sent')
      setFeedback('Message sent successfully!')
      setValues({ name: '', email: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
        onClose()
      }, 1800)
    } else {
      setStatus('error')
      setFeedback(result.error)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
          aria-label="About Ahmad Febriansyah and contact form"
        >
          {/* backdrop */}
          <button
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl md:flex-row md:overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left — bio */}
            <div className="relative w-full overflow-y-auto bg-muted/50 p-8 md:w-1/2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 10%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 45%)',
                }}
              />
              <div className="relative space-y-6">
                <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"/>

                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-primary/30 shadow-xl">
                    <Image
                      src="/images/foto_diri.png"
                      alt="Ahmad Febriansyah"
                      fill
                      priority
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                {bioSections.map((section) => (
                  <div key={section.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <section.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {section.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — contact form */}
            <div className="w-full overflow-y-auto p-8 md:w-1/2">
              <div className="mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Get in touch
                </h2>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field
                  id="name"
                  label="Name"
                  value={values.name}
                  error={errors.name}
                  onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                  placeholder="Your name"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                  placeholder="you@example.com"
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) =>
                      setValues((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending' && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === 'sent' && (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Message sent!
                    </>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                {feedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                      status === 'error'
                        ? 'border-destructive/30 bg-destructive/10 text-destructive'
                        : 'border-primary/30 bg-primary/10 text-primary'
                    }`}
                  >
                    {status === 'error' ? (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    )}
                    {feedback}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  error?: string
  placeholder?: string
  type?: string
  onChange: (value: string) => void
}

function Field({
  id,
  label,
  value,
  error,
  placeholder,
  type = 'text',
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
