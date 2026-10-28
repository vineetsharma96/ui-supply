// Adapted from https://ui.aceternity.com/components/multi-step-loader
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/multi-step-loader.tsx
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var CheckIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: cn("w-6 h-6 ", className),
      children: /* @__PURE__ */ jsx("path", { d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" })
    }
  );
};
var CheckFilled = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: cn("w-6 h-6 ", className),
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
          clipRule: "evenodd"
        }
      )
    }
  );
};
var LoaderCore = ({
  loadingStates: loadingStates2,
  value = 0
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex relative justify-start max-w-xl mx-auto flex-col mt-40", children: loadingStates2.map((loadingState, index) => {
    const distance = Math.abs(index - value);
    const opacity = Math.max(1 - distance * 0.2, 0);
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: cn("text-left flex gap-2 mb-4"),
        initial: { opacity: 0, y: -(value * 40) },
        animate: { opacity, y: -(value * 40) },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            index > value && /* @__PURE__ */ jsx(CheckIcon, { className: "text-black dark:text-white" }),
            index <= value && /* @__PURE__ */ jsx(
              CheckFilled,
              {
                className: cn(
                  "text-black dark:text-white",
                  value === index && "text-black dark:text-lime-500 opacity-100"
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "text-black dark:text-white",
                value === index && "text-black dark:text-lime-500 opacity-100"
              ),
              children: loadingState.text
            }
          )
        ]
      },
      index
    );
  }) });
};
var MultiStepLoader = ({
  loadingStates: loadingStates2,
  loading,
  duration = 2e3,
  loop = true
}) => {
  const [currentState, setCurrentState] = useState(0);
  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState(
        (prevState) => loop ? prevState === loadingStates2.length - 1 ? 0 : prevState + 1 : Math.min(prevState + 1, loadingStates2.length - 1)
      );
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates2.length, duration]);
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: loading && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      exit: {
        opacity: 0
      },
      className: "w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "h-96  relative", children: /* @__PURE__ */ jsx(LoaderCore, { value: currentState, loadingStates: loadingStates2 }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" })
      ]
    }
  ) });
};

// entry.jsx
import React2 from "react";

// registry:components/multi-step-loader-demo.tsx
import { useState as useState2 } from "react";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var loadingStates = [
  {
    text: "Buying a condo"
  },
  {
    text: "Travelling in a flight"
  },
  {
    text: "Meeting Tyler Durden"
  },
  {
    text: "He makes soap"
  },
  {
    text: "We goto a bar"
  },
  {
    text: "Start a fight"
  },
  {
    text: "We like it"
  },
  {
    text: "Welcome to F**** C***"
  }
];
function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState2(false);
  return /* @__PURE__ */ jsxs2("div", { className: "w-full h-[60vh] flex items-center justify-center", children: [
    /* @__PURE__ */ jsx2(MultiStepLoader, { loadingStates, loading, duration: 2e3 }),
    /* @__PURE__ */ jsx2(
      "button",
      {
        onClick: () => setLoading(true),
        className: "bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center",
        style: {
          boxShadow: "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset"
        },
        children: "Click to load"
      }
    ),
    loading && /* @__PURE__ */ jsx2(
      "button",
      {
        className: "fixed top-4 right-4 text-black dark:text-white z-[120]",
        onClick: () => setLoading(false),
        children: /* @__PURE__ */ jsx2(IconSquareRoundedX, { className: "h-10 w-10" })
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MultiStepLoaderDemo, {}) }) });
}
export {
  MultiStepLoader,
  Component as default
};
