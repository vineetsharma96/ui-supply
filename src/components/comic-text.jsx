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
// Adapted from https://magicui.design/docs/components/comic-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/comic-text.tsx
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/comic-text.tsx
import { jsx } from "react/jsx-runtime";
function ComicText({
  children,
  className,
  style,
  fontSize = 5
}) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }
  const dotColor = "#EF4444";
  const backgroundColor = "#FACC15";
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: cn("text-center select-none", className),
      style: {
        fontSize: `${fontSize}rem`,
        fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
        fontWeight: "900",
        WebkitTextStroke: `${fontSize * 0.35}px #000000`,
        // Thick black outline
        transform: "skewX(-10deg)",
        textTransform: "uppercase",
        filter: `
          drop-shadow(5px 5px 0px #000000)
          drop-shadow(3px 3px 0px ${dotColor})
        `,
        backgroundColor,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style
      },
      initial: { opacity: 0, scale: 0.8, rotate: -2 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: {
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring"
      },
      children
    }
  );
}

// entry.jsx
import React from "react";

// registry:comic-text.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
function ComicText2({
  children,
  className,
  style,
  fontSize = 5
}) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }
  const dotColor = "#EF4444";
  const backgroundColor = "#FACC15";
  return /* @__PURE__ */ jsx2(
    motion2.div,
    {
      className: cn("text-center select-none", className),
      style: {
        fontSize: `${fontSize}rem`,
        fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
        fontWeight: "900",
        WebkitTextStroke: `${fontSize * 0.35}px #000000`,
        // Thick black outline
        transform: "skewX(-10deg)",
        textTransform: "uppercase",
        filter: `
          drop-shadow(5px 5px 0px #000000)
          drop-shadow(3px 3px 0px ${dotColor})
        `,
        backgroundColor,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style
      },
      initial: { opacity: 0, scale: 0.8, rotate: -2 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: {
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring"
      },
      children
    }
  );
}

// registry:components/ui/comic-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function ComicTextDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "space-y-8 text-center", children: /* @__PURE__ */ jsx3(ComicText2, { fontSize: 5, children: "BOOM!" }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(ComicTextDemo, {}) }) });
}
export {
  ComicText,
  Component as default
};
