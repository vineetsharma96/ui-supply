// Adapted from https://ui.aceternity.com/components/squiggly-text
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/squiggly-text.tsx
import React, { useId } from "react";
import { motion, useTime, useTransform } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/squiggly-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SquigglyText({
  children,
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,
  as = "span",
  className,
  style
}) {
  const reactId = useId();
  const safeId = reactId.replace(/[:_]/g, "");
  const filterId = (i) => `squiggly-${safeId}-${i}`;
  const filters = React.useMemo(
    () => Array.from({ length: steps }, (_, i) => `url(#${filterId(i)})`),
    // filterId is stable per render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [steps, safeId]
  );
  const time = useTime();
  const filter = useTransform(
    time,
    (t) => filters[Math.floor(t / stepDuration) % filters.length]
  );
  const scaleAt = (i) => Array.isArray(scale) ? scale[i % scale.length] : scale;
  const Wrapper = as === "div" ? motion.div : motion.span;
  return /* @__PURE__ */ jsxs(
    Wrapper,
    {
      style: { filter, ...style },
      className: cn("inline-block", className),
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute h-0 w-0 overflow-hidden",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx("defs", { children: Array.from({ length: steps }).map((_, i) => /* @__PURE__ */ jsxs("filter", { id: filterId(i), children: [
              /* @__PURE__ */ jsx(
                "feTurbulence",
                {
                  baseFrequency,
                  numOctaves,
                  result: "noise",
                  seed: i
                }
              ),
              /* @__PURE__ */ jsx(
                "feDisplacementMap",
                {
                  in: "SourceGraphic",
                  in2: "noise",
                  scale: scaleAt(i)
                }
              )
            ] }, i)) })
          }
        ),
        children
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/squiggly-text-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SquigglyTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex h-[40rem] w-full items-center justify-center", children: /* @__PURE__ */ jsxs2("h1", { className: "text-center text-5xl leading-tight font-bold text-neutral-900 md:text-7xl lg:text-8xl dark:text-neutral-100", children: [
    "How many",
    " ",
    /* @__PURE__ */ jsx2(
      SquigglyText,
      {
        stepDuration: 70,
        scale: [6, 9],
        className: "text-amber-500",
        children: "drinks"
      }
    ),
    " ",
    /* @__PURE__ */ jsx2("br", {}),
    "are ",
    /* @__PURE__ */ jsx2(SquigglyText, { scale: 5, children: "too many" }),
    " drinks?"
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SquigglyTextDemo, {}) }) });
}
export {
  SquigglyText,
  Component as default
};
