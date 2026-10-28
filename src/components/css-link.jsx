import React from "react";
import "./components.css";
// Independent CSS treatments inspired by Skiper UI #40 (gxuri).
export default function CssLink({
  href = "mailto:hello@example.com",
  text = "Let’s talk",
}) {
  return (
    <div className="ff-demo ff-links">
      <span className="ff-kicker">A LITTLE INTERACTION GOES A LONG WAY</span>
      {["left", "right", "center", "fill", "slide"].map((variant, i) => (
        <a key={variant} className={"ff-link-" + variant} href={href}>
          <span>{text}</span>
          <span>↗</span>
          <small>0{i + 1}</small>
        </a>
      ))}
    </div>
  );
}
