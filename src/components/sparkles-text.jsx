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
// Adapted from https://magicui.design/docs/components/sparkles-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/sparkles-text.tsx
import {
  useEffect,
  useState
} from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sparkles-text.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Sparkle = ({ id, x, y, color, delay, scale }) => {
  return /* @__PURE__ */ jsx(
    motion.svg,
    {
      className: "pointer-events-none absolute z-20",
      initial: { opacity: 0, left: x, top: y },
      animate: {
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150]
      },
      transition: { duration: 0.8, repeat: Infinity, delay },
      width: "21",
      height: "21",
      viewBox: "0 0 21 21",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z",
          fill: color
        }
      )
    },
    id
  );
};
var SparklesText = ({
  children,
  colors = { first: "#9E7AFF", second: "#FE8BBB" },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState([]);
  useEffect(() => {
    const generateStar = () => {
      const starX = `${Math.random() * 100}%`;
      const starY = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale, lifespan };
    };
    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar);
      setSparkles(newSparkles);
    };
    const updateStars = () => {
      setSparkles(
        (currentSparkles) => currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar();
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 };
          }
        })
      );
    };
    initializeStars();
    const interval = setInterval(updateStars, 100);
    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("text-6xl font-bold", className),
      ...props,
      style: {
        "--sparkles-first-color": `${colors.first}`,
        "--sparkles-second-color": `${colors.second}`
      },
      children: /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
        sparkles.map((sparkle) => /* @__PURE__ */ jsx(Sparkle, { ...sparkle }, sparkle.id)),
        /* @__PURE__ */ jsx("strong", { children })
      ] })
    }
  );
};

// entry.jsx
import React from "react";

// registry:sparkles-text.tsx
import {
  useEffect as useEffect2,
  useState as useState2
} from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Sparkle2 = ({ id, x, y, color, delay, scale }) => {
  return /* @__PURE__ */ jsx2(
    motion2.svg,
    {
      className: "pointer-events-none absolute z-20",
      initial: { opacity: 0, left: x, top: y },
      animate: {
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150]
      },
      transition: { duration: 0.8, repeat: Infinity, delay },
      width: "21",
      height: "21",
      viewBox: "0 0 21 21",
      children: /* @__PURE__ */ jsx2(
        "path",
        {
          d: "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z",
          fill: color
        }
      )
    },
    id
  );
};
var SparklesText2 = ({
  children,
  colors = { first: "#9E7AFF", second: "#FE8BBB" },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState2([]);
  useEffect2(() => {
    const generateStar = () => {
      const starX = `${Math.random() * 100}%`;
      const starY = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale, lifespan };
    };
    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar);
      setSparkles(newSparkles);
    };
    const updateStars = () => {
      setSparkles(
        (currentSparkles) => currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar();
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 };
          }
        })
      );
    };
    initializeStars();
    const interval = setInterval(updateStars, 100);
    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn("text-6xl font-bold", className),
      ...props,
      style: {
        "--sparkles-first-color": `${colors.first}`,
        "--sparkles-second-color": `${colors.second}`
      },
      children: /* @__PURE__ */ jsxs2("span", { className: "relative inline-block", children: [
        sparkles.map((sparkle) => /* @__PURE__ */ jsx2(Sparkle2, { ...sparkle }, sparkle.id)),
        /* @__PURE__ */ jsx2("strong", { children })
      ] })
    }
  );
};

// registry:components/ui/sparkles-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function SparklesTextDemo() {
  return /* @__PURE__ */ jsx3(SparklesText2, { children: "Magic UI" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(SparklesTextDemo, {}) }) });
}
export {
  SparklesText,
  Component as default
};
