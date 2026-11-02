"use client";

import { useEffect, useState } from "react";
import { filters } from "@/content";
import type { Project } from "@/lib/data";
import { OptionalImage } from "./OptionalImage";

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

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
            onClick={() => setOpen(p)}
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
            {open.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={open.image_url} alt={open.title} />
            ) : (
              <Thumb project={open} />
            )}
            <p>{[open.title, open.subtitle].filter(Boolean).join(" | ")}</p>
          </div>
        )}
      </div>
    </>
  );
}
