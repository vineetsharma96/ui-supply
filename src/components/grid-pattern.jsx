/*
MIT License

Copyright (c) Magic UI

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
// Adapted from https://magicui.design/docs/components/grid-pattern
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/grid-pattern.tsx
import { useId } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/grid-pattern.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}) {
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
          "pattern",
          {
            id,
            width,
            height,
            patternUnits: "userSpaceOnUse",
            x,
            y,
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: `M.5 ${height}V.5H${width}`,
                fill: "none",
                strokeDasharray
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", strokeWidth: 0, fill: `url(#${id})` }),
        squares && /* @__PURE__ */ jsx("svg", { x, y, className: "overflow-visible", children: squares.map(([x2, y2]) => /* @__PURE__ */ jsx(
          "rect",
          {
            strokeWidth: "0",
            width: width - 1,
            height: height - 1,
            x: x2 * width + 1,
            y: y2 * height + 1
          },
          `${x2}-${y2}`
        )) })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:grid-pattern.tsx
import { useId as useId2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GridPattern2({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}) {
  const id = useId2();
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2(
          "pattern",
          {
            id,
            width,
            height,
            patternUnits: "userSpaceOnUse",
            x,
            y,
            children: /* @__PURE__ */ jsx2(
              "path",
              {
                d: `M.5 ${height}V.5H${width}`,
                fill: "none",
                strokeDasharray
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx2("rect", { width: "100%", height: "100%", strokeWidth: 0, fill: `url(#${id})` }),
        squares && /* @__PURE__ */ jsx2("svg", { x, y, className: "overflow-visible", children: squares.map(([x2, y2]) => /* @__PURE__ */ jsx2(
          "rect",
          {
            strokeWidth: "0",
            width: width - 1,
            height: height - 1,
            x: x2 * width + 1,
            y: y2 * height + 1
          },
          `${x2}-${y2}`
        )) })
      ]
    }
  );
}

// registry:components/ui/grid-pattern-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function GridPatternDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(
    GridPattern2,
    {
      squares: [
        [4, 4],
        [5, 1],
        [8, 2],
        [5, 3],
        [5, 5],
        [10, 10],
        [12, 15],
        [15, 10],
        [10, 15],
        [15, 10],
        [10, 15],
        [15, 10]
      ],
      className: cn(
        "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
      )
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(GridPatternDemo, {}) }) });
}
export {
  GridPattern,
  Component as default
};
