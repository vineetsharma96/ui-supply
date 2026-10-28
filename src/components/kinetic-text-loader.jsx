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
// Adapted from https://www.vengenceui.com/components/kinetic-text-loader
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/kinetic-text-loader.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function KineticTextLoader({
  className,
  text = "Loading",
  ...props
}) {
  const letters = text.split("");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative flex items-center justify-center font-light", className),
      style: { fontFamily: "'Roboto', sans-serif" },
      ...props,
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

        @keyframes ktl-dotMove {
          0%, 100% { transform: rotate(180deg) translate(-80px, -10px) rotate(-180deg); }
          50% { transform: rotate(0deg) translate(-81px, 10px) rotate(0deg); }
        }
        @keyframes ktl-letterStretch {
          0%, 100% { transform: scale(1, 0.35); transform-origin: 100% 75%; }
          8%, 28% { transform: scale(1, 1.4); transform-origin: 100% 67%; }
          37% { transform: scale(1, 0.875); transform-origin: 100% 75%; }
          46% { transform: scale(1, 1.03); transform-origin: 100% 75%; }
          50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
        }
        @keyframes ktl-l-bounce {
          0%, 45%, 70%, 100% { transform: scaleY(1.11); }
          49% { transform: scaleY(0.31); }
          50% { transform: scaleY(0.16); }
          53% { transform: scaleY(0.63); }
          60% { transform: scaleY(1.275); }
          68% { transform: scaleY(1.04); }
        }
      ` }),
        /* @__PURE__ */ jsxs("div", { className: "relative scale-75 md:scale-90 lg:scale-100", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute z-10 top-[40px] left-[85px] w-[6px] h-[6px] bg-neutral-800 dark:bg-neutral-200 rounded-full",
              style: { animation: "ktl-dotMove 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite" }
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "relative m-0 whitespace-nowrap text-[3.75rem] text-neutral-800 dark:text-neutral-200", "aria-label": text, children: letters.map((char, index) => {
            if (index === 0 && char.toUpperCase() === "L") {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block relative tracking-[8px] transform origin-[100%_70%]",
                  style: { animation: "ktl-l-bounce 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite" },
                  children: char
                },
                index
              );
            }
            if (index === 4 && char.toLowerCase() === "i") {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block relative tracking-[8px] transform origin-[100%_70%]",
                  style: { animation: "ktl-letterStretch 1800ms cubic-bezier(0.25,0.23,0.73,0.75) infinite" },
                  children: char === "i" ? "\u0131" : char
                },
                index
              );
            }
            return /* @__PURE__ */ jsx("span", { className: "inline-block relative tracking-[8px]", children: char }, index);
          }) })
        ] })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/kinetic-text-loader-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function KineticTextLoaderDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-[400px] flex-col items-center justify-center", children: /* @__PURE__ */ jsx2(KineticTextLoader, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(KineticTextLoaderDemo, {}) }) });
}
export {
  KineticTextLoader,
  Component as default
};
