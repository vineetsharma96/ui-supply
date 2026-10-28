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
// Adapted from https://www.vengenceui.com/components/image-trail
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/image-trail.tsx
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/image-trail.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1617643472854-39a9dcc34eee?auto=format&fit=crop&w=480&q=80",
    alt: "Abstract architectural detail"
  },
  {
    src: "https://images.unsplash.com/photo-1674914053928-3131b730916c?auto=format&fit=crop&w=480&q=80",
    alt: "Abstract sculptural form"
  },
  {
    src: "https://images.unsplash.com/photo-1549800076-831d7a97afac?auto=format&fit=crop&w=480&q=80",
    alt: "Textured abstract composition"
  },
  {
    src: "https://images.unsplash.com/photo-1730750374142-557f2417db3a?auto=format&fit=crop&w=480&q=80",
    alt: "Minimal abstract artwork"
  }
];
var DEFAULT_TRANSITION = {
  type: "spring",
  stiffness: 260,
  damping: 22
};
var DEFAULT_EXIT_TRANSITION = {
  duration: 0.4,
  ease: "easeInOut"
};
var normalizeImage = (image) => typeof image === "string" ? { src: image, alt: "" } : image;
function ImageTrail({
  images = DEFAULT_IMAGES,
  threshold = 80,
  minDelay = 50,
  duration = 1e3,
  maxItems = 8,
  rotationRange = 40,
  imageClassName,
  overlayClassName,
  transition = DEFAULT_TRANSITION,
  exitTransition = DEFAULT_EXIT_TRANSITION,
  disabled = false,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  const [trail, setTrail] = React.useState([]);
  const lastPositionRef = React.useRef(null);
  const lastTimeRef = React.useRef(0);
  const imageIndexRef = React.useRef(0);
  const timeoutRefs = React.useRef(/* @__PURE__ */ new Set());
  const normalizedImages = React.useMemo(() => images.map(normalizeImage), [images]);
  const safeThreshold = Math.max(0, threshold);
  const safeMinDelay = Math.max(0, minDelay);
  const safeDuration = Math.max(0, duration);
  const safeMaxItems = Math.max(0, Math.floor(maxItems));
  const safeRotationRange = Math.max(0, rotationRange);
  React.useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);
  const removeItem = React.useCallback((id) => {
    setTrail((current) => current.filter((item) => item.id !== id));
  }, []);
  const handlePointerMove = React.useCallback(
    (event) => {
      onPointerMove?.(event);
      if (disabled || !normalizedImages.length || safeMaxItems === 0) {
        return;
      }
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
      };
      const lastPosition = lastPositionRef.current;
      const now = window.performance.now();
      if (lastPosition) {
        const distance = Math.hypot(position.x - lastPosition.x, position.y - lastPosition.y);
        if (distance < safeThreshold || now - lastTimeRef.current < safeMinDelay) {
          return;
        }
      }
      const image = normalizedImages[imageIndexRef.current % normalizedImages.length];
      const id = `${Math.round(now)}-${Math.random().toString(36).slice(2)}`;
      const rotation = Math.random() * safeRotationRange - safeRotationRange / 2;
      imageIndexRef.current = (imageIndexRef.current + 1) % normalizedImages.length;
      lastPositionRef.current = position;
      lastTimeRef.current = now;
      setTrail((current) => {
        const next = [
          ...current,
          {
            id,
            x: position.x,
            y: position.y,
            src: image.src,
            alt: image.alt ?? "",
            rotation
          }
        ];
        return next.slice(Math.max(0, next.length - safeMaxItems));
      });
      const timeout = window.setTimeout(() => {
        timeoutRefs.current.delete(timeout);
        removeItem(id);
      }, safeDuration);
      timeoutRefs.current.add(timeout);
    },
    [
      disabled,
      normalizedImages,
      onPointerMove,
      removeItem,
      safeDuration,
      safeMaxItems,
      safeMinDelay,
      safeRotationRange,
      safeThreshold
    ]
  );
  const handlePointerLeave = React.useCallback(
    (event) => {
      lastPositionRef.current = null;
      onPointerLeave?.(event);
    },
    [onPointerLeave]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative overflow-hidden", className),
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx("div", { className: cn("pointer-events-none absolute inset-0 z-50 overflow-hidden", overlayClassName), children: /* @__PURE__ */ jsx(AnimatePresence, { children: trail.map((item) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute",
            style: { left: item.x, top: item.y },
            initial: { x: "-50%", y: "-50%", scale: 0.82, opacity: 0, rotate: item.rotation },
            animate: { x: "-50%", y: "-50%", scale: 1, opacity: 1, rotate: item.rotation },
            exit: {
              x: "-50%",
              y: "-50%",
              scale: 0.5,
              opacity: 0,
              rotate: item.rotation * 0.75,
              transition: exitTransition
            },
            transition,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.src,
                alt: item.alt,
                draggable: false,
                className: cn(
                  "block aspect-[3/4] w-32 select-none rounded-sm object-cover shadow-2xl",
                  imageClassName
                )
              }
            )
          },
          item.id
        )) }) })
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/image-trail.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ImageTrailDemo() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2("style", { children: `@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap");` }),
    /* @__PURE__ */ jsx2(
      ImageTrail,
      {
        threshold: 74,
        minDelay: 45,
        duration: 1100,
        maxItems: 9,
        rotationRange: 34,
        imageClassName: "w-32 rounded-md md:w-40",
        className: "flex h-full w-full items-center justify-center bg-[#ececec] px-6 text-neutral-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-50",
        style: { fontFamily: '"Bricolage Grotesque", sans-serif' },
        children: /* @__PURE__ */ jsx2("h2", { className: "pointer-events-none text-center text-4xl font-bold md:text-6xl", children: "Image trail effect" })
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImageTrailDemo, {}) }) });
}
export {
  ImageTrail,
  Component as default
};
