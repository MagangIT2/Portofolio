'use client'

import { useRef, useState, type PointerEvent } from 'react'

type Skill = {
  name: string
  src: string
}

// Official logos from Devicon / Simple Icons for a consistent look.
const skills: Skill[] = [
  {
    name: 'Laravel',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    name: 'PHP',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    name: 'C#',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: '.NET',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  },
  {
    name: 'Apache NiFi',
    src: '/icons/apache-nifi.svg',
  },
  {
    name: 'JavaScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'jQuery',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  },
  {
    name: 'Database',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
  {
    name: 'HTML5',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
]

export function Skills() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const drag = useRef({ startX: 0, scrollLeft: 0, moved: false })

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = trackRef.current
    if (!el) return
    setIsDragging(true)
    drag.current.moved = false
    drag.current.startX = e.clientX
    drag.current.scrollLeft = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = trackRef.current
    if (!el || !isDragging) return
    const delta = e.clientX - drag.current.startX
    if (Math.abs(delta) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.scrollLeft - delta
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const el = trackRef.current
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId)
    }
    setIsDragging(false)
  }

  return (
    <section
      id="skills"
      className="border-b border-border bg-[#F1F5F9] dark:bg-[#1E293B]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            03 / Skills
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Tools I work with
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Drag or scroll horizontally to explore the technologies I use.
          </p>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          role="list"
          aria-label="Technical skills"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              role="listitem"
              className="group flex w-40 shrink-0 snap-start flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-[5px] hover:border-primary/40 hover:shadow-lg"
            >
              <span className="flex h-16 w-16 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.src || '/placeholder.svg'}
                  alt={`${skill.name} logo`}
                  width={56}
                  height={56}
                  draggable={false}
                  loading="lazy"
                  className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="text-center text-sm font-medium text-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
