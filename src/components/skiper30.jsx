// Adapted from https://skiper-ui.com/v1/skiper30
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper30.tsx
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var images = [
  "https://skiper-ui.com/images/lummi/img15.png",
  "https://skiper-ui.com/images/lummi/img21.png",
  "https://skiper-ui.com/images/lummi/img3.png",
  "https://skiper-ui.com/images/lummi/img4.png",
  "https://skiper-ui.com/images/lummi/img5.png",
  "https://skiper-ui.com/images/lummi/img6.png",
  "https://skiper-ui.com/images/lummi/img7.png",
  "https://skiper-ui.com/images/lummi/img8.png",
  "https://skiper-ui.com/images/lummi/img24.png",
  "https://skiper-ui.com/images/lummi/img10.png",
  "https://skiper-ui.com/images/lummi/img11.png",
  "https://skiper-ui.com/images/lummi/img12.png",
  "https://skiper-ui.com/images/lummi/img13.png"
];
var Skiper30 = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"]
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsxs("main", { className: "w-full bg-[#eee] text-black", children: [
    /* @__PURE__ */ jsx("div", { className: "font-geist flex h-screen items-center justify-center gap-2", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black", children: /* @__PURE__ */ jsx("span", { className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']", children: "scroll down to see" }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: gallery,
        className: "relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]",
        children: [
          /* @__PURE__ */ jsx(Column, { images: [images[0], images[1], images[2]], y }),
          /* @__PURE__ */ jsx(Column, { images: [images[3], images[4], images[5]], y: y2 }),
          /* @__PURE__ */ jsx(Column, { images: [images[6], images[7], images[8]], y: y3 }),
          /* @__PURE__ */ jsx(Column, { images: [images[6], images[7], images[8]], y: y4 })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "font-geist relative flex h-screen items-center justify-center gap-2", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black", children: /* @__PURE__ */ jsx("span", { className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']", children: "scroll Up to see" }) }) })
  ] });
};
var Column = ({ images: images2, y }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]",
      style: { y },
      children: images2.map((src, i) => /* @__PURE__ */ jsx("div", { className: "relative h-full w-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `${src}`,
          alt: "image",
          className: "pointer-events-none object-cover"
        }
      ) }, i))
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper30, {}) }) });
}
export {
  Skiper30,
  Component as default
};
