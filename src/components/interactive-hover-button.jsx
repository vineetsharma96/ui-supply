import React from "react";
import "./components.css";
export default function InteractiveHoverButton({
  children = "Explore possibilities",
  href = "https://example.com",
}) {
  return (
    <div className="ff-demo ff-hover-demo">
      <span className="ff-kicker">THE NEXT GOOD THING IS A CLICK AWAY</span>
      <a
        className="ff-hover-button"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <i />
        <span className="ff-hover-label">{children}</span>
        <span className="ff-hover-next">
          {children} <b>↗</b>
        </span>
      </a>
      <span className="ff-subtext">A little invitation to keep going.</span>
    </div>
  );
}
