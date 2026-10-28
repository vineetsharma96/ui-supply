/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://www.vengenceui.com/components/highlight-grid
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/highlight-grid.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/highlight-grid.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "#E24E1B",
  "#4381C1",
  "#F79824",
  "#04A777",
  "#5B8C5A",
  "#2176FF",
  "#818D92",
  "#22AAA1"
];
var DEFAULT_ROWS = [
  [{ label: "html" }, { label: "css" }, { label: "javascript" }],
  [{ label: "gsap" }, { label: "scrolltrigger" }, { label: "react" }, { label: "next.js" }, { label: "three.js" }]
];
function HighlightGrid({
  rows = DEFAULT_ROWS,
  colors = DEFAULT_COLORS,
  transitionDuration = 250,
  highlightFirst = true,
  className
}) {
  const gridRef = useRef(null);
  const highlightRef = useRef(null);
  const cellRefs = useRef(/* @__PURE__ */ new Map());
  const activeRef = useRef(null);
  const [active, setActive] = useState(highlightFirst ? 0 : null);
  const gridRows = useMemo(() => {
    let gi = 0;
    return rows.map(
      (row) => row.map((item) => {
        const idx = gi++;
        return { label: item.label, color: item.color ?? colors[idx % colors.length], gi: idx };
      })
    );
  }, [rows, colors]);
  const moveTo = useCallback((gi, color) => {
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    const el = cellRefs.current.get(gi);
    if (!grid || !highlight || !el) return;
    const rect = el.getBoundingClientRect();
    const crect = grid.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    highlight.style.opacity = "1";
    highlight.style.transform = `translate(${rect.left - crect.left}px, ${rect.top - crect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = color;
    activeRef.current = { gi, color };
  }, []);
  useEffect(() => {
    let rafId;
    const updatePosition = () => {
      if (activeRef.current) {
        moveTo(activeRef.current.gi, activeRef.current.color);
      } else if (highlightFirst && gridRows[0]?.[0]) {
        const first = gridRows[0][0];
        const h = highlightRef.current;
        if (h) {
          h.style.transitionDuration = "0s";
          moveTo(first.gi, first.color);
          rafId = requestAnimationFrame(() => {
            if (h) h.style.transitionDuration = `${transitionDuration}ms`;
          });
        }
      }
    };
    rafId = requestAnimationFrame(updatePosition);
    let resizeRaf;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (activeRef.current) moveTo(activeRef.current.gi, activeRef.current.color);
      });
    };
    const grid = gridRef.current;
    const ro = grid ? new ResizeObserver(onResize) : null;
    if (grid && ro) ro.observe(grid);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [gridRows, highlightFirst, moveTo, transitionDuration]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "relative flex min-h-[360px] w-full items-center justify-start overflow-x-auto overflow-y-hidden lg:justify-center",
        className
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: gridRef,
          className: "relative mx-auto flex h-[280px] w-[92%] min-w-[760px] max-w-[940px] shrink-0 flex-col border border-black/15 dark:border-white/20 sm:h-[340px]",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: highlightRef,
                "aria-hidden": true,
                className: "pointer-events-none absolute left-0 top-0 z-0 opacity-0",
                style: {
                  backgroundImage: "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.28), rgba(255,255,255,0) 52%), linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(0,0,0,0.22))",
                  transitionProperty: "transform, width, height, background-color, opacity",
                  transitionDuration: `${transitionDuration}ms`,
                  transitionTimingFunction: "ease"
                }
              }
            ),
            gridRows.map((row, r) => /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex flex-1",
                  r < gridRows.length - 1 && "border-b border-black/15 dark:border-white/20"
                ),
                children: row.map((cell, c) => {
                  const isActive = active === cell.gi;
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      ref: (el) => {
                        if (el) cellRefs.current.set(cell.gi, el);
                        else cellRefs.current.delete(cell.gi);
                      },
                      onMouseEnter: () => {
                        setActive(cell.gi);
                        moveTo(cell.gi, cell.color);
                      },
                      className: cn(
                        "flex h-full flex-1 items-center justify-center p-2 text-center",
                        c < row.length - 1 && "border-r border-black/15 dark:border-white/20"
                      ),
                      children: /* @__PURE__ */ jsxs(
                        "p",
                        {
                          className: cn(
                            "relative z-[2] whitespace-nowrap font-mono text-[13px] font-medium uppercase transition-colors duration-200 select-none",
                            isActive ? "text-white" : "text-neutral-600 dark:text-white/70"
                          ),
                          children: [
                            "( ",
                            cell.label,
                            " )"
                          ]
                        }
                      )
                    },
                    cell.gi
                  );
                })
              },
              r
            ))
          ]
        }
      )
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/highlight-grid-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function HighlightGridDemo() {
  return /* @__PURE__ */ jsx2(
    HighlightGrid,
    {
      rows: [
        [{ label: "html" }, { label: "css" }, { label: "javascript" }],
        [
          { label: "gsap" },
          { label: "scrolltrigger" },
          { label: "react" },
          { label: "next.js" },
          { label: "three.js" }
        ]
      ]
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(HighlightGridDemo, {}) }) });
}
export {
  HighlightGrid,
  Component as default
};
