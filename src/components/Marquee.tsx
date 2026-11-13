"use client";

import { useEffect, useRef, type ReactNode } from "react";

const BASE_SPEED = 40; // px per second when the page is still
const CALM_SPEED = 30; // steady speed for visitors who prefer reduced motion
const BOOST = 0.9; // how strongly scroll speed adds to the banner speed
const MAX_SPEED = 900;

// Scrolls its children sideways and speeds up while the page is being scrolled.
// Visitors who prefer reduced motion get a slow, steady roll with no surge, and hovering
// glides the banner to a stop so it can be read. The track holds two copies of the
// content, so wrapping at half its width is seamless.
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !root.current) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = calm ? CALM_SPEED : BASE_SPEED;
    const boost = calm ? 0 : BOOST;

    el.style.animation = "none";
    let x = -el.scrollWidth / 2;
    let speed = base;
    let hovered = false;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let frame = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const y = window.scrollY;
      const scrollSpeed = Math.abs(y - lastY) / Math.max(dt, 0.001);
      lastY = y;
      const target = hovered ? 0 : Math.min(base + scrollSpeed * boost, MAX_SPEED);
      // Ease toward the target so the banner surges and then glides back down.
      speed += (target - speed) * (target > speed ? 0.25 : 0.05);
      const half = el.scrollWidth / 2;
      x += speed * dt;
      if (x >= 0) x -= half;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      if (visible) frame = requestAnimationFrame(tick);
    };

    // Only run while the banner is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        lastT = performance.now();
        lastY = window.scrollY;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(root.current);
    // Only a mouse pauses it: a tap on a phone may never send the matching "leave".
    const hold = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const release = () => (hovered = false);
    root.current.addEventListener("pointerenter", hold);
    root.current.addEventListener("pointerleave", release);
    const node = root.current;
    return () => {
      node.removeEventListener("pointerenter", hold);
      node.removeEventListener("pointerleave", release);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="marquee" aria-label={label} ref={root}>
      <div className="marquee__track" ref={track}>
        {children}
      </div>
    </div>
  );
}
