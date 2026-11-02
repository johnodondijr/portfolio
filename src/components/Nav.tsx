"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav">
      {links.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={`nav__link${active === id ? " is-active" : ""}`}>
          {id === "home" && <Icon name="home" size={14} />}
          {label}
        </a>
      ))}
    </nav>
  );
}
