import Link from "next/link";

export default function NotFound() {
  return (
    <section className="contact">
      <h1 className="contact__title">Page not found</h1>
      <Link href="/" className="btn">
        Back home <span>→</span>
      </Link>
    </section>
  );
}
