"use client";

import { useEffect } from "react";

const revealSelector =
  ".about__text, .about__media, .services__head, .service-card, .work__inner, .process__list li, .testimonials, .faq, .contact > *";

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

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return null;
}
