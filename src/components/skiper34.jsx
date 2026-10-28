// Adapted from https://skiper-ui.com/v1/skiper34
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper34.tsx
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform
} from "motion/react";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var images = [
  "https://skiper-ui.com/images/lummi/img14.png",
  "https://skiper-ui.com/images/lummi/img30.png",
  "https://skiper-ui.com/images/lummi/img19.png",
  "https://skiper-ui.com/images/lummi/img21.png",
  "https://skiper-ui.com/images/lummi/img23.png",
  "https://skiper-ui.com/images/lummi/imgp2.png",
  "https://skiper-ui.com/images/lummi/img27.png"
];
var Skiper34 = () => {
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsxs("section", { className: "relative flex w-screen flex-col items-center gap-[10vh] px-4 pt-[50vh]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-24 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']", children: "scroll down to see effect" }) }),
    images.map((img, idx) => /* @__PURE__ */ jsx(StickyCard_003, { imgUrl: img }, idx))
  ] }) });
};
var StickyCard_003 = ({ imgUrl }) => {
  const vertMargin = 10;
  const container = useRef(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);
  const { scrollY } = useScroll({
    target: container
  });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 1e4], [1, 0]);
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true
  });
  scrollY.on("change", (scrollY2) => {
    let animationValue = 1;
    if (scrollY2 > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY2 - maxScrollY) / 1e4);
    }
    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });
  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: container,
      className: "rounded-4xl sticky h-[200px] w-full max-w-4xl overflow-hidden bg-neutral-200",
      style: {
        scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`
      },
      children: /* @__PURE__ */ jsx(
        motion.img,
        {
          src: imgUrl,
          alt: imgUrl,
          style: {
            rotate: negateFilter
          },
          className: "h-full w-full scale-125 object-cover",
          sizes: "90vw"
        }
      )
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper34, {}) }) });
}
export {
  Skiper34,
  StickyCard_003,
  Component as default
};
