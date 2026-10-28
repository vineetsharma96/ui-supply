import React, { useState, useRef, useEffect } from "react";
import "./components.css";
export default function CoolMode() {
  const [particles, setParticles] = useState([]);
  const time = useRef(0);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function burst(e) {
    if (performance.now() - time.current < 60) return;
    time.current = performance.now();
    const b = e.currentTarget.getBoundingClientRect();
    const id = performance.now();
    const next = Array.from({ length: 8 }, (_, i) => ({
      id: id + i,
      x: e.clientX ? e.clientX - b.left : b.width / 2,
      y: e.clientY ? e.clientY - b.top : b.height / 2,
      dx: (Math.random() - 0.5) * 220,
      dy: -40 - Math.random() * 140,
      rotation: Math.random() * 360,
      symbol: ["✦", "✳", "●", "◆"][i % 4],
    }));
    setParticles((p) => [...p, ...next].slice(-80));
    timers.current.push(
      setTimeout(
        () => setParticles((p) => p.filter((x) => x.id < id || x.id > id + 8)),
        1100,
      ),
    );
  }
  return (
    <div className="ff-demo ff-cool">
      <span className="ff-kicker">SERIOUSLY, HAVE A LITTLE FUN</span>
      <div className="ff-cool-origin">
        <button
          className="ff-primary"
          onClick={burst}
          onPointerMove={(e) => {
            if (e.buttons) burst(e);
          }}
        >
          Just because <span>✳</span>
        </button>
        {particles.map((p) => (
          <span
            key={p.id}
            className="ff-particle"
            style={{
              left: p.x,
              top: p.y,
              "--dx": p.dx + "px",
              "--dy": p.dy + "px",
              "--rot": p.rotation + "deg",
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>
      <span className="ff-subtext">
        Click, or press and drag for a little joy.
      </span>
    </div>
  );
}
