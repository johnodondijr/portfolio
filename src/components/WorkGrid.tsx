"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { filters } from "@/content";
import type { Project } from "@/lib/data";
import { OptionalImage } from "./OptionalImage";

const MAX_TILT = 7; // degrees

function Thumb({ project }: { project: Project }) {
  const [first, ...rest] = (project.placeholder_label ?? project.title).split(" ");
  return (
    <div className="project__thumb" style={{ ["--ph" as string]: project.placeholder_color }}>
      {project.image_url && <OptionalImage src={project.image_url} alt={project.title} />}
      {!project.image_url && (
        <span className="project__ph">
          {first}
          {rest.length > 0 && <br />}
          {rest.join(" ")}
        </span>
      )}
    </div>
  );
}

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tilt the card toward the pointer and move the sheen with it.
function tilt(e: PointerEvent<HTMLElement>) {
  if (!canHover() || prefersReducedMotion()) return;
  const thumb = e.currentTarget.querySelector<HTMLElement>(".project__thumb");
  if (!thumb) return;
  const r = thumb.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  thumb.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT * 2}deg`);
  thumb.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT * 2}deg`);
  thumb.style.setProperty("--mx", `${x * 100}%`);
  thumb.style.setProperty("--my", `${y * 100}%`);
}

function untilt(e: PointerEvent<HTMLElement>) {
  const thumb = e.currentTarget.querySelector<HTMLElement>(".project__thumb");
  thumb?.style.removeProperty("--rx");
  thumb?.style.removeProperty("--ry");
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const origin = useRef<DOMRect | null>(null);
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Zoom the opened project out of the card that was clicked.
  useLayoutEffect(() => {
    const el = media.current;
    const from = origin.current;
    if (!open || !el || !from || prefersReducedMotion()) return;
    const play = () => {
      const to = el.getBoundingClientRect();
      if (!to.width) return;
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const scale = from.width / to.width;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.4 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    };
    const img = el.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", play, { once: true });
    else play();
  }, [open]);

  return (
    <>
      <div className="work__bar">
        <p>
          A selection of projects I&apos;m proud of, from social media campaigns to brand identities and digital
          interfaces.
        </p>
        <div className="filters" role="tablist">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`filter${filter === f.id ? " is-active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="work__grid">
        {projects.map((p) => (
          <figure
            key={p.id}
            className={`project${filter !== "all" && p.category !== filter ? " is-hidden" : ""}`}
            onPointerMove={tilt}
            onPointerLeave={untilt}
            onClick={(e) => {
              origin.current = e.currentTarget.querySelector(".project__thumb")?.getBoundingClientRect() ?? null;
              setOpen(p);
            }}
          >
            <Thumb project={p} />
            <figcaption>
              <strong>{p.title}</strong>
              {p.subtitle && <span>{p.subtitle}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        className={`lightbox${open ? " is-open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
      >
        <button className="lightbox__close" aria-label="Close" onClick={() => setOpen(null)}>
          ✕
        </button>
        {open && (
          <div className="lightbox__content">
            <div ref={media} className="lightbox__media">
              {open.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={open.image_url} alt={open.title} />
              ) : (
                <Thumb project={open} />
              )}
            </div>
            <p>{[open.title, open.subtitle].filter(Boolean).join(" | ")}</p>
          </div>
        )}
      </div>
    </>
  );
}
