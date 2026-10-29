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
// Adapted from https://www.vengenceui.com/components/morph-text
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/morph-text.tsx
import { useId } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/morph-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function MorphText({
  words = ["CREATE", "DESIGN", "DEVELOP"],
  interval = 3e3,
  subtext,
  fontSize = "clamp(2rem, 10cqw, 6rem)",
  fontFamily = '"Space Grotesk", sans-serif',
  className,
  textClassName,
  subtextClassName
}) {
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;
  const totalDuration = interval / 1e3 * words.length;
  const wordDuration = interval / 1e3;
  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`
  }));
  return /* @__PURE__ */ jsxs("div", { className: cn("morph-text-root relative flex w-full min-w-0 flex-col items-center", className), children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        "aria-hidden": "true",
        focusable: "false",
        style: { position: "absolute", width: 0, height: 0, pointerEvents: "none" },
        children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: filterId, children: [
          /* @__PURE__ */ jsx(
            "feColorMatrix",
            {
              in: "SourceGraphic",
              type: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9",
              result: "goo"
            }
          ),
          /* @__PURE__ */ jsx("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("morph-text-container relative w-full min-w-0 select-none", textClassName),
        style: {
          fontSize,
          fontWeight: 700,
          filter: `url(#${filterId})`,
          fontFamily
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "morph-word-rotator relative flex items-center justify-center",
            style: { height: "1.2em", width: "100%", minWidth: 0 },
            children: words.map((word, i) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "morph-word absolute",
                style: {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  whiteSpace: "nowrap",
                  animationName: "morph-word-rotate",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  ...wordStyles[i]
                },
                children: word
              },
              `${word}-${i}`
            ))
          }
        )
      }
    ),
    subtext && /* @__PURE__ */ jsx(
      "p",
      {
        className: cn(
          "morph-subtext mt-8 uppercase tracking-[0.2em] text-[#888]",
          subtextClassName
        ),
        style: {
          fontSize: "1.2rem",
          opacity: 0,
          animation: "morph-fade-up 1s ease-out 1s forwards",
          fontFamily
        },
        children: subtext
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        @keyframes morph-word-rotate {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      ` })
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/morph-text-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MorphTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-neutral-950 text-white gap-16 p-10", children: /* @__PURE__ */ jsx2(MorphText, { subtext: "The Art of Code" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MorphTextDemo, {}) }) });
}
export {
  MorphText,
  Component as default
};
