// Adapted from https://ui.aceternity.com/components/background-boxes
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/background-boxes.tsx
import React from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/background-boxes.tsx
import { jsx } from "react/jsx-runtime";
var BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd"
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`
      },
      className: cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className
      ),
      ...rest,
      children: rows.map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "relative h-8 w-16 border-l border-slate-700",
          children: cols.map((_2, j) => /* @__PURE__ */ jsx(
            motion.div,
            {
              whileHover: {
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 }
              },
              animate: {
                transition: { duration: 2 }
              },
              className: "relative h-8 w-16 border-t border-r border-slate-700",
              children: j % 2 === 0 && i % 2 === 0 ? /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  className: "pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 6v12m6-6H6"
                    }
                  )
                }
              ) : null
            },
            `col` + j
          ))
        },
        `row` + i
      ))
    }
  );
};
var Boxes = React.memo(BoxesCore);

// entry.jsx
import React2 from "react";

// registry:components/background-boxes-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function BackgroundBoxesDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg", children: [
    /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" }),
    /* @__PURE__ */ jsx2(Boxes, {}),
    /* @__PURE__ */ jsx2("h1", { className: cn("md:text-4xl text-xl text-white relative z-20"), children: "Tailwind is Awesome" }),
    /* @__PURE__ */ jsx2("p", { className: "text-center mt-2 text-neutral-300 relative z-20", children: "Framer motion is the best animation library ngl" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(BackgroundBoxesDemo, {}) }) });
}
export {
  Boxes,
  BoxesCore,
  Component as default
};
