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
// Adapted from https://magicui.design/docs/components/animated-gradient-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-gradient-text.tsx
import { jsx } from "react/jsx-runtime";
function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        "--bg-size": `${speed * 300}%`,
        "--color-from": colorFrom,
        "--color-to": colorTo
      },
      className: cn(
        `animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      ),
      ...props,
      children
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/ui/animated-gradient-text-demo.tsx
import { ChevronRight } from "lucide-react";

// registry:animated-gradient-text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AnimatedGradientText2({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      style: {
        "--bg-size": `${speed * 300}%`,
        "--color-from": colorFrom,
        "--color-to": colorTo
      },
      className: cn(
        `animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      ),
      ...props,
      children
    }
  );
}

// registry:components/ui/animated-gradient-text-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function AnimatedGradientTextDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]", children: [
    /* @__PURE__ */ jsx3(
      "span",
      {
        className: cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        ),
        style: {
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box"
        }
      }
    ),
    "\u{1F389} ",
    /* @__PURE__ */ jsx3("hr", { className: "mx-2 h-4 w-px shrink-0 bg-neutral-500" }),
    /* @__PURE__ */ jsx3(AnimatedGradientText2, { className: "text-sm font-medium", children: "Introducing Magic UI" }),
    /* @__PURE__ */ jsx3(ChevronRight, { className: "ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AnimatedGradientTextDemo, {}) }) });
}
export {
  AnimatedGradientText,
  Component as default
};
