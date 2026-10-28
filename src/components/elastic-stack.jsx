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
// Adapted from https://www.vengenceui.com/components/elastic-stack
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/elastic-stack.tsx
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/elastic-stack.tsx
import { jsx } from "react/jsx-runtime";
function ElasticStack({
  items,
  itemSize = 70,
  overlap = 30,
  pushForce = 15,
  className,
  ...props
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = items.length;
  const springEasing = "linear(0, 0.79 14.4%, 1.026 22.4%, 1.164 31.2%, 1.207 38.2%, 1.208 46.2%, 1.033 80%, 1)";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex items-center justify-center cursor-pointer py-8", className),
      onMouseLeave: () => setHoveredIndex(null),
      ...props,
      children: items.map((item, i) => {
        let translateX = 0;
        let scale = 1;
        let zIndex = i;
        let isHovered = hoveredIndex === i;
        if (hoveredIndex !== null) {
          if (i > hoveredIndex) {
            translateX = Math.max(Math.min(pushForce * (total - i - 1), overlap), overlap - pushForce * (i - hoveredIndex - 1));
          } else if (i < hoveredIndex) {
            translateX = -Math.min(pushForce * i, overlap);
          } else {
            scale = 1.25;
            zIndex = 100;
          }
        }
        return /* @__PURE__ */ jsx(
          "div",
          {
            onMouseEnter: () => setHoveredIndex(i),
            className: cn(
              "relative flex items-center justify-center rounded-full isolate bg-neutral-100 dark:bg-neutral-800",
              "border-2 border-white dark:border-neutral-950",
              isHovered ? "shadow-xl" : "shadow-sm"
            ),
            style: {
              width: itemSize,
              height: itemSize,
              marginLeft: i === 0 ? 0 : -overlap,
              transform: `translateX(${translateX}px) scale(${scale})`,
              transitionProperty: "transform, box-shadow, z-index",
              transitionDuration: "700ms, 700ms, 0ms",
              // Raise the hovered item only once its right neighbour has slid mostly clear; drop it instantly on release
              transitionDelay: isHovered ? "0ms, 0ms, 150ms" : "0ms",
              transitionTimingFunction: springEasing,
              zIndex
            },
            children: item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.image,
                  alt: item.name || `Avatar ${i}`,
                  className: "w-full h-full object-cover rounded-full pointer-events-none"
                }
              )
            ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full rounded-full flex items-center justify-center font-semibold text-neutral-500 dark:text-neutral-400", children: item.name ? item.name.charAt(0) : i + 1 })
          },
          item.id
        );
      })
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/elastic-stack-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ElasticStackDemo() {
  const items = [
    { id: "1", name: "Felix", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" },
    { id: "2", name: "Aneka", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka" },
    { id: "3", name: "Oliver", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver" },
    { id: "4", name: "Zoe", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe" },
    { id: "5", name: "Leo", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo" },
    { id: "6", name: "Mia", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia" },
    { id: "7", name: "Noah", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah" },
    { id: "8", name: "Ava", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ava" }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-[400px] flex-col items-center justify-center", children: /* @__PURE__ */ jsx2(
    ElasticStack,
    {
      items,
      itemSize: 70,
      overlap: 35,
      pushForce: 15
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ElasticStackDemo, {}) }) });
}
export {
  ElasticStack,
  Component as default
};
