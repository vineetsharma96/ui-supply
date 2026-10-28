// Adapted from https://skiper-ui.com/v1/skiper16
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper16.tsx
import { motion, useScroll, useTransform } from "motion/react";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var projects = [
  {
    title: "Project 1",
    src: "https://skiper-ui.com/images/lummi/img8.png"
  },
  {
    title: "Project 2",
    src: "https://skiper-ui.com/images/lummi/img14.png"
  },
  {
    title: "Project 3",
    src: "https://skiper-ui.com/images/lummi/img10.png"
  },
  {
    title: "Project 4",
    src: "https://skiper-ui.com/images/lummi/img15.png"
  },
  {
    title: "Project 5",
    src: "https://skiper-ui.com/images/lummi/img12.png"
  }
];
var StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: container,
      className: "sticky top-0 flex items-center justify-center",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          style: {
            scale,
            top: `calc(-5vh + ${i * 20 + 250}px)`
          },
          className: "rounded-4xl relative -top-1/4 flex h-[300px] w-[500px] origin-top flex-col overflow-hidden",
          children: /* @__PURE__ */ jsx("img", { src, alt: title, className: "h-full w-full object-cover" })
        }
      )
    }
  );
};
var Skiper16 = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsxs(
    "main",
    {
      ref: container,
      className: "relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']", children: "scroll down to see card stack" }) }),
        projects.map((project, i) => {
          const targetScale = Math.max(
            0.5,
            1 - (projects.length - i - 1) * 0.1
          );
          return /* @__PURE__ */ jsx(
            StickyCard_001,
            {
              i,
              ...project,
              progress: scrollYProgress,
              range: [i * 0.25, 1],
              targetScale
            },
            `p_${i}`
          );
        })
      ]
    }
  ) });
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper16, {}) }) });
}
export {
  Skiper16,
  StickyCard_001,
  Component as default
};
