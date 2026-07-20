import { Layout, Server } from 'lucide-react'

const categories = [
  {
    icon: Layout,
    title: 'Front-End',
    description: 'Building responsive, accessible interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Modern UI Libraries'],
  },
  {
    icon: Server,
    title: 'Back-End & Data',
    description: 'Powering apps and moving data at scale.',
    skills: ['PHP', 'Node.js', 'SQL Server', 'PostgreSQL', 'Apache NiFi'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            03 / Skills
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Tools I work with
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </div>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
