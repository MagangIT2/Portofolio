import { cn } from '@/lib/utils'

export function AfLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 40"
      fill="none"
      role="img"
      aria-label="AF monogram"
      className={cn('h-7 w-auto', className)}
    >
      {/* A - angular chevron peak with crossbar */}
      <path
        d="M2 36 L15 4 L28 36"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 24 H21.5"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* F - built from the accent color */}
      <path
        d="M34 36 V4 H50"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 20 H46"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
