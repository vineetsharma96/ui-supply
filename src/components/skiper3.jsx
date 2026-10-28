// Adapted from https://skiper-ui.com/v1/skiper3
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper3.tsx
import { motion } from "motion/react";
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper3.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper3 = () => {
  const [toggle, setToggle] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full items-center justify-center rounded-full", children: [
    /* @__PURE__ */ jsx(motion.div, { layout: true, children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: cn(
          "h-15 relative flex items-center justify-between overflow-hidden rounded-full"
        ),
        style: { borderRadius: 9999, width: 60 },
        initial: { scale: 0, y: "100%" },
        transition: { type: "spring", bounce: 0.16 },
        animate: { scale: 1, y: 0, width: !toggle ? 60 : 330 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-foreground/20 flex h-full w-[260px] items-center justify-center gap-2 rounded-full", children: toggle && /* @__PURE__ */ jsxs(
            motion.div,
            {
              animate: { opacity: 1 },
              initial: { opacity: 0 },
              exit: { opacity: 0 },
              transition: { delay: 0.25 },
              className: "flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { className: "bg-foreground/20 h-[10px] w-[60px] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "bg-foreground/20 size-[10px] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "bg-foreground/20 size-[10px] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "bg-foreground/20 size-[10px] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "bg-foreground/20 size-[10px] rounded-full" })
              ]
            }
          ) }),
          toggle && /* @__PURE__ */ jsx("div", { className: "bg-foreground/20 flex h-full w-[60px] items-center justify-center gap-2 rounded-full", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
              animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
              exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
              className: "flex items-center justify-center gap-2",
              children: /* @__PURE__ */ jsx(
                motion.svg,
                {
                  initial: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
                  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
                  exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
                  transition: { delay: 0.25 },
                  viewBox: "-1 0 12 14",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "text-foreground/8 h-5 w-5 fill-current",
                  children: /* @__PURE__ */ jsx("path", { d: "M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" })
                },
                "play"
              )
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setToggle((x) => !x),
        className: "bg-foreground/8 absolute bottom-50 my-10 rounded-full px-7 py-1 active:scale-95",
        children: "Toggle"
      }
    )
  ] });
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper3, {}) }) });
}
export {
  Skiper3,
  Component as default
};
