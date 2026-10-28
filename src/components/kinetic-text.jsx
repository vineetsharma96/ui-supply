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
// Adapted from https://magicui.design/docs/components/kinetic-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/kinetic-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...style
  };
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      ...rest,
      className: cn("flex flex-wrap font-[300]", className),
      style: mergedStyle,
      children: [
        text.split("").map((letter, i) => /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]",
            children: letter === " " ? "\xA0" : letter
          },
          i
        )),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: text })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:kinetic-text.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function KineticText2({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...style
  };
  return /* @__PURE__ */ jsxs2(
    Tag,
    {
      ...rest,
      className: cn("flex flex-wrap font-[300]", className),
      style: mergedStyle,
      children: [
        text.split("").map((letter, i) => /* @__PURE__ */ jsx2(
          "span",
          {
            "aria-hidden": "true",
            className: "[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]",
            children: letter === " " ? "\xA0" : letter
          },
          i
        )),
        /* @__PURE__ */ jsx2("span", { className: "sr-only", children: text })
      ]
    }
  );
}

// registry:components/ui/kinetic-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function KineticTextDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "relative justify-center", children: /* @__PURE__ */ jsx3(
    KineticText2,
    {
      text: "Nostalgia",
      className: "text-[6rem] tracking-[-5%] [font-optical-sizing:auto]"
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(KineticTextDemo, {}) }) });
}
export {
  KineticText,
  Component as default
};
