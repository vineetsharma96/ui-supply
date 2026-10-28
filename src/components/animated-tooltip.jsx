import React, { useId } from "react";
import "./components.css";
export default function AnimatedTooltip() {
  const id = useId();
  return (
    <div className="ff-demo ff-tooltips">
      <span className="ff-kicker">LOOK A LITTLE CLOSER</span>
      <h3>
        It’s all in the{" "}
        <button aria-describedby={id}>
          details
          <span id={id} role="tooltip">
            The small things
            <br />
            make the big things. <i>✳</i>
          </span>
        </button>
        .
      </h3>
      <span className="ff-subtext">Hover or focus the highlighted word.</span>
    </div>
  );
}
