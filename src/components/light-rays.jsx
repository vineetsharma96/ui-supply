/*
MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://magicui.design/docs/components/light-rays
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/light-rays.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/light-rays.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var createRays = (count, cycle) => {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;
    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity
    };
  });
};
var Ray = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]",
      style: {
        "--ray-left": `${left}%`,
        "--ray-width": `${width}px`
      },
      initial: { rotate },
      animate: {
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing]
      },
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatDelay: duration * 0.1
      }
    }
  );
};
function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}) {
  const [rays, setRays] = useState([]);
  const cycleDuration = Math.max(speed, 0.1);
  useEffect(() => {
    setRays(createRays(count, cycleDuration));
  }, [count, cycleDuration]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className
      ),
      style: {
        "--light-rays-color": color,
        "--light-rays-blur": `${blur}px`,
        "--light-rays-length": length,
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 opacity-60",
            style: {
              background: "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 opacity-60",
            style: {
              background: "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)"
            }
          }
        ),
        rays.map((ray) => /* @__PURE__ */ jsx(Ray, { ...ray }, ray.id))
      ] })
    }
  );
}

// entry.jsx
import React from "react";

// registry:light-rays.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var createRays2 = (count, cycle) => {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;
    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity
    };
  });
};
var Ray2 = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity
}) => {
  return /* @__PURE__ */ jsx2(
    motion2.div,
    {
      className: "pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]",
      style: {
        "--ray-left": `${left}%`,
        "--ray-width": `${width}px`
      },
      initial: { rotate },
      animate: {
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing]
      },
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatDelay: duration * 0.1
      }
    }
  );
};
function LightRays2({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}) {
  const [rays, setRays] = useState2([]);
  const cycleDuration = Math.max(speed, 0.1);
  useEffect2(() => {
    setRays(createRays2(count, cycleDuration));
  }, [count, cycleDuration]);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref,
      className: cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className
      ),
      style: {
        "--light-rays-color": color,
        "--light-rays-blur": `${blur}px`,
        "--light-rays-length": length,
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsxs2("div", { className: "absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsx2(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 opacity-60",
            style: {
              background: "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsx2(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 opacity-60",
            style: {
              background: "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)"
            }
          }
        ),
        rays.map((ray) => /* @__PURE__ */ jsx2(Ray2, { ...ray }, ray.id))
      ] })
    }
  );
}

// registry:components/ui/light-rays-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsxs3("div", { className: "relative h-[500px] w-full overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsxs3("div", { className: "relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center", children: [
      /* @__PURE__ */ jsx3("span", { className: "text-xs font-semibold tracking-[0.35em] text-slate-800/60 uppercase dark:text-slate-200/60", children: "Ambient glow" }),
      /* @__PURE__ */ jsx3("h1", { className: "text-foreground text-4xl font-bold md:text-5xl", children: "Light Rays" }),
      /* @__PURE__ */ jsx3("p", { className: "max-w-md text-sm text-slate-800/80 md:text-base dark:text-slate-200/80", children: "Drop this component into any container and it will fill the space with softly animated light rays shining from above." })
    ] }),
    /* @__PURE__ */ jsx3(LightRays2, {})
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component2() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Component, {}) }) });
}
export {
  LightRays,
  Component2 as default
};
