// Adapted from https://ui.aceternity.com/components/spotlight-new
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/spotlight-new.tsx
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100
} = {}) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 1.5
      },
      className: "pointer-events-none absolute inset-0 h-full w-full",
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            animate: {
              x: [0, xOffset, 0]
            },
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            className: "absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: `translateY(${translateY}px) rotate(-45deg)`,
                    background: gradientFirst,
                    width: `${width}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 left-0`
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: "rotate(-45deg) translate(5%, -50%)",
                    background: gradientSecond,
                    width: `${smallWidth}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 left-0 origin-top-left`
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: "rotate(-45deg) translate(-180%, -70%)",
                    background: gradientThird,
                    width: `${smallWidth}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 left-0 origin-top-left`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            animate: {
              x: [0, -xOffset, 0]
            },
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            className: "absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: `translateY(${translateY}px) rotate(45deg)`,
                    background: gradientFirst,
                    width: `${width}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 right-0`
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: "rotate(45deg) translate(-5%, -50%)",
                    background: gradientSecond,
                    width: `${smallWidth}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 right-0 origin-top-right`
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    transform: "rotate(45deg) translate(180%, -70%)",
                    background: gradientThird,
                    width: `${smallWidth}px`,
                    height: `${height}px`
                  },
                  className: `absolute top-0 right-0 origin-top-right`
                }
              )
            ]
          }
        )
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/spotlight-new-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SpotlightNewDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx2(Spotlight, {}),
    /* @__PURE__ */ jsxs2("div", { className: " p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0", children: [
      /* @__PURE__ */ jsxs2("h1", { className: "text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50", children: [
        "Spotlight ",
        /* @__PURE__ */ jsx2("br", {}),
        " which is not overused."
      ] }),
      /* @__PURE__ */ jsx2("p", { className: "mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto", children: "A subtle yet effective spotlight effect, because the previous version is used a bit too much these days." })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SpotlightNewDemo, {}) }) });
}
export {
  Spotlight,
  Component as default
};
