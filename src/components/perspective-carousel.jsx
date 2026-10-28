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
// Adapted from https://www.vengenceui.com/components/perspective-carousel
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/perspective-carousel.tsx
import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/perspective-carousel.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_TRANSITION = {
  type: "spring",
  bounce: 0.14,
  duration: 0.9
};
var clamp = (value, min, max) => Math.min(Math.max(value, min), max);
function PerspectiveCarousel({
  items: items2,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideWidth = 200,
  rotationStep = 60,
  inactiveScale = 0.85,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}) {
  const maxIndex = Math.max(0, items2.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(
    () => clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideWidth = Math.max(96, slideWidth);
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1);
  const selectSlide = React.useCallback(
    (nextIndex) => {
      if (!items2.length) {
        return;
      }
      const resolvedIndex = loop ? (nextIndex + items2.length) % items2.length : clamp(nextIndex, 0, maxIndex);
      if (activeIndex === void 0) {
        setUncontrolledIndex(resolvedIndex);
      }
      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items2.length, loop, maxIndex, onActiveIndexChange]
  );
  if (!items2.length) {
    return null;
  }
  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "region",
      "aria-roledescription": "carousel",
      "aria-label": "Perspective image carousel",
      tabIndex: tabIndex ?? 0,
      onKeyDown: handleKeyDown,
      className: cn("relative isolate h-full w-full overflow-hidden", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("absolute inset-0 overflow-hidden", viewportClassName),
            style: { perspective: "1200px" },
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute left-1/2 top-1/2 flex w-fit -translate-y-1/2 items-center",
                animate: { x: -(currentIndex * safeSlideWidth + safeSlideWidth / 2) },
                transition,
                children: items2.map((item, index) => {
                  const isActive = currentIndex === index;
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "shrink-0",
                      style: { width: safeSlideWidth, perspective: "1200px" },
                      children: /* @__PURE__ */ jsxs(
                        motion.div,
                        {
                          className: cn(
                            "flex w-full flex-col items-center gap-3 will-change-transform",
                            slideClassName
                          ),
                          animate: {
                            rotateY: (currentIndex - index) * rotationStep,
                            scale: isActive ? 1 : safeInactiveScale
                          },
                          transition,
                          style: { transformStyle: "preserve-3d" },
                          children: [
                            /* @__PURE__ */ jsx(
                              "button",
                              {
                                type: "button",
                                "aria-label": `Show ${item.title}`,
                                "aria-current": isActive ? "true" : void 0,
                                className: "aspect-[3/4] w-full cursor-pointer",
                                onClick: () => selectSlide(index),
                                children: /* @__PURE__ */ jsx(
                                  "img",
                                  {
                                    src: item.src,
                                    alt: item.alt ?? item.title,
                                    draggable: false,
                                    className: cn(
                                      "h-full w-full select-none rounded-lg object-cover shadow-xl",
                                      imageClassName
                                    )
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              motion.p,
                              {
                                className: cn("whitespace-nowrap text-sm", labelClassName),
                                animate: {
                                  filter: isActive ? "blur(0px)" : "blur(2px)",
                                  opacity: isActive ? 1 : 0
                                },
                                transition,
                                children: item.title
                              }
                            )
                          ]
                        }
                      )
                    },
                    `${item.src}-${index}`
                  );
                })
              }
            )
          }
        ),
        showControls && /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "absolute inset-x-4 bottom-5 z-10 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-neutral-300/80 bg-neutral-200/70 px-2 text-neutral-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-100",
              controlsClassName
            ),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Show previous slide",
                  disabled: isPreviousDisabled,
                  className: "inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/10",
                  onClick: () => selectSlide(currentIndex - 1),
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-5" })
                }
              ),
              showDots && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2", children: items2.map((item, index) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Show slide ${index + 1}: ${item.title}`,
                  "aria-current": currentIndex === index ? "true" : void 0,
                  className: cn(
                    "h-2 rounded-full bg-current transition-[width,opacity] duration-300",
                    currentIndex === index ? "w-7 opacity-100" : "w-2 opacity-30"
                  ),
                  onClick: () => selectSlide(index)
                },
                `${item.title}-${index}`
              )) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Show next slide",
                  disabled: isNextDisabled,
                  className: "inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/10",
                  onClick: () => selectSlide(currentIndex + 1),
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-5" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/perspective-carousel.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var items = [
  { src: "https://www.vengenceui.com/trail-images/image1.jpg", title: "urban exploration" },
  { src: "https://www.vengenceui.com/trail-images/image4.jpg", title: "night scene" },
  { src: "https://www.vengenceui.com/trail-images/image5.jpg", title: "yellow wildflowers" },
  { src: "https://www.vengenceui.com/trail-images/image8.jpg", title: "street with mount fuji" },
  { src: "https://www.vengenceui.com/trail-images/image9.jpg", title: "bicycle shop" },
  { src: "https://www.vengenceui.com/trail-images/image10.jpg", title: "train window view" }
];
function PerspectiveCarouselDemo() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2("style", { children: `@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap");` }),
    /* @__PURE__ */ jsx2(
      PerspectiveCarousel,
      {
        items,
        defaultActiveIndex: 3,
        slideWidth: 210,
        className: "bg-[#ececec] text-neutral-800 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100",
        style: { fontFamily: '"Bricolage Grotesque", sans-serif' }
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(PerspectiveCarouselDemo, {}) }) });
}
export {
  PerspectiveCarousel,
  Component as default
};
