// Adapted from https://ui.aceternity.com/components/noise-background
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/noise-background.tsx
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute inset-0",
      style: {
        opacity,
        background
      }
    }
  );
}
var NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)"
  ],
  noiseIntensity = 0.2,
  speed = 0.1,
  backdropBlur = false,
  animating = true
}) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastDirectionChangeRef = useRef(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(centerX);
    y.set(centerY);
  }, [x, y]);
  const generateRandomVelocityRef = useRef(() => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = speed * (0.5 + Math.random() * 0.5);
    return {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude
    };
  });
  useEffect(() => {
    generateRandomVelocityRef.current = () => {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude
      };
    };
    velocityRef.current = generateRandomVelocityRef.current();
  }, [speed]);
  useAnimationFrame((time) => {
    if (!animating || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width;
    const maxY = rect.height;
    if (time - lastDirectionChangeRef.current > 1500 + Math.random() * 1500) {
      velocityRef.current = generateRandomVelocityRef.current();
      lastDirectionChangeRef.current = time;
    }
    const deltaTime = 16;
    const currentX = x.get();
    const currentY = y.get();
    let newX = currentX + velocityRef.current.x * deltaTime;
    let newY = currentY + velocityRef.current.y * deltaTime;
    const padding = 20;
    if (newX < padding || newX > maxX - padding || newY < padding || newY > maxY - padding) {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      velocityRef.current = {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude
      };
      lastDirectionChangeRef.current = time;
      newX = Math.max(padding, Math.min(maxX - padding, newX));
      newY = Math.max(padding, Math.min(maxY - padding, newY));
    }
    x.set(newX);
    y.set(newY);
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "group relative overflow-hidden rounded-2xl bg-neutral-200 p-2 backdrop-blur-sm dark:bg-neutral-800",
        "shadow-[0px_0.5px_1px_0px_var(--color-neutral-400)_inset,0px_1px_0px_0px_var(--color-neutral-100)]",
        "dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]",
        backdropBlur && "after:absolute after:inset-0 after:h-full after:w-full after:backdrop-blur-lg after:content-['']",
        containerClassName
      ),
      style: {
        "--noise-opacity": noiseIntensity
      },
      children: [
        /* @__PURE__ */ jsx(
          GradientLayer,
          {
            springX,
            springY,
            gradientColor: gradientColors[0],
            opacity: 0.4,
            multiplier: 1
          }
        ),
        /* @__PURE__ */ jsx(
          GradientLayer,
          {
            springX,
            springY,
            gradientColor: gradientColors[1],
            opacity: 0.3,
            multiplier: 0.7
          }
        ),
        /* @__PURE__ */ jsx(
          GradientLayer,
          {
            springX,
            springY,
            gradientColor: gradientColors[2] || gradientColors[0],
            opacity: 0.25,
            multiplier: 1.2
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-80 blur-sm",
            style: {
              background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
              x: animating ? topGradientX : 0
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://assets.aceternity.com/noise.webp",
            alt: "",
            className: "h-full w-full object-cover opacity-[var(--noise-opacity)]",
            style: { mixBlendMode: "overlay" }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-10", className), children })
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/noise-background-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function NoiseBackgroundDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx2(
    NoiseBackground,
    {
      containerClassName: "w-fit p-2 rounded-full mx-auto",
      gradientColors: [
        "rgb(255, 100, 150)",
        "rgb(100, 150, 255)",
        "rgb(255, 200, 100)"
      ],
      children: /* @__PURE__ */ jsx2("button", { className: "h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]", children: "Start publishing \u2192" })
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(NoiseBackgroundDemo, {}) }) });
}
export {
  NoiseBackground,
  Component as default
};
