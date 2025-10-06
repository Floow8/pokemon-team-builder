export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Construit avec{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Next.js
          </a>
          {' · '}
          API par{' '}
          <a
            href="https://tyradex.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Tyradex
          </a>
          {' · '}
          UI avec{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            shadcn/ui
          </a>
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Pokédex Team Builder
        </p>
      </div>
    </footer>
  );
}
