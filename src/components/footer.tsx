import React from "react";

export const Footer = () => (
  <footer>
    <span className="text-[0.7em]">
      © {new Date().getFullYear()}, Built with{` `}
      <a
        href="https://astro.build"
        title="Astro"
        target="_blank"
        rel="noopener noreferrer"
        className="inherit-color"
      >
        Astro
      </a>
    </span>
  </footer>
);
