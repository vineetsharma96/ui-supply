// Adapted from https://ui.aceternity.com/components/layout-text-flip
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/layout-text-flip.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/layout-text-flip.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3e3
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.span,
      {
        layoutId: "subtext",
        className: "text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl",
        children: text
      }
    ),
    /* @__PURE__ */ jsx(
      motion.span,
      {
        layout: true,
        className: "relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-bold tracking-tight text-black shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg md:text-4xl dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10",
        children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { y: -40, filter: "blur(10px)" },
            animate: {
              y: 0,
              filter: "blur(0px)"
            },
            exit: { y: 50, filter: "blur(10px)", opacity: 0 },
            transition: {
              duration: 0.5
            },
            className: cn("inline-block whitespace-nowrap"),
            children: words[currentIndex]
          },
          currentIndex
        ) })
      }
    )
  ] });
};

// entry.jsx
import React2 from "react";

// registry:components/layout-text-flip-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LayoutTextFlipDemo() {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2(motion2.div, { className: "relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row", children: /* @__PURE__ */ jsx2(
      LayoutTextFlip,
      {
        text: "Welcome to ",
        words: ["Aceternity UI", "Fight Club", "The Matrix", "The Jungle"]
      }
    ) }),
    /* @__PURE__ */ jsx2("p", { className: "mt-4 text-center text-base text-neutral-600 dark:text-neutral-400", children: "Experience the power of modern UI components that bring your ideas to life." })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LayoutTextFlipDemo, {}) }) });
}
export {
  LayoutTextFlip,
  Component as default
};
