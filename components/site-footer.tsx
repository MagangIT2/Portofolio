export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ahmad Febriansyah
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js · Designed &amp; developed with care
        </p>
      </div>
    </footer>
  )
}
