'use client'

import { useState } from 'react'
import { workExperience, type WorkExperience } from '@/lib/work-experience'
import { WorkExperienceCard } from '@/components/work-experience-card'
import { WorkDetailModal } from '@/components/work-detail-modal'

export function Experience() {
  const [selected, setSelected] = useState<WorkExperience | null>(null)

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            01 / Experience
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Work history
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {workExperience.map((experience) => (
            <WorkExperienceCard
              key={experience.id}
              experience={experience}
              onDetail={setSelected}
            />
          ))}
        </div>
      </div>

      <WorkDetailModal
        experience={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
