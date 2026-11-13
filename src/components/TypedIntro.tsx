"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_MS = 42; // average delay per typed character
const DELETE_MS = 16; // backspacing is quicker
const HOLD_MS = 2400; // pause once the line is complete
const GAP_MS = 450; // pause before retyping
const START_MS = 1300; // wait for the name and photo to settle on load

// Types `text` out, holds, backspaces it quickly, and loops. The full sentence is kept as an
// invisible sizer so the box never changes size, and is what screen readers read.
export function TypedIntro({ text, className }: { text: string; className?: string }) {
  const [count, setCount] = useState(text.length);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("holding");
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let visible = true;
    let n = 0;
    let mode: "typing" | "holding" | "deleting" = "typing";

    const step = () => {
      if (!visible) return;
      if (mode === "typing") {
        n += 1;
        setCount(n);
        if (n >= text.length) {
          mode = "holding";
          setPhase("holding");
          timer = window.setTimeout(() => {
            mode = "deleting";
            setPhase("deleting");
            step();
          }, HOLD_MS);
          return;
        }
        // A little rhythm: slower after punctuation, slight jitter otherwise.
        const ch = text[n - 1];
        const delay = /[,.]/.test(ch) ? TYPE_MS * 6 : TYPE_MS * (0.6 + Math.random() * 0.8);
        timer = window.setTimeout(step, delay);
      } else if (mode === "deleting") {
        n -= 1;
        setCount(n);
        if (n <= 0) {
          mode = "typing";
          setPhase("typing");
          timer = window.setTimeout(step, GAP_MS);
          return;
        }
        timer = window.setTimeout(step, DELETE_MS);
      }
    };

    // Pause while the hero is off screen, and pick up where it left off.
    const observer = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && mode !== "holding") step();
    });
    if (root.current) observer.observe(root.current);

    setCount(0);
    setPhase("typing");
    timer = window.setTimeout(step, START_MS);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [text]);

  return (
    <p className={`typer ${className ?? ""}`} ref={root}>
      <span className="typer__sizer" aria-hidden="true">
        {text}
        <span className="typer__cursor" />
      </span>
      <span className="typer__live" aria-hidden="true">
        {text.slice(0, count)}
        <span className={`typer__cursor${phase === "holding" ? " is-blinking" : ""}`} />
      </span>
      <span className="sr-only">{text}</span>
    </p>
  );
}
