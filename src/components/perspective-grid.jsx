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
// Adapted from https://www.vengenceui.com/components/perspective-grid
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/perspective-grid.tsx
import { useEffect, useState, useMemo } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/perspective-grid.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function PerspectiveGrid({
  className,
  gridSize = 40,
  showOverlay = true,
  fadeRadius = 80
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative w-full h-full overflow-hidden bg-white dark:bg-black",
        "[--fade-stop:#ffffff] dark:[--fade-stop:#000000]",
        className
      ),
      style: {
        perspective: "2000px",
        transformStyle: "preserve-3d"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute w-[80rem] aspect-square grid origin-center",
            style: {
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
              transformStyle: "preserve-3d",
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            },
            children: mounted && tiles.map((_, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "tile min-h-[1px] min-w-[1px] border border-gray-300 dark:border-gray-700 bg-transparent transition-colors duration-[1500ms] hover:duration-0"
              },
              i
            ))
          }
        ),
        showOverlay && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-10",
            style: {
              background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`
            }
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/perspective-grid.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function PerspectiveGridDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsx2(PerspectiveGrid, {}),
    /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20", children: /* @__PURE__ */ jsx2("span", { className: "pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10", children: "Hover Me" }) })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(PerspectiveGridDemo, {}) }) });
}
export {
  PerspectiveGrid,
  Component as default
};
