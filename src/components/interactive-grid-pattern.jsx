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
// Adapted from https://magicui.design/docs/components/interactive-grid-pattern
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/interactive-grid-pattern.tsx
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/interactive-grid-pattern.tsx
import { jsx } from "react/jsx-runtime";
function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: width * horizontal,
      height: height * vertical,
      className: cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      ),
      ...props,
      children: Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = index % horizontal * width;
        const y = Math.floor(index / horizontal) * height;
        return /* @__PURE__ */ jsx(
          "rect",
          {
            x,
            y,
            width,
            height,
            className: cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            ),
            onMouseEnter: () => setHoveredSquare(index),
            onMouseLeave: () => setHoveredSquare(null)
          },
          index
        );
      })
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:interactive-grid-pattern.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function InteractiveGridPattern2({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState2(null);
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      width: width * horizontal,
      height: height * vertical,
      className: cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      ),
      ...props,
      children: Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = index % horizontal * width;
        const y = Math.floor(index / horizontal) * height;
        return /* @__PURE__ */ jsx2(
          "rect",
          {
            x,
            y,
            width,
            height,
            className: cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            ),
            onMouseEnter: () => setHoveredSquare(index),
            onMouseLeave: () => setHoveredSquare(null)
          },
          index
        );
      })
    }
  );
}

// registry:components/ui/interactive-grid-pattern-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function InteractiveGridPatternDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(
    InteractiveGridPattern2,
    {
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
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(InteractiveGridPatternDemo, {}) }) });
}
export {
  InteractiveGridPattern,
  Component as default
};
