'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WorkExperience } from '@/lib/work-experience'

type WorkDetailModalProps = {
  experience: WorkExperience | null
  onClose: () => void
}

export function WorkDetailModal({ experience, onClose }: WorkDetailModalProps) {
  useEffect(() => {
    if (!experience) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [experience, onClose])

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
          aria-label={`${experience.company} details`}
        >
          {/* backdrop */}
          <button
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur-xl"
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

            {/* Header */}
            <div className="px-8 pb-6 pt-8">
              <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {experience.company}
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">
                {experience.position}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {experience.period}
              </p>
            </div>

            <div className="border-t border-border" />

            {/* Responsibilities */}
            <div className="overflow-y-auto px-8 py-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
                Job Responsibilities
              </h3>
              <ul className="space-y-3">
                {experience.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-8 py-4">
              <div className="flex justify-end">
                <Button variant="outline" size="lg" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
