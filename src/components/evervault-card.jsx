// Adapted from https://ui.aceternity.com/components/evervault-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/evervault-card.tsx
import { useMotionValue } from "motion/react";
import { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/evervault-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EvervaultCard = ({
  text,
  className
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);
  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    const str = generateRandomString(1500);
    setRandomString(str);
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          onMouseMove,
          className: "group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full",
          children: [
            /* @__PURE__ */ jsx(
              CardPattern,
              {
                mouseX,
                mouseY,
                randomString
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" }),
              /* @__PURE__ */ jsx("span", { className: "dark:text-white text-black z-20", children: text })
            ] }) })
          ]
        }
      )
    }
  );
};
function CardPattern({ mouseX, mouseY, randomString }) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500",
        style
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100",
        style,
        children: /* @__PURE__ */ jsx("p", { className: "absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500", children: randomString })
      }
    )
  ] });
}
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var Icon = ({ className, ...rest }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className,
      ...rest,
      children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v12m6-6H6" })
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/evervault-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function EvervaultCardDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]", children: [
    /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" }),
    /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" }),
    /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" }),
    /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" }),
    /* @__PURE__ */ jsx2(EvervaultCard, { text: "hover" }),
    /* @__PURE__ */ jsx2("h2", { className: "dark:text-white text-black mt-4 text-sm font-light", children: "Hover over this card to reveal an awesome effect. Running out of copy here." }),
    /* @__PURE__ */ jsx2("p", { className: "text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5", children: "Watch me hover" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(EvervaultCardDemo, {}) }) });
}
export {
  CardPattern,
  EvervaultCard,
  Icon,
  Component as default,
  generateRandomString
};
