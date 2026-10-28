// Adapted from https://ui.aceternity.com/components/card-stack
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/card-stack.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var interval;
var CardStack = ({
  items,
  offset,
  scaleFactor
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);
  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 5e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "relative  h-60 w-60 md:h-60 md:w-96", children: cards.map((card, index) => {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between",
        style: {
          transformOrigin: "top center"
        },
        animate: {
          top: index * -CARD_OFFSET,
          scale: 1 - index * SCALE_FACTOR,
          // decrease scale for cards that are behind
          zIndex: cards.length - index
          //  decrease z-index for the cards that are behind
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "font-normal text-neutral-700 dark:text-neutral-200", children: card.content }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-neutral-500 font-medium dark:text-white", children: card.name }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-400 font-normal dark:text-neutral-200", children: card.designation })
          ] })
        ]
      },
      card.id
    );
  }) });
};

// entry.jsx
import React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/card-stack-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CardStackDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "h-[40rem] flex items-center justify-center w-full", children: /* @__PURE__ */ jsx2(CardStack, { items: CARDS }) });
}
var Highlight = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      ),
      children
    }
  );
};
var CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: /* @__PURE__ */ jsxs2("p", { children: [
      "These cards are amazing, ",
      /* @__PURE__ */ jsx2(Highlight, { children: "I want to use them" }),
      " in my project. Framer motion is a godsend ngl tbh fam \u{1F64F}"
    ] })
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: /* @__PURE__ */ jsxs2("p", { children: [
      "I dont like this Twitter thing,",
      " ",
      /* @__PURE__ */ jsx2(Highlight, { children: "deleting it right away" }),
      " because yolo. Instead, I would like to call it ",
      /* @__PURE__ */ jsx2(Highlight, { children: "X.com" }),
      " so that it can easily be confused with adult sites."
    ] })
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: /* @__PURE__ */ jsxs2("p", { children: [
      "The first rule of",
      /* @__PURE__ */ jsx2(Highlight, { children: "Fight Club" }),
      " is that you do not talk about fight club. The second rule of",
      /* @__PURE__ */ jsx2(Highlight, { children: "Fight club" }),
      " is that you DO NOT TALK about fight club."
    ] })
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CardStackDemo, {}) }) });
}
export {
  CardStack,
  Component as default
};
