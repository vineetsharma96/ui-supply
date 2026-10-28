import React, { useEffect, useState } from "react";
import "./components.css";
export default function FlipFadeText({
  words = ["different.", "thoughtful.", "memorable."],
  interval = 2600,
  paused = false,
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [interval, words.length, paused]);
  return (
    <div className="ff-demo ff-flip">
      <span className="ff-kicker">MAKE SOMETHING</span>
      <div className="ff-flip-word" key={index}>
        {words[index].split("").map((letter, i) => (
          <span key={i} style={{ animationDelay: `${i * 35}ms` }}>
            {letter}
          </span>
        ))}
      </div>
      <span className="ff-subtext">A shift in perspective.</span>
    </div>
  );
}
