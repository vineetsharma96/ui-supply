// Adapted from https://ui.aceternity.com/components/images-slider
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/images-slider.tsx
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5e3);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);
  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1]
      }
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1
      }
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      ),
      style: {
        perspective: "1000px"
      },
      children: [
        children,
        overlay && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("absolute inset-0 bg-black/60 z-40", overlayClassName)
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
          motion.img,
          {
            src: images[currentIndex],
            alt: "Slideshow landscape",
            initial: "initial",
            animate: "visible",
            exit: direction === "up" ? "upExit" : "downExit",
            variants: slideVariants,
            className: "image h-full w-full absolute inset-0 object-cover object-center"
          },
          currentIndex
        ) })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/images-slider-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  return /* @__PURE__ */ jsx2(ImagesSlider, { className: "h-[40rem]", images, children: /* @__PURE__ */ jsxs2(
    motion2.div,
    {
      initial: {
        opacity: 0,
        y: -80
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.6
      },
      className: "z-50 flex flex-col justify-center items-center",
      children: [
        /* @__PURE__ */ jsxs2(motion2.p, { className: "font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4", children: [
          "The hero section slideshow ",
          /* @__PURE__ */ jsx2("br", {}),
          " nobody asked for"
        ] }),
        /* @__PURE__ */ jsxs2("button", { className: "px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4", children: [
          /* @__PURE__ */ jsx2("span", { children: "Join now \u2192" }),
          /* @__PURE__ */ jsx2("div", { className: "absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" })
        ] })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImagesSliderDemo, {}) }) });
}
export {
  ImagesSlider,
  Component as default
};
