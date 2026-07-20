import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Web-Based Point of Sale (POS) System',
    description:
      'An internal web application to manage real-time sales, transactions, and inventory across multiple outlets with live dashboards.',
    image: '/projects/pos-system.png',
    tech: ['Node.js', 'JavaScript', 'SQL Server', 'REST API'],
  },
  {
    title: 'Data Migration Pipeline',
    description:
      'An enterprise-level data engineering project migrating large-scale sales databases with validation and monitoring using Apache NiFi.',
    image: '/projects/data-pipeline.png',
    tech: ['Apache NiFi', 'PostgreSQL', 'ETL', 'SQL Server'],
  },
  {
    title: 'Automated Reporting System',
    description:
      'A system built to automate recurring business reports and optimize query performance, replacing hours of manual work.',
    image: '/projects/reporting-system.png',
    tech: ['PHP', 'PostgreSQL', 'Cron', 'Query Optimization'],
  },
]

export function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            02 / Projects
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Selected work
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} interface preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-medium leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
