import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'
import { getProjectBySlug } from '@/lib/projects'

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjectBySlug(params.slug)

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <Link
        href="/#projects"
        className="mb-10 inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Construction className="h-7 w-7" />
      </span>

      <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {project ? project.title : 'Project'}
      </h1>
      <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
        The detailed case study for this project is coming soon. Check back later!
      </p>

      <Link
        href="/#projects"
        className="mt-8 inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        Back to all projects
      </Link>
    </main>
  )
}