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
// Adapted from https://magicui.design/docs/components/floating-3d-particles
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/floating-3d-particles.tsx
import * as React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/floating-3d-particles.tsx
import { jsx } from "react/jsx-runtime";
var MOBILE_BREAKPOINT = 768;
var SPREAD_FACTOR = 1.2;
var MAX_DPR = 2;
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return `rgba(139,92,246,${alpha})`;
  const n = Number.parseInt(full, 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${alpha})`;
}
function deriveProjection(depth) {
  const t = Math.max(0, Math.min(1, depth));
  const fov = 800 - t * 600;
  const perspectiveDistance = 100 + t * 700;
  const depthRange = t * Math.min(400, fov + perspectiveDistance - 1);
  return { fov, perspectiveDistance, depthRange };
}
function spawnParticle(width, height, size, opacity) {
  const sizeVariance = size * 0.4;
  const opacityVariance = 0.2;
  return {
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.max(width, height) * SPREAD_FACTOR,
    y: (Math.random() - 0.5) * height * 2,
    size: Math.max(0.5, size - sizeVariance + Math.random() * sizeVariance * 2),
    angularSpeed: 15e-4 + Math.random() * 1e-3,
    opacity: Math.min(
      1,
      Math.max(
        0,
        opacity - opacityVariance + Math.random() * opacityVariance * 2
      )
    ),
    screenX: 0,
    screenY: 0,
    projectedScale: 1
  };
}
function Floating3DParticles({
  quantity = 400,
  color = "#8B5CF6",
  size = 5,
  opacity = 0.3,
  drift = 0.8,
  depth = 0.5,
  className,
  style,
  ...canvasProps
}) {
  const canvasRef = React.useRef(null);
  const ioRef = React.useRef(null);
  const stateRef = React.useRef({
    mounted: false,
    paused: false,
    reducedMotion: false,
    rafId: null
  });
  const colorRef = React.useRef(color);
  colorRef.current = color;
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const s = stateRef.current;
    s.mounted = true;
    s.paused = false;
    let width = 0;
    let height = 0;
    let particles = [];
    let staticDirty = true;
    const { fov, perspectiveDistance, depthRange } = deriveProjection(depth);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      s.reducedMotion = mq.matches;
    };
    syncReducedMotion();
    const draw = (p) => {
      const r = Math.max(0, p.size * p.projectedScale);
      if (r <= 0) return;
      ctx.beginPath();
      ctx.fillStyle = hexToRgba(colorRef.current, p.opacity);
      ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        const denom = Math.max(1, fov + perspectiveDistance);
        const scale = fov / denom;
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
        draw(p);
      }
    };
    const tick = () => {
      if (!s.mounted) return;
      if (s.paused) {
        s.rafId = requestAnimationFrame(tick);
        return;
      }
      if (s.reducedMotion) {
        if (staticDirty) {
          staticDirty = false;
          staticFrame();
        }
        s.rafId = requestAnimationFrame(tick);
        return;
      }
      staticDirty = true;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        p.angle += p.angularSpeed;
        p.y -= drift;
        if (p.y < -height) {
          p.y = height;
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR;
        } else if (p.y > height) {
          p.y = -height;
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR;
        }
        const denom = Math.max(
          1,
          fov + perspectiveDistance + Math.sin(p.angle) * depthRange
        );
        const scale = fov / denom;
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
      }
      particles.sort((a, b) => a.projectedScale - b.projectedScale);
      for (const p of particles) draw(p);
      s.rafId = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const count = isMobile ? Math.round(quantity * 0.2) : quantity;
      particles = Array.from(
        { length: Math.max(0, count) },
        () => spawnParticle(width, height, size, opacity)
      );
      staticDirty = true;
    };
    const onVisibilityChange = () => {
      s.paused = document.hidden;
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) {
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }
    if (typeof IntersectionObserver !== "undefined") {
      ioRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry) s.paused = document.hidden || !entry.isIntersecting;
        },
        { threshold: 0 }
      );
      ioRef.current.observe(canvas);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    mq.addEventListener("change", syncReducedMotion);
    resize();
    s.rafId = requestAnimationFrame(tick);
    return () => {
      s.mounted = false;
      if (s.rafId !== null) {
        cancelAnimationFrame(s.rafId);
        s.rafId = null;
      }
      ro?.disconnect();
      if (!ro) window.removeEventListener("resize", resize);
      ioRef.current?.disconnect();
      ioRef.current = null;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      mq.removeEventListener("change", syncReducedMotion);
    };
  }, [quantity, size, opacity, drift, depth]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      ),
      style,
      ...canvasProps
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/ui/floating-3d-particles-demo.tsx
import { ArrowRight } from "lucide-react";

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

// registry:floating-3d-particles.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var MOBILE_BREAKPOINT2 = 768;
var SPREAD_FACTOR2 = 1.2;
var MAX_DPR2 = 2;
function hexToRgba2(hex, alpha) {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return `rgba(139,92,246,${alpha})`;
  const n = Number.parseInt(full, 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${alpha})`;
}
function deriveProjection2(depth) {
  const t = Math.max(0, Math.min(1, depth));
  const fov = 800 - t * 600;
  const perspectiveDistance = 100 + t * 700;
  const depthRange = t * Math.min(400, fov + perspectiveDistance - 1);
  return { fov, perspectiveDistance, depthRange };
}
function spawnParticle2(width, height, size, opacity) {
  const sizeVariance = size * 0.4;
  const opacityVariance = 0.2;
  return {
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.max(width, height) * SPREAD_FACTOR2,
    y: (Math.random() - 0.5) * height * 2,
    size: Math.max(0.5, size - sizeVariance + Math.random() * sizeVariance * 2),
    angularSpeed: 15e-4 + Math.random() * 1e-3,
    opacity: Math.min(
      1,
      Math.max(
        0,
        opacity - opacityVariance + Math.random() * opacityVariance * 2
      )
    ),
    screenX: 0,
    screenY: 0,
    projectedScale: 1
  };
}
function Floating3DParticles2({
  quantity = 400,
  color = "#8B5CF6",
  size = 5,
  opacity = 0.3,
  drift = 0.8,
  depth = 0.5,
  className,
  style,
  ...canvasProps
}) {
  const canvasRef = React2.useRef(null);
  const ioRef = React2.useRef(null);
  const stateRef = React2.useRef({
    mounted: false,
    paused: false,
    reducedMotion: false,
    rafId: null
  });
  const colorRef = React2.useRef(color);
  colorRef.current = color;
  React2.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const s = stateRef.current;
    s.mounted = true;
    s.paused = false;
    let width = 0;
    let height = 0;
    let particles = [];
    let staticDirty = true;
    const { fov, perspectiveDistance, depthRange } = deriveProjection2(depth);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      s.reducedMotion = mq.matches;
    };
    syncReducedMotion();
    const draw = (p) => {
      const r = Math.max(0, p.size * p.projectedScale);
      if (r <= 0) return;
      ctx.beginPath();
      ctx.fillStyle = hexToRgba2(colorRef.current, p.opacity);
      ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        const denom = Math.max(1, fov + perspectiveDistance);
        const scale = fov / denom;
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
        draw(p);
      }
    };
    const tick = () => {
      if (!s.mounted) return;
      if (s.paused) {
        s.rafId = requestAnimationFrame(tick);
        return;
      }
      if (s.reducedMotion) {
        if (staticDirty) {
          staticDirty = false;
          staticFrame();
        }
        s.rafId = requestAnimationFrame(tick);
        return;
      }
      staticDirty = true;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        p.angle += p.angularSpeed;
        p.y -= drift;
        if (p.y < -height) {
          p.y = height;
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR2;
        } else if (p.y > height) {
          p.y = -height;
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR2;
        }
        const denom = Math.max(
          1,
          fov + perspectiveDistance + Math.sin(p.angle) * depthRange
        );
        const scale = fov / denom;
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
      }
      particles.sort((a, b) => a.projectedScale - b.projectedScale);
      for (const p of particles) draw(p);
      s.rafId = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR2));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT2;
      const count = isMobile ? Math.round(quantity * 0.2) : quantity;
      particles = Array.from(
        { length: Math.max(0, count) },
        () => spawnParticle2(width, height, size, opacity)
      );
      staticDirty = true;
    };
    const onVisibilityChange = () => {
      s.paused = document.hidden;
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) {
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }
    if (typeof IntersectionObserver !== "undefined") {
      ioRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry) s.paused = document.hidden || !entry.isIntersecting;
        },
        { threshold: 0 }
      );
      ioRef.current.observe(canvas);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    mq.addEventListener("change", syncReducedMotion);
    resize();
    s.rafId = requestAnimationFrame(tick);
    return () => {
      s.mounted = false;
      if (s.rafId !== null) {
        cancelAnimationFrame(s.rafId);
        s.rafId = null;
      }
      ro?.disconnect();
      if (!ro) window.removeEventListener("resize", resize);
      ioRef.current?.disconnect();
      ioRef.current = null;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      mq.removeEventListener("change", syncReducedMotion);
    };
  }, [quantity, size, opacity, drift, depth]);
  return /* @__PURE__ */ jsx2(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      ),
      style,
      ...canvasProps
    }
  );
}

// registry:components/ui/floating-3d-particles-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Component() {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";
  return /* @__PURE__ */ jsxs("div", { className: "bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3(Floating3DParticles2, { color }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6 px-6 text-center", children: [
      /* @__PURE__ */ jsx3("h2", { className: "text-3xl font-bold tracking-tight md:text-5xl", children: "Build something magical" }),
      /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground max-w-xl text-base md:text-lg", children: "A pseudo-3D particle background that stays behind your content with continuous rotation and buoyant drift." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: "bg-foreground text-background inline-flex h-11 items-center gap-2 rounded-lg px-6 font-medium no-underline transition-opacity hover:opacity-90",
          children: [
            "Get Started",
            /* @__PURE__ */ jsx3(ArrowRight, { className: "size-4" })
          ]
        }
      )
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component2() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Component, {}) }) });
}
export {
  Floating3DParticles,
  Component2 as default
};
