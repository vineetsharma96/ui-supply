// Adapted from https://ui.aceternity.com/components/spotlight
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/spotlight.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Spotlight = ({ className, fill }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 3787 2842",
      fill: "none",
      children: [
        /* @__PURE__ */ jsx("g", { filter: "url(#filter)", children: /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "1924.71",
            cy: "273.501",
            rx: "1924.71",
            ry: "273.501",
            transform: "matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)",
            fill: fill || "white",
            fillOpacity: "0.21"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "filter",
          {
            id: "filter",
            x: "0.860352",
            y: "0.838989",
            width: "3785.16",
            height: "2840.26",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ jsx("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ jsx(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "BackgroundImageFix",
                  result: "shape"
                }
              ),
              /* @__PURE__ */ jsx(
                "feGaussianBlur",
                {
                  stdDeviation: "151",
                  result: "effect1_foregroundBlur_1065_8"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/spotlight-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SpotlightPreview() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center", children: [
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )
      }
    ),
    /* @__PURE__ */ jsx2(
      Spotlight,
      {
        className: "-top-40 left-0 md:-top-20 md:left-60",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0", children: [
      /* @__PURE__ */ jsxs2("h1", { className: "bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl", children: [
        "Spotlight ",
        /* @__PURE__ */ jsx2("br", {}),
        " is the new trend."
      ] }),
      /* @__PURE__ */ jsx2("p", { className: "mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300", children: "Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are drawing the attention towards the text section of the page. I don't know why but I'm running out of copy." })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SpotlightPreview, {}) }) });
}
export {
  Spotlight,
  Component as default
};
