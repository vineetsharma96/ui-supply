import React from "react";
import "./components.css";
export default function BorderBeam({
  title = "Made to stand out.",
  description = "Sometimes, the smallest detail makes the biggest difference.",
}) {
  return (
    <div className="ff-demo ff-border-beam">
      <div className="ff-border-card">
        <span className="ff-border-runner" />
        <div>
          <span className="ff-border-star">✳</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="ff-kicker">A LITTLE LIGHT GOES A LONG WAY</span>
        </div>
      </div>
    </div>
  );
}
