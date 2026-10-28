// Adapted from https://ui.aceternity.com/components/colourful-text
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/colourful-text.tsx
import React from "react";
import { motion } from "motion/react";
import { jsx } from "react/jsx-runtime";
function ColourfulText({ text }) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)"
  ];
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5e3);
    return () => clearInterval(interval);
  }, []);
  return text.split("").map((char, index) => /* @__PURE__ */ jsx(
    motion.span,
    {
      initial: {
        y: 0
      },
      animate: {
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1]
      },
      transition: {
        duration: 0.5,
        delay: index * 0.05
      },
      className: "inline-block whitespace-pre font-sans tracking-tight",
      children: char
    },
    `${char}-${count}-${index}`
  ));
}

// entry.jsx
import React2 from "react";

// registry:components/colourful-text-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ColourfulTextDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-full flex items-center justify-center relative overflow-hidden bg-black", children: [
    /* @__PURE__ */ jsx2(
      motion2.img,
      {
        src: "https://assets.aceternity.com/linear-demo.webp",
        alt: "",
        className: "h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none",
        initial: { opacity: 0 },
        animate: { opacity: 0.5 },
        transition: { duration: 1 }
      }
    ),
    /* @__PURE__ */ jsxs("h1", { className: "text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans", children: [
      "The best ",
      /* @__PURE__ */ jsx2(ColourfulText, { text: "components" }),
      " ",
      /* @__PURE__ */ jsx2("br", {}),
      " you will ever find"
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ColourfulTextDemo, {}) }) });
}
export {
  Component as default
};
