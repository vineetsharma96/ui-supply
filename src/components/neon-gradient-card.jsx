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
// Adapted from https://magicui.design/docs/components/neon-gradient-card
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/neon-gradient-card.tsx
import {
  useEffect,
  useRef,
  useState
} from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/neon-gradient-card.tsx
import { jsx } from "react/jsx-runtime";
var NeonGradientCard = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1"
  },
  ...props
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      style: {
        "--border-size": `${borderSize}px`,
        "--border-radius": `${borderRadius}px`,
        "--neon-first-color": neonColors.firstColor,
        "--neon-second-color": neonColors.secondColor,
        "--card-width": `${dimensions.width}px`,
        "--card-height": `${dimensions.height}px`,
        "--card-content-radius": `${borderRadius - borderSize}px`,
        "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
        "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
        "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
        "--after-blur": `${dimensions.width / 3}px`
      },
      className: cn(
        "relative z-10 size-full rounded-(--border-radius)",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6",
            "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
            "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:content-['']",
            "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]",
            "before:animate-background-position-spin",
            "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
            "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur) after:content-['']",
            "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80",
            "after:animate-background-position-spin",
            "dark:bg-neutral-900",
            "wrap-break-word"
          ),
          children
        }
      )
    }
  );
};

// entry.jsx
import React from "react";

// registry:neon-gradient-card.tsx
import {
  useEffect as useEffect2,
  useRef as useRef2,
  useState as useState2
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var NeonGradientCard2 = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1"
  },
  ...props
}) => {
  const containerRef = useRef2(null);
  const [dimensions, setDimensions] = useState2({ width: 0, height: 0 });
  useEffect2(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  useEffect2(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref: containerRef,
      style: {
        "--border-size": `${borderSize}px`,
        "--border-radius": `${borderRadius}px`,
        "--neon-first-color": neonColors.firstColor,
        "--neon-second-color": neonColors.secondColor,
        "--card-width": `${dimensions.width}px`,
        "--card-height": `${dimensions.height}px`,
        "--card-content-radius": `${borderRadius - borderSize}px`,
        "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
        "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
        "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
        "--after-blur": `${dimensions.width / 3}px`
      },
      className: cn(
        "relative z-10 size-full rounded-(--border-radius)",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx2(
        "div",
        {
          className: cn(
            "relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6",
            "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
            "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:content-['']",
            "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]",
            "before:animate-background-position-spin",
            "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
            "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur) after:content-['']",
            "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80",
            "after:animate-background-position-spin",
            "dark:bg-neutral-900",
            "wrap-break-word"
          ),
          children
        }
      )
    }
  );
};

// registry:components/ui/neon-gradient-card-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function NeonGradientCardDemo() {
  return /* @__PURE__ */ jsx3(NeonGradientCard2, { className: "max-w-sm items-center justify-center text-center", children: /* @__PURE__ */ jsx3("span", { className: "pointer-events-none z-10 h-full bg-linear-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]", children: "Neon Gradient Card" }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(NeonGradientCardDemo, {}) }) });
}
export {
  NeonGradientCard,
  Component as default
};
