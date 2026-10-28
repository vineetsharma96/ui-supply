// Adapted from https://skiper-ui.com/v1/skiper63
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper63.tsx
import { motion } from "motion/react";
import { GripHorizontal, RefreshCcw } from "lucide-react";
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper63.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SquiCircleFilterStatic = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "absolute bottom-0 left-0",
      version: "1.1",
      children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "SkiperSquiCircleFilterLayout", children: [
        /* @__PURE__ */ jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
        /* @__PURE__ */ jsx(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7",
            result: "goo"
          }
        ),
        /* @__PURE__ */ jsx("feBlend", { in: "SourceGraphic", in2: "goo" })
      ] }) })
    }
  );
};
var Skiper63 = () => {
  const [toggle, setToggle] = useState(true);
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(300);
  const [blurValue, setBlurValue] = useState(10);
  const [colorMatrixValue, setColorMatrixValue] = useState(20);
  const [alphaValue, setAlphaValue] = useState(-7);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-20 grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "squicircle with svg filter" }) }),
    /* @__PURE__ */ jsx(
      SquiCircleFilter,
      {
        blurValue,
        colorMatrixValue,
        alphaValue
      }
    ),
    /* @__PURE__ */ jsx(
      Options,
      {
        toggle,
        setToggle,
        height,
        setHeight,
        width,
        setWidth,
        blurValue,
        setBlurValue,
        colorMatrixValue,
        setColorMatrixValue,
        alphaValue,
        setAlphaValue
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-foreground rounded-2xl",
        style: {
          height: `${height}px`,
          width: `${width}px`,
          filter: toggle ? "url(#SquiCircleFilter)" : "none"
        }
      }
    )
  ] });
};
var SquiCircleFilter = ({
  blurValue = 10,
  colorMatrixValue = 20,
  alphaValue = -7
}) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "absolute bottom-0 left-0",
      version: "1.1",
      children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "SquiCircleFilter", children: [
        /* @__PURE__ */ jsx(
          "feGaussianBlur",
          {
            in: "SourceGraphic",
            stdDeviation: blurValue,
            result: "blur"
          }
        ),
        /* @__PURE__ */ jsx(
          "feColorMatrix",
          {
            in: "blur",
            mode: "matrix",
            values: `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${colorMatrixValue} ${alphaValue}`,
            result: "goo"
          }
        ),
        /* @__PURE__ */ jsx("feBlend", { in: "SourceGraphic", in2: "goo" })
      ] }) })
    }
  );
};
var Options = ({
  toggle,
  setToggle,
  height,
  setHeight,
  width,
  setWidth,
  blurValue,
  setBlurValue,
  colorMatrixValue,
  setColorMatrixValue,
  alphaValue,
  setAlphaValue
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const resetValues = () => {
    setToggle(false);
    setHeight(200);
    setWidth(300);
    setBlurValue(10);
    setColorMatrixValue(20);
    setAlphaValue(-7);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[300px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0",
      drag: isDragging,
      dragMomentum: false,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              onPointerDown: () => setIsDragging(true),
              onPointerUp: () => setIsDragging(false),
              className: "size-4 cursor-grab active:cursor-grabbing",
              children: /* @__PURE__ */ jsx(GripHorizontal, { className: "size-4 opacity-50" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "p",
            {
              onClick: resetValues,
              className: "hover:bg-foreground/10 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50",
              children: [
                "Reset",
                /* @__PURE__ */ jsx("span", { className: "group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90", children: /* @__PURE__ */ jsx(RefreshCcw, { className: "size-4 opacity-50" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 items-center gap-2 py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Filter :" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setToggle(true),
                className: cn(
                  "bg-muted3 flex items-center justify-center rounded-lg py-1 text-left text-xs opacity-25 transition-colors",
                  toggle && "opacity-100"
                ),
                children: "ON"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setToggle(false),
                className: cn(
                  "bg-muted3 flex items-center justify-center rounded-lg py-1 text-left text-xs opacity-25 transition-colors",
                  !toggle && "opacity-100"
                ),
                children: "OFF"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-3 items-center py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Height :" }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 50,
                  max: 500,
                  value: height,
                  onChange: (e) => setHeight(Number(e.target.value)),
                  className: "bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                  style: {
                    "--range-progress": `${(height - 50) / (500 - 50) * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "w-8 text-right text-xs opacity-50", children: [
                height,
                "px"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-3 items-center py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Width :" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 100,
                  max: 600,
                  value: width,
                  onChange: (e) => setWidth(Number(e.target.value)),
                  className: "bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                  style: {
                    "--range-progress": `${(width - 100) / (600 - 100) * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "w-8 text-right text-xs opacity-50", children: [
                width,
                "px"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-3 items-center py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Blur :" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 50,
                  value: blurValue,
                  onChange: (e) => setBlurValue(Number(e.target.value)),
                  className: "bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                  style: {
                    "--range-progress": `${blurValue / 50 * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-right text-xs opacity-50", children: blurValue })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-3 items-center py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Matrix :" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 1,
                  max: 50,
                  value: colorMatrixValue,
                  onChange: (e) => setColorMatrixValue(Number(e.target.value)),
                  className: "bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                  style: {
                    "--range-progress": `${(colorMatrixValue - 1) / (50 - 1) * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-right text-xs opacity-50", children: colorMatrixValue })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-3 items-center py-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50", children: "Alpha :" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: -20,
                  max: 0,
                  value: alphaValue,
                  onChange: (e) => setAlphaValue(Number(e.target.value)),
                  className: "bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                  style: {
                    "--range-progress": `${(alphaValue + 20) / 20 * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-right text-xs opacity-50", children: alphaValue })
            ] })
          ] })
        ] })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper63, {}) }) });
}
export {
  Skiper63,
  SquiCircleFilterStatic,
  Component as default
};
