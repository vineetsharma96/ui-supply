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
// Adapted from https://magicui.design/docs/components/animated-shiny-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-shiny-text.tsx
import { jsx } from "react/jsx-runtime";
var AnimatedShinyText = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        "--shiny-width": `${shimmerWidth}px`
      },
      className: cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        // Shine effect
        "animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Shine gradient
        "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className
      ),
      ...props,
      children
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/ui/animated-shiny-text-demo.tsx
import { ArrowRightIcon } from "@radix-ui/react-icons";

// registry:animated-shiny-text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var AnimatedShinyText2 = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      style: {
        "--shiny-width": `${shimmerWidth}px`
      },
      className: cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        // Shine effect
        "animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Shine gradient
        "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className
      ),
      ...props,
      children
    }
  );
};

// registry:components/ui/animated-shiny-text-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function AnimatedShinyTextDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "z-10 flex min-h-64 items-center justify-center", children: /* @__PURE__ */ jsx3(
    "div",
    {
      className: cn(
        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      ),
      children: /* @__PURE__ */ jsxs(AnimatedShinyText2, { className: "inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400", children: [
        /* @__PURE__ */ jsx3("span", { children: "\u2728 Introducing Magic UI" }),
        /* @__PURE__ */ jsx3(ArrowRightIcon, { className: "ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" })
      ] })
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AnimatedShinyTextDemo, {}) }) });
}
export {
  AnimatedShinyText,
  Component as default
};
