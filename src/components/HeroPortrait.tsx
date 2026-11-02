"use client";

import { useState } from "react";
import { OptionalImage } from "./OptionalImage";

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
    </div>
  );
}
