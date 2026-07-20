const experiences = [
  {
    company: 'PT. Digital Solutions',
    role: 'Full Stack Developer',
    period: '2023 — Present',
    points: [
      'Built and maintained an internal web-based POS platform handling real-time sales, transactions, and inventory across multiple outlets.',
      'Designed REST APIs with Node.js and optimized SQL Server queries, cutting average report load times by over 40%.',
      'Collaborated with cross-functional teams to ship features on a weekly release cadence.',
    ],
  },
  {
    company: 'PT. Data Enterprise',
    role: 'Full Stack Developer',
    period: '2021 — 2023',
    points: [
      'Led an enterprise data migration effort moving large-scale sales databases using Apache NiFi pipelines.',
      'Developed automated reporting systems that replaced hours of manual work with scheduled, query-optimized jobs.',
      'Implemented monitoring and validation steps to guarantee data integrity across migrations.',
    ],
  },
  {
    company: 'Freelance & Contract',
    role: 'Web Developer',
    period: '2019 — 2021',
    points: [
      'Delivered responsive front-end interfaces with HTML5, CSS3, and JavaScript for small businesses.',
      'Integrated PHP and PostgreSQL back ends to power dynamic, data-driven websites.',
    ],
  },
]

export function Experience() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              01 / Experience
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Work history
            </h2>
          </div>
        </div>

        <ol className="relative border-l border-border">
          {experiences.map((exp) => (
            <li key={exp.company} className="group relative mb-12 pl-8 last:mb-0">
              <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-border transition-colors group-hover:bg-primary" />
              <div className="rounded-xl border border-transparent p-1 transition-colors group-hover:border-border group-hover:bg-card">
                <div className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {exp.company}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
