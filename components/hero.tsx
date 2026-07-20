import { ArrowUpRight, Code2, Database, Zap, Accessibility } from 'lucide-react'

const highlights = [
  { icon: Code2, label: 'Develop' },
  { icon: Database, label: 'Data' },
  { icon: Zap, label: 'Optimize' },
  { icon: Accessibility, label: 'Accessible' },
]

export function Hero() {
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
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Ahmad
          <br />
          Febriansyah<span className="text-primary">.</span>
        </h1>

        <p className="mt-6 font-mono text-sm uppercase tracking-widest text-primary">
          Full Stack Developer
        </p>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View Work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
