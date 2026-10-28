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
// Adapted from https://www.vengenceui.com/components/pixelated-image-trail
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}
var init_utils = __esm({
  "registry:utils"() {
  }
});

// registry:components/ui/pixelated-image-trail.tsx
var pixelated_image_trail_exports = {};
__export(pixelated_image_trail_exports, {
  PixelatedImageTrail: () => PixelatedImageTrail,
  default: () => pixelated_image_trail_default
});
import { useEffect, useMemo, useRef } from "react";
import { jsx } from "react/jsx-runtime";
function PixelatedImageTrail({
  className,
  images,
  config: configOverride = {},
  slices = 5,
  spawnThreshold = 32,
  smoothing = 0.32,
  imageSize = 220
}) {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentImageIndexRef = useRef(0);
  const validImagesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const activeImagesRef = useRef([]);
  const pointerActiveRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const lastSpawnPosRef = useRef({ x: 0, y: 0 });
  const interpolatedPointerPosRef = useRef({ x: 0, y: 0 });
  const finalImages = useMemo(() => images?.length ? images : DEFAULT_IMAGES, [images]);
  const finalImagesKey = finalImages.join("|");
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...configOverride }), [configOverride]);
  useEffect(() => {
    let isActive = true;
    validImagesRef.current = [];
    finalImages.forEach((src) => {
      const image = new Image();
      image.onload = () => {
        if (!isActive || validImagesRef.current.includes(src)) {
          return;
        }
        validImagesRef.current.push(src);
      };
      image.src = src;
    });
    return () => {
      isActive = false;
    };
  }, [finalImagesKey, finalImages]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const safeSlices = Math.max(1, Math.floor(slices));
    const safeSmoothing = clamp(smoothing, 0.01, 1);
    const safeSpawnThreshold = Math.max(1, spawnThreshold);
    const safeImageSize = Math.max(40, imageSize);
    const getSliceDelay = (index, stagger) => Math.abs(index - (safeSlices - 1) / 2) * stagger;
    const getMaxSliceDelay = (stagger) => (safeSlices - 1) / 2 * stagger;
    const schedule = (callback, delay) => {
      const timeout = window.setTimeout(() => {
        timeoutsRef.current = timeoutsRef.current.filter((id) => id !== timeout);
        callback();
      }, delay);
      timeoutsRef.current.push(timeout);
      return timeout;
    };
    const updatePointer = (event) => {
      const rect = container.getBoundingClientRect();
      const nextPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      pointerPosRef.current = nextPosition;
      if (!pointerActiveRef.current) {
        pointerActiveRef.current = true;
        interpolatedPointerPosRef.current = nextPosition;
        lastSpawnPosRef.current = nextPosition;
      }
    };
    const handlePointerLeave = () => {
      pointerActiveRef.current = false;
    };
    const distanceFromLastSpawn = () => {
      const dx = interpolatedPointerPosRef.current.x - lastSpawnPosRef.current.x;
      const dy = interpolatedPointerPosRef.current.y - lastSpawnPosRef.current.y;
      return Math.hypot(dx, dy);
    };
    const createTrailImage = () => {
      if (!validImagesRef.current.length) return;
      const imageSource = validImagesRef.current[currentImageIndexRef.current % validImagesRef.current.length];
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % validImagesRef.current.length;
      const startX = interpolatedPointerPosRef.current.x - safeImageSize / 2;
      const startY = interpolatedPointerPosRef.current.y - safeImageSize / 2;
      const targetX = startX + (pointerPosRef.current.x - interpolatedPointerPosRef.current.x) * 0.45;
      const targetY = startY + (pointerPosRef.current.y - interpolatedPointerPosRef.current.y) * 0.45;
      const imageElement = document.createElement("div");
      const layerFragment = document.createDocumentFragment();
      Object.assign(imageElement.style, {
        position: "absolute",
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${safeImageSize}px`,
        height: `${safeImageSize}px`,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: "12px",
        opacity: "1",
        transform: "translate3d(0, 0, 0) scale(1)",
        transition: [
          `left ${config.slideDuration}ms ${config.slideEasing}`,
          `top ${config.slideDuration}ms ${config.slideEasing}`,
          `opacity ${config.outDuration}ms ${config.easing}`,
          `transform ${config.outDuration}ms ${config.easing}`
        ].join(", "),
        willChange: "left, top, opacity, transform",
        zIndex: "1",
        filter: "drop-shadow(0 16px 24px rgb(0 0 0 / 0.22))",
        contain: "layout style paint",
        backfaceVisibility: "hidden"
      });
      const layers = [];
      for (let index = 0; index < safeSlices; index += 1) {
        const sliceSize = 100 / safeSlices;
        const startClipY = index * sliceSize;
        const endClipY = (index + 1) * sliceSize;
        const layer = document.createElement("div");
        const imageLayer = document.createElement("div");
        Object.assign(layer.style, {
          position: "absolute",
          inset: "0",
          overflow: "hidden",
          clipPath: `polygon(50% ${startClipY}%, 50% ${startClipY}%, 50% ${endClipY}%, 50% ${endClipY}%)`,
          transition: `clip-path ${config.inDuration}ms ${config.easing}`,
          transitionDelay: `${getSliceDelay(index, config.staggerIn)}ms`,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "clip-path",
          contain: "layout style"
        });
        Object.assign(imageLayer.style, {
          position: "absolute",
          inset: "0",
          backgroundImage: `url("${imageSource}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)"
        });
        layer.appendChild(imageLayer);
        layerFragment.appendChild(layer);
        layers.push(layer);
      }
      imageElement.appendChild(layerFragment);
      container.appendChild(imageElement);
      activeImagesRef.current.push(imageElement);
      while (activeImagesRef.current.length > MAX_ACTIVE_IMAGES) {
        activeImagesRef.current.shift()?.remove();
      }
      requestAnimationFrame(() => {
        if (imageElement.parentElement !== container) return;
        imageElement.style.left = `${targetX}px`;
        imageElement.style.top = `${targetY}px`;
        layers.forEach((layer, index) => {
          const sliceSize = 100 / safeSlices;
          const startClipY = index * sliceSize;
          const endClipY = (index + 1) * sliceSize;
          layer.style.clipPath = `polygon(0% ${startClipY}%, 100% ${startClipY}%, 100% ${endClipY}%, 0% ${endClipY}%)`;
        });
      });
      schedule(() => {
        imageElement.style.opacity = "0";
        imageElement.style.transform = "translate3d(0, 0, 0) scale(0.24)";
        layers.forEach((layer, index) => {
          const sliceSize = 100 / safeSlices;
          const startClipY = index * sliceSize;
          const endClipY = (index + 1) * sliceSize;
          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
          layer.style.transitionDelay = `${getSliceDelay(index, config.staggerOut)}ms`;
          layer.style.clipPath = `polygon(50% ${startClipY}%, 50% ${startClipY}%, 50% ${endClipY}%, 50% ${endClipY}%)`;
        });
        schedule(() => {
          activeImagesRef.current = activeImagesRef.current.filter((element) => element !== imageElement);
          imageElement.remove();
        }, config.outDuration + getMaxSliceDelay(config.staggerOut));
      }, config.imageLifespan);
    };
    const render = () => {
      if (pointerActiveRef.current) {
        interpolatedPointerPosRef.current = {
          x: interpolatedPointerPosRef.current.x + (pointerPosRef.current.x - interpolatedPointerPosRef.current.x) * safeSmoothing,
          y: interpolatedPointerPosRef.current.y + (pointerPosRef.current.y - interpolatedPointerPosRef.current.y) * safeSmoothing
        };
        if (distanceFromLastSpawn() > safeSpawnThreshold) {
          lastSpawnPosRef.current = { ...interpolatedPointerPosRef.current };
          createTrailImage();
        }
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };
    container.addEventListener("pointerenter", updatePointer);
    container.addEventListener("pointermove", updatePointer);
    container.addEventListener("pointerleave", handlePointerLeave);
    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      container.removeEventListener("pointerenter", updatePointer);
      container.removeEventListener("pointermove", updatePointer);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
      activeImagesRef.current = [];
      container.replaceChildren();
      pointerActiveRef.current = false;
    };
  }, [
    config.easing,
    config.imageLifespan,
    config.inDuration,
    config.outDuration,
    config.slideDuration,
    config.slideEasing,
    config.staggerIn,
    config.staggerOut,
    imageSize,
    slices,
    smoothing,
    spawnThreshold
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      "aria-hidden": "true",
      className: cn("absolute inset-0 overflow-hidden pointer-events-auto touch-none", className)
    }
  );
}
var DEFAULT_CONFIG, DEFAULT_IMAGES, MAX_ACTIVE_IMAGES, clamp, pixelated_image_trail_default;
var init_pixelated_image_trail = __esm({
  "registry:components/ui/pixelated-image-trail.tsx"() {
    "use client";
    init_utils();
    DEFAULT_CONFIG = {
      imageLifespan: 1500,
      inDuration: 280,
      outDuration: 620,
      staggerIn: 12,
      staggerOut: 9,
      slideDuration: 1300,
      slideEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    };
    DEFAULT_IMAGES = ["https://www.vengenceui.com/trail-images/image1.jpg", "https://www.vengenceui.com/trail-images/image4.jpg", "https://www.vengenceui.com/trail-images/image5.jpg"];
    MAX_ACTIVE_IMAGES = 14;
    clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    pixelated_image_trail_default = PixelatedImageTrail;
  }
});

