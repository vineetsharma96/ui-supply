// Adapted from https://skiper-ui.com/v1/skiper53
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper53.tsx
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper53.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper53 = () => {
  const images = [
    {
      src: "https://skiper-ui.com/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23"
    },
    {
      src: "https://skiper-ui.com/images/x.com/9.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      code: "# 23"
    },
    {
      src: "https://skiper-ui.com/images/x.com/20.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      code: "# 23"
    },
    {
      src: "https://skiper-ui.com/images/x.com/21.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      code: "# 23"
    },
    {
      src: "https://skiper-ui.com/images/x.com/25.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      code: "# 23"
    },
    {
      src: "https://skiper-ui.com/images/x.com/32.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      code: "# 23"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]", children: /* @__PURE__ */ jsx(HoverExpand_002, { className: "", images }) });
};
var HoverExpand_002 = ({
  images,
  className
}) => {
  const [activeImage, setActiveImage] = useState(1);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, translateY: 20 },
      animate: { opacity: 1, translateY: 0 },
      transition: {
        duration: 0.3,
        delay: 0.5
      },
      className: cn("relative w-full max-w-6xl px-5", className),
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
          className: "w-full",
          children: /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col items-center justify-center gap-1", children: images.map((image, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "group relative cursor-pointer overflow-hidden rounded-3xl",
              initial: { height: "2.5rem", width: "24rem" },
              animate: {
                height: activeImage === index ? "24rem" : "2.5rem"
              },
              transition: { duration: 0.3, ease: "easeInOut" },
              onClick: () => setActiveImage(index),
              onHoverStart: () => setActiveImage(index),
              children: [
                /* @__PURE__ */ jsx(AnimatePresence, { children: activeImage === index && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    className: "absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                  }
                ) }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: activeImage === index && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 },
                    className: "absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5",
                    children: /* @__PURE__ */ jsx("p", { className: "text-left text-xs text-white/50", children: image.code })
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: image.src,
                    className: "size-full object-cover",
                    alt: image.alt
                  }
                )
              ]
            },
            index
          )) })
        }
      )
    }
  );
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper53, {}) }) });
}
export {
  HoverExpand_002,
  Skiper53,
  Component as default
};
