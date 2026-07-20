'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  GithubIcon,
  LinkedinIcon,
  TiktokIcon,
  WhatsappIcon,
} from '@/components/brand-icons'
import { AboutModal } from '@/components/about-modal'

// placeholder URLs
const github_url = 'https://github.com'
const linkedin_url = 'https://linkedin.com'
const tiktok_url = 'https://tiktok.com'
const whatsapp_url = 'https://wa.me/000000000'

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: github_url },
  { icon: LinkedinIcon, label: 'LinkedIn', href: linkedin_url },
  { icon: TiktokIcon, label: 'TikTok', href: tiktok_url },
  { icon: WhatsappIcon, label: 'WhatsApp', href: whatsapp_url },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      {/* subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[75%_25%] lg:grid-cols-[80%_20%]">
          {/* LEFT — main hero content (80%) */}
          <div>
            <motion.h1
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-balance text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Ahmad Febriansyah<span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-6 font-mono text-lg uppercase tracking-widest text-primary sm:text-xl"
            >
              Full Stack Developer
            </motion.p>

            <motion.div
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-10"
            >
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                About Me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT — vertical social bar (20%) */}
          <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-row items-center justify-center gap-4 md:flex-col"
          >
            {socials.map((social) => (
              <li key={social.label} className="group relative">
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_-2px_var(--primary)]"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
                {/* tooltip */}
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:left-auto md:right-full md:top-1/2 md:mr-2 md:mt-0 md:-translate-y-1/2 md:translate-x-0">
                  {social.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <AboutModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