// entry.jsx
import React from "react";

// registry:next/dynamic
import { lazy } from "react";
function dynamic(load) {
  return lazy(async () => {
    const m = await load();
    return { default: m.default || m };
  });
}

// registry:components/docs/pixelated-image-trail.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var PixelatedImageTrail2 = dynamic(
  () => Promise.resolve().then(() => (init_pixelated_image_trail(), pixelated_image_trail_exports)).then((mod) => mod.PixelatedImageTrail),
  { ssr: false }
);
function PixelatedImageTrailDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-black", children: [
    /* @__PURE__ */ jsx2(
      PixelatedImageTrail2,
      {
        images: [
          "https://www.vengenceui.com/trail-images/image1.jpg",
          "https://www.vengenceui.com/trail-images/image4.jpg",
          "https://www.vengenceui.com/trail-images/image5.jpg"
        ],
        slices: 5,
        smoothing: 0.32,
        spawnThreshold: 32,
        imageSize: 220,
        config: {
          imageLifespan: 1500,
          inDuration: 280,
          outDuration: 620,
          staggerIn: 12,
          staggerOut: 9,
          slideDuration: 1300
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none z-10 text-center", children: [
      /* @__PURE__ */ jsx2("h2", { className: "mb-2 text-4xl font-bold text-white", children: "Pixel Trail" }),
      /* @__PURE__ */ jsx2("p", { className: "text-zinc-400", children: "Smooth sliced cursor trail" })
    ] })
  ] });
}
var pixelated_image_trail_default2 = PixelatedImageTrailDemo;

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(pixelated_image_trail_default2, {}) }) });
}
export {
  Component as default
};
