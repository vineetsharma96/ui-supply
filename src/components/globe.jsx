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
// Adapted from https://magicui.design/docs/components/globe
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/globe.tsx
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/globe.tsx
import { jsx } from "react/jsx-runtime";
var MOVEMENT_DAMPING = 1400;
var GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {
  },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16e3,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 }
  ]
};
function Globe({
  className,
  config = GLOBE_CONFIG
}) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100
  });
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };
  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };
  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 5e-3;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      }
    });
    setTimeout(() => canvasRef.current.style.opacity = "1", 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "canvas",
        {
          className: cn(
            "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
          ),
          ref: canvasRef,
          onPointerDown: (e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          },
          onPointerUp: () => updatePointerInteraction(null),
          onPointerOut: () => updatePointerInteraction(null),
          onMouseMove: (e) => updateMovement(e.clientX),
          onTouchMove: (e) => e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      )
    }
  );
}

// entry.jsx
import React from "react";

// registry:globe.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";
import createGlobe2 from "cobe";
import { useMotionValue as useMotionValue2, useSpring as useSpring2 } from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var MOVEMENT_DAMPING2 = 1400;
var GLOBE_CONFIG2 = {
  width: 800,
  height: 800,
  onRender: () => {
  },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16e3,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 }
  ]
};
function Globe2({
  className,
  config = GLOBE_CONFIG2
}) {
  const canvasRef = useRef2(null);
  const phiRef = useRef2(0);
  const widthRef = useRef2(0);
  const pointerInteracting = useRef2(null);
  const pointerInteractionMovement = useRef2(0);
  const r = useMotionValue2(0);
  const rs = useSpring2(r, {
    mass: 1,
    damping: 30,
    stiffness: 100
  });
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };
  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING2);
    }
  };
  useEffect2(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe2(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 5e-3;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      }
    });
    setTimeout(() => canvasRef.current.style.opacity = "1", 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      ),
      children: /* @__PURE__ */ jsx2(
        "canvas",
        {
          className: cn(
            "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
          ),
          ref: canvasRef,
          onPointerDown: (e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          },
          onPointerUp: () => updatePointerInteraction(null),
          onPointerOut: () => updatePointerInteraction(null),
          onMouseMove: (e) => updateMovement(e.clientX),
          onTouchMove: (e) => e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      )
    }
  );
}

// registry:components/ui/globe-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function GlobeDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-background relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border px-40 pt-8 pb-40 md:pb-60", children: [
    /* @__PURE__ */ jsx3("span", { className: "pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10", children: "Globe" }),
    /* @__PURE__ */ jsx3(Globe2, { className: "top-28" }),
    /* @__PURE__ */ jsx3("div", { className: "pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(GlobeDemo, {}) }) });
}
export {
  Globe,
  Component as default
};
