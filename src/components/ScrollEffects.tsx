"use client";

import { useEffect } from "react";

const revealSelector =
  ".about__text, .about__media, .services__head, .service-card, .work__inner, .process__list li, .testimonials, .faq, .contact > :not(.contact__title)";

// Fade sections in as they scroll into view, and count up the [data-count] stats.
export function ScrollEffects() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(revealSelector);
    revealEls.forEach((el) => el.classList.add("reveal"));
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // Headings built with SplitWords slide their words up once they scroll into view.
    const splitObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          splitObserver.unobserve(entry.target);
        }),
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-split]").forEach((el) => splitObserver.observe(el));

    const countObserver = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      }),
    );
    document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

    // Desktop depth: the hero text scrolls a little slower than the page, so the photo rises in front of it.
    const layers = [...document.querySelectorAll<HTMLElement>(".hero__name, .hero__intro, .hero__meta, .floaters")];
    const hero = document.querySelector<HTMLElement>(".hero");
    const wide = window.matchMedia("(min-width: 761px) and (min-aspect-ratio: 4/5)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const parallax = () => {
      frame = 0;
      if (!hero) return;
      const y = window.scrollY;
      const on = wide.matches && !still.matches;
      const shift = on ? `translate3d(0, ${(Math.min(y, hero.offsetHeight) * 0.35).toFixed(1)}px, 0)` : "";
      // The side text fades out before it can drift over the dark jacket.
      const fade = on ? String(Math.max(0, 1 - y / 420).toFixed(3)) : "";
      layers.forEach((el) => {
        el.style.transform = shift;
        if (!el.classList.contains("hero__name")) el.style.opacity = fade;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(parallax);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    parallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      splitObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return null;
}
