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
// Adapted from https://magicui.design/docs/components/dot-pattern
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/dot-pattern.tsx
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/dot-pattern.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: width2, height: height2 } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: width2, height: height2 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const dots = Array.from(
    {
      length: Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height)
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width);
      const row = Math.floor(i / Math.ceil(dimensions.width / width));
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      };
    }
  );
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref: containerRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("radialGradient", { id: `${id}-gradient`, children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: "1" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: "0" })
        ] }) }),
        dots.map((dot) => /* @__PURE__ */ jsx(
          motion.circle,
          {
            cx: dot.x,
            cy: dot.y,
            r: cr,
            fill: glow ? `url(#${id}-gradient)` : "currentColor",
            initial: glow ? { opacity: 0.4, scale: 1 } : {},
            animate: glow ? {
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1]
            } : {},
            transition: glow ? {
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: dot.delay,
              ease: "easeInOut"
            } : {}
          },
          `${dot.x}-${dot.y}`
        ))
      ]
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:dot-pattern.tsx
import { useEffect as useEffect2, useId as useId2, useRef as useRef2, useState as useState2 } from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DotPattern2({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}) {
  const id = useId2();
  const containerRef = useRef2(null);
  const [dimensions, setDimensions] = useState2({ width: 0, height: 0 });
  useEffect2(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: width2, height: height2 } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: width2, height: height2 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const dots = Array.from(
    {
      length: Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height)
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width);
      const row = Math.floor(i / Math.ceil(dimensions.width / width));
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      };
    }
  );
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      ref: containerRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsxs2("radialGradient", { id: `${id}-gradient`, children: [
          /* @__PURE__ */ jsx2("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: "1" }),
          /* @__PURE__ */ jsx2("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: "0" })
        ] }) }),
        dots.map((dot) => /* @__PURE__ */ jsx2(
          motion2.circle,
          {
            cx: dot.x,
            cy: dot.y,
            r: cr,
            fill: glow ? `url(#${id}-gradient)` : "currentColor",
            initial: glow ? { opacity: 0.4, scale: 1 } : {},
            animate: glow ? {
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1]
            } : {},
            transition: glow ? {
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: dot.delay,
              ease: "easeInOut"
            } : {}
          },
          `${dot.x}-${dot.y}`
        ))
      ]
    }
  );
}

// registry:components/ui/dot-pattern-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function DotPatternDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(
    DotPattern2,
    {
      className: cn(
        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      )
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(DotPatternDemo, {}) }) });
}
export {
  DotPattern,
  Component as default
};
