// Adapted from https://ui.aceternity.com/components/3d-marquee
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/3d-marquee.tsx
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/3d-marquee.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ThreeDMarquee = ({
  images,
  className
}) => {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100", children: /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)"
          },
          className: "relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d",
          children: chunks.map((subarray, colIndex) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              animate: { y: colIndex % 2 === 0 ? 100 : -100 },
              transition: {
                duration: colIndex % 2 === 0 ? 10 : 15,
                repeat: Infinity,
                repeatType: "reverse"
              },
              className: "flex flex-col items-start gap-8",
              children: [
                /* @__PURE__ */ jsx(GridLineVertical, { className: "-left-4", offset: "80px" }),
                subarray.map((image, imageIndex) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(GridLineHorizontal, { className: "-top-4", offset: "20px" }),
                  /* @__PURE__ */ jsx(
                    motion.img,
                    {
                      whileHover: {
                        y: -10
                      },
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                      },
                      src: image,
                      alt: `Image ${imageIndex + 1}`,
                      className: "aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl",
                      width: 970,
                      height: 700
                    },
                    imageIndex + image
                  )
                ] }, imageIndex + image))
              ]
            },
            colIndex + "marquee"
          ))
        }
      ) }) })
    }
  );
};
var GridLineHorizontal = ({
  className,
  offset
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude"
      },
      className: cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )
    }
  );
};
var GridLineVertical = ({
  className,
  offset
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        //-100px if you want to keep the line inside
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude"
      },
      className: cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/3d-marquee-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ThreeDMarqueeDemo() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp"
  ];
  return /* @__PURE__ */ jsx2("div", { className: "mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800", children: /* @__PURE__ */ jsx2(ThreeDMarquee, { images }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ThreeDMarqueeDemo, {}) }) });
}
export {
  ThreeDMarquee,
  Component as default
};
