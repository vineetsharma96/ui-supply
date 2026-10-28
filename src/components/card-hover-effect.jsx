// Adapted from https://ui.aceternity.com/components/card-hover-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/card-hover-effect.tsx
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      ),
      children: items.map((item, idx) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: item?.link,
          className: "relative group  block p-2 h-full w-full",
          onMouseEnter: () => setHoveredIndex(idx),
          onMouseLeave: () => setHoveredIndex(null),
          children: [
            /* @__PURE__ */ jsx(AnimatePresence, { children: hoveredIndex === idx && /* @__PURE__ */ jsx(
              motion.span,
              {
                className: "absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl",
                layoutId: "hoverBackground",
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { duration: 0.15 }
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 }
                }
              }
            ) }),
            /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: item.title }),
              /* @__PURE__ */ jsx(CardDescription, { children: item.description })
            ] })
          ]
        },
        item?.link
      ))
    }
  );
};
var Card = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "relative z-50", children: /* @__PURE__ */ jsx("div", { className: "p-4", children }) })
    }
  );
};
var CardTitle = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("h4", { className: cn("text-zinc-100 font-bold tracking-wide mt-4", className), children });
};
var CardDescription = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      ),
      children
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/card-hover-effect-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function CardHoverEffectDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "max-w-5xl mx-auto px-8", children: /* @__PURE__ */ jsx2(HoverEffect, { items: projects }) });
}
var projects = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com"
  },
  {
    title: "Netflix",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com"
  },
  {
    title: "Google",
    description: "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com"
  },
  {
    title: "Meta",
    description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com"
  },
  {
    title: "Amazon",
    description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com"
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com"
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CardHoverEffectDemo, {}) }) });
}
export {
  Card,
  CardDescription,
  CardTitle,
  HoverEffect,
  Component as default
};
