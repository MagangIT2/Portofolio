import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { projects, getProjectBySlug } from '@/lib/projects'
import { ProjectPdfButton } from '@/components/project-pdf-button'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

    return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`${project.title} interface preview`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {project.title}
      </h1>

      {project.tech && project.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(project.longDescription || project.description) && (
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          {project.longDescription || project.description}
        </p>
      )}

      {project.pdfUrl && <ProjectPdfButton pdfUrl={project.pdfUrl} />}
    </main>
  )
}