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
// Adapted from https://www.vengenceui.com/components/shared-tooltip-avatars
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/shared-tooltip-avatars.tsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/shared-tooltip-avatars.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SharedTooltipAvatars({
  items,
  className,
  ...props
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const [activeName, setActiveName] = useState("");
  const timeoutRef = useRef(null);
  const avatarRefs = useRef([]);
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const avatar = avatarRefs.current[index];
    if (avatar) {
      const left = avatar.offsetLeft + avatar.offsetWidth / 2;
      const top = avatar.offsetTop;
      setTooltipPos({ left, top });
      setActiveName(items[index].name);
      setHoveredIndex(index);
    }
  };
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative flex items-center justify-center py-12", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: hoveredIndex !== null && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: "-50%", y: "-80%", scale: 0.95, left: tooltipPos.left, top: tooltipPos.top - 12 },
            animate: {
              opacity: 1,
              x: "-50%",
              y: "-100%",
              scale: 1,
              left: tooltipPos.left,
              top: tooltipPos.top - 12
            },
            exit: { opacity: 0, x: "-50%", y: "-80%", scale: 0.95 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            className: "absolute z-50 px-3.5 py-1.5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-xl text-sm font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-neutral-200/50 dark:border-neutral-800/50 pointer-events-none",
            role: "tooltip",
            children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { opacity: 0, y: 4 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -4 },
                transition: { duration: 0.15, ease: "easeOut" },
                className: "inline-block",
                children: activeName || " "
              },
              activeName
            ) })
          }
        ) }),
        items.map((item, index) => /* @__PURE__ */ jsx(
          "div",
          {
            ref: (el) => {
              avatarRefs.current[index] = el;
            },
            className: "relative -ml-3 first:ml-0 transition-transform duration-300 ease-out hover:-translate-y-2 hover:z-10 cursor-pointer",
            onMouseEnter: () => handleMouseEnter(index),
            onMouseLeave: handleMouseLeave,
            onFocus: () => handleMouseEnter(index),
            onBlur: handleMouseLeave,
            tabIndex: 0,
            role: "listitem",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-[3px] border-white dark:border-[#09090b] shadow-sm hover:shadow-xl transition-all duration-300"
              }
            )
          },
          item.id
        ))
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/shared-tooltip-avatars-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var demoAvatars = [
  {
    id: "1",
    name: "Sarah Chen",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "3",
    name: "Emma Wilson",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "4",
    name: "David Park",
    image: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    image: "https://i.pravatar.cc/150?img=9"
  }
];
function SharedTooltipAvatarsDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-[300px] flex-col items-center justify-center", children: /* @__PURE__ */ jsx2(SharedTooltipAvatars, { items: demoAvatars }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SharedTooltipAvatarsDemo, {}) }) });
}
export {
  SharedTooltipAvatars,
  Component as default
};
