import Link from "next/link";
import { site } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/#work" className="hover:text-foreground">Work</Link>
          <Link href="/#about" className="hover:text-foreground">About</Link>
          <Link href="/#contact" className="hover:text-foreground">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
