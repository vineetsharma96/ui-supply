// Adapted from https://ui.aceternity.com/components/wobble-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/wobble-card.tsx
import { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/wobble-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var WobbleCard = ({
  children,
  containerClassName,
  className
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return /* @__PURE__ */ jsx(
    motion.section,
    {
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      },
      style: {
        transform: isHovering ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)` : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out"
      },
      className: cn(
        "mx-auto w-full bg-indigo-800  relative rounded-2xl overflow-hidden",
        containerClassName
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "relative  h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden",
          style: {
            boxShadow: "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)"
          },
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              style: {
                transform: isHovering ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)` : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.1s ease-out"
              },
              className: cn("h-full px-4 py-20 sm:px-10", className),
              children: [
                /* @__PURE__ */ jsx(Noise, {}),
                children
              ]
            }
          )
        }
      )
    }
  );
};
var Noise = () => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]",
      style: {
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%"
      }
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/wobble-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function WobbleCardDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full", children: [
    /* @__PURE__ */ jsxs2(
      WobbleCard,
      {
        containerClassName: "col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]",
        className: "",
        children: [
          /* @__PURE__ */ jsxs2("div", { className: "max-w-xs", children: [
            /* @__PURE__ */ jsx2("h2", { className: "text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white", children: "Gippity AI powers the entire universe" }),
            /* @__PURE__ */ jsx2("p", { className: "mt-4 text-left  text-base/6 text-neutral-200", children: "With over 100,000 mothly active bot users, Gippity AI is the most popular AI platform for developers." })
          ] }),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://ui.aceternity.com/linear.webp",
              width: 500,
              height: 500,
              alt: "linear demo image",
              className: "absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs2(WobbleCard, { containerClassName: "col-span-1 min-h-[300px]", children: [
      /* @__PURE__ */ jsx2("h2", { className: "max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white", children: "No shirt, no shoes, no weapons." }),
      /* @__PURE__ */ jsx2("p", { className: "mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200", children: "If someone yells \u201Cstop!\u201D, goes limp, or taps out, the fight is over." })
    ] }),
    /* @__PURE__ */ jsxs2(WobbleCard, { containerClassName: "col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]", children: [
      /* @__PURE__ */ jsxs2("div", { className: "max-w-sm", children: [
        /* @__PURE__ */ jsx2("h2", { className: "max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white", children: "Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!" }),
        /* @__PURE__ */ jsx2("p", { className: "mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200", children: "With over 100,000 mothly active bot users, Gippity AI is the most popular AI platform for developers." })
      ] }),
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://ui.aceternity.com/linear.webp",
          width: 500,
          height: 500,
          alt: "linear demo image",
          className: "absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        }
      )
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(WobbleCardDemo, {}) }) });
}
export {
  WobbleCard,
  Component as default
};
