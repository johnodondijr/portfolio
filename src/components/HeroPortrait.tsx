"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AppIcon } from "./AppIcon";
import { OptionalImage } from "./OptionalImage";

// Design apps that float around the portrait. x/y (desktop) and mx/my (phones) are each
// icon's preferred spot as % of the portrait box; placeFloaters moves it to the nearest spot
// that keeps clear of the face, the GRAPHIC DESIGNER line, the intro panels, the pills and
// the nav. depth sets how far each one leans with the mouse.
const floaters = [
  { name: "Adobe Photoshop", x: 22, y: 6, mx: 9, my: 26, rot: -8, dur: 6.2, depth: 1.3 },
  { name: "Figma", x: 78, y: 3, mx: 91, my: 22, rot: 7, dur: 5.4, depth: 0.8 },
  { name: "Adobe Illustrator", x: 17, y: 58, mx: 8, my: 50, rot: 6, dur: 6.8, depth: 1.0 },
  { name: "Canva", x: 83, y: 55, mx: 92, my: 47, rot: -6, dur: 5.9, depth: 1.4 },
  { name: "After Effects", x: 6, y: 84, mx: 8, my: 74, rot: -5, dur: 7.2, depth: 0.7 },
  { name: "InDesign", x: 94, y: 84, mx: 92, my: 72, rot: 8, dur: 6.5, depth: 1.1 },
];

type Box = { left: number; top: number; right: number; bottom: number };

const CLEARANCE = 30; // px kept free around each icon, covering its drift and mouse lean
const STEP = 6; // px between candidate spots

const overlaps = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

// Put each floating icon at the free spot closest to its preferred position.
function placeFloaters(root: HTMLElement) {
  const hero = root.closest<HTMLElement>(".hero");
  const img = root.querySelector("img");
  const layer = root.querySelector<HTMLElement>(".floaters");
  if (!hero || !img || !layer || !img.naturalWidth) return;
  const origin = root.getBoundingClientRect();
  const rel = (r: DOMRect | Box): Box => ({
    left: r.left - origin.left,
    top: r.top - origin.top,
    right: r.right - origin.left,
    bottom: r.bottom - origin.top,
  });

  const obstacles: Box[] = [...hero.querySelectorAll(".hero__intro, .hero__meta")]
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0)
    .map(rel);
  const role = hero.querySelector(".hero__role");
  if (role) {
    const range = document.createRange();
    range.selectNodeContents(role);
    obstacles.push(rel(range.getBoundingClientRect()));
  }
  const nav = document.querySelector(".nav");
  if (nav) obstacles.push(rel(nav.getBoundingClientRect()));
  // The head sits in the top half of the cut-out, between 30% and 66% of its width.
  const photo = img.getBoundingClientRect();
  obstacles.push(
    rel({ left: photo.left + photo.width * 0.3, right: photo.left + photo.width * 0.66, top: photo.top, bottom: photo.top + photo.height * 0.5 }),
  );

  const bounds = rel(hero.getBoundingClientRect());
  const mobile = window.matchMedia("(max-width: 760px), (max-aspect-ratio: 4/5)").matches;
  const placed: Box[] = [];

  layer.querySelectorAll<HTMLElement>(".floater").forEach((el, i) => {
    const f = floaters[i];
    const svg = el.querySelector("svg");
    if (!f || !svg) return;
    // Read the stylesheet size: the on-screen size is skewed while the pop-in animation runs.
    const css = getComputedStyle(svg);
    const iconH = parseFloat(css.height) || 54;
    const iconW = parseFloat(css.width) || iconH;
    const halfW = iconW / 2 + CLEARANCE;
    const halfH = iconH / 2 + CLEARANCE;
    const wantX = ((mobile ? f.mx : f.x) / 100) * origin.width;
    const wantY = ((mobile ? f.my : f.y) / 100) * origin.height;
    const fits = (x: number, y: number) => {
      const box = { left: x - halfW, right: x + halfW, top: y - halfH, bottom: y + halfH };
      const inside =
        box.left >= bounds.left + 4 && box.right <= bounds.right - 4 && box.top >= bounds.top && box.bottom <= bounds.bottom;
      return inside && !obstacles.some((o) => overlaps(box, o)) && !placed.some((o) => overlaps(box, o));
    };
    // Search outward in rings around the preferred spot.
    let best: [number, number] | null = fits(wantX, wantY) ? [wantX, wantY] : null;
    for (let r = STEP; !best && r < 420; r += STEP) {
      for (let a = 0; a < 360 && !best; a += 360 / Math.max(8, Math.round((2 * Math.PI * r) / STEP))) {
        const x = wantX + r * Math.cos((a * Math.PI) / 180);
        const y = wantY + r * Math.sin((a * Math.PI) / 180);
        if (fits(x, y)) best = [x, y];
      }
    }
    if (!best) {
      el.style.display = "none";
      return;
    }
    el.style.display = "";
    el.style.left = `${best[0].toFixed(1)}px`;
    el.style.top = `${best[1].toFixed(1)}px`;
    placed.push({ left: best[0] - halfW, right: best[0] + halfW, top: best[1] - halfH, bottom: best[1] + halfH });
  });
}

export function HeroPortrait() {
  const [empty, setEmpty] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  // Re-place the icons once fonts and the photo are ready, and whenever the window resizes.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let frame = 0;
    const place = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => placeFloaters(el));
    };
    place();
    document.fonts?.ready.then(place);
    const img = el.querySelector("img");
    img?.addEventListener("load", place);
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(frame);
      img?.removeEventListener("load", place);
      window.removeEventListener("resize", place);
    };
  }, []);

  // On desktop the icons lean gently toward the mouse, each by its own depth.
  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${((e.clientX / window.innerWidth - 0.5) * 14).toFixed(1)}px`);
        el.style.setProperty("--py", `${((e.clientY / window.innerHeight - 0.5) * 12).toFixed(1)}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`hero__portrait${empty ? " is-empty" : ""}`} ref={root}>
      <OptionalImage src="/images/portrait.webp" alt="Portrait of Johnfred" onMissing={() => setEmpty(true)} />
      <span className="hero__portrait-placeholder">
        Your cut-out photo
        <br />
        public/images/portrait.webp
      </span>
      <div className="floaters" aria-hidden="true" ref={layer}>
        {floaters.map((f, i) => (
          <span
            key={f.name}
            className="floater"
            title={f.name}
            style={{
              ["--x" as string]: `${f.x}%`,
              ["--y" as string]: `${f.y}%`,
              ["--mx" as string]: `${f.mx}%`,
              ["--my" as string]: `${f.my}%`,
              ["--rot" as string]: `${f.rot}deg`,
              ["--dur" as string]: `${f.dur}s`,
              ["--depth" as string]: f.depth,
              ["--i" as string]: i,
            }}
          >
            <span className="floater__depth">
              <span className="floater__drift">
                <AppIcon name={f.name} />
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
