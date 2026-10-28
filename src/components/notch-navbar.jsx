import React, { useState } from "react";
import "./components.css";
export function NotchNavigation({ items, active, onNavigate, label = "Navigation", logo = "ui" }) {
  function links(list) {
    return list.map((item) => (
      <button key={item} aria-current={active === item ? "page" : undefined} onClick={() => onNavigate(item)}>{item}</button>
    ));
  }
  const split = Math.ceil(items.length / 2);
  return (
    <nav className="ff-notch-navigation" aria-label={label}>
      <div>{links(items.slice(0, split))}</div>
      {logo && <span className="ff-notch-logo" aria-hidden="true">{logo}</span>}
      <div>{links(items.slice(split))}</div>
    </nav>
  );
}
export default function NotchNavbar({
  items = ["Work", "About", "Journal", "Contact"],
}) {
  const [active, setActive] = useState("Work");
  return (
    <div className="ff-demo ff-notch">
      <NotchNavigation items={items} active={active} onNavigate={setActive} label="Example navigation" logo="f." />
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
