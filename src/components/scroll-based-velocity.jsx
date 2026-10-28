import React, { useRef, useEffect } from "react";
import "./components.css";
export default function ScrollBasedVelocity({
  text = "MAKE GOOD THINGS",
  paused = false,
}) {
  const root = useRef();
  const row = useRef();
  const last = useRef({ y: 0, time: 0 });
  const speed = useRef(1);
  const position = useRef(0);
  useEffect(() => {
    if (paused) return;
    let frame;
    let before = performance.now();
    function tick(now) {
      const delta = Math.min(now - before, 40);
      before = now;
      speed.current += (1 - speed.current) * 0.035;
      position.current =
        (position.current + delta * 0.025 * speed.current) % 50;
      if (row.current)
        row.current.style.transform = `translateX(-${position.current}%)`;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);
  function scroll(e) {
    const now = performance.now(),
      y = e.currentTarget.scrollTop;
    speed.current = Math.min(
      14,
      1 +
        (Math.abs(y - last.current.y) / Math.max(16, now - last.current.time)) *
          10,
    );
    last.current = { y, time: now };
  }
  return (
    <div
      ref={root}
      className="ff-demo ff-velocity"
      onScroll={scroll}
      tabIndex={0}
      aria-label="Scroll to accelerate the text"
    >
      <div className="ff-velocity-track">
        <div className="ff-velocity-sticky">
          <span className="ff-kicker">SCROLL A LITTLE FASTER ↓</span>
          <div className="ff-velocity-window">
            <div ref={row} className="ff-velocity-row">
              {[0, 1, 2, 3].map((i) => (
                <span key={i}>
                  {text} <i>✳</i>{" "}
                </span>
              ))}
            </div>
            <div className="ff-velocity-echo">MOVE WITH INTENTION</div>
          </div>
          <span className="ff-subtext">Your pace. Your rhythm.</span>
        </div>
      </div>
    </div>
  );
}
