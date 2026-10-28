import React from "react";
import "./components.css";
const reviews = [
  ["Alex", "Every detail feels considered.", "AM"],
  ["Sam", "A little inspiration for the next build.", "SR"],
  ["Jamie", "Simple, expressive, easy to make your own.", "JP"],
];
export default function Marquee({ items = reviews }) {
  return (
    <div
      className="ff-demo ff-marquee"
      tabIndex={0}
      aria-label="Scrolling sample comments. Hover or focus to pause."
    >
      {[0, 1].map((row) => (
        <div key={row} className={"ff-marquee-window row-" + row}>
          <div className="ff-marquee-track">
            {[0, 1].map((copy) => (
              <div
                className="ff-marquee-group"
                aria-hidden={copy === 1 ? true : undefined}
                key={copy}
              >
                {items.map(([name, quote, initials]) => (
                  <figure key={name}>
                    <figcaption>
                      <span className="ff-avatar">{initials}</span>
                      <span>
                        <strong>{name}</strong>
                        <small>@{name.toLowerCase()} · sample</small>
                      </span>
                    </figcaption>
                    <blockquote>{quote}</blockquote>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
