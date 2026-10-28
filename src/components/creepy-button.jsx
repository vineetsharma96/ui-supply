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
// Adapted from https://www.vengenceui.com/components/creepy-button
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/creepy-button.tsx
import { useRef, useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/creepy-button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var CreepyButton = ({
  children,
  className,
  coverClassName,
  onClick,
  ...props
}) => {
  const eyesRef = useRef(null);
  const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const updateEyes = (e) => {
    const userEvent = "touches" in e ? e.touches[0] : e;
    if (!eyesRef.current) return;
    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2
    };
    const cursor = {
      x: userEvent.clientX,
      y: userEvent.clientY
    };
    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;
    const visionRangeX = 180;
    const visionRangeY = 75;
    const distance = Math.hypot(dx, dy);
    const x = Math.sin(angle) * Math.min(distance, visionRangeX) / visionRangeX;
    const y = Math.cos(angle) * Math.min(distance, visionRangeY) / visionRangeY;
    setEyeCoords({ x, y });
  };
  const resetEyes = () => {
    setEyeCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };
  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: cn(
        "relative min-w-[9em] rounded-xl bg-black cursor-pointer outline-none select-none group tap-highlight-transparent",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400",
        className
      ),
      onClick,
      onMouseMove: (e) => {
        updateEyes(e);
        setIsHovered(true);
      },
      onTouchMove: updateEyes,
      onMouseLeave: resetEyes,
      onFocus: () => setIsHovered(true),
      onBlur: () => setIsHovered(false),
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            ref: eyesRef,
            className: "absolute flex items-center gap-[0.375em] right-[1em] bottom-[0.5em] h-[0.75em] z-0 pointer-events-none",
            children: [
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  className: "relative w-[0.75em] bg-white rounded-full overflow-hidden",
                  animate: { height: ["0.75em", "0.75em", "0em", "0.75em"] },
                  transition: {
                    duration: 3,
                    times: [0, 0.92, 0.96, 1],
                    repeat: Infinity,
                    ease: "linear"
                  },
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out",
                      style: pupilStyle
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  className: "relative w-[0.75em] bg-white rounded-full overflow-hidden",
                  animate: { height: ["0.75em", "0.75em", "0em", "0.75em"] },
                  transition: {
                    duration: 3,
                    times: [0, 0.92, 0.96, 1],
                    repeat: Infinity,
                    ease: "linear"
                  },
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out",
                      style: pupilStyle
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: cn(
              "absolute inset-0 block rounded-xl bg-blue-500 text-white font-bold tracking-wider",
              "shadow-[inset_0_0_0_0.125em_rgba(0,0,0,1)]",
              "flex items-center justify-center px-4 py-2",
              "origin-[1.25em_50%]",
              coverClassName
            ),
            animate: {
              rotate: isHovered ? -12 : 0
            },
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.8
            },
            children
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "block opacity-0 px-4 py-2 font-bold tracking-wider min-w-[9em]", children })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/docs/creepy-button-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function CreepyButtonDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center p-12", children: /* @__PURE__ */ jsx2(CreepyButton, { children: "Hover Me" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CreepyButtonDemo, {}) }) });
}
export {
  CreepyButton,
  Component as default
};
