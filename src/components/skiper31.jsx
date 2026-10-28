// Adapted from https://skiper-ui.com/v1/skiper31
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper31.tsx
import { motion, useScroll, useTransform } from "motion/react";
import ReactLenis from "lenis/react";
import { useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper31.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      className: cn("inline-block text-orange-500", isSpace && "w-4"),
      style: {
        x,
        rotateX
      },
      children: char
    }
  );
};
var CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0]
  );
  return /* @__PURE__ */ jsx(
    motion.img,
    {
      src: char,
      className: cn("inline-block", isSpace && "w-4"),
      style: {
        x,
        scale,
        y,
        transformOrigin: "center"
      }
    }
  );
};
var CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 90, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  return /* @__PURE__ */ jsx(
    motion.img,
    {
      src: char,
      className: cn("inline-block", isSpace && "w-4"),
      style: {
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center"
      }
    }
  );
};
var Skiper31 = () => {
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  const targetRef3 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3
  });
  const text = "see more from gxuri";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);
  const macIcon = [
    "https://skiper-ui.com/mac/Discord.png",
    "https://skiper-ui.com/mac/figma.png",
    "https://skiper-ui.com/mac/Framer.png",
    "https://skiper-ui.com/mac/Github.png",
    "https://skiper-ui.com/mac/Monog.png",
    "https://skiper-ui.com/mac/notion.png",
    "https://skiper-ui.com/mac/Pieces.png",
    "https://skiper-ui.com/mac/Postman.png",
    "https://skiper-ui.com/mac/vsCode.png"
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsxs("main", { className: "w-full bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "top-22 absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black", children: /* @__PURE__ */ jsx("span", { className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']", children: "Scroll to see more" }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: targetRef,
        className: "relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]",
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black",
            style: {
              perspective: "500px"
            },
            children: characters.map((char, index) => /* @__PURE__ */ jsx(
              CharacterV1,
              {
                char,
                index,
                centerIndex,
                scrollYProgress
              },
              index
            ))
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: targetRef2,
        className: "relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]",
        children: [
          /* @__PURE__ */ jsxs("p", { className: "font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black", children: [
            /* @__PURE__ */ jsx(Bracket, { className: "h-12 text-black" }),
            /* @__PURE__ */ jsx("span", { className: "font-geist font-medium", children: "intergrate with your fav tech stack" }),
            /* @__PURE__ */ jsx(Bracket, { className: "h-12 scale-x-[-1] text-black" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black", children: macIcon.map((char, index) => /* @__PURE__ */ jsx(
            CharacterV2,
            {
              char,
              index,
              centerIndex: iconCenterIndex,
              scrollYProgress: scrollYProgress2
            },
            index
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: targetRef3,
        className: "relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]",
        children: [
          " ",
          /* @__PURE__ */ jsxs("p", { className: "font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black", children: [
            /* @__PURE__ */ jsx(Bracket, { className: "h-12 text-black" }),
            /* @__PURE__ */ jsx("span", { className: "font-geist font-medium", children: "intergrate with your fav tech stack" }),
            /* @__PURE__ */ jsx(Bracket, { className: "h-12 scale-x-[-1] text-black" })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black",
              style: {
                perspective: "500px"
              },
              children: macIcon.map((char, index) => /* @__PURE__ */ jsx(
                CharacterV3,
                {
                  char,
                  index,
                  centerIndex: iconCenterIndex,
                  scrollYProgress: scrollYProgress3
                },
                index
              ))
            }
          )
        ]
      }
    )
  ] }) });
};
var Bracket = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 27 78",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "#000",
          d: "M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
        }
      )
    }
  );
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper31, {}) }) });
}
export {
  CharacterV1,
  CharacterV2,
  CharacterV3,
  Skiper31,
  Component as default
};
