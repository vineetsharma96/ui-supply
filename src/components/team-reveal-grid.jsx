import React, { useState, useEffect } from "react";
import "./components.css";
const team = [
  {
    name: "Ava Chen",
    role: "Design",
    expertise: "Turning complex ideas into simple experiences.",
    photo: "photo-1580489944761-15a19d654956",
  },
  {
    name: "Noah Williams",
    role: "Engineering",
    expertise: "Building the things that make everything work.",
    photo: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Mia Patel",
    role: "Strategy",
    expertise: "Finding the right questions before the answers.",
    photo: "photo-1534528741775-53994a69daeb",
  },
];
export default function TeamRevealGrid({
  members = team,
  autoPlay = true,
  paused = false,
}) {
  const [active, setActive] = useState(0);
  const [idle, setIdle] = useState(true);
  useEffect(() => {
    if (!autoPlay || !idle || paused) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % members.length),
      3500,
    );
    return () => clearInterval(timer);
  }, [autoPlay, idle, members.length, paused]);
  return (
    <div
      className="ff-demo ff-team"
      onMouseEnter={() => setIdle(false)}
      onMouseLeave={() => setIdle(true)}
    >
      <span className="ff-kicker">GOOD PEOPLE. GOOD WORK.</span>
      <div className="ff-team-grid">
        {members.map((m, i) => (
          <button
            key={m.name}
            className={active === i ? "ff-team-active" : ""}
            onMouseEnter={() => setActive(i)}
            onFocus={() => {
              setActive(i);
              setIdle(false);
            }}
            onClick={() => {
              setActive(i);
              setIdle(false);
            }}
            aria-pressed={active === i}
          >
            <img
              src={`https://images.unsplash.com/${m.photo}?w=300&h=400&fit=crop&crop=faces&auto=format&q=80`}
              alt={m.name}
              loading="lazy"
            />
            <span>
              <strong>{m.name}</strong>
              <small>{m.role}</small>
            </span>
            <p>{m.expertise}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
