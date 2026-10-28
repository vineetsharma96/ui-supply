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
// Adapted from https://www.vengenceui.com/components/glow-border-card
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/glow-border-card.tsx
import React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/glow-border-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var colorPresets = {
  nature: ["#669900", "#88bb22", "#99cc33", "#aaddaa", "#ccee66", "#006699", "#228888", "#3399cc", "#55aacc", "#669900"],
  ocean: ["#006699", "#1177aa", "#2288bb", "#3399cc", "#44aadd", "#55bbee", "#66ccff", "#44bbee", "#2299cc", "#006699"],
  sunset: ["#ff6600", "#ff7711", "#ff8822", "#ff9900", "#ffaa22", "#ffbb44", "#ffcc00", "#ff9933", "#ff7722", "#ff6600"],
  aurora: ["#00ff87", "#22ffaa", "#44ffcc", "#60efff", "#88ddff", "#bb99ff", "#dd77ee", "#ff68f0", "#ff55cc", "#00ff87"],
  custom: ["#669900", "#99cc33", "#ccee66", "#006699", "#3399cc", "#990066", "#cc3399", "#ff6600", "#ff9900", "#ffcc00"]
};
var GlowBorderCard = React.forwardRef(
  ({
    children,
    className,
    width = "320px",
    height,
    aspectRatio = "1",
    borderRadius = "0.75rem",
    animationDuration = 4,
    gradientColors,
    borderWidth = "1.25em",
    blurAmount = "0.75em",
    inset = "-1em",
    colorPreset = "custom",
    paused = false,
    style,
    ...props
  }, ref) => {
    const colors = gradientColors || colorPresets[colorPreset] || colorPresets.custom;
    const colorVars = {};
    for (let i = 0; i < 10; i++) {
      colorVars[`--glow-color-${i + 1}`] = colors[i % colors.length];
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          // Base Container Layout
          "relative overflow-hidden grid place-content-center isolate",
          // Glass Effect Background
          "bg-zinc-50/50 dark:bg-neutral-900/60 backdrop-blur-md",
          // Custom className support
          className
        ),
        style: {
          width,
          height: height || "auto",
          aspectRatio: height ? "unset" : aspectRatio,
          borderRadius,
          "--glow-animation-duration": `${animationDuration}s`,
          ...colorVars,
          ...style
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute -z-10",
                // Inset logic handled by style or arbitrary values if fixed
                "border-solid rounded-[inherit]",
                // The Gradient Animation Class
                "glow-conic",
                // Pause State
                paused && "[animation-play-state:paused]"
              ),
              style: {
                inset,
                borderWidth,
                filter: `blur(${blurAmount})`
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative z-10 w-full h-full bg-transparent flex items-center justify-center p-4",
              children
            }
          )
        ]
      }
    );
  }
);
GlowBorderCard.displayName = "GlowBorderCard";

// entry.jsx
import React2 from "react";

// registry:components/docs/glow-border-card.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GlowBorderCardDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex min-h-full w-full flex-col items-center justify-center overflow-hidden p-8", children: /* @__PURE__ */ jsx2(
    GlowBorderCard,
    {
      width: "280px",
      aspectRatio: "1",
      colorPreset: "aurora",
      animationDuration: 4
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GlowBorderCardDemo, {}) }) });
}
export {
  GlowBorderCard,
  Component as default
};
