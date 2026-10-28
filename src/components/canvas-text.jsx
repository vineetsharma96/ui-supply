// Adapted from https://ui.aceternity.com/components/canvas-text
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/canvas-text.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function resolveColor(color) {
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return resolved || color;
  }
  return color;
}
function CanvasText({
  text,
  className = "",
  backgroundClassName = "bg-white dark:bg-neutral-950",
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dfe6e9"],
  animationDuration = 5,
  lineWidth = 1.5,
  lineGap = 10,
  curveIntensity = 60,
  overlay = false
}) {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const animationRef = useRef(0);
  const startTimeRef = useRef(0);
  const [bgColor, setBgColor] = useState("#0a0a0a");
  const [resolvedColors, setResolvedColors] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [font, setFont] = useState("");
  const updateColors = useCallback(() => {
    if (bgRef.current) {
      const computed = window.getComputedStyle(bgRef.current);
      setBgColor(computed.backgroundColor);
    }
    const resolved = colors.map(resolveColor);
    setResolvedColors(resolved);
  }, [colors]);
  useEffect(() => {
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, [updateColors]);
  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;
    const updateDimensions = () => {
      const rect = textEl.getBoundingClientRect();
      const computed = window.getComputedStyle(textEl);
      setDimensions({
        width: Math.ceil(rect.width) || 400,
        height: Math.ceil(rect.height) || 200
      });
      setFont(
        `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`
      );
    };
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(textEl);
    return () => resizeObserver.disconnect();
  }, [text, className]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || resolvedColors.length === 0 || dimensions.width === 0 || !font)
      return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.font = font;
    const metrics = ctx.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const baselineY = (height + ascent - descent) / 2;
    const numLines = Math.floor(height / lineGap) + 10;
    startTimeRef.current = performance.now();
    const animate = (currentTime) => {
      const elapsed = (currentTime - startTimeRef.current) / 1e3;
      const phase = elapsed / animationDuration * Math.PI * 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.fillStyle = "#000";
      ctx.fillText(text, 0, baselineY);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-atop";
      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;
        const curve1 = Math.sin(phase) * curveIntensity;
        const curve2 = Math.sin(phase + 0.5) * curveIntensity * 0.6;
        const colorIndex = i % resolvedColors.length;
        ctx.strokeStyle = resolvedColors[colorIndex];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          width * 0.33,
          y + curve1,
          width * 0.66,
          y + curve2,
          width,
          y
        );
        ctx.stroke();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    text,
    font,
    bgColor,
    resolvedColors,
    animationDuration,
    lineWidth,
    lineGap,
    curveIntensity,
    dimensions
  ]);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "relative inline-block",
        overlay && "absolute inset-0",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            ref: bgRef,
            className: cn(
              "pointer-events-none absolute h-0 w-0 opacity-0",
              backgroundClassName
            ),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("span", { ref: textRef, className: "invisible inline-block", "aria-hidden": "true", children: text }),
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            className: "pointer-events-none absolute top-0 left-0",
            style: {
              width: dimensions.width || "auto",
              height: dimensions.height || "auto"
            },
            "aria-label": text,
            role: "img"
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/canvas-text-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CanvasTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex min-h-80 items-center justify-center p-8", children: /* @__PURE__ */ jsxs2(
    "h2",
    {
      className: cn(
        "group relative mx-auto mt-4 max-w-2xl text-left text-4xl leading-20 font-bold tracking-tight text-balance text-neutral-600 sm:text-5xl md:text-6xl xl:text-7xl dark:text-neutral-700"
      ),
      children: [
        "Ship landing pages at",
        " ",
        /* @__PURE__ */ jsx2(
          CanvasText,
          {
            text: "Lightning Speed",
            backgroundClassName: "bg-blue-600 dark:bg-blue-700",
            colors: [
              "rgba(0, 153, 255, 1)",
              "rgba(0, 153, 255, 0.9)",
              "rgba(0, 153, 255, 0.8)",
              "rgba(0, 153, 255, 0.7)",
              "rgba(0, 153, 255, 0.6)",
              "rgba(0, 153, 255, 0.5)",
              "rgba(0, 153, 255, 0.4)",
              "rgba(0, 153, 255, 0.3)",
              "rgba(0, 153, 255, 0.2)",
              "rgba(0, 153, 255, 0.1)"
            ],
            lineGap: 4,
            animationDuration: 20
          }
        )
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CanvasTextDemo, {}) }) });
}
export {
  CanvasText,
  Component as default
};
