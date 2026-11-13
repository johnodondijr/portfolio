"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Testimonial } from "@/lib/data";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const updateProgress = useCallback(() => {
    const t = track.current;
    if (!t || !bar.current) return;
    const visible = t.clientWidth / t.scrollWidth;
    const scrolled = t.scrollLeft / (t.scrollWidth - t.clientWidth || 1);
    bar.current.style.width = (visible + (1 - visible) * scrolled) * 100 + "%";
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const scroll = (dir: number) => {
    const card = track.current?.querySelector<HTMLElement>(".quote");
    if (card) track.current!.scrollBy({ left: (card.offsetWidth + 24) * dir, behavior: "smooth" });
  };

  return (
    <section className="testimonials section">
      <div className="testimonials__panel">
        <div className="testimonials__head">
          <div>
            <h2 className="h2">Testimonials</h2>
            <p className="muted small">
              Kind words from some of the brands
              <br />
              I&apos;ve had the pleasure of designing for.
            </p>
          </div>
          <div className="arrows">
            <button className="arrow" aria-label="Previous" onClick={() => scroll(-1)}>
              ←
            </button>
            <button className="arrow arrow--dark" aria-label="Next" onClick={() => scroll(1)}>
              →
            </button>
          </div>
        </div>

        <div className="testimonials__track" ref={track} onScroll={updateProgress}>
          {items.map((t) => (
            <blockquote key={t.id} className="quote">
              <div className="quote__brand">
                <span className="quote__logo">{t.brand.charAt(0)}</span>
                {t.brand}
              </div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <cite>{t.brand}</cite>
            </blockquote>
          ))}
        </div>
        <div className="progress">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
