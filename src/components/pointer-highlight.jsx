// Adapted from https://ui.aceternity.com/components/pointer-highlight
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/pointer-highlight.tsx
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative w-fit", containerClassName),
      ref: containerRef,
      children: [
        children,
        dimensions.width > 0 && dimensions.height > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 z-0",
            initial: { opacity: 0, scale: 0.95, originX: 0, originY: 0 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: cn(
                    "absolute inset-0 border border-neutral-800 dark:border-neutral-200",
                    rectangleClassName
                  ),
                  initial: {
                    width: 0,
                    height: 0
                  },
                  whileInView: {
                    width: dimensions.width,
                    height: dimensions.height
                  },
                  transition: {
                    duration: 1,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "pointer-events-none absolute",
                  initial: { opacity: 0 },
                  whileInView: {
                    opacity: 1,
                    x: dimensions.width + 4,
                    y: dimensions.height + 4
                  },
                  style: {
                    rotate: -90
                  },
                  transition: {
                    opacity: { duration: 0.1, ease: "easeInOut" },
                    duration: 1,
                    ease: "easeInOut"
                  },
                  children: /* @__PURE__ */ jsx(
                    Pointer,
                    {
                      className: cn("h-5 w-5 text-blue-500", pointerClassName)
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
var Pointer = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "1",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 16 16",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx("path", { d: "M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" })
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/pointer-highlight-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function PointerHighlightDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl", children: [
    "The best way to grow is to",
    /* @__PURE__ */ jsx2(PointerHighlight, { children: /* @__PURE__ */ jsx2("span", { children: "collaborate" }) })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(PointerHighlightDemo, {}) }) });
}
export {
  PointerHighlight,
  Component as default
};
