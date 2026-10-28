import React, { useState } from "react";
import "./components.css";
export default function VerseCards({
  cards = ["Form", "Feeling", "Function", "Future"],
}) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  return (
    <div className={"ff-demo ff-verse " + (open ? "ff-verse-open" : "")}>
      <div className="ff-verse-deck">
        {cards.map((_, i) => (
          <button
            key={i}
            tabIndex={open && i === cards.length - 1 ? 0 : -1}
            aria-label={"Deal " + cards[(i + offset) % cards.length] + " card"}
            onClick={() => setOffset((offset + 1) % cards.length)}
            style={{
              "--i": i,
              "--rotation": `${(i - (cards.length - 1) / 2) * 13}deg`,
              "--card-color": ["#eee4d8", "#d6e6db", "#e9d9ca", "#fb663d"][
                i % 4
              ],
            }}
          >
            <small>THE CREATIVE PROCESS / 0{i + 1}</small>
            <strong>
              {cards[(i + offset) % cards.length]}
              <br />↗
            </strong>
            <span>GOOD THINGS ARE IN THE CARDS.</span>
          </button>
        ))}
      </div>
      <button
        className="ff-verse-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close the deck" : "Explore the possibilities"}{" "}
        <span>{open ? "−" : "+"}</span>
      </button>
      <span className="ff-subtext">
        {open
          ? "Click the front card to deal it away."
          : "A few ideas, waiting to unfold."}
      </span>
    </div>
  );
}
