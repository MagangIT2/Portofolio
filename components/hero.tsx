'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
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

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 md:pt-44">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-8">
          {/* Left column — content */}
          <div className="flex-1">
            <motion.p
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mb-5 font-mono text-sm uppercase tracking-widest text-primary"
            >
              Full Stack Developer
            </motion.p>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-balance text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Ahmad
              <br />
              Febriansyah<span className="text-primary">.</span>
            </motion.h1>

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

          {/* Middle column — floating profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border bg-card shadow-2xl sm:h-64 sm:w-64 md:h-72 md:w-72">
                <Image
                  src="/images/profile.png"
                  alt="Portrait of Ahmad Febriansyah"
                  fill
                  sizes="(min-width: 768px) 288px, 224px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — vertical social rail */}
          <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-row items-center justify-center gap-3 lg:flex-col"
          >
            {socials.map((social) => (
              <li key={social.label} className="group relative">
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
                {/* tooltip */}
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 lg:left-auto lg:right-full lg:top-1/2 lg:mt-0 lg:mr-2 lg:-translate-x-0 lg:-translate-y-1/2">
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
