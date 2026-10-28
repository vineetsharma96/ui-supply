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
// Adapted from https://magicui.design/docs/components/shimmer-button
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/shimmer-button.tsx
import React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/shimmer-button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ShimmerButton = React.forwardRef(
  ({
    shimmerColor = "#ffffff",
    shimmerSize = "0.05em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        style: {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background
        },
        className: cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        ),
        ref,
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "-z-30 blur-[2px]",
                "@container-[size] absolute inset-0 overflow-visible"
              ),
              children: /* @__PURE__ */ jsx("div", { className: "animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]", children: /* @__PURE__ */ jsx("div", { className: "animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" }) })
            }
          ),
          children,
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0 size-full",
                "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
                // transition
                "transform-gpu transition-all duration-300 ease-in-out",
                // on hover
                "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
                // on click
                "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
              )
            }
          )
        ]
      }
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";

// entry.jsx
import React3 from "react";

// registry:shimmer-button.tsx
import React2 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ShimmerButton2 = React2.forwardRef(
  ({
    shimmerColor = "#ffffff",
    shimmerSize = "0.05em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs2(
      "button",
      {
        style: {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background
        },
        className: cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        ),
        ref,
        ...props,
        children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn(
                "-z-30 blur-[2px]",
                "@container-[size] absolute inset-0 overflow-visible"
              ),
              children: /* @__PURE__ */ jsx2("div", { className: "animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]", children: /* @__PURE__ */ jsx2("div", { className: "animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" }) })
            }
          ),
          children,
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn(
                "absolute inset-0 size-full",
                "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
                // transition
                "transform-gpu transition-all duration-300 ease-in-out",
                // on hover
                "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
                // on click
                "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
              )
            }
          ),
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn(
                "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
              )
            }
          )
        ]
      }
    );
  }
);
ShimmerButton2.displayName = "ShimmerButton";

// registry:components/ui/shimmer-button-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function ShimmerButtonDemo() {
  return /* @__PURE__ */ jsx3(ShimmerButton2, { className: "shadow-2xl", children: /* @__PURE__ */ jsx3("span", { className: "text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10", children: "Shimmer Button" }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(ShimmerButtonDemo, {}) }) });
}
export {
  ShimmerButton,
  Component as default
};
