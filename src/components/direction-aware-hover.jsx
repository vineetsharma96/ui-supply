// Adapted from https://ui.aceternity.com/components/direction-aware-hover
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/direction-aware-hover.tsx
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/direction-aware-hover.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className
}) => {
  const ref = useRef(null);
  const [direction, setDirection] = useState("left");
  const handleMouseEnter = (event) => {
    if (!ref.current) return;
    const direction2 = getDirection(event, ref.current);
    console.log("direction", direction2);
    switch (direction2) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };
  const getDirection = (ev, obj) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - w / 2 * (w > h ? h / w : 1);
    const y = ev.clientY - top - h / 2 * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onMouseEnter: handleMouseEnter,
      ref,
      className: cn(
        "md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative",
        className
      ),
      children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative h-full w-full",
          initial: "initial",
          whileHover: direction,
          exit: "exit",
          children: [
            /* @__PURE__ */ jsx(motion.div, { className: "group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants,
                className: "h-full w-full relative bg-gray-50 dark:bg-black",
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                },
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: "image",
                    className: cn(
                      "h-full w-full object-cover scale-[1.15]",
                      imageClassName
                    ),
                    width: "1000",
                    height: "1000",
                    src: imageUrl
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: textVariants,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                },
                className: cn(
                  "text-white absolute bottom-4 left-4 z-40",
                  childrenClassName
                ),
                children
              }
            )
          ]
        }
      ) })
    }
  );
};
var variants = {
  initial: {
    x: 0
  },
  exit: {
    x: 0,
    y: 0
  },
  top: {
    y: 20
  },
  bottom: {
    y: -20
  },
  left: {
    x: 20
  },
  right: {
    x: -20
  }
};
var textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0
  },
  top: {
    y: -20,
    opacity: 1
  },
  bottom: {
    y: 2,
    opacity: 1
  },
  left: {
    x: -2,
    opacity: 1
  },
  right: {
    x: 20,
    opacity: 1
  }
};

// entry.jsx
import React from "react";

// registry:components/direction-aware-hover-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DirectionAwareHoverDemo() {
  const imageUrl = "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return /* @__PURE__ */ jsx2("div", { className: "h-[40rem] relative  flex items-center justify-center", children: /* @__PURE__ */ jsxs2(DirectionAwareHover, { imageUrl, children: [
    /* @__PURE__ */ jsx2("p", { className: "font-bold text-xl", children: "In the mountains" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-sm", children: "$1299 / night" })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(DirectionAwareHoverDemo, {}) }) });
}
export {
  DirectionAwareHover,
  Component as default
};
