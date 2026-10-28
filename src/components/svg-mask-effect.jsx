// Adapted from https://ui.aceternity.com/components/svg-mask-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/svg-mask-effect.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/svg-mask-effect.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const containerRef = useRef(null);
  const updateMousePosition = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      }
    };
  }, []);
  let maskSize = isHovered ? revealSize : size;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: containerRef,
      className: cn("relative h-screen", className),
      animate: {
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)"
      },
      transition: {
        backgroundColor: { duration: 0.3 }
      },
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "absolute flex h-full w-full items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white",
            animate: {
              maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
              maskSize: `${maskSize}px`
            },
            transition: {
              maskSize: { duration: 0.3, ease: "easeInOut" },
              maskPosition: { duration: 0.15, ease: "linear" }
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  onMouseEnter: () => {
                    setIsHovered(true);
                  },
                  onMouseLeave: () => {
                    setIsHovered(false);
                  },
                  className: "relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold",
                  children
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: revealText })
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/svg-mask-effect-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SVGMaskEffectDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex h-[40rem] w-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxs2(
    MaskContainer,
    {
      revealText: /* @__PURE__ */ jsx2("p", { className: "mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white", children: "The first rule of MRR Club is you do not talk about MRR Club. The second rule of MRR Club is you DO NOT talk about MRR Club." }),
      className: "h-[40rem] rounded-md border text-white dark:text-black",
      children: [
        "Discover the power of",
        " ",
        /* @__PURE__ */ jsx2("span", { className: "text-blue-500", children: "Tailwind CSS v4" }),
        " with native CSS variables and container queries with",
        /* @__PURE__ */ jsx2("span", { className: "text-blue-500", children: "advanced animations" }),
        "."
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SVGMaskEffectDemo, {}) }) });
}
export {
  MaskContainer,
  Component as default
};
