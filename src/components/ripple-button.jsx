import React, { useState, useRef, useEffect } from "react";
import "./components.css";
export function RippleControl({ children, className = "", onClick, ...props }) {
  const [ripples, setRipples] = useState([]);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function ripple(e) {
    const r = e.currentTarget.getBoundingClientRect(),
      id = performance.now();
    setRipples((a) => [
      ...a,
      {
        id,
        x: e.detail ? e.clientX - r.left : r.width / 2,
        y: e.detail ? e.clientY - r.top : r.height / 2,
      },
    ]);
    timers.current.push(
      setTimeout(() => setRipples((a) => a.filter((p) => p.id !== id)), 700),
    );
    onClick?.(e);
  }
  return (
      <button type="button" {...props} className={"ff-ripple-button " + className} onClick={ripple}>
        {children}
        {ripples.map((r) => (
          <i className="ff-ripple" key={r.id} style={{ left: r.x, top: r.y }} />
        ))}
      </button>
  );
}
export default function RippleButton({ children = "Make a little ripple" }) {
  return (
    <div className="ff-demo ff-ripple-demo">
      <span className="ff-kicker">SMALL ACTION. BIG FEELING.</span>
      <RippleControl>{children}<span className="ff-button-arrow">↗</span></RippleControl>
      <span className="ff-subtext">Go on. Give it a click.</span>
    </div>
  );
}
