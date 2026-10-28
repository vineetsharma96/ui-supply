// Adapted from https://ui.aceternity.com/components/aurora-background
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/aurora-background.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 overflow-hidden",
            style: {
              "--aurora": "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",
              "--dark-gradient": "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient": "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
              "--blue-300": "#93c5fd",
              "--blue-400": "#60a5fa",
              "--blue-500": "#3b82f6",
              "--indigo-300": "#a5b4fc",
              "--violet-200": "#ddd6fe",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent"
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
                  showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
                )
              }
            )
          }
        ),
        children
      ]
    }
  ) });
};

// entry.jsx
import React from "react";

// registry:components/aurora-background-demo.tsx
import { motion } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AuroraBackgroundDemo() {
  return /* @__PURE__ */ jsx2(AuroraBackground, { children: /* @__PURE__ */ jsxs2(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"
      },
      className: "relative flex flex-col gap-4 items-center justify-center px-4",
      children: [
        /* @__PURE__ */ jsx2("div", { className: "text-3xl md:text-7xl font-bold dark:text-white text-center", children: "Background lights are cool you know." }),
        /* @__PURE__ */ jsx2("div", { className: "font-extralight text-base md:text-4xl dark:text-neutral-200 py-4", children: "And this, is chemical burn." }),
        /* @__PURE__ */ jsx2("button", { className: "bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2", children: "Debug now" })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AuroraBackgroundDemo, {}) }) });
}
export {
  AuroraBackground,
  Component as default
};
