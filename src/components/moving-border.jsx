// Adapted from https://ui.aceternity.com/components/moving-border
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/moving-border.tsx
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform
} from "motion/react";
import { useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/moving-border.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Button({
  borderRadius = "1.75rem",
  children,
  as: Component2 = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return /* @__PURE__ */ jsxs(
    Component2,
    {
      className: cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      ),
      style: {
        borderRadius
      },
      ...otherProps,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0",
            style: { borderRadius: `calc(${borderRadius} * 0.96)` },
            children: /* @__PURE__ */ jsx(MovingBorder, { duration, rx: "30%", ry: "30%", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
                  borderClassName
                )
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
              className
            ),
            style: {
              borderRadius: `calc(${borderRadius} * 0.96)`
            },
            children
          }
        )
      ]
    }
  );
}
var MovingBorder = ({
  children,
  duration = 3e3,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set(time * pxPerMillisecond % length);
    }
  });
  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "none",
        className: "absolute h-full w-full",
        width: "100%",
        height: "100%",
        ...otherProps,
        children: /* @__PURE__ */ jsx(
          "rect",
          {
            fill: "none",
            width: "100%",
            height: "100%",
            rx,
            ry,
            ref: pathRef
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform
        },
        children
      }
    )
  ] });
};

// entry.jsx
import React from "react";

// registry:components/moving-border-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MovingBorderDemo() {
  return /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(
    Button,
    {
      borderRadius: "1.75rem",
      className: "bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800",
      children: "Borders are cool"
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MovingBorderDemo, {}) }) });
}
export {
  Button,
  MovingBorder,
  Component as default
};
