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
// Adapted from https://magicui.design/docs/components/blur-fade
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/blur-fade.tsx
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView
} from "motion/react";
import { jsx } from "react/jsx-runtime";
var getFilter = (v) => typeof v === "function" ? void 0 : v.filter;
function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]: direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`
    }
  };
  const combinedVariants = variant ?? defaultVariants;
  const hiddenFilter = getFilter(combinedVariants.hidden);
  const visibleFilter = getFilter(combinedVariants.visible);
  const shouldTransitionFilter = hiddenFilter != null && visibleFilter != null && hiddenFilter !== visibleFilter;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      exit: "hidden",
      variants: combinedVariants,
      transition: {
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
        ...shouldTransitionFilter ? { filter: { duration } } : {}
      },
      className,
      ...props,
      children
    }
  ) });
}

// entry.jsx
import React from "react";

// registry:blur-fade.tsx
import { useRef as useRef2 } from "react";
import {
  AnimatePresence as AnimatePresence2,
  motion as motion2,
  useInView as useInView2
} from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var getFilter2 = (v) => typeof v === "function" ? void 0 : v.filter;
function BlurFade2({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}) {
  const ref = useRef2(null);
  const inViewResult = useInView2(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]: direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`
    }
  };
  const combinedVariants = variant ?? defaultVariants;
  const hiddenFilter = getFilter2(combinedVariants.hidden);
  const visibleFilter = getFilter2(combinedVariants.visible);
  const shouldTransitionFilter = hiddenFilter != null && visibleFilter != null && hiddenFilter !== visibleFilter;
  return /* @__PURE__ */ jsx2(AnimatePresence2, { children: /* @__PURE__ */ jsx2(
    motion2.div,
    {
      ref,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      exit: "hidden",
      variants: combinedVariants,
      transition: {
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
        ...shouldTransitionFilter ? { filter: { duration } } : {}
      },
      className,
      ...props,
      children
    }
  ) });
}

// registry:components/ui/blur-fade-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});
function BlurFadeDemo() {
  return /* @__PURE__ */ jsx3("section", { id: "photos", children: /* @__PURE__ */ jsx3("div", { className: "columns-2 gap-4 sm:columns-3", children: images.map((imageUrl, idx) => /* @__PURE__ */ jsx3(BlurFade2, { delay: 0.25 + idx * 0.05, inView: true, children: /* @__PURE__ */ jsx3(
    "img",
    {
      className: "mb-4 size-full rounded-lg object-contain",
      src: imageUrl,
      alt: `Random stock image ${idx + 1}`
    }
  ) }, imageUrl)) }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(BlurFadeDemo, {}) }) });
}
export {
  BlurFade,
  Component as default
};
