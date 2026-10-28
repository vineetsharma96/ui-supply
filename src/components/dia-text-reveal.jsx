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
// Adapted from https://magicui.design/docs/components/dia-text-reveal
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/dia-text-reveal.tsx
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/dia-text-reveal.tsx
import { jsx } from "react/jsx-runtime";
var DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"];
var BAND_HALF = 17;
var SWEEP_START = -BAND_HALF;
var SWEEP_END = 100 + BAND_HALF;
var sweepEase = (t) => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
function buildGradient(pos, colors, textColor) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;
  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }
  const n = colors.length;
  const parts = [];
  if (bandStart > 0)
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + i / (n - 1) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });
  if (bandEnd < 100)
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}
function measureWidths(el, texts) {
  const ghost = el.cloneNode();
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap"
  });
  el.parentElement.appendChild(ghost);
  const widths = texts.map((t) => {
    ghost.textContent = t;
    return ghost.getBoundingClientRect().width;
  });
  ghost.remove();
  return widths;
}
function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}) {
  const texts = Array.isArray(text) ? text : [text];
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion();
  const spanRef = useRef(null);
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts
  });
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts
  };
  const indexRef = useRef(0);
  const hasPlayedRef = useRef(false);
  const timerRef = useRef(void 0);
  const playRef = useRef(null);
  const stopRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState([]);
  const sweepPos = useMotionValue(SWEEP_START);
  const backgroundImage = useTransform(
    sweepPos,
    (pos) => buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  );
  const isInView = useInView(spanRef, { once, amount: 0.1 });
  useEffect(() => {
    const el = spanRef.current;
    if (!el || !isMulti) return;
    setMeasuredWidths(measureWidths(el, texts));
  }, [Array.isArray(text) ? text.join("\0") : text]);
  playRef.current = () => {
    const { duration: duration2, delay: delay2, repeat: repeat2, repeatDelay: repeatDelay2, texts: texts2 } = optsRef.current;
    sweepPos.set(SWEEP_START);
    const controls = animate(sweepPos, SWEEP_END, {
      duration: duration2,
      delay: delay2,
      ease: sweepEase,
      onComplete() {
        if (!repeat2) return;
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts2.length;
          indexRef.current = next;
          setActiveIndex(next);
          playRef.current();
        }, repeatDelay2 * 1e3);
      }
    });
    stopRef.current = () => controls.stop();
  };
  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END);
      return;
    }
    if (startOnView && !isInView) return;
    if (once && hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    playRef.current();
    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
    };
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos]);
  const fixedW = isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : void 0;
  const animatedW = isMulti && !fixedWidth && measuredWidths[activeIndex] != null ? measuredWidths[activeIndex] : void 0;
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      ref: spanRef,
      className: cn("align-bottom leading-[100%] text-inherit", className),
      style: {
        transform: "translateY(-2px)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...fixedW != null && { width: fixedW }
        }
      },
      animate: animatedW != null ? { width: animatedW } : void 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      ...props,
      children: texts[activeIndex]
    }
  );
}

// entry.jsx
import React from "react";

// registry:dia-text-reveal.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import {
  animate as animate2,
  motion as motion2,
  useInView as useInView2,
  useMotionValue as useMotionValue2,
  useReducedMotion as useReducedMotion2,
  useTransform as useTransform2
} from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var DEFAULT_COLORS2 = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"];
var BAND_HALF2 = 17;
var SWEEP_START2 = -BAND_HALF2;
var SWEEP_END2 = 100 + BAND_HALF2;
var sweepEase2 = (t) => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
function buildGradient2(pos, colors, textColor) {
  const bandStart = pos - BAND_HALF2;
  const bandEnd = pos + BAND_HALF2;
  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }
  const n = colors.length;
  const parts = [];
  if (bandStart > 0)
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + i / (n - 1) * BAND_HALF2 * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });
  if (bandEnd < 100)
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}
function measureWidths2(el, texts) {
  const ghost = el.cloneNode();
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap"
  });
  el.parentElement.appendChild(ghost);
  const widths = texts.map((t) => {
    ghost.textContent = t;
    return ghost.getBoundingClientRect().width;
  });
  ghost.remove();
  return widths;
}
function DiaTextReveal2({
  text,
  colors = DEFAULT_COLORS2,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}) {
  const texts = Array.isArray(text) ? text : [text];
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion2();
  const spanRef = useRef2(null);
  const optsRef = useRef2({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts
  });
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts
  };
  const indexRef = useRef2(0);
  const hasPlayedRef = useRef2(false);
  const timerRef = useRef2(void 0);
  const playRef = useRef2(null);
  const stopRef = useRef2(null);
  const [activeIndex, setActiveIndex] = useState2(0);
  const [measuredWidths, setMeasuredWidths] = useState2([]);
  const sweepPos = useMotionValue2(SWEEP_START2);
  const backgroundImage = useTransform2(
    sweepPos,
    (pos) => buildGradient2(pos, optsRef.current.colors, optsRef.current.textColor)
  );
  const isInView = useInView2(spanRef, { once, amount: 0.1 });
  useEffect2(() => {
    const el = spanRef.current;
    if (!el || !isMulti) return;
    setMeasuredWidths(measureWidths2(el, texts));
  }, [Array.isArray(text) ? text.join("\0") : text]);
  playRef.current = () => {
    const { duration: duration2, delay: delay2, repeat: repeat2, repeatDelay: repeatDelay2, texts: texts2 } = optsRef.current;
    sweepPos.set(SWEEP_START2);
    const controls = animate2(sweepPos, SWEEP_END2, {
      duration: duration2,
      delay: delay2,
      ease: sweepEase2,
      onComplete() {
        if (!repeat2) return;
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts2.length;
          indexRef.current = next;
          setActiveIndex(next);
          playRef.current();
        }, repeatDelay2 * 1e3);
      }
    });
    stopRef.current = () => controls.stop();
  };
  useEffect2(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END2);
      return;
    }
    if (startOnView && !isInView) return;
    if (once && hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    playRef.current();
    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
    };
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos]);
  const fixedW = isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : void 0;
  const animatedW = isMulti && !fixedWidth && measuredWidths[activeIndex] != null ? measuredWidths[activeIndex] : void 0;
  return /* @__PURE__ */ jsx2(
    motion2.span,
    {
      ref: spanRef,
      className: cn("align-bottom leading-[100%] text-inherit", className),
      style: {
        transform: "translateY(-2px)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...fixedW != null && { width: fixedW }
        }
      },
      animate: animatedW != null ? { width: animatedW } : void 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      ...props,
      children: texts[activeIndex]
    }
  );
}

// registry:components/ui/dia-text-reveal-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function DiaTextRevealDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "flex min-h-64 items-center justify-center p-8", children: /* @__PURE__ */ jsx3(
    DiaTextReveal2,
    {
      className: "text-4xl font-bold tracking-tight",
      text: "Magic UI",
      colors: ["#A97CF8", "#F38CB8", "#FDCC92"]
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(DiaTextRevealDemo, {}) }) });
}
export {
  DiaTextReveal,
  Component as default
};
