import React, { useEffect, useRef, useState } from "react";
import "./components.css";

export default function StatsCounter({
  value = 12800,
  suffix = "+",
  prefix = "",
  duration = 1500,
  decimals = 0,
  label = "Ideas brought to life",
  paused = false,
}) {
  const pauseRef = useRef(paused);
  pauseRef.current = paused;
  const root = useRef(null);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let elapsed = 0,
        last = performance.now();
      function tick(now) {
        if (!pauseRef.current) elapsed += now - last;
        last = now;
        const t = Math.min(elapsed / duration, 1);
        setNumber(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    });
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);
  return (
    <div className="ff-demo ff-stats" ref={root}>
      <span className="ff-kicker">A LITTLE PROGRESS, EVERY DAY</span>
      <strong>
        {prefix}
        {number.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span>{suffix}</span>
      </strong>
      <span className="ff-subtext">{label}</span>
      <div className="ff-stats-line">
        <span /> <small>Always moving forward</small>
      </div>
    </div>
  );
}
