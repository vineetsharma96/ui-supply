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
// Adapted from https://magicui.design/docs/components/progressive-blur
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/progressive-blur.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ProgressiveBlur({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64]
}) {
  const divElements = Array(blurLevels.length - 2).fill(null);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "gradient-blur pointer-events-none absolute inset-x-0 z-10",
        className,
        position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : "inset-y-0"
      ),
      style: {
        height: position === "both" ? "100%" : height
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              zIndex: 1,
              backdropFilter: `blur(${blurLevels[0]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
              maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
            }
          }
        ),
        divElements.map((_, index) => {
          const blurIndex = index + 1;
          const startPercent = blurIndex * 12.5;
          const midPercent = (blurIndex + 1) * 12.5;
          const endPercent = (blurIndex + 2) * 12.5;
          const maskGradient = position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                zIndex: index + 2,
                backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                maskImage: maskGradient,
                WebkitMaskImage: maskGradient
              }
            },
            `blur-${index}`
          );
        }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              zIndex: blurLevels.length,
              backdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
              maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
            }
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/ui/scroll-area.tsx
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx2(ScrollBar, {}),
        /* @__PURE__ */ jsx2(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx2(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}

// registry:progressive-blur.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ProgressiveBlur2({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64]
}) {
  const divElements = Array(blurLevels.length - 2).fill(null);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: cn(
        "gradient-blur pointer-events-none absolute inset-x-0 z-10",
        className,
        position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : "inset-y-0"
      ),
      style: {
        height: position === "both" ? "100%" : height
      },
      children: [
        /* @__PURE__ */ jsx3(
          "div",
          {
            className: "absolute inset-0",
            style: {
              zIndex: 1,
              backdropFilter: `blur(${blurLevels[0]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
              maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
            }
          }
        ),
        divElements.map((_, index) => {
          const blurIndex = index + 1;
          const startPercent = blurIndex * 12.5;
          const midPercent = (blurIndex + 1) * 12.5;
          const endPercent = (blurIndex + 2) * 12.5;
          const maskGradient = position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
          return /* @__PURE__ */ jsx3(
            "div",
            {
              className: "absolute inset-0",
              style: {
                zIndex: index + 2,
                backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                maskImage: maskGradient,
                WebkitMaskImage: maskGradient
              }
            },
            `blur-${index}`
          );
        }),
        /* @__PURE__ */ jsx3(
          "div",
          {
            className: "absolute inset-0",
            style: {
              zIndex: blurLevels.length,
              backdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
              maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
            }
          }
        )
      ]
    }
  );
}

// registry:components/ui/progressive-blur-demo.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function ProgressiveBlurDemo() {
  return /* @__PURE__ */ jsx4("div", { className: "relative w-full rounded-xl border", children: /* @__PURE__ */ jsxs4(ScrollArea, { className: "relative h-[400px] overflow-hidden", children: [
    /* @__PURE__ */ jsx4("div", { className: "flex flex-col gap-2 p-4", children: Array.from({ length: 20 }).map((_, index) => /* @__PURE__ */ jsx4(
      "div",
      {
        className: "bg-card flex h-20 w-full items-center justify-center rounded-xl border",
        children: index
      },
      index
    )) }),
    /* @__PURE__ */ jsx4(ProgressiveBlur2, { position: "bottom", height: "40%" })
  ] }) });
}

// entry.jsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx5("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx5("div", { className: "vendor-content", children: /* @__PURE__ */ jsx5(ProgressiveBlurDemo, {}) }) });
}
export {
  ProgressiveBlur,
  Component as default
};
