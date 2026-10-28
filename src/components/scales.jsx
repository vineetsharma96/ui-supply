// Adapted from https://ui.aceternity.com/components/scales
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/scales.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Scales = ({
  orientation = "diagonal",
  size = 10,
  className,
  color
}) => {
  const getGradientAngle = () => {
    switch (orientation) {
      case "horizontal":
        return "0deg";
      case "vertical":
        return "90deg";
      case "diagonal":
      default:
        return "315deg";
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--pattern-scales:var(--color-neutral-950)]/10",
        "dark:[--pattern-scales:var(--color-white)]/10",
        className
      ),
      style: {
        "--scales-size": `${size}px`,
        "--scales-angle": getGradientAngle(),
        ...color && { "--pattern-scales": color }
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full w-full bg-[repeating-linear-gradient(var(--scales-angle),var(--pattern-scales)_0,var(--pattern-scales)_1px,transparent_0,transparent_50%)]",
          style: {
            backgroundSize: `var(--scales-size) var(--scales-size)`
          }
        }
      )
    }
  );
};
var ScalesContainer = ({
  children,
  orientation = "diagonal",
  size = 10,
  className,
  containerClassName,
  color
}) => {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", containerClassName), children: [
    /* @__PURE__ */ jsx(
      Scales,
      {
        orientation,
        size,
        className,
        color
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
  ] });
};

// entry.jsx
import React from "react";

// registry:components/scales-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ScalesDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative h-96 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black", children: [
    /* @__PURE__ */ jsx2(Scales, {}),
    /* @__PURE__ */ jsx2("div", { className: "relative z-10 flex h-full items-center justify-center", children: /* @__PURE__ */ jsx2("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-white", children: "Diagonal Scales" }) })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ScalesDemo, {}) }) });
}
export {
  Scales,
  ScalesContainer,
  Component as default
};
