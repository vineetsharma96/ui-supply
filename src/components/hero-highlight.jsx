// Adapted from https://ui.aceternity.com/components/hero-highlight
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/hero-highlight.tsx
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`
    }
  };
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black",
        containerClassName
      ),
      onMouseMove: handleMouseMove,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 dark:hidden",
            style: {
              backgroundImage: dotPatterns.light.default
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 hidden dark:block",
            style: {
              backgroundImage: dotPatterns.dark.default
            }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden",
            style: {
              backgroundImage: dotPatterns.light.hover,
              WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
              maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
            }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block",
            style: {
              backgroundImage: dotPatterns.dark.hover,
              WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
              maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-20", className), children })
      ]
    }
  );
};
var Highlight = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      initial: {
        backgroundSize: "0% 100%"
      },
      animate: {
        backgroundSize: "100% 100%"
      },
      transition: {
        duration: 2,
        ease: "linear",
        delay: 0.5
      },
      style: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline"
      },
      className: cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500`,
        className
      ),
      children
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/hero-highlight-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function HeroHighlightDemo() {
  return /* @__PURE__ */ jsx2(HeroHighlight, { children: /* @__PURE__ */ jsxs2(
    motion2.h1,
    {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: [20, -5, 0]
      },
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      },
      className: "text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ",
      children: [
        "With insomnia, nothing's real. Everything is far away. Everything is a",
        " ",
        /* @__PURE__ */ jsx2(Highlight, { className: "text-black dark:text-white", children: "copy, of a copy, of a copy." })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(HeroHighlightDemo, {}) }) });
}
export {
  HeroHighlight,
  Highlight,
  Component as default
};
