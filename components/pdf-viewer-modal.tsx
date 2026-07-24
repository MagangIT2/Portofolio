'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export function PdfViewerModal({
  url,
  onClose,
}: {
  url: string
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-medium text-foreground">Project documentation</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close PDF viewer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <iframe
          src={url}
          title="Project PDF"
          className="h-full w-full flex-1"
        />
      </div>
    </div>
  )
}