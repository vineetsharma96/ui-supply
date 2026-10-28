// Adapted from https://ui.aceternity.com/components/background-ripple-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/background-ripple-effect.tsx
import { useMemo, useRef, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/background-ripple-effect.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef(null);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "relative h-auto w-auto overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" }),
        /* @__PURE__ */ jsx(
          DivGrid,
          {
            className: "mask-radial-from-20% mask-radial-at-top opacity-600",
            rows,
            cols,
            cellSize,
            borderColor: "var(--cell-border-color)",
            fillColor: "var(--cell-fill-color)",
            clickedCell,
            onCellClick: (row, col) => {
              setClickedCell({ row, col });
              setRippleKey((k) => k + 1);
            },
            interactive: true
          },
          `base-${rippleKey}`
        )
      ] })
    }
  );
};
var DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {
  },
  interactive = true
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto"
  };
  return /* @__PURE__ */ jsx("div", { className: cn("relative z-[3]", className), style: gridStyle, children: cells.map((idx) => {
    const rowIdx = Math.floor(idx / cols);
    const colIdx = idx % cols;
    const distance = clickedCell ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx) : 0;
    const delay = clickedCell ? Math.max(0, distance * 55) : 0;
    const duration = 200 + distance * 80;
    const style = clickedCell ? {
      "--delay": `${delay}ms`,
      "--duration": `${duration}ms`
    } : {};
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
          clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
          !interactive && "pointer-events-none"
        ),
        style: {
          backgroundColor: fillColor,
          borderColor,
          ...style
        },
        onClick: interactive ? () => onCellClick?.(rowIdx, colIdx) : void 0
      },
      idx
    );
  }) });
};

// entry.jsx
import React2 from "react";

// registry:components/background-ripple-effect-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function BackgroundRippleEffectDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden", children: [
    /* @__PURE__ */ jsx2(BackgroundRippleEffect, {}),
    /* @__PURE__ */ jsxs2("div", { className: "mt-60 w-full", children: [
      /* @__PURE__ */ jsx2("h2", { className: "relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100", children: "Interactive Background Boxes Ripple Effect" }),
      /* @__PURE__ */ jsx2("p", { className: "relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500", children: "Hover over the boxes above and click.To be used on backgrounds of hero sections OR Call to Action sections. I beg you don't use it everywhere." })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(BackgroundRippleEffectDemo, {}) }) });
}
export {
  BackgroundRippleEffect,
  Component as default
};
