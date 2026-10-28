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
// Adapted from https://magicui.design/docs/components/ripple
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/ripple.tsx
import React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/ripple.tsx
import { jsx } from "react/jsx-runtime";
var Ripple = React.memo(function Ripple2({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,white,transparent)] select-none",
        className
      ),
      ...props,
      children: Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = "solid";
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl`,
            style: {
              "--i": i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `var(--foreground)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)"
            }
          },
          i
        );
      })
    }
  );
});
Ripple.displayName = "Ripple";

// entry.jsx
import React3 from "react";

// registry:ripple.tsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Ripple3 = React2.memo(function Ripple4({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        "pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,white,transparent)] select-none",
        className
      ),
      ...props,
      children: Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = "solid";
        return /* @__PURE__ */ jsx2(
          "div",
          {
            className: `animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl`,
            style: {
              "--i": i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `var(--foreground)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)"
            }
          },
          i
        );
      })
    }
  );
});
Ripple3.displayName = "Ripple";

// registry:components/ui/ripple-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function RippleDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3("p", { className: "z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white", children: "Ripple" }),
    /* @__PURE__ */ jsx3(Ripple3, {})
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(RippleDemo, {}) }) });
}
export {
  Ripple,
  Component as default
};
