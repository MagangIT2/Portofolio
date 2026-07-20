'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react'

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
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
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

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Skills() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [activePage, setActivePage] = useState(0)
  const drag = useRef({ startX: 0, scrollLeft: 0, moved: false })

  const scrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth')

  // Recompute the number of pages and the active dot from scroll metrics.
  const updatePagination = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollWidth, clientWidth, scrollLeft } = el
    const pages = Math.max(1, Math.round(scrollWidth / clientWidth))
    const current =
      scrollWidth - clientWidth <= 1
        ? 0
        : Math.round(scrollLeft / clientWidth)
    setPageCount(pages)
    setActivePage(Math.min(current, pages - 1))
  }, [])

  useEffect(() => {
    updatePagination()
    const el = trackRef.current
    if (!el) return
    window.addEventListener('resize', updatePagination)
    return () => window.removeEventListener('resize', updatePagination)
  }, [updatePagination])

  function goToPage(index: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: scrollBehavior() })
  }

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

  // Translate vertical wheel intent into horizontal scrolling.
  function onWheel(e: WheelEvent<HTMLDivElement>) {
    const el = trackRef.current
    if (!el) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goToPage(Math.min(activePage + 1, pageCount - 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goToPage(Math.max(activePage - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      goToPage(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goToPage(pageCount - 1)
    }
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
            Drag, swipe, scroll, or use the arrow keys to explore the
            technologies I use.
          </p>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onScroll={updatePagination}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          tabIndex={0}
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ scrollBehavior: 'smooth' }}
          role="listbox"
          aria-label="Technical skills carousel"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              role="option"
              aria-selected={false}
              className="group flex w-40 shrink-0 snap-start flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-[5px] hover:border-primary/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-5rem)/5)]"
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
                  className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                />
              </span>
              <span className="text-center text-sm font-medium text-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activePage}
                aria-label={`Go to slide ${i + 1} of ${pageCount}`}
                onClick={() => goToPage(i)}
                className={`h-2.5 rounded-full bg-foreground transition-all duration-300 ease-out motion-reduce:transition-none ${
                  i === activePage
                    ? 'w-6 opacity-100'
                    : 'w-2.5 opacity-40 hover:opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
