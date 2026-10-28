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
// Adapted from https://www.vengenceui.com/components/liquid-metal
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/liquid-metal.tsx
import { memo, forwardRef } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/liquid-metal.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var LiquidMetal = memo(function LiquidMetal2({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("absolute inset-0 z-0 overflow-hidden", className),
      style,
      children: /* @__PURE__ */ jsx(
        LiquidMetalShader,
        {
          colorBack,
          colorTint,
          speed,
          repetition,
          distortion,
          softness: 0,
          shiftRed: 0.3,
          shiftBlue: -0.3,
          angle: 45,
          shape: "none",
          scale,
          fit: "cover",
          style: { width: "100%", height: "100%" }
        }
      )
    }
  );
});
LiquidMetal.displayName = "LiquidMetal";
var LiquidMetalButton = forwardRef(
  ({
    children,
    icon,
    borderWidth = 4,
    metalConfig,
    size = "md",
    className,
    disabled,
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: "py-2 pl-2 pr-6 gap-3 text-sm",
      md: "py-3 pl-3 pr-8 gap-4 text-base",
      lg: "py-4 pl-4 pr-10 gap-6 text-lg"
    };
    const iconSizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        disabled,
        className: cn(
          "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative rounded-full overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]",
            style: { padding: borderWidth },
            children: [
              /* @__PURE__ */ jsx(
                LiquidMetal,
                {
                  colorBack: metalConfig?.colorBack ?? "#888888",
                  colorTint: metalConfig?.colorTint ?? "#ffffff",
                  speed: metalConfig?.speed ?? 0.4,
                  repetition: metalConfig?.repetition ?? 4,
                  distortion: metalConfig?.distortion ?? 0.15,
                  scale: metalConfig?.scale ?? 1,
                  className: "absolute inset-0 z-0 rounded-full"
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "relative z-10 rounded-full flex items-center",
                    "bg-white dark:bg-black",
                    "transition-colors duration-200",
                    "group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900",
                    sizeStyles[size]
                  ),
                  children: [
                    icon && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "rounded-full flex items-center justify-center",
                          "bg-neutral-100 dark:bg-neutral-800",
                          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]",
                          iconSizes[size]
                        ),
                        children: /* @__PURE__ */ jsx("span", { className: "text-neutral-700 dark:text-neutral-300", children: icon })
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-medium tracking-tight text-neutral-900 dark:text-white", children })
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }
);
LiquidMetalButton.displayName = "LiquidMetalButton";

// entry.jsx
import React2 from "react";

// registry:components/docs/liquid-metal.tsx
import { Sparkles, ArrowRight, Zap, Star, Crown } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LiquidMetalPreview() {
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsx2(
    LiquidMetalButton,
    {
      icon: /* @__PURE__ */ jsx2("div", { className: "w-5 h-5 rounded border-2 border-current" }),
      size: "lg",
      borderWidth: 5,
      metalConfig: {
        colorBack: "#888888",
        colorTint: "#ffffff",
        distortion: 0.15,
        speed: 0.4
      },
      children: "Request access"
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LiquidMetalPreview, {}) }) });
}
export {
  LiquidMetal,
  LiquidMetalButton,
  Component as default
};
