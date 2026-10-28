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
// Adapted from https://magicui.design/docs/components/glyph-matrix
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/glyph-matrix.tsx
import { useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/glyph-matrix.tsx
import { jsx } from "react/jsx-runtime";
function GlyphMatrix({
  glyphs = "01\xB7\u2022+*/\\<>=",
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  className,
  fadeBottom = 0.6,
  color = "#6B7280",
  style,
  ...props
}) {
  const canvasRef = useRef(null);
  const rgbaRef = useRef({ r: 107, g: 114, b: 128, a: 1 });
  useEffect(() => {
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const probeCtx = probe.getContext("2d");
    if (!probeCtx) return;
    probeCtx.fillStyle = "#6B7280";
    probeCtx.fillStyle = color;
    probeCtx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
    rgbaRef.current = { r, g, b, a: a / 255 };
  }, [color]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let cols = 0;
    let rows = 0;
    let cells = [];
    let alphas = [];
    let raf = 0;
    let last = 0;
    let stopped = false;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cellSize);
      rows = Math.ceil(h / cellSize);
      cells = new Array(cols * rows).fill(0).map(() => glyphs[Math.floor(Math.random() * glyphs.length)]);
      alphas = new Array(cols * rows).fill(0).map(() => 0.05 + Math.random() * 0.35);
    };
    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${cellSize - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      const { r, g, b, a: colorAlpha } = rgbaRef.current;
      for (let y = 0; y < rows; y++) {
        const fade = fadeBottom > 0 ? 1 - y / rows * fadeBottom : 1;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const a = alphas[i] * fade * colorAlpha;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fillText(cells[i], x * cellSize, y * cellSize);
        }
      }
    };
    const tick = (t) => {
      if (stopped) return;
      if (t - last >= interval) {
        last = t;
        const total = cols * rows;
        const mutations = Math.max(1, Math.floor(total * mutationRate));
        for (let n = 0; n < mutations; n++) {
          const i = Math.floor(Math.random() * total);
          cells[i] = glyphs[Math.floor(Math.random() * glyphs.length)];
          alphas[i] = 0.05 + Math.random() * 0.45;
        }
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    draw();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: cn("pointer-events-none", className),
      style: { width: "100%", height: "100%", display: "block", ...style },
      "aria-hidden": "true",
      ...props
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/ui/glyph-matrix-demo.tsx
import { useEffect as useEffect4, useState as useState2 } from "react";

// registry:next-themes
import { useState, useEffect as useEffect2 } from "react";
function useTheme() {
  const [theme, set] = useState(document.documentElement.dataset.theme || "dark");
  useEffect2(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:glyph-matrix.tsx
import { useEffect as useEffect3, useRef as useRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function GlyphMatrix2({
  glyphs = "01\xB7\u2022+*/\\<>=",
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  className,
  fadeBottom = 0.6,
  color = "#6B7280",
  style,
  ...props
}) {
  const canvasRef = useRef2(null);
  const rgbaRef = useRef2({ r: 107, g: 114, b: 128, a: 1 });
  useEffect3(() => {
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const probeCtx = probe.getContext("2d");
    if (!probeCtx) return;
    probeCtx.fillStyle = "#6B7280";
    probeCtx.fillStyle = color;
    probeCtx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
    rgbaRef.current = { r, g, b, a: a / 255 };
  }, [color]);
  useEffect3(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let cols = 0;
    let rows = 0;
    let cells = [];
    let alphas = [];
    let raf = 0;
    let last = 0;
    let stopped = false;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cellSize);
      rows = Math.ceil(h / cellSize);
      cells = new Array(cols * rows).fill(0).map(() => glyphs[Math.floor(Math.random() * glyphs.length)]);
      alphas = new Array(cols * rows).fill(0).map(() => 0.05 + Math.random() * 0.35);
    };
    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${cellSize - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      const { r, g, b, a: colorAlpha } = rgbaRef.current;
      for (let y = 0; y < rows; y++) {
        const fade = fadeBottom > 0 ? 1 - y / rows * fadeBottom : 1;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const a = alphas[i] * fade * colorAlpha;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fillText(cells[i], x * cellSize, y * cellSize);
        }
      }
    };
    const tick = (t) => {
      if (stopped) return;
      if (t - last >= interval) {
        last = t;
        const total = cols * rows;
        const mutations = Math.max(1, Math.floor(total * mutationRate));
        for (let n = 0; n < mutations; n++) {
          const i = Math.floor(Math.random() * total);
          cells[i] = glyphs[Math.floor(Math.random() * glyphs.length)];
          alphas[i] = 0.05 + Math.random() * 0.45;
        }
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    draw();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom]);
  return /* @__PURE__ */ jsx2(
    "canvas",
    {
      ref: canvasRef,
      className: cn("pointer-events-none", className),
      style: { width: "100%", height: "100%", display: "block", ...style },
      "aria-hidden": "true",
      ...props
    }
  );
}

// registry:components/ui/glyph-matrix-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function GlyphMatrixDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState2("#6B7280");
  useEffect4(() => {
    if (!resolvedTheme) return;
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return /* @__PURE__ */ jsx3("div", { className: "border-border bg-background relative h-[400px] w-full overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(
    GlyphMatrix2,
    {
      glyphs: "01\xB7\u2022+*/\\<>=",
      cellSize: 14,
      mutationRate: 0.04,
      interval: 90,
      fadeBottom: 0.6,
      color
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(GlyphMatrixDemo, {}) }) });
}
export {
  GlyphMatrix,
  Component as default
};
