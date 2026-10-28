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
// Adapted from https://magicui.design/docs/components/aurora-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/aurora-text.tsx
import { memo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`
    };
    return /* @__PURE__ */ jsxs("span", { className: `relative inline-block ${className}`, children: [
      /* @__PURE__ */ jsx("span", { className: "sr-only", children }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent",
          style: gradientStyle,
          "aria-hidden": "true",
          children
        }
      )
    ] });
  }
);
AuroraText.displayName = "AuroraText";

// entry.jsx
import React3 from "react";

// registry:aurora-text.tsx
import { memo as memo2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var AuroraText2 = memo2(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`
    };
    return /* @__PURE__ */ jsxs2("span", { className: `relative inline-block ${className}`, children: [
      /* @__PURE__ */ jsx2("span", { className: "sr-only", children }),
      /* @__PURE__ */ jsx2(
        "span",
        {
          className: "animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent",
          style: gradientStyle,
          "aria-hidden": "true",
          children
        }
      )
    ] });
  }
);
AuroraText2.displayName = "AuroraText";

// registry:components/ui/aurora-text-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function AuroraTextDemo() {
  return /* @__PURE__ */ jsxs3("h1", { className: "text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl", children: [
    "Ship ",
    /* @__PURE__ */ jsx3(AuroraText2, { children: "beautiful" })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AuroraTextDemo, {}) }) });
}
export {
  AuroraText,
  Component as default
};
