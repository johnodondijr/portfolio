"use client";

import { useState } from "react";
import { OptionalImage } from "./OptionalImage";
import { ToolIcon } from "./ToolIcon";

// Design apps that float around the portrait. x/y are % of the portrait box,
// placed around the head and outside the shoulders so they never cover the face.
const floaters = [
  { name: "Adobe Photoshop", x: 20, y: 9, rot: -8, dur: 6.2 },
  { name: "Figma", x: 79, y: 5, rot: 7, dur: 5.4 },
  { name: "Adobe Illustrator", x: 10, y: 35, rot: 6, dur: 6.8 },
  { name: "Canva", x: 89, y: 30, rot: -6, dur: 5.9 },
  { name: "After Effects", x: 6, y: 79, rot: -5, dur: 7.2 },
  { name: "InDesign", x: 94, y: 79, rot: 8, dur: 6.5 },
];

export function HeroPortrait() {
  const [empty, setEmpty] = useState(false);
  return (
    <div className={`hero__portrait${empty ? " is-empty" : ""}`}>
      <OptionalImage src="/images/portrait.webp" alt="Portrait of Johnfred" onMissing={() => setEmpty(true)} />
      <span className="hero__portrait-placeholder">
        Your cut-out photo
        <br />
        public/images/portrait.webp
      </span>
      <div className="floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span
            key={f.name}
            className="floater"
            title={f.name}
            style={{
              ["--x" as string]: `${f.x}%`,
              ["--y" as string]: `${f.y}%`,
              ["--rot" as string]: `${f.rot}deg`,
              ["--dur" as string]: `${f.dur}s`,
              ["--i" as string]: i,
            }}
          >
            <ToolIcon name={f.name} />
          </span>
        ))}
      </div>
    </div>
  );
}
