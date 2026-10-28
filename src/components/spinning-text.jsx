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
// Adapted from https://magicui.design/docs/components/spinning-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/spinning-text.tsx
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/spinning-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var BASE_TRANSITION = {
  repeat: Infinity,
  ease: "linear"
};
var BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1
  },
  visible: {
    opacity: 1
  }
};
function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  transition,
  variants,
  className,
  style
}) {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }
  if (Array.isArray(children)) {
    if (!children.every((child) => typeof child === "string")) {
      throw new Error("all elements in children array must be strings");
    }
    children = children.join("");
  }
  const letters = children.split("");
  letters.push(" ");
  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: transition?.duration ?? duration
  };
  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container
  };
  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn("relative", className),
      style: {
        ...style
      },
      initial: "hidden",
      animate: "visible",
      variants: containerVariants,
      transition: finalTransition,
      children: [
        letters.map((letter, index) => /* @__PURE__ */ jsx(
          motion.span,
          {
            "aria-hidden": "true",
            variants: itemVariants,
            className: "absolute top-1/2 left-1/2 inline-block",
            style: {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center"
            },
            children: letter
          },
          `${index}-${letter}`
        )),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:spinning-text.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var BASE_TRANSITION2 = {
  repeat: Infinity,
  ease: "linear"
};
var BASE_ITEM_VARIANTS2 = {
  hidden: {
    opacity: 1
  },
  visible: {
    opacity: 1
  }
};
function SpinningText2({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  transition,
  variants,
  className,
  style
}) {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }
  if (Array.isArray(children)) {
    if (!children.every((child) => typeof child === "string")) {
      throw new Error("all elements in children array must be strings");
    }
    children = children.join("");
  }
  const letters = children.split("");
  letters.push(" ");
  const finalTransition = {
    ...BASE_TRANSITION2,
    ...transition,
    duration: transition?.duration ?? duration
  };
  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container
  };
  const itemVariants = {
    ...BASE_ITEM_VARIANTS2,
    ...variants?.item
  };
  return /* @__PURE__ */ jsxs2(
    motion2.div,
    {
      className: cn("relative", className),
      style: {
        ...style
      },
      initial: "hidden",
      animate: "visible",
      variants: containerVariants,
      transition: finalTransition,
      children: [
        letters.map((letter, index) => /* @__PURE__ */ jsx2(
          motion2.span,
          {
            "aria-hidden": "true",
            variants: itemVariants,
            className: "absolute top-1/2 left-1/2 inline-block",
            style: {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center"
            },
            children: letter
          },
          `${index}-${letter}`
        )),
        /* @__PURE__ */ jsx2("span", { className: "sr-only", children })
      ]
    }
  );
}

// registry:components/ui/spinning-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function SpinningTextBasic() {
  return /* @__PURE__ */ jsx3(SpinningText2, { children: "learn more \u2022 earn more \u2022 grow more \u2022" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(SpinningTextBasic, {}) }) });
}
export {
  SpinningText,
  Component as default
};
