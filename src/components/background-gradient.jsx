// Adapted from https://ui.aceternity.com/components/background-gradient
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/background-gradient.tsx
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%"
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"]
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("relative p-[4px] group", containerClassName), children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: animate ? variants : void 0,
        initial: animate ? "initial" : void 0,
        animate: animate ? "animate" : void 0,
        transition: animate ? {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        } : void 0,
        style: {
          backgroundSize: animate ? "400% 400%" : void 0
        },
        className: cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: animate ? variants : void 0,
        initial: animate ? "initial" : void 0,
        animate: animate ? "animate" : void 0,
        transition: animate ? {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        } : void 0,
        style: {
          backgroundSize: animate ? "400% 400%" : void 0
        },
        className: cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: cn("relative z-10", className), children })
  ] });
};

// entry.jsx
import React from "react";

// registry:components/background-gradient-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function BackgroundGradientDemo() {
  return /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsxs2(BackgroundGradient, { className: "rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900", children: [
    /* @__PURE__ */ jsx2(
      "img",
      {
        src: `https://ui.aceternity.com/jordans.webp`,
        alt: "jordans",
        height: "400",
        width: "400",
        className: "object-contain"
      }
    ),
    /* @__PURE__ */ jsx2("p", { className: "text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200", children: "Air Jordan 4 Retro Reimagined" }),
    /* @__PURE__ */ jsx2("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "The Air Jordan 4 Retro Reimagined Bred will release on Saturday, February 17, 2024. Your best opportunity to get these right now is by entering raffles and waiting for the official releases." }),
    /* @__PURE__ */ jsxs2("button", { className: "rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800", children: [
      /* @__PURE__ */ jsx2("span", { children: "Buy now " }),
      /* @__PURE__ */ jsx2("span", { className: "bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white", children: "$100" })
    ] })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(BackgroundGradientDemo, {}) }) });
}
export {
  BackgroundGradient,
  Component as default
};
