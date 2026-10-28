import React from "react";
import "./components.css";
export default function Terminal({
  command = "npm run create-something-good",
  lines = [
    "Checking the details…",
    "A little form. A little function.",
    "Adding the finishing touches…",
    "Ready for your next idea.",
  ],
}) {
  return (
    <div className="ff-demo ff-terminal">
      <div className="ff-terminal-window">
        <div className="ff-terminal-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <small>~/your-next-idea</small>
          <span>⌘</span>
        </div>
        <div className="ff-terminal-body">
          <p className="ff-terminal-command">
            <span>❯</span> {command}
          </p>
          {lines.map((line, i) => (
            <p
              className="ff-terminal-line"
              key={i}
              style={{ animationDelay: `${(i + 1) * 750}ms` }}
            >
              <span>✓</span> {line}
            </p>
          ))}
          <p className="ff-terminal-cursor">
            ❯ <span>▍</span>
          </p>
        </div>
      </div>
    </div>
  );
}
