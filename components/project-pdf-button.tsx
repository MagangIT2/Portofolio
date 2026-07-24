'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { PdfViewerModal } from './pdf-viewer-modal'

export function ProjectPdfButton({ pdfUrl }: { pdfUrl: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <FileText className="h-4 w-4" />
        View PDF documentation
      </button>

      {open && <PdfViewerModal url={pdfUrl} onClose={() => setOpen(false)} />}
    </>
  )
}