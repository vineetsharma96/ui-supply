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
// Adapted from https://www.vengenceui.com/components/circular-gallery
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/circular-gallery.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/circular-gallery.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function CircularGallery({
  images,
  count = 150,
  tilt = 55,
  radius = 400,
  itemWidth = 45,
  itemHeight = 60,
  autoRotate = true,
  autoRotateSpeed = 3,
  showPreview = true,
  parallax = true,
  className
}) {
  const rootRef = useRef(null);
  const galleryRef = useRef(null);
  const previewRef = useRef(null);
  const previewWrapRef = useRef(null);
  const srcOf = (i) => images && images.length > 0 ? images[i % images.length] : void 0;
  const defaultPreview = srcOf(0);
  const optsRef = useRef({ autoRotate, autoRotateSpeed, parallax, tilt });
  useEffect(() => {
    optsRef.current = { autoRotate, autoRotateSpeed, parallax, tilt };
  }, [autoRotate, autoRotateSpeed, parallax, tilt]);
  useEffect(() => {
    const root = rootRef.current;
    const gallery = galleryRef.current;
    if (!root || !gallery) return;
    const items = gsap.utils.toArray(gallery.querySelectorAll("[data-ring-item]"));
    if (items.length === 0) return;
    const angleIncrement = 360 / items.length;
    const baseAngles = items.map((_, i) => i * angleIncrement - 90);
    items.forEach((item, i) => {
      gsap.set(item, {
        rotationY: 50,
        rotationZ: baseAngles[i],
        transformOrigin: `50% ${radius}px`
      });
    });
    gsap.set(gallery, { rotationY: 0 });
    const fitRing = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(1, (width - 48) / (radius * 2.2), (height - 48) / (radius * 1.7));
      gsap.set(gallery, { scale: Math.max(0.1, scale) });
    };
    const resizeObserver = new ResizeObserver(fitRing);
    resizeObserver.observe(root);
    fitRing();
    if (previewWrapRef.current) gsap.set(previewWrapRef.current, { opacity: 0 });
    const setZ = items.map((item) => gsap.quickSetter(item, "rotationZ", "deg"));
    gsap.fromTo(
      gallery,
      { rotationX: optsRef.current.tilt + 16, opacity: 0 },
      { rotationX: optsRef.current.tilt, opacity: 1, duration: 1.4, ease: "power3.out" }
    );
    gsap.from(items, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      stagger: { amount: 1, from: "random" }
    });
    let current = 0;
    let target = 0;
    let isInViewport = true;
    let isPageVisible = !document.hidden;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    const tick = () => {
      if (!isInViewport || !isPageVisible) return;
      const { autoRotate: auto, autoRotateSpeed: speed } = optsRef.current;
      if (auto && !reducedMotion && !dragging) target += speed / 60 * gsap.ticker.deltaRatio();
      current += (target - current) * 0.05;
      for (let i = 0; i < setZ.length; i++) setZ[i](baseAngles[i] + current);
    };
    gsap.ticker.add(tick);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
      },
      { rootMargin: "160px" }
    );
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    const onReducedMotionChange = (event) => {
      reducedMotion = event.matches;
    };
    visibilityObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    let dragging = false;
    let lastX = 0;
    const onPointerDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      root.setPointerCapture?.(e.pointerId);
      root.style.cursor = "grabbing";
    };
    const onPointerMove = (e) => {
      if (optsRef.current.parallax) {
        const rect = root.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(gallery, {
          rotationX: optsRef.current.tilt + py * 3,
          rotationY: px * 3,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
      if (dragging) {
        target += (e.clientX - lastX) * 0.3;
        lastX = e.clientX;
      }
    };
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      root.releasePointerCapture?.(e.pointerId);
      root.style.cursor = "grab";
    };
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", endDrag);
    root.addEventListener("pointerleave", endDrag);
    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", endDrag);
      root.removeEventListener("pointerleave", endDrag);
      gsap.killTweensOf(gallery);
    };
  }, [count, radius, images]);
  const showPreviewImage = (src) => {
    const img = previewRef.current;
    const wrap = previewWrapRef.current;
    if (!img || !wrap || !src) return;
    if (!img.src.endsWith(src)) img.src = src;
    gsap.to(wrap, { opacity: 1, duration: 0.15, ease: "power2.out", overwrite: true });
  };
  const hidePreviewImage = () => {
    const wrap = previewWrapRef.current;
    if (!wrap) return;
    gsap.to(wrap, { opacity: 0, duration: 0.25, ease: "power1.out", overwrite: true });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: cn(
        "relative h-full w-full touch-none select-none overflow-hidden [perspective:1500px]",
        "bg-[radial-gradient(circle_at_50%_42%,#f7f7f8,#e6e6e8)] dark:bg-[radial-gradient(circle_at_50%_42%,#17171a,#050505)]",
        className
      ),
      style: { cursor: "grab" },
      children: [
        showPreview && defaultPreview ? /* @__PURE__ */ jsxs(
          "div",
          {
            ref: previewWrapRef,
            className: "pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220px] w-[330px] max-w-[72%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl opacity-0 shadow-2xl ring-1 ring-black/10 dark:ring-white/10",
            children: [
              /* @__PURE__ */ jsx("img", { ref: previewRef, src: defaultPreview, alt: "", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: galleryRef,
            className: "absolute left-1/2 top-[14%] z-10 -translate-x-1/2 [transform-style:preserve-3d]",
            children: Array.from({ length: count }).map((_, i) => {
              const src = srcOf(i);
              return /* @__PURE__ */ jsx(
                "div",
                {
                  "data-ring-item": true,
                  className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3px] bg-neutral-300 shadow-md shadow-black/20 ring-1 ring-black/10 [transform-style:preserve-3d] dark:bg-neutral-700 dark:ring-white/20",
                  style: { width: itemWidth, height: itemHeight, margin: 10 },
                  children: src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src,
                        alt: "",
                        onMouseEnter: () => showPreviewImage(src),
                        onMouseLeave: hidePreviewImage,
                        className: "h-full w-full object-cover transition-[transform,filter] duration-300 hover:scale-110 hover:brightness-110"
                      }
                    )
                  ) : null
                },
                i
              );
            })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_45%,transparent_60%,rgba(240,240,242,0.6))] dark:bg-[radial-gradient(circle_at_50%_45%,transparent_60%,rgba(5,5,5,0.55))]"
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/circular-gallery-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var IMAGES = Array.from({ length: 15 }, (_, i) => `https://www.vengenceui.com/circular-gallery/img${i + 1}.jpg`);
function CircularGalleryDemo() {
  return /* @__PURE__ */ jsx2(CircularGallery, { images: IMAGES, count: 72 });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CircularGalleryDemo, {}) }) });
}
export {
  CircularGallery,
  Component as default
};
