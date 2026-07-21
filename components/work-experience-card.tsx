'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WorkExperience } from '@/lib/work-experience'

type WorkExperienceCardProps = {
  experience: WorkExperience
  onDetail: (experience: WorkExperience) => void
}

export function WorkExperienceCard({
  experience,
  onDetail,
}: WorkExperienceCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="relative h-40 overflow-hidden rounded-t-2xl border-b border-border bg-white p-6">
        <Image
          src={experience.logo || '/placeholder.svg'}
          alt={`${experience.company} logo`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium leading-snug text-foreground">
          {experience.company}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {experience.period}
        </p>
        <p className="mt-3 text-sm font-medium text-primary">
          {experience.position}
        </p>

        <div className="mt-6 flex-1" />

        <Button
          variant="default"
          size="lg"
          onClick={() => onDetail(experience)}
          className="w-full"
        >
          Detail
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  )
}
