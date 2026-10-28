// Adapted from https://skiper-ui.com/v1/skiper48
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper48.tsx
import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper48.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper48 = () => {
  const images = [
    {
      src: "https://skiper-ui.com/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    },
    {
      src: "https://skiper-ui.com/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]", children: /* @__PURE__ */ jsx(Carousel_002, { className: "", images, loop: true }) });
};
var Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40
}) => {
  const css = `
  .Carousal_002 {
    padding-bottom: 50px !important;
  }
  `;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, translateY: 20 },
      animate: { opacity: 1, translateY: 0 },
      transition: {
        duration: 0.3,
        delay: 0.5
      },
      className: cn("relative w-full max-w-3xl", className),
      children: [
        /* @__PURE__ */ jsx("style", { children: css }),
        /* @__PURE__ */ jsxs(
          Swiper,
          {
            spaceBetween,
            autoplay: autoplay ? {
              delay: 1e3,
              disableOnInteraction: false
            } : false,
            effect: "cards",
            grabCursor: true,
            loop,
            pagination: showPagination ? {
              clickable: true
            } : false,
            navigation: showNavigation ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            } : false,
            className: "Carousal_002 h-[380px] w-[260px]",
            modules: [EffectCards, Autoplay, Pagination, Navigation],
            children: [
              images.map((image, index) => /* @__PURE__ */ jsx(SwiperSlide, { className: "rounded-3xl", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "h-full w-full object-cover",
                  src: image.src,
                  alt: image.alt
                }
              ) }, index)),
              showNavigation && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "swiper-button-next after:hidden", children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-6 w-6 text-white" }) }),
                /* @__PURE__ */ jsx("div", { className: "swiper-button-prev after:hidden", children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-6 w-6 text-white" }) })
              ] })
            ]
          }
        )
      ]
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper48, {}) }) });
}
export {
  Carousel_002,
  Skiper48,
  Component as default
};
