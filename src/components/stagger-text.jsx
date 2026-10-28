import React from "react";
import "./components.css";
export default function StaggerText({ text = "Make every detail count." }) {
  return (
    <div className="ff-demo ff-stagger">
      <span className="ff-kicker">ONE LETTER AT A TIME</span>
      <h2 aria-label={text}>
        {text.split(" ").map((word, w) => (
          <span className="ff-stagger-word" key={w}>
            {[...word].map((letter, i) => (
              <span
                aria-hidden="true"
                key={i}
                style={{ animationDelay: `${(w * 6 + i) * 45}ms` }}
              >
                {letter}
              </span>
            ))}{" "}
          </span>
        ))}
      </h2>
      <span className="ff-subtext">Good things take a little timing.</span>
    </div>
  );
}
