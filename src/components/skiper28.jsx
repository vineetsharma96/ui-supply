// Adapted from https://skiper-ui.com/v1/skiper28
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper28.tsx
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform
} from "motion/react";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper28 = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });
  const yMotionValue = useTransform(scrollYProgress, [0, 1], [487, 0]);
  const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: targetRef,
      className: "relative z-0 h-[300vh] w-screen bg-[#f5f4f3] text-black",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black", children: /* @__PURE__ */ jsx("span", { className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']", children: "scroll down to see" }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "sticky top-0 mx-auto flex items-center justify-center bg-transparent py-20",
            style: {
              transformStyle: "preserve-3d",
              perspective: "200px"
            },
            children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                style: {
                  transformStyle: "preserve-3d",
                  transform
                },
                className: "font-geist w-full max-w-4xl text-center text-6xl font-bold tracking-tighter text-[#ff5800]",
                children: [
                  "Jatt seeweyan cho langheya chudail takkri jaani badi sohni bhoot female takkri .. kehndi jatta .. oye jatta.... kehndi jatta .. metho darke ho ja katha .. nai tan aah kar du ... nai tan waah kardu... tenu ethe khade khade nu swah kardu ... jatt kehnda hor menu ki chahida ... jatt kehnda hor menu ki chahida .. avein gallan-baatan vich bohta sama na gva aaja chimbad ja ... mein keha chimbad ja .. . aaja chimbad ja ... mein keha chimbad ja .. .",
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 h-[60vh] w-full bg-gradient-to-b from-transparent to-white" })
                ]
              }
            )
          }
        )
      ]
    }
  ) });
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper28, {}) }) });
}
export {
  Skiper28,
  Component as default
};
