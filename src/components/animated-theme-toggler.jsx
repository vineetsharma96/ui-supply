import React, { useState, useRef } from "react";
import "./components.css";
export function ThemeToggle({ dark, onToggle, className = "" }) {
  return (
    <button type="button" className={"ff-theme-switch " + className} onClick={onToggle}
      aria-label={"Switch to " + (dark ? "light" : "dark") + " theme"} aria-pressed={dark}>
      <span key={String(dark)} className="ff-theme-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {dark ? <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
        </svg>
      </span>
    </button>
  );
}
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
        <ThemeToggle dark={dark} onToggle={toggle} />
        <h3>{dark ? "After hours." : "Hello, sunshine."}</h3>
        <span className="ff-subtext">One click. A whole new mood.</span>
      </div>
    </div>
  );
}
