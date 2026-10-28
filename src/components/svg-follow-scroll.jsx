import React, { useState } from "react";
import "./components.css";
// Independent implementation inspired by Skiper UI #19 and comgio.ai.
export default function SvgFollowScroll() {
  const [progress, setProgress] = useState(0);
  return (
    <div
      className="ff-demo ff-follow"
      tabIndex={0}
      aria-label="Scroll to draw the path"
      onScroll={(e) => {
        const t = e.currentTarget;
        setProgress(t.scrollTop / (t.scrollHeight - t.clientHeight));
      }}
    >
      <div className="ff-follow-track">
        <span className="ff-kicker">FOLLOW YOUR CURIOSITY ↓</span>
        <svg
          viewBox="0 0 320 900"
          fill="none"
          aria-label="A winding path that draws as you scroll"
        >
          <path
            d="M80 30 C280 0 300 180 150 140 S10 350 200 310 S310 520 140 480 S0 710 220 670 S270 800 160 870"
            stroke="var(--ff-line)"
            strokeWidth="8"
          />
          <path
            d="M80 30 C280 0 300 180 150 140 S10 350 200 310 S310 520 140 480 S0 710 220 670 S270 800 160 870"
            pathLength="1"
            stroke="#ef633c"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset={1 - (0.07 + progress * 0.93)}
          />
        </svg>
        <div className="ff-follow-caption">
          <strong>
            Enjoy the
            <br />
            long way around.
          </strong>
          <span>THERE’S SOMETHING GOOD AT EVERY TURN.</span>
        </div>
        <span className="ff-follow-end">You’ve arrived. ↗</span>
      </div>
    </div>
  );
}
