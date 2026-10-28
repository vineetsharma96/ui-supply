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
// Adapted from https://magicui.design/docs/components/striped-pattern
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/striped-pattern.tsx
import { useId } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/striped-pattern.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function StripedPattern({
  direction = "left",
  className,
  width = 10,
  height = 10,
  ...props
}) {
  const id = useId();
  const w = Number(width);
  const h = Number(height);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id, width: w, height: h, patternUnits: "userSpaceOnUse", children: direction === "left" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("line", { x1: "0", y1: h, x2: w, y2: "0", stroke: "currentColor" }),
          /* @__PURE__ */ jsx("line", { x1: -w, y1: h, x2: "0", y2: "0", stroke: "currentColor" }),
          /* @__PURE__ */ jsx("line", { x1: w, y1: h, x2: w * 2, y2: "0", stroke: "currentColor" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("line", { x1: "0", y1: "0", x2: w, y2: h, stroke: "currentColor" }),
          /* @__PURE__ */ jsx("line", { x1: -w, y1: "0", x2: "0", y2: h, stroke: "currentColor" }),
          /* @__PURE__ */ jsx("line", { x1: w, y1: "0", x2: w * 2, y2: h, stroke: "currentColor" })
        ] }) }) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: `url(#${id})` })
      ]
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:striped-pattern.tsx
import { useId as useId2 } from "react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function StripedPattern2({
  direction = "left",
  className,
  width = 10,
  height = 10,
  ...props
}) {
  const id = useId2();
  const w = Number(width);
  const h = Number(height);
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2("pattern", { id, width: w, height: h, patternUnits: "userSpaceOnUse", children: direction === "left" ? /* @__PURE__ */ jsxs2(Fragment2, { children: [
          /* @__PURE__ */ jsx2("line", { x1: "0", y1: h, x2: w, y2: "0", stroke: "currentColor" }),
          /* @__PURE__ */ jsx2("line", { x1: -w, y1: h, x2: "0", y2: "0", stroke: "currentColor" }),
          /* @__PURE__ */ jsx2("line", { x1: w, y1: h, x2: w * 2, y2: "0", stroke: "currentColor" })
        ] }) : /* @__PURE__ */ jsxs2(Fragment2, { children: [
          /* @__PURE__ */ jsx2("line", { x1: "0", y1: "0", x2: w, y2: h, stroke: "currentColor" }),
          /* @__PURE__ */ jsx2("line", { x1: -w, y1: "0", x2: "0", y2: h, stroke: "currentColor" }),
          /* @__PURE__ */ jsx2("line", { x1: w, y1: "0", x2: w * 2, y2: h, stroke: "currentColor" })
        ] }) }) }),
        /* @__PURE__ */ jsx2("rect", { width: "100%", height: "100%", fill: `url(#${id})` })
      ]
    }
  );
}

// registry:components/ui/striped-pattern-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function StripedPatternDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(StripedPattern2, { className: "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(StripedPatternDemo, {}) }) });
}
export {
  StripedPattern,
  Component as default
};
