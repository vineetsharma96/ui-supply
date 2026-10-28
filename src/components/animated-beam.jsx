import React from "react";
import "./components.css";
export default function AnimatedBeam() {
  return (
    <div className="ff-demo ff-beam">
      <span className="ff-kicker">BETTER, TOGETHER</span>
      <div className="ff-beam-diagram">
        <svg viewBox="0 0 400 180" fill="none" aria-hidden="true">
          {[35, 90, 145].flatMap((y, i) => [
            <path
              key={"l" + i}
              d={`M45 ${y} C120 ${y} 120 90 200 90`}
              stroke="var(--ff-line)"
              strokeWidth="2"
            />,
            <path
              key={"r" + i}
              d={`M200 90 C280 90 280 ${y} 355 ${y}`}
              stroke="var(--ff-line)"
              strokeWidth="2"
            />,
            <path
              className="ff-beam-pulse"
              key={"p" + i}
              d={`M45 ${y} C120 ${y} 120 90 200 90 C280 90 280 ${y} 355 ${y}`}
              stroke="#ee633c"
              strokeWidth="2"
              strokeDasharray="20 400"
              style={{ animationDelay: `${i * 0.65}s` }}
            />,
          ])}
        </svg>
        {["◈", "✦", "⌘"].map((n, i) => (
          <span
            key={i}
            className="ff-beam-node ff-beam-left"
            style={{ top: `${19 + i * 30}%` }}
          >
            {n}
          </span>
        ))}
        <span className="ff-beam-hub">f.</span>
        {["◉", "↗", "▧"].map((n, i) => (
          <span
            key={i}
            className="ff-beam-node ff-beam-right"
            style={{ top: `${19 + i * 30}%` }}
          >
            {n}
          </span>
        ))}
      </div>
      <span className="ff-subtext">Connect the dots. Make something good.</span>
    </div>
  );
}
