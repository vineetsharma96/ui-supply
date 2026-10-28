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
// Adapted from https://magicui.design/docs/components/highlighter
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/highlighter.tsx
import { useLayoutEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import { jsx } from "react/jsx-runtime";
function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false
}) {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%"
  });
  const shouldShow = !isView || isInView;
  useLayoutEffect(() => {
    const element = elementRef.current;
    let annotation = null;
    let resizeObserver = null;
    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline
      };
      const currentAnnotation = annotate(element, annotationConfig);
      annotation = currentAnnotation;
      currentAnnotation.show();
      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide();
        currentAnnotation.show();
      });
      resizeObserver.observe(element);
      resizeObserver.observe(document.body);
    }
    return () => {
      annotation?.remove();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline
  ]);
  return /* @__PURE__ */ jsx("span", { ref: elementRef, className: "relative inline-block bg-transparent", children });
}

// entry.jsx
import React from "react";

// registry:highlighter.tsx
import { useLayoutEffect as useLayoutEffect2, useRef as useRef2 } from "react";
import { useInView as useInView2 } from "motion/react";
import { annotate as annotate2 } from "rough-notation";
import { jsx as jsx2 } from "react/jsx-runtime";
function Highlighter2({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false
}) {
  const elementRef = useRef2(null);
  const isInView = useInView2(elementRef, {
    once: true,
    margin: "-10%"
  });
  const shouldShow = !isView || isInView;
  useLayoutEffect2(() => {
    const element = elementRef.current;
    let annotation = null;
    let resizeObserver = null;
    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline
      };
      const currentAnnotation = annotate2(element, annotationConfig);
      annotation = currentAnnotation;
      currentAnnotation.show();
      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide();
        currentAnnotation.show();
      });
      resizeObserver.observe(element);
      resizeObserver.observe(document.body);
    }
    return () => {
      annotation?.remove();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline
  ]);
  return /* @__PURE__ */ jsx2("span", { ref: elementRef, className: "relative inline-block bg-transparent", children });
}

// registry:components/ui/highlighter-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function HighlighterDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
    "The",
    " ",
    /* @__PURE__ */ jsx3(Highlighter2, { action: "underline", color: "#FF9800", children: "Magic UI Highlighter" }),
    " ",
    "makes important",
    " ",
    /* @__PURE__ */ jsx3(Highlighter2, { action: "highlight", color: "#87CEFA", children: "text stand out" }),
    " ",
    "effortlessly."
  ] }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(HighlighterDemo, {}) }) });
}
export {
  Highlighter,
  Component as default
};
