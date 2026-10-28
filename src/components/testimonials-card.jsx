import React, { useEffect, useState } from "react";
import "./components.css";
const reviews = [
  {
    quote:
      "The difference is always in the details. These are the details I was looking for.",
    name: "Alex Morgan",
    role: "Product Designer",
    initials: "AM",
  },
  {
    quote:
      "A little motion. A lot of character. Exactly what our next project needed.",
    name: "Sam Rivera",
    role: "Creative Developer",
    initials: "SR",
  },
  {
    quote: "Thoughtful components that leave enough room for your own ideas.",
    name: "Jamie Park",
    role: "Design Engineer",
    initials: "JP",
  },
];
export default function TestimonialsCard({
  items = reviews,
  autoPlay = true,
  paused: motionPaused = false,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlay || paused || motionPaused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [autoPlay, paused, items.length, motionPaused]);
  const item = items[index];
  return (
    <div
      className="ff-demo ff-testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ff-quote-stack">
        <figure key={index}>
          <span className="ff-quote-mark">“</span>
          <blockquote>{item.quote}</blockquote>
          <figcaption>
            <span className="ff-avatar">{item.initials}</span>
            <span>
              <strong>{item.name}</strong>
              <small>{item.role} · Sample review</small>
            </span>
          </figcaption>
        </figure>
      </div>
      <div className="ff-quote-controls">
        <button
          aria-label="Previous testimonial"
          onClick={() => setIndex((index + items.length - 1) % items.length)}
        >
          ←
        </button>
        <span>
          {index + 1} / {items.length}
        </span>
        <button
          aria-label="Next testimonial"
          onClick={() => setIndex((index + 1) % items.length)}
        >
          →
        </button>
      </div>
    </div>
  );
}
