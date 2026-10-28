import React, { useState } from "react";
import "./components.css";
// Independently authored from the public Skiper #72 preview, without Pro source.
export default function HorizontalTextReveal({
  text = "Here our journey begins. A small idea becomes something extraordinary. Keep making. Keep moving. Keep going.",
}) {
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");
  return (
    <div
      className="ff-demo ff-scroll-reveal"
      tabIndex={0}
      aria-label="Scroll to reveal the text"
      onScroll={(e) => {
        const t = e.currentTarget;
        setProgress(t.scrollTop / (t.scrollHeight - t.clientHeight));
      }}
    >
      <div className="ff-reveal-track">
        <div className="ff-reveal-sticky">
          <span className="ff-kicker">A STORY IN MOTION · SCROLL ↓</span>
          <p>
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  opacity: progress > (i / words.length) * 0.86 ? 1 : 0.17,
                  transform:
                    progress > (i / words.length) * 0.86
                      ? "translateX(0) skewX(0)"
                      : "translateX(12px) skewX(-7deg)",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="ff-progress">
            <i style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
