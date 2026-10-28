// Adapted from https://ui.aceternity.com/components/layout-grid
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/layout-grid.tsx
import { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/layout-grid.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var LayoutGrid = ({ cards: cards2 }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };
  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative", children: [
    cards2.map((card, i) => /* @__PURE__ */ jsx("div", { className: cn(card.className, ""), children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        onClick: () => handleClick(card),
        className: cn(
          card.className,
          "relative overflow-hidden",
          selected?.id === card.id ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col" : lastSelected?.id === card.id ? "z-40 bg-white rounded-xl h-full w-full" : "bg-white rounded-xl h-full w-full"
        ),
        layoutId: `card-${card.id}`,
        children: [
          selected?.id === card.id && /* @__PURE__ */ jsx(SelectedCard, { selected }),
          /* @__PURE__ */ jsx(ImageComponent, { card })
        ]
      }
    ) }, i)),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        onClick: handleOutsideClick,
        className: cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        ),
        animate: { opacity: selected?.id ? 0.3 : 0 }
      }
    )
  ] });
};
var ImageComponent = ({ card }) => {
  return /* @__PURE__ */ jsx(
    motion.img,
    {
      layoutId: `image-${card.id}-image`,
      src: card.thumbnail,
      height: "500",
      width: "500",
      className: cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      ),
      alt: "thumbnail"
    }
  );
};
var SelectedCard = ({ selected }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 0.6
        },
        className: "absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId: `content-${selected?.id}`,
        initial: {
          opacity: 0,
          y: 100
        },
        animate: {
          opacity: 1,
          y: 0
        },
        exit: {
          opacity: 0,
          y: 100
        },
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        },
        className: "relative px-8 pb-4 z-[70]",
        children: selected?.content
      }
    )
  ] });
};

// entry.jsx
import React2 from "react";

// registry:components/layout-grid-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LayoutGridDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "h-screen py-20 w-full", children: /* @__PURE__ */ jsx2(LayoutGrid, { cards }) });
}
var SkeletonOne = () => {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("p", { className: "font-bold md:text-4xl text-xl text-white", children: "House in the woods" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base text-white" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base my-4 max-w-lg text-neutral-200", children: "A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life." })
  ] });
};
var SkeletonTwo = () => {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("p", { className: "font-bold md:text-4xl text-xl text-white", children: "House above the clouds" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base text-white" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base my-4 max-w-lg text-neutral-200", children: "Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life." })
  ] });
};
var SkeletonThree = () => {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("p", { className: "font-bold md:text-4xl text-xl text-white", children: "Greens all over" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base text-white" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base my-4 max-w-lg text-neutral-200", children: "A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life." })
  ] });
};
var SkeletonFour = () => {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("p", { className: "font-bold md:text-4xl text-xl text-white", children: "Rivers are serene" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base text-white" }),
    /* @__PURE__ */ jsx2("p", { className: "font-normal text-base my-4 max-w-lg text-neutral-200", children: "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life." })
  ] });
};
var cards = [
  {
    id: 1,
    content: /* @__PURE__ */ jsx2(SkeletonOne, {}),
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    content: /* @__PURE__ */ jsx2(SkeletonTwo, {}),
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    content: /* @__PURE__ */ jsx2(SkeletonThree, {}),
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    content: /* @__PURE__ */ jsx2(SkeletonFour, {}),
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LayoutGridDemo, {}) }) });
}
export {
  LayoutGrid,
  Component as default
};
