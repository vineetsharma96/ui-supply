// Adapted from https://skiper-ui.com/v1/skiper58
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper58.tsx
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper58.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]"
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]"
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "[2]"
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]"
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]"
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]"
  }
];
var Skiper58 = () => {
  return /* @__PURE__ */ jsx("ul", { className: "bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm", children: navigationItems.map((item, index) => /* @__PURE__ */ jsx(
    "li",
    {
      className: "relative flex cursor-pointer flex-col items-center overflow-visible",
      children: /* @__PURE__ */ jsx("div", { className: "relative flex items-start", children: /* @__PURE__ */ jsx(
        TextRoll,
        {
          center: true,
          className: "text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl",
          children: item.name
        }
      ) })
    },
    index
  )) });
};
var STAGGER = 0.035;
var TextRoll = ({ children, className, center = false }) => {
  return /* @__PURE__ */ jsxs(
    motion.span,
    {
      initial: "initial",
      whileHover: "hovered",
      className: cn("relative block overflow-hidden", className),
      style: {
        lineHeight: 0.75
      },
      children: [
        /* @__PURE__ */ jsx("div", { children: children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;
          return /* @__PURE__ */ jsx(
            motion.span,
            {
              variants: {
                initial: {
                  y: 0
                },
                hovered: {
                  y: "-100%"
                }
              },
              transition: {
                ease: "easeInOut",
                delay
              },
              className: "inline-block",
              children: l
            },
            i
          );
        }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;
          return /* @__PURE__ */ jsx(
            motion.span,
            {
              variants: {
                initial: {
                  y: "100%"
                },
                hovered: {
                  y: 0
                }
              },
              transition: {
                ease: "easeInOut",
                delay
              },
              className: "inline-block",
              children: l
            },
            i
          );
        }) })
      ]
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper58, {}) }) });
}
export {
  Skiper58,
  TextRoll,
  Component as default
};
