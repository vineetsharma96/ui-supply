import React, { useState } from "react";
import "./components.css";
const tree = [
  {
    name: "app",
    children: [
      { name: "layout.jsx" },
      { name: "page.jsx" },
      { name: "globals.css" },
    ],
  },
  {
    name: "components",
    children: [
      {
        name: "ui",
        children: [
          { name: "button.jsx" },
          { name: "card.jsx" },
          { name: "file-tree.jsx" },
        ],
      },
    ],
  },
  { name: "lib", children: [{ name: "utils.js" }] },
  { name: "package.json" },
];
export default function FileTree({ items = tree }) {
  const [selected, setSelected] = useState("page.jsx");
  function render(nodes, path = "") {
    return nodes.map((n) => {
      const p = path + "/" + n.name;
      return n.children ? (
        <details key={p} open>
          <summary>
            <span className="ff-folder-icon">▱</span>
            {n.name}
          </summary>
          <div>{render(n.children, p)}</div>
        </details>
      ) : (
        <button
          key={p}
          className={selected === n.name ? "ff-file-selected" : ""}
          aria-pressed={selected === n.name}
          onClick={() => setSelected(n.name)}
        >
          <span className="ff-file-icon">
            {n.name.endsWith(".css") ? "#" : "◇"}
          </span>
          {n.name}
        </button>
      );
    });
  }
  return (
    <div className="ff-demo ff-file-tree">
      <div className="ff-file-header">
        <span className="ff-kicker">YOUR NEXT PROJECT</span>
        <span>···</span>
      </div>
      <div className="ff-tree-nodes">{render(items)}</div>
      <div className="ff-file-status">
        ↳ <span>{selected}</span>
        <i>SELECTED</i>
      </div>
    </div>
  );
}
