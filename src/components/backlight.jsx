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
// Adapted from https://magicui.design/docs/components/backlight
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/backlight.tsx
import { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Backlight({ blur = 20, children, className }) {
  const id = useId();
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("svg", { width: "0", height: "0", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("filter", { id, y: "-50%", x: "-50%", width: "200%", height: "200%", children: [
      /* @__PURE__ */ jsx(
        "feGaussianBlur",
        {
          in: "SourceGraphic",
          stdDeviation: blur,
          result: "blurred"
        }
      ),
      /* @__PURE__ */ jsx(
        "feColorMatrix",
        {
          type: "saturate",
          in: "blurred",
          values: "4"
        }
      ),
      /* @__PURE__ */ jsx("feComposite", { in: "SourceGraphic", operator: "over" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: { filter: `url(#${id})` }, children })
  ] });
}

// entry.jsx
import React from "react";

// registry:backlight.tsx
import { useId as useId2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Backlight2({ blur = 20, children, className }) {
  const id = useId2();
  return /* @__PURE__ */ jsxs2("div", { className, children: [
    /* @__PURE__ */ jsx2("svg", { width: "0", height: "0", "aria-hidden": "true", children: /* @__PURE__ */ jsxs2("filter", { id, y: "-50%", x: "-50%", width: "200%", height: "200%", children: [
      /* @__PURE__ */ jsx2(
        "feGaussianBlur",
        {
          in: "SourceGraphic",
          stdDeviation: blur,
          result: "blurred"
        }
      ),
      /* @__PURE__ */ jsx2(
        "feColorMatrix",
        {
          type: "saturate",
          in: "blurred",
          values: "4"
        }
      ),
      /* @__PURE__ */ jsx2("feComposite", { in: "SourceGraphic", operator: "over" })
    ] }) }),
    /* @__PURE__ */ jsx2("div", { style: { filter: `url(#${id})` }, children })
  ] });
}

// registry:components/ui/backlight-image-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function BacklightImageDemo() {
  return /* @__PURE__ */ jsx3(Backlight2, { className: "w-full", children: /* @__PURE__ */ jsx3(
    "img",
    {
      className: "mx-auto h-auto w-full max-w-lg rounded-xl",
      src: "https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "fancy gradient background"
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(BacklightImageDemo, {}) }) });
}
export {
  Backlight,
  Component as default
};
