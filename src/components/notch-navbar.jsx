import React, { useState } from "react";
import "./components.css";
export default function NotchNavbar({
  items = ["Work", "About", "Journal", "Contact"],
}) {
  const [active, setActive] = useState("Work");
  return (
    <div className="ff-demo ff-notch">
      <nav aria-label="Example navigation">
        <div>
          {items.slice(0, 2).map((item) => (
            <button
              key={item}
              aria-current={active === item ? "page" : undefined}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="ff-notch-logo">f.</span>
        <div>
          {items.slice(2).map((item) => (
            <button
              key={item}
              aria-current={active === item ? "page" : undefined}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
      <span className="ff-kicker">A STUDIO FOR WHAT COMES NEXT</span>
      <h3 key={active}>
        {active === "Work"
          ? "Ideas into things."
          : active === "About"
            ? "People with purpose."
            : active === "Journal"
              ? "Notes on the process."
              : "Let’s make something."}
      </h3>
      <span className="ff-subtext">
        {active} / A different kind of navigation.
      </span>
    </div>
  );
}
