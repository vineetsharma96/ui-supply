// Adapted from https://ui.aceternity.com/components/3d-pin
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/3d-pin.tsx
import { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/3d-pin.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );
  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: cn(
        "relative group/pin z-50  cursor-pointer",
        containerClassName
      ),
      onMouseEnter,
      onMouseLeave,
      href: href || "/",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              perspective: "1000px",
              transform: "rotateX(70deg) translateZ(0deg)"
            },
            className: "absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  transform
                },
                className: "absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden",
                children: /* @__PURE__ */ jsx("div", { className: cn(" relative z-50 ", className), children })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(PinPerspective, { title, href })
      ]
    }
  );
};
var PinPerspective = ({
  title,
  href
}) => {
  return /* @__PURE__ */ jsx(motion.div, { className: "pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500", children: /* @__PURE__ */ jsxs("div", { className: " w-full h-full -mt-7 flex-none  inset-0", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0  flex justify-center", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href,
        target: "_blank",
        className: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ",
        children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-20 text-white text-xs font-bold inline-block py-0.5", children: title }),
          /* @__PURE__ */ jsx("span", { className: "absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0)"
        },
        className: "absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2",
        children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: {
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%"
              },
              animate: {
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              },
              transition: {
                duration: 6,
                repeat: Infinity,
                delay: 0
              },
              className: "absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: {
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%"
              },
              animate: {
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              },
              transition: {
                duration: 6,
                repeat: Infinity,
                delay: 2
              },
              className: "absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: {
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%"
              },
              animate: {
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              },
              transition: {
                duration: 6,
                repeat: Infinity,
                delay: 4
              },
              className: "absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(motion.div, { className: "absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" }),
      /* @__PURE__ */ jsx(motion.div, { className: "absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " }),
      /* @__PURE__ */ jsx(motion.div, { className: "absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" }),
      /* @__PURE__ */ jsx(motion.div, { className: "absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " })
    ] })
  ] }) });
};

// entry.jsx
import React2 from "react";

// registry:components/3d-pin-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AnimatedPinDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "h-[40rem] w-full flex items-center justify-center ", children: /* @__PURE__ */ jsx2(
    PinContainer,
    {
      title: "/ui.aceternity.com",
      href: "https://twitter.com/mannupaaji",
      children: /* @__PURE__ */ jsxs2("div", { className: "flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ", children: [
        /* @__PURE__ */ jsx2("h3", { className: "max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100", children: "Aceternity UI" }),
        /* @__PURE__ */ jsx2("div", { className: "text-base !m-0 !p-0 font-normal", children: /* @__PURE__ */ jsx2("span", { className: "text-slate-500 ", children: "Customizable Tailwind CSS and Framer Motion Components." }) }),
        /* @__PURE__ */ jsx2("div", { className: "flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" })
      ] })
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AnimatedPinDemo, {}) }) });
}
export {
  PinContainer,
  PinPerspective,
  Component as default
};
