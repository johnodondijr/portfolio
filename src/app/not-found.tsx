import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-muted hover:text-foreground">← Back home</Link>
    </div>
  );
}
