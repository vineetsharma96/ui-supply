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
// Adapted from https://www.vengenceui.com/components/flip-text
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/flip-text.tsx
import { useMemo } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/flip-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function FlipText({
  className,
  children,
  duration = 2.2,
  delay = 0,
  loop = true,
  separator = " ",
  together = false
}) {
  const words = useMemo(() => children.split(separator), [children, separator]);
  const totalChars = children.length;
  const getCharIndex = (wordIndex, charIndex) => {
    let index = 0;
    for (let i = 0; i < wordIndex; i++) {
      index += words[i].length + (separator === " " ? 1 : separator.length);
    }
    return index + charIndex;
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flip-text-wrapper inline-block leading-none",
        className
      ),
      style: { perspective: "1000px" },
      children: words.map((word, wordIndex) => {
        const chars = word.split("");
        return /* @__PURE__ */ jsxs(
          "span",
          {
            className: "word inline-block whitespace-nowrap",
            style: { transformStyle: "preserve-3d" },
            children: [
              chars.map((char, charIndex) => {
                const currentGlobalIndex = getCharIndex(wordIndex, charIndex);
                let calculatedDelay = delay;
                if (!together) {
                  const normalizedIndex = currentGlobalIndex / totalChars;
                  const sineValue = Math.sin(normalizedIndex * (Math.PI / 2));
                  calculatedDelay = sineValue * (duration * 0.25) + delay;
                }
                return /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "flip-char inline-block relative",
                    "data-char": char,
                    style: {
                      "--flip-duration": `${duration}s`,
                      "--flip-delay": `${calculatedDelay}s`,
                      "--flip-iteration": loop ? "infinite" : "1",
                      transformStyle: "preserve-3d"
                    },
                    children: char
                  },
                  charIndex
                );
              }),
              separator === " " && wordIndex < words.length - 1 && /* @__PURE__ */ jsx("span", { className: "whitespace inline-block", children: "\xA0" }),
              separator !== " " && wordIndex < words.length - 1 && /* @__PURE__ */ jsx("span", { className: "separator inline-block", children: separator })
            ]
          },
          wordIndex
        );
      })
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/Fliptext-examples/flip-text-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function FlipTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center min-h-[200px]", children: /* @__PURE__ */ jsx2(
    FlipText,
    {
      className: "text-4xl font-bold text-foreground",
      duration: 2.2,
      delay: 0,
      children: "Build beautiful interfaces"
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FlipTextDemo, {}) }) });
}
export {
  FlipText,
  Component as default
};
