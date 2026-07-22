'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/projects'

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollStartLeft = useRef(0)
  const didDrag = useRef(false)

  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  function scrollByAmount(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('a')?.clientWidth ?? 360
    el.scrollBy({
      left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24,
      behavior: 'smooth',
    })
  }

  function handleMouseDown(e: React.MouseEvent) {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    didDrag.current = false
    dragStartX.current = e.pageX
    scrollStartLeft.current = el.scrollLeft
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    const delta = e.pageX - dragStartX.current
    if (Math.abs(delta) > 5) didDrag.current = true
    el.scrollLeft = scrollStartLeft.current - delta
  }

  function handleMouseUp() {
    setIsDragging(false)
  }

  function handleClickCapture(e: React.MouseEvent) {
    // Prevent the click-to-navigate from firing right after a drag
    if (didDrag.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Projects
          </h2>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClickCapture={handleClickCapture}
          className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pt-1 outline-none [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              draggable={false}
              className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} interface preview`}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  draggable={false}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}