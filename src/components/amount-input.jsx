import React, { useLayoutEffect, useRef, useState } from "react";
import "./components.css";

// Independently authored from public Skiper #68 and #105 previews.
export function AmountInput({ value, onChange, prefix = "$", autoscale = true, label = "Amount" }) {
  const root = useRef(null);
  const [size, setSize] = useState(80);
  useLayoutEffect(() => {
    const measure = () => {
      const context = document.createElement("canvas").getContext("2d");
      context.font = `400 80px ${getComputedStyle(root.current).fontFamily}`;
      const width = context.measureText(prefix + (value || "0.0")).width;
      setSize(autoscale ? Math.max(24, Math.min(80, (root.current.clientWidth - 24) / width * 80)) : 64);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [value, prefix, autoscale]);
  return <div ref={root} className="ffx-amount" style={{ fontSize: size }}>
    <span className="ffx-amount-prefix" aria-hidden="true">{prefix}</span>
    <input aria-label={label} inputMode="decimal" placeholder="0.0" value={value}
      onChange={e => { if (/^\d*\.?\d*$/.test(e.target.value)) onChange(e.target.value); }} />
    <span className="ffx-amount-digits" aria-hidden="true">{[...(value || "0.0")].map((digit, i) => <span key={i + ":" + digit}>{digit}</span>)}</span>
  </div>;
}
export default function AmountInputDemo() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("Autoscale");
  return <div className="ff-demo ffx"><div className="ffx-center">
    <label className="ffx-label">Enter an amount</label>
    <AmountInput value={value} onChange={setValue} autoscale={mode === "Autoscale"} />
    <div className="ffx-segments">{["Autoscale", "Rolling"].map(v => <button key={v} aria-pressed={mode===v} onClick={()=>setMode(v)}>{v}</button>)}</div>
  </div></div>;
}
