import React from "react";
import "./components.css";
export function HoverAction({ children, href, className = "", ...props }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag {...props} {...(href ? { href } : { type: "button" })} className={"ff-hover-button " + className}>
      <i aria-hidden="true" />
      <span className="ff-hover-label">{children}</span>
      <span className="ff-hover-next" aria-hidden="true">{children} <b>↗</b></span>
    </Tag>
  );
}
export default function InteractiveHoverButton({
  children = "Explore possibilities",
  href = "https://example.com",
}) {
  return (
    <div className="ff-demo ff-hover-demo">
      <span className="ff-kicker">THE NEXT GOOD THING IS A CLICK AWAY</span>
      <HoverAction
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </HoverAction>
      <span className="ff-subtext">A little invitation to keep going.</span>
    </div>
  );
}
