// Adapted from https://ui.aceternity.com/components/dotted-glow-background
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/dotted-glow-background.tsx
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
var DottedGlowBackground = ({
  className,
  gap = 12,
  radius = 2,
  color = "rgba(0,0,0,0.7)",
  darkColor,
  glowColor = "rgba(0, 170, 255, 0.85)",
  darkGlowColor,
  colorLightVar,
  colorDarkVar,
  glowColorLightVar,
  glowColorDarkVar,
  opacity = 0.6,
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.3,
  speedScale = 1
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [resolvedColor, setResolvedColor] = useState(color);
  const [resolvedGlowColor, setResolvedGlowColor] = useState(glowColor);
  const resolveCssVariable = (el, variableName) => {
    if (!variableName) return null;
    const normalized = variableName.startsWith("--") ? variableName : `--${variableName}`;
    const fromEl = getComputedStyle(el).getPropertyValue(normalized).trim();
    if (fromEl) return fromEl;
    const root = document.documentElement;
    const fromRoot = getComputedStyle(root).getPropertyValue(normalized).trim();
    return fromRoot || null;
  };
  const detectDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) return true;
    if (root.classList.contains("light")) return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  useEffect(() => {
    const container = containerRef.current ?? document.documentElement;
    const compute = () => {
      const isDark = detectDarkMode();
      let nextColor = color;
      let nextGlow = glowColor;
      if (isDark) {
        const varDot = resolveCssVariable(container, colorDarkVar);
        const varGlow = resolveCssVariable(container, glowColorDarkVar);
        nextColor = varDot || darkColor || nextColor;
        nextGlow = varGlow || darkGlowColor || nextGlow;
      } else {
        const varDot = resolveCssVariable(container, colorLightVar);
        const varGlow = resolveCssVariable(container, glowColorLightVar);
        nextColor = varDot || nextColor;
        nextGlow = varGlow || nextGlow;
      }
      setResolvedColor(nextColor);
      setResolvedGlowColor(nextGlow);
    };
    compute();
    const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const handleMql = () => compute();
    mql?.addEventListener?.("change", handleMql);
    const mo = new MutationObserver(() => compute());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });
    return () => {
      mql?.removeEventListener?.("change", handleMql);
      mo.disconnect();
    };
  }, [
    color,
    darkColor,
    glowColor,
    darkGlowColor,
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar
  ]);
  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let stopped = false;
    let isVisible = true;
    const dpr = Math.min(Math.max(1, window.devicePixelRatio || 1), 2);
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      el.style.width = `${Math.floor(width)}px`;
      el.style.height = `${Math.floor(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    let dots = [];
    const regenDots = () => {
      dots = [];
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const min = Math.min(speedMin, speedMax);
      const max = Math.max(speedMin, speedMax);
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * gap + (j % 2 === 0 ? 0 : gap * 0.5);
          const y = j * gap;
          const phase = Math.random() * Math.PI * 2;
          const span = Math.max(max - min, 0);
          const speed = min + Math.random() * span;
          dots.push({ x, y, phase, speed });
        }
      }
    };
    const regenThrottled = () => {
      regenDots();
    };
    regenDots();
    let last = performance.now();
    const draw = (now) => {
      if (stopped) return;
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const dt = (now - last) / 1e3;
      last = now;
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.globalAlpha = opacity;
      if (backgroundOpacity > 0) {
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.4,
          Math.min(width, height) * 0.1,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.7
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(
          1,
          `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`
        );
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.save();
      ctx.fillStyle = resolvedColor;
      const time = now / 1e3 * Math.max(speedScale, 0);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const mod = (time * d.speed + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const a = 0.25 + 0.55 * lin;
        if (a > 0.6) {
          const glow = (a - 0.6) / 0.4;
          ctx.shadowColor = resolvedGlowColor;
          ctx.shadowBlur = 6 * glow;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = a * opacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    const handleResize = () => {
      resize();
      regenThrottled();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(draw);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      ro.disconnect();
    };
  }, [
    gap,
    radius,
    resolvedColor,
    resolvedGlowColor,
    opacity,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className,
      style: { position: "absolute", inset: 0 },
      children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          style: { display: "block", width: "100%", height: "100%" }
        }
      )
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/dotted-glow-background-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function DottedGlowBackgroundDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex size-60 items-end justify-end overflow-hidden rounded-md rounded-tl-3xl rounded-br-3xl rounded-bl-3xl border border-transparent px-4 shadow ring-1 shadow-black/10 ring-black/5 md:size-100 dark:shadow-white/10 dark:ring-white/5", children: [
    /* @__PURE__ */ jsx2(
      "img",
      {
        src: "https://assets.aceternity.com/logos/calcom.png",
        alt: "Cal.com logo",
        className: "absolute inset-0 z-20 m-auto size-10 md:size-20 dark:invert dark:filter"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex w-full justify-between px-2 py-3 backdrop-blur-[2px] md:px-4", children: [
      /* @__PURE__ */ jsx2("p", { className: "text-xs font-normal text-neutral-600 md:text-sm dark:text-neutral-400", children: "The modern call scheduling app" }),
      /* @__PURE__ */ jsx2("p", { className: "text-xs font-normal text-neutral-600 md:text-sm dark:text-neutral-400", children: "\u2192" })
    ] }),
    /* @__PURE__ */ jsx2(
      DottedGlowBackground,
      {
        className: "pointer-events-none mask-radial-to-90% mask-radial-at-center",
        opacity: 1,
        gap: 10,
        radius: 1.6,
        colorLightVar: "--color-neutral-500",
        glowColorLightVar: "--color-neutral-600",
        colorDarkVar: "--color-neutral-500",
        glowColorDarkVar: "--color-sky-800",
        backgroundOpacity: 0,
        speedMin: 0.3,
        speedMax: 1.6,
        speedScale: 1
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(DottedGlowBackgroundDemo, {}) }) });
}
export {
  DottedGlowBackground,
  Component as default
};
