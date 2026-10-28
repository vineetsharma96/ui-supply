// Adapted from https://ui.aceternity.com/components/parallax-hero-images
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/parallax-hero-images.tsx
import { useEffect, useMemo, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/parallax-hero-images.tsx
import { jsx } from "react/jsx-runtime";
var positionStyles = {
  "top-left": { top: "8%", left: "4%" },
  "top-right": { top: "8%", right: "4%" },
  "mid-left": { top: "38%", left: "6%" },
  "mid-right": { top: "38%", right: "6%" },
  "bottom-left": { top: "68%", left: "4%" },
  "bottom-right": { top: "68%", right: "4%" },
  "far-left": { top: "52%", left: "2%" },
  "far-right": { top: "52%", right: "2%" }
};
var positionOrder = [
  "top-left",
  "top-right",
  "mid-left",
  "mid-right",
  "bottom-left",
  "bottom-right",
  "far-left",
  "far-right"
];
var depthValuesByVariant = {
  default: [0.3, 0.35, 0.9, 0.85, 0.4, 0.45, 0.25, 0.2],
  "edge-focus": [0.85, 0.9, 0.3, 0.35, 0.8, 0.85, 0.4, 0.45]
};
var SPRING_CONFIG = { damping: 25, stiffness: 120 };
var ParallaxHeroImages = ({
  images: images2,
  className,
  imageClassName,
  variant = "default"
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);
  const positions = useMemo(() => {
    const limitedImages = images2.slice(0, 8);
    const depthValues = depthValuesByVariant[variant];
    return limitedImages.map((src, index) => ({
      src,
      position: positionOrder[index],
      depth: depthValues[index],
      delay: index * 0.12
    }));
  }, [images2, variant]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth * 2 - 1;
      const y = e.clientY / window.innerHeight * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      ),
      children: positions.map((pos, index) => /* @__PURE__ */ jsx(
        ParallaxImage,
        {
          src: pos.src,
          position: pos.position,
          depth: pos.depth,
          delay: pos.delay,
          imageClassName,
          smoothMouseX,
          smoothMouseY
        },
        `${pos.src}-${index}`
      ))
    }
  );
};
var ParallaxImage = memo(function ParallaxImage2({
  src,
  position,
  depth,
  delay,
  imageClassName,
  smoothMouseX,
  smoothMouseY
}) {
  const maxOffset = 40;
  const translateX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth]
  );
  const translateY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth]
  );
  const posStyle = positionStyles[position];
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute",
      style: {
        top: posStyle.top,
        left: posStyle.left,
        right: posStyle.right,
        x: translateX,
        y: translateY,
        zIndex: Math.round(depth * 10)
      },
      initial: { opacity: 0, filter: "blur(20px)", scale: 0.9 },
      animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          loading: "lazy",
          decoding: "async",
          className: cn(
            "aspect-4/3 h-20 w-32 rounded-lg object-cover shadow-sm ring-1 ring-black/10 sm:h-40 sm:w-56 md:h-52 md:w-80 dark:ring-white/10",
            imageClassName
          )
        }
      )
    }
  );
});

// entry.jsx
import React2 from "react";

// registry:components/parallax-hero-images-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ParallaxHeroImagesDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950", children: [
    /* @__PURE__ */ jsx2(ParallaxHeroImages, { images }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center", children: [
      /* @__PURE__ */ jsx2("h1", { className: "text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]", children: "State of the art, cutting edge images, everywhere." }),
      /* @__PURE__ */ jsx2("p", { className: "max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]", children: "Move your mouse to see the parallax effect. Images at different depths move at different speeds." })
    ] })
  ] });
}
var images = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp"
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ParallaxHeroImagesDemo, {}) }) });
}
export {
  ParallaxHeroImages,
  Component as default
};
