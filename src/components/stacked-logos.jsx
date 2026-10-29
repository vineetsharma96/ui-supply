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
// Adapted from https://www.vengenceui.com/components/stacked-logos
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/stacked-logos.tsx
import * as React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/stacked-logos.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var StackedLogos = ({
  logoGroups,
  duration = 30,
  stagger = 0,
  logoWidth = "200px",
  className
}) => {
  const itemCount = logoGroups[0]?.length || 0;
  const columns = logoGroups.length;
  const containerRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const handleMouseMove = React.useCallback(
    (e) => {
      if (!containerRef.current || !gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    []
  );
  const borderWidth = parseInt(logoWidth) || 200;
  const cellHeight = 128;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("stacked-logos relative w-full min-w-0", className),
      style: {
        "--duration": duration,
        "--items": itemCount,
        "--lists": columns,
        "--stagger": stagger,
        "--logo-width": logoWidth,
        "--cell-height": `${cellHeight}px`
      },
      onMouseMove: handleMouseMove,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: gridRef,
          className: "grid relative mx-auto w-fit",
          style: {
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, width: "100%"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "stacked-logos__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-10",
                style: {
                  background: "radial-gradient(500px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(251,191,36,0.1), transparent 70%)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "stacked-logos__border-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20",
                style: {
                  background: "radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(251,191,36,1), transparent 40%)",
                  maskImage: `
                            repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}),
                            linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)
                        `,
                  WebkitMaskImage: `
                            repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}),
                            linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)
                        `,
                  maskComposite: "add",
                  WebkitMaskComposite: "source-over"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "stacked-logos__border-glow pointer-events-none absolute top-0 bottom-0 left-0 w-px opacity-0 transition-opacity duration-300 z-20",
                style: {
                  background: "radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(251,191,36,1), transparent 40%)"
                }
              }
            ),
            logoGroups.map((logos, groupIndex) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "stacked-logos__cell relative grid",
                style: {
                  "--index": groupIndex,
                  gridTemplate: "1fr / 1fr"
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 right-0 w-px bg-zinc-200 dark:bg-zinc-800" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 bottom-0 h-px bg-zinc-200 dark:bg-zinc-800" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800" }),
                  groupIndex === 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" }),
                  logos.map((logo, logoIndex) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "stacked-logos__item col-start-1 row-start-1 grid place-items-center py-16 px-8",
                      "data-logo": true,
                      style: { "--i": logoIndex },
                      children: /* @__PURE__ */ jsx("div", { className: "stacked-logos__logo w-full h-8 flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-zinc-700 dark:[&>svg]:fill-zinc-300 [&>img]:h-full [&>img]:w-auto [&>img]:object-contain [&>img]:grayscale [&>img]:brightness-50 dark:[&>img]:brightness-125", children: logo })
                    },
                    logoIndex
                  ))
                ]
              },
              groupIndex
            ))
          ]
        }
      )
    }
  );
};
StackedLogos.displayName = "StackedLogos";

// entry.jsx
import React2 from "react";

// registry:components/docs/stacked-logos.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Acme = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 80 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("rect", { x: "4", y: "8", width: "24", height: "24", rx: "4", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("text", { x: "34", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Acme" })
] });
var Globex = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 90 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("circle", { cx: "14", cy: "20", r: "12", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("text", { x: "32", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Globex" })
] });
var Initech = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 90 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("polygon", { points: "14,8 26,32 2,32", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("text", { x: "32", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Initech" })
] });
var Stark = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 80 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("rect", { x: "2", y: "8", width: "12", height: "24", rx: "2", fill: "currentColor" }),
  /* @__PURE__ */ jsx2(
    "rect",
    {
      x: "16",
      y: "14",
      width: "10",
      height: "18",
      rx: "2",
      fill: "currentColor",
      opacity: "0.7"
    }
  ),
  /* @__PURE__ */ jsx2("text", { x: "32", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Stark" })
] });
var Wayne = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 90 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("path", { d: "M14 8 L26 20 L14 32 L2 20 Z", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("text", { x: "32", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Wayne" })
] });
var Hooli = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 80 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("circle", { cx: "8", cy: "20", r: "6", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("circle", { cx: "22", cy: "20", r: "6", fill: "currentColor", opacity: "0.7" }),
  /* @__PURE__ */ jsx2("text", { x: "34", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Hooli" })
] });
var Umbrella = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 100 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2("path", { d: "M2 20 Q14 8 26 20 Q14 32 2 20", fill: "currentColor" }),
  /* @__PURE__ */ jsx2("text", { x: "30", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Umbrella" })
] });
var Oscorp = () => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 90 40", className: "h-8", children: [
  /* @__PURE__ */ jsx2(
    "circle",
    {
      cx: "14",
      cy: "20",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4",
      fill: "none"
    }
  ),
  /* @__PURE__ */ jsx2("text", { x: "32", y: "26", fontSize: "14", fontWeight: "600", fill: "currentColor", children: "Oscorp" })
] });
var logoGroup1 = [
  /* @__PURE__ */ jsx2(Acme, {}, "1"),
  /* @__PURE__ */ jsx2(Globex, {}, "2"),
  /* @__PURE__ */ jsx2(Initech, {}, "3"),
  /* @__PURE__ */ jsx2(Stark, {}, "4")
];
var logoGroup2 = [
  /* @__PURE__ */ jsx2(Wayne, {}, "1"),
  /* @__PURE__ */ jsx2(Hooli, {}, "2"),
  /* @__PURE__ */ jsx2(Umbrella, {}, "3"),
  /* @__PURE__ */ jsx2(Oscorp, {}, "4")
];
var logoGroup3 = [
  /* @__PURE__ */ jsx2(Globex, {}, "1"),
  /* @__PURE__ */ jsx2(Stark, {}, "2"),
  /* @__PURE__ */ jsx2(Wayne, {}, "3"),
  /* @__PURE__ */ jsx2(Acme, {}, "4")
];
var logoGroup4 = [
  /* @__PURE__ */ jsx2(Umbrella, {}, "1"),
  /* @__PURE__ */ jsx2(Oscorp, {}, "2"),
  /* @__PURE__ */ jsx2(Hooli, {}, "3"),
  /* @__PURE__ */ jsx2(Initech, {}, "4")
];
function StackedLogosDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full h-full flex items-center justify-center py-16 rounded-xl min-h-[250px]", children: /* @__PURE__ */ jsx2(
    StackedLogos,
    {
      logoGroups: [logoGroup1, logoGroup2, logoGroup3, logoGroup4],
      duration: 20,
      stagger: 2
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(StackedLogosDemo, {}) }) });
}
export {
  StackedLogos,
  Component as default
};
