import React, { useState, useRef } from "react";
import "./components.css";
export default function AnimatedThemeToggler() {
  const [dark, setDark] = useState(false);
  const [point, setPoint] = useState({ x: 80, y: 50 });
  const root = useRef();
  function toggle(e) {
    const b = root.current.getBoundingClientRect();
    setPoint({
      x: ((e.clientX - b.left) / b.width) * 100,
      y: ((e.clientY - b.top) / b.height) * 100,
    });
    setDark(!dark);
  }
  return (
    <div ref={root} className="ff-demo ff-theme-demo">
      <div
        key={String(dark)}
        className={"ff-theme-surface " + (dark ? "ff-theme-dark" : "")}
        style={{ "--reveal-x": point.x + "%", "--reveal-y": point.y + "%" }}
      >
        <span className="ff-kicker">A CHANGE OF ATMOSPHERE</span>
        <button
          onClick={toggle}
          aria-label={
            "Switch preview to " + (dark ? "light" : "dark") + " mode"
          }
          className="ff-theme-switch"
          aria-pressed={dark}
        >
          <span>{dark ? "☾" : "☀"}</span>
        </button>
        <h3>{dark ? "After hours." : "Hello, sunshine."}</h3>
        <span className="ff-subtext">One click. A whole new mood.</span>
      </div>
    </div>
  );
}
