// Adapted from https://ui.aceternity.com/components/hover-border-gradient
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/hover-border-gradient.tsx
import { useState, useEffect } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/hover-border-gradient.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");
  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise ? (currentIndex - 1 + directions.length) % directions.length : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };
  const movingMap = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)"
  };
  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1e3);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      onMouseEnter: (event) => {
        setHovered(true);
      },
      onMouseLeave: () => setHovered(false),
      className: cn(
        "relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
              className
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: cn(
              "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
            ),
            style: {
              filter: "blur(2px)",
              position: "absolute",
              width: "100%",
              height: "100%"
            },
            initial: { background: movingMap[direction] },
            animate: {
              background: hovered ? [movingMap[direction], highlight] : movingMap[direction]
            },
            transition: { ease: "linear", duration: duration ?? 1 }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" })
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/hover-border-gradient-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function HoverBorderGradientDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "m-40 flex justify-center text-center", children: /* @__PURE__ */ jsxs2(
    HoverBorderGradient,
    {
      containerClassName: "rounded-full",
      as: "button",
      className: "dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2",
      children: [
        /* @__PURE__ */ jsx2(AceternityLogo, {}),
        /* @__PURE__ */ jsx2("span", { children: "Aceternity UI" })
      ]
    }
  ) });
}
var AceternityLogo = () => {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      width: "66",
      height: "65",
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-3 w-3 text-black dark:text-white",
      children: /* @__PURE__ */ jsx2(
        "path",
        {
          d: "M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696",
          stroke: "currentColor",
          strokeWidth: "15",
          strokeMiterlimit: "3.86874",
          strokeLinecap: "round"
        }
      )
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(HoverBorderGradientDemo, {}) }) });
}
export {
  HoverBorderGradient,
  Component as default
};
