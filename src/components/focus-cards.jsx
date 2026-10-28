// Adapted from https://ui.aceternity.com/components/focus-cards
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/focus-cards.tsx
import React, { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/focus-cards.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered
  }) => /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHovered(index),
      onMouseLeave: () => setHovered(null),
      className: cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: card.src,
            alt: card.title,
            className: "object-cover absolute inset-0"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            ),
            children: /* @__PURE__ */ jsx("div", { className: "text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200", children: card.title })
          }
        )
      ]
    }
  )
);
Card.displayName = "Card";
function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full", children: cards.map((card, index) => /* @__PURE__ */ jsx(
    Card,
    {
      card,
      index,
      hovered,
      setHovered
    },
    card.title
  )) });
}

// entry.jsx
import React2 from "react";

// registry:components/focus-cards-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function FocusCardsDemo() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Valley of life",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "The road not taken",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "The First Rule",
      src: "https://assets.aceternity.com/the-first-rule.png"
    }
  ];
  return /* @__PURE__ */ jsx2(FocusCards, { cards });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FocusCardsDemo, {}) }) });
}
export {
  Card,
  FocusCards,
  Component as default
};
