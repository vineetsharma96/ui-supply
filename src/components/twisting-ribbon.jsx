/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

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
// Adapted from https://www.vengenceui.com/components/twisting-ribbon
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/twisting-ribbon.tsx
import { useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/twisting-ribbon.tsx
import { jsx } from "react/jsx-runtime";
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const num = parseInt(hex, 16);
  return [num >> 16, num >> 8 & 255, num & 255];
}
function TwistingRibbon({
  className,
  segments = 400,
  waveSpeed = 0.018,
  waveAmplitude = 1,
  twistCycles = 6,
  lightColors,
  darkColors,
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const RIBBON_HALF_W = 14;
    const RIBBON_X_SCALE = 1.4;
    const RIBBON_X_OFFSET = 0.2;
    const WAVE1_FREQ = 3.5;
    const WAVE1_TIME_SPEED = 0.7;
    const WAVE1_AMP = 110 * waveAmplitude;
    const WAVE2_FREQ = 7;
    const WAVE2_TIME_SPEED = 1.1;
    const WAVE2_AMP = 30 * waveAmplitude;
    const TWIST_TIME_SPEED = 0.5;
    const L_COLOR_FACE = lightColors?.face ? hexToRgb(lightColors.face) : [255, 60, 10];
    const L_COLOR_FOLD_A = lightColors?.foldA ? hexToRgb(lightColors.foldA) : [180, 255, 0];
    const L_COLOR_FOLD_B = lightColors?.foldB ? hexToRgb(lightColors.foldB) : [60, 80, 255];
    const L_COLOR_FOLD_C = lightColors?.foldC ? hexToRgb(lightColors.foldC) : [0, 220, 255];
    const L_SHADOW_COLOR = [80, 60, 40];
    const L_SHADOW_ALPHA = 14 / 255;
    const L_EDGE_COLOR = [0, 0, 0];
    const L_EDGE_ALPHA = 22 / 255;
    const D_COLOR_FACE = darkColors?.face ? hexToRgb(darkColors.face) : [255, 60, 10];
    const D_COLOR_FOLD_A = darkColors?.foldA ? hexToRgb(darkColors.foldA) : [180, 255, 0];
    const D_COLOR_FOLD_B = darkColors?.foldB ? hexToRgb(darkColors.foldB) : [60, 80, 255];
    const D_COLOR_FOLD_C = darkColors?.foldC ? hexToRgb(darkColors.foldC) : [0, 220, 255];
    const D_SHADOW_COLOR = [0, 0, 0];
    const D_SHADOW_ALPHA = 120 / 255;
    const D_EDGE_COLOR = [255, 255, 255];
    const D_EDGE_ALPHA = 30 / 255;
    const COLOR_CYCLE_FREQ = 2;
    const COLOR_CYCLE_SPEED = 0.3;
    const FACE_BLEND_GAMMA = 1.2;
    const SHADOW_OFFSET_X = 4;
    const SHADOW_OFFSET_Y = 7;
    const EDGE_MIN_TWIST = 0.08;
    const EDGE_WEIGHT = 0.5;
    let t = 0;
    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    window.addEventListener("resize", resize);
    resize();
    function lerpColor(a, b, f) {
      return [
        Math.round(a[0] + (b[0] - a[0]) * f),
        Math.round(a[1] + (b[1] - a[1]) * f),
        Math.round(a[2] + (b[2] - a[2]) * f)
      ];
    }
    function buildSpine(time) {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        pts.push({
          x: progress * width * RIBBON_X_SCALE - width * RIBBON_X_OFFSET,
          y: height / 2 + Math.sin(progress * Math.PI * WAVE1_FREQ + time * WAVE1_TIME_SPEED) * WAVE1_AMP + Math.sin(progress * Math.PI * WAVE2_FREQ + time * WAVE2_TIME_SPEED) * WAVE2_AMP
        });
      }
      return pts;
    }
    function buildNormals(pts) {
      const last = pts.length - 1;
      return pts.map((_, i) => {
        const dx = i === 0 ? pts[1].x - pts[0].x : i === last ? pts[last].x - pts[last - 1].x : pts[i + 1].x - pts[i - 1].x;
        const dy = i === 0 ? pts[1].y - pts[0].y : i === last ? pts[last].y - pts[last - 1].y : pts[i + 1].y - pts[i - 1].y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        return { nx: -dy / len, ny: dx / len };
      });
    }
    function buildEdges(pts, normals, time) {
      const tops = [];
      const bots = [];
      const twists = [];
      for (let i = 0; i <= segments; i++) {
        const twist = Math.cos(
          i / segments * Math.PI * twistCycles + time * TWIST_TIME_SPEED
        );
        const w = RIBBON_HALF_W * Math.abs(twist);
        const sign = twist >= 0 ? 1 : -1;
        twists.push(twist);
        tops.push({
          x: pts[i].x + normals[i].nx * w * sign,
          y: pts[i].y + normals[i].ny * w * sign
        });
        bots.push({
          x: pts[i].x - normals[i].nx * w * sign,
          y: pts[i].y - normals[i].ny * w * sign
        });
      }
      return { tops, bots, twists };
    }
    function getFoldColor(frac, time, isDark) {
      const cycle = ((frac * COLOR_CYCLE_FREQ + time * COLOR_CYCLE_SPEED) % 1 + 1) % 1;
      const colorA = isDark ? D_COLOR_FOLD_A : L_COLOR_FOLD_A;
      const colorB = isDark ? D_COLOR_FOLD_B : L_COLOR_FOLD_B;
      const colorC = isDark ? D_COLOR_FOLD_C : L_COLOR_FOLD_C;
      if (cycle < 1 / 3) return lerpColor(colorA, colorB, cycle * 3);
      if (cycle < 2 / 3) return lerpColor(colorB, colorC, (cycle - 1 / 3) * 3);
      return lerpColor(colorC, colorA, (cycle - 2 / 3) * 3);
    }
    function getRibbonColor(frac, twist, time, isDark) {
      const foldColor = getFoldColor(frac, time, isDark);
      const faceColor = isDark ? D_COLOR_FACE : L_COLOR_FACE;
      const facedness = Math.pow(Math.abs(twist), FACE_BLEND_GAMMA);
      return lerpColor(foldColor, faceColor, facedness);
    }
    function drawQuad(ax, ay, bx, by, cx, cy, dx, dy) {
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(cx, cy);
      ctx.lineTo(dx, dy);
      ctx.closePath();
      ctx.fill();
    }
    function drawShadow(tops, bots, isDark) {
      const color = isDark ? D_SHADOW_COLOR : L_SHADOW_COLOR;
      const alpha = isDark ? D_SHADOW_ALPHA : L_SHADOW_ALPHA;
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
      for (let i = 0; i < segments; i++) {
        drawQuad(
          tops[i].x + SHADOW_OFFSET_X,
          tops[i].y + SHADOW_OFFSET_Y,
          tops[i + 1].x + SHADOW_OFFSET_X,
          tops[i + 1].y + SHADOW_OFFSET_Y,
          bots[i + 1].x + SHADOW_OFFSET_X,
          bots[i + 1].y + SHADOW_OFFSET_Y,
          bots[i].x + SHADOW_OFFSET_X,
          bots[i].y + SHADOW_OFFSET_Y
        );
      }
    }
    function drawRibbon(tops, bots, twists, time, isDark) {
      const edgeColor = isDark ? D_EDGE_COLOR : L_EDGE_COLOR;
      const edgeAlpha = isDark ? D_EDGE_ALPHA : L_EDGE_ALPHA;
      for (let i = 0; i < segments; i++) {
        const [r, g, b] = getRibbonColor(i / segments, twists[i], time, isDark);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        drawQuad(
          tops[i].x,
          tops[i].y,
          tops[i + 1].x,
          tops[i + 1].y,
          bots[i + 1].x,
          bots[i + 1].y,
          bots[i].x,
          bots[i].y
        );
        if (Math.abs(twists[i]) > EDGE_MIN_TWIST) {
          ctx.strokeStyle = `rgba(${edgeColor[0]}, ${edgeColor[1]}, ${edgeColor[2]}, ${edgeAlpha})`;
          ctx.lineWidth = EDGE_WEIGHT;
          ctx.beginPath();
          ctx.moveTo(tops[i].x, tops[i].y);
          ctx.lineTo(tops[i + 1].x, tops[i + 1].y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(bots[i].x, bots[i].y);
          ctx.lineTo(bots[i + 1].x, bots[i + 1].y);
          ctx.stroke();
        }
      }
    }
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += waveSpeed;
      const isDark = document.documentElement.classList.contains("dark");
      const pts = buildSpine(t);
      const normals = buildNormals(pts);
      const { tops, bots, twists } = buildEdges(pts, normals, t);
      drawShadow(tops, bots, isDark);
      drawRibbon(tops, bots, twists, t, isDark);
      animationFrameId = requestAnimationFrame(render);
    }
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [segments, waveSpeed, waveAmplitude, twistCycles, lightColors, darkColors]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn(
        "relative w-full h-full overflow-hidden rounded-[12px]",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "absolute inset-0 block w-full h-full" })
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/twisting-ribbon-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function TwistingRibbonDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full h-[420px] rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx2(TwistingRibbon, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TwistingRibbonDemo, {}) }) });
}
export {
  TwistingRibbon,
  Component as default
};
