// Adapted from https://ui.aceternity.com/components/carousel
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/carousel.tsx
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();
  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };
  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };
  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };
  const { src, button, title } = slide;
  return /* @__PURE__ */ jsx("div", { className: "[perspective:1200px] [transform-style:preserve-3d]", children: /* @__PURE__ */ jsxs(
    "li",
    {
      ref: slideRef,
      className: "flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 ",
      onClick: () => handleSlideClick(index),
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "bottom"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out",
            style: {
              transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none"
            },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out",
                  style: {
                    opacity: current === index ? 1 : 0.5
                  },
                  alt: title,
                  src,
                  onLoad: imageLoaded,
                  loading: "eager",
                  decoding: "sync"
                }
              ),
              current === index && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 transition-all duration-1000" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "article",
          {
            className: `relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"}`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-2xl lg:text-4xl font-semibold  relative", children: title }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { className: "mt-6  px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]", children: button }) })
            ]
          }
        )
      ]
    }
  ) });
};
var CarouselControl = ({
  type,
  title,
  handleClick
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""}`,
      title,
      onClick: handleClick,
      children: /* @__PURE__ */ jsx(IconArrowNarrowRight, { className: "text-neutral-600 dark:text-neutral-200" })
    }
  );
};
function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };
  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };
  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative w-[70vmin] h-[70vmin] mx-auto",
      "aria-labelledby": `carousel-heading-${id}`,
      children: [
        /* @__PURE__ */ jsx(
          "ul",
          {
            className: "absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out",
            style: {
              transform: `translateX(-${current * (100 / slides.length)}%)`
            },
            children: slides.map((slide, index) => /* @__PURE__ */ jsx(
              Slide,
              {
                slide,
                index,
                current,
                handleSlideClick
              },
              index
            ))
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute flex justify-center w-full top-[calc(100%+1rem)]", children: [
          /* @__PURE__ */ jsx(
            CarouselControl,
            {
              type: "previous",
              title: "Go to previous slide",
              handleClick: handlePreviousClick
            }
          ),
          /* @__PURE__ */ jsx(
            CarouselControl,
            {
              type: "next",
              title: "Go to next slide",
              handleClick: handleNextClick
            }
          )
        ] })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/carousel-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function CarouselDemo() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "relative overflow-hidden w-full h-full py-20", children: /* @__PURE__ */ jsx2(Carousel, { slides: slideData }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CarouselDemo, {}) }) });
}
export {
  Component as default
};
