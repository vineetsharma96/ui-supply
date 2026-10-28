// Adapted from https://skiper-ui.com/v1/skiper64
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper64.tsx
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper64 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(SkiperGooeyFilterProvider, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "Drag the elements to see the effect" }) }),
    /* @__PURE__ */ jsxs(
      "ul",
      {
        className: "flex flex-col justify-end rounded-2xl",
        style: {
          filter: "url(#SkiperGooeyFilter)"
        },
        children: [
          /* @__PURE__ */ jsx(
            motion.li,
            {
              drag: true,
              initial: INITIAL_STATE,
              animate: ANIMATED_STATE,
              className: "bg-foreground absolute"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.li,
            {
              drag: true,
              className: "bg-foreground size-12 rounded-full"
            }
          )
        ]
      }
    )
  ] });
};
var SkiperGooeyFilterProvider = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "absolute bottom-0 left-0",
      version: "1.1",
      children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "SkiperGooeyFilter", children: [
        /* @__PURE__ */ jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "4.4", result: "blur" }),
        /* @__PURE__ */ jsx(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7",
            result: "SkiperGooeyFilter"
          }
        ),
        /* @__PURE__ */ jsx("feBlend", { in: "SourceGraphic", in2: "SkiperGooeyFilter" })
      ] }) })
    }
  );
};
var LOGO_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30
};
var INITIAL_STATE = {
  y: 0,
  width: 50,
  height: 50,
  borderRadius: 40
};
var ANIMATED_STATE = {
  y: -60,
  width: 200,
  height: 100,
  borderRadius: 10,
  transition: {
    ...LOGO_SPRING,
    delay: 0.15,
    y: {
      ...LOGO_SPRING,
      delay: 0
    }
  }
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper64, {}) }) });
}
export {
  Skiper64,
  SkiperGooeyFilterProvider,
  Component as default
};
