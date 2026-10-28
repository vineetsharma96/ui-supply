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
// Adapted from https://magicui.design/docs/components/pointer
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/pointer.tsx
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/pointer.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Pointer({
  className,
  style,
  children,
  ...props
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const parentElement = typeof window !== "undefined" ? containerRef.current?.parentElement ?? null : null;
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const handleMouseEnter = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const handleMouseLeave = () => {
      setIsActive(false);
    };
    if (parentElement) {
      parentElement.style.cursor = "none";
      parentElement.addEventListener("mousemove", handleMouseMove);
      parentElement.addEventListener("mouseenter", handleMouseEnter);
      parentElement.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (parentElement) {
        parentElement.style.cursor = "";
        parentElement.removeEventListener("mousemove", handleMouseMove);
        parentElement.removeEventListener("mouseenter", handleMouseEnter);
        parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [x, y]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: containerRef }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isActive && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "pointer-events-none fixed z-50 transform-[translate(-50%,-50%)]",
        style: {
          top: y,
          left: x,
          ...style
        },
        initial: {
          scale: 0,
          opacity: 0
        },
        animate: {
          scale: 1,
          opacity: 1
        },
        exit: {
          scale: 0,
          opacity: 0
        },
        ...props,
        children: children || /* @__PURE__ */ jsx(
          "svg",
          {
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "1",
            viewBox: "0 0 16 16",
            height: "24",
            width: "24",
            xmlns: "http://www.w3.org/2000/svg",
            className: cn(
              "rotate-[-70deg] stroke-white text-black",
              className
            ),
            children: /* @__PURE__ */ jsx("path", { d: "M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" })
          }
        )
      }
    ) })
  ] });
}

// entry.jsx
import React from "react";

// registry:components/ui/pointer-demo-1.tsx
import { motion as motion3 } from "motion/react";

// registry:pointer.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import {
  AnimatePresence as AnimatePresence2,
  motion as motion2,
  useMotionValue as useMotionValue2
} from "motion/react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Pointer2({
  className,
  style,
  children,
  ...props
}) {
  const x = useMotionValue2(0);
  const y = useMotionValue2(0);
  const [isActive, setIsActive] = useState2(false);
  const containerRef = useRef2(null);
  useEffect2(() => {
    const parentElement = typeof window !== "undefined" ? containerRef.current?.parentElement ?? null : null;
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const handleMouseEnter = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const handleMouseLeave = () => {
      setIsActive(false);
    };
    if (parentElement) {
      parentElement.style.cursor = "none";
      parentElement.addEventListener("mousemove", handleMouseMove);
      parentElement.addEventListener("mouseenter", handleMouseEnter);
      parentElement.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (parentElement) {
        parentElement.style.cursor = "";
        parentElement.removeEventListener("mousemove", handleMouseMove);
        parentElement.removeEventListener("mouseenter", handleMouseEnter);
        parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [x, y]);
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx2("div", { ref: containerRef }),
    /* @__PURE__ */ jsx2(AnimatePresence2, { children: isActive && /* @__PURE__ */ jsx2(
      motion2.div,
      {
        className: "pointer-events-none fixed z-50 transform-[translate(-50%,-50%)]",
        style: {
          top: y,
          left: x,
          ...style
        },
        initial: {
          scale: 0,
          opacity: 0
        },
        animate: {
          scale: 1,
          opacity: 1
        },
        exit: {
          scale: 0,
          opacity: 0
        },
        ...props,
        children: children || /* @__PURE__ */ jsx2(
          "svg",
          {
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "1",
            viewBox: "0 0 16 16",
            height: "24",
            width: "24",
            xmlns: "http://www.w3.org/2000/svg",
            className: cn(
              "rotate-[-70deg] stroke-white text-black",
              className
            ),
            children: /* @__PURE__ */ jsx2("path", { d: "M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" })
          }
        )
      }
    ) })
  ] });
}

// registry:components/ui/pointer-demo-1.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function PointerDemo1() {
  return /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2", children: [
    /* @__PURE__ */ jsxs3("div", { className: "border-border rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs3("div", { className: "relative flex h-40 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx3("h3", { className: "text-xl font-semibold", children: "Animated Pointer" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-sm", children: "Animated pointer" })
      ] }),
      /* @__PURE__ */ jsx3(Pointer2, { children: /* @__PURE__ */ jsx3(
        motion3.div,
        {
          animate: {
            scale: [0.8, 1, 0.8],
            rotate: [0, 5, -5, 0]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          children: /* @__PURE__ */ jsx3(
            "svg",
            {
              width: "40",
              height: "40",
              viewBox: "0 0 40 40",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "text-pink-600",
              children: /* @__PURE__ */ jsx3(
                motion3.path,
                {
                  d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
                  fill: "currentColor",
                  animate: { scale: [1, 1.2, 1] },
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              )
            }
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "border-border rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs3("div", { className: "relative flex h-40 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx3("h3", { className: "text-xl font-semibold", children: "Colored Pointer" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-sm", children: "A custom pointer with different color" })
      ] }),
      /* @__PURE__ */ jsx3(Pointer2, { className: "fill-blue-500" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "border-border rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs3("div", { className: "relative flex h-40 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx3("h3", { className: "text-xl font-semibold", children: "Custom Shape" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-sm", children: "A pointer with a custom SVG shape" })
      ] }),
      /* @__PURE__ */ jsx3(Pointer2, { children: /* @__PURE__ */ jsxs3(
        "svg",
        {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "10", className: "fill-purple-500" }),
            /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "5", className: "fill-white" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "border-border rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs3("div", { className: "relative flex h-40 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx3("h3", { className: "text-xl font-semibold", children: "Emoji Pointer" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-sm", children: "Using an emoji as a custom pointer" })
      ] }),
      /* @__PURE__ */ jsx3(Pointer2, { children: /* @__PURE__ */ jsx3("div", { className: "text-2xl", children: "\u{1F446}" }) })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(PointerDemo1, {}) }) });
}
export {
  Pointer,
  Component as default
};
