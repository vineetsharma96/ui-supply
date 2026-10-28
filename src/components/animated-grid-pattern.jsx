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
// Adapted from https://magicui.design/docs/components/animated-grid-pattern
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/animated-grid-pattern.tsx
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-grid-pattern.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);
  const getPos = useCallback(() => {
    return [
      Math.floor(Math.random() * dimensions.width / width),
      Math.floor(Math.random() * dimensions.height / height)
    ];
  }, [dimensions.height, dimensions.width, height, width]);
  const generateSquares = useCallback(
    (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
        iteration: 0
      }));
    },
    [getPos]
  );
  const updateSquarePosition = useCallback(
    (squareId) => {
      setSquares((currentSquares) => {
        const current = currentSquares[squareId];
        if (!current || current.id !== squareId) return currentSquares;
        const nextSquares = currentSquares.slice();
        nextSquares[squareId] = {
          ...current,
          pos: getPos(),
          iteration: current.iteration + 1
        };
        return nextSquares;
      });
    },
    [getPos]
  );
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions.width, dimensions.height, generateSquares, numSquares]);
  useEffect(() => {
    const element = containerRef.current;
    let resizeObserver = null;
    if (element) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions((currentDimensions) => {
            const nextWidth = entry.contentRect.width;
            const nextHeight = entry.contentRect.height;
            if (currentDimensions.width === nextWidth && currentDimensions.height === nextHeight) {
              return currentDimensions;
            }
            return { width: nextWidth, height: nextHeight };
          });
        }
      });
      resizeObserver.observe(element);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref: containerRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
          "pattern",
          {
            id,
            width,
            height,
            patternUnits: "userSpaceOnUse",
            x,
            y,
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: `M.5 ${height}V.5H${width}`,
                fill: "none",
                strokeDasharray
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: `url(#${id})` }),
        /* @__PURE__ */ jsx("svg", { x, y, className: "overflow-visible", children: squares.map(({ pos: [squareX, squareY], id: id2, iteration }, index) => /* @__PURE__ */ jsx(
          motion.rect,
          {
            initial: { opacity: 0 },
            animate: { opacity: maxOpacity },
            transition: {
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
              repeatDelay
            },
            onAnimationComplete: () => updateSquarePosition(id2),
            width: width - 1,
            height: height - 1,
            x: squareX * width + 1,
            y: squareY * height + 1,
            fill: "currentColor",
            strokeWidth: "0"
          },
          `${id2}-${iteration}`
        )) })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:animated-grid-pattern.tsx
import {
  useCallback as useCallback2,
  useEffect as useEffect2,
  useId as useId2,
  useRef as useRef2,
  useState as useState2
} from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AnimatedGridPattern2({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}) {
  const id = useId2();
  const containerRef = useRef2(null);
  const [dimensions, setDimensions] = useState2({ width: 0, height: 0 });
  const [squares, setSquares] = useState2([]);
  const getPos = useCallback2(() => {
    return [
      Math.floor(Math.random() * dimensions.width / width),
      Math.floor(Math.random() * dimensions.height / height)
    ];
  }, [dimensions.height, dimensions.width, height, width]);
  const generateSquares = useCallback2(
    (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
        iteration: 0
      }));
    },
    [getPos]
  );
  const updateSquarePosition = useCallback2(
    (squareId) => {
      setSquares((currentSquares) => {
        const current = currentSquares[squareId];
        if (!current || current.id !== squareId) return currentSquares;
        const nextSquares = currentSquares.slice();
        nextSquares[squareId] = {
          ...current,
          pos: getPos(),
          iteration: current.iteration + 1
        };
        return nextSquares;
      });
    },
    [getPos]
  );
  useEffect2(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions.width, dimensions.height, generateSquares, numSquares]);
  useEffect2(() => {
    const element = containerRef.current;
    let resizeObserver = null;
    if (element) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions((currentDimensions) => {
            const nextWidth = entry.contentRect.width;
            const nextHeight = entry.contentRect.height;
            if (currentDimensions.width === nextWidth && currentDimensions.height === nextHeight) {
              return currentDimensions;
            }
            return { width: nextWidth, height: nextHeight };
          });
        }
      });
      resizeObserver.observe(element);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      ref: containerRef,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2(
          "pattern",
          {
            id,
            width,
            height,
            patternUnits: "userSpaceOnUse",
            x,
            y,
            children: /* @__PURE__ */ jsx2(
              "path",
              {
                d: `M.5 ${height}V.5H${width}`,
                fill: "none",
                strokeDasharray
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx2("rect", { width: "100%", height: "100%", fill: `url(#${id})` }),
        /* @__PURE__ */ jsx2("svg", { x, y, className: "overflow-visible", children: squares.map(({ pos: [squareX, squareY], id: id2, iteration }, index) => /* @__PURE__ */ jsx2(
          motion2.rect,
          {
            initial: { opacity: 0 },
            animate: { opacity: maxOpacity },
            transition: {
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
              repeatDelay
            },
            onAnimationComplete: () => updateSquarePosition(id2),
            width: width - 1,
            height: height - 1,
            x: squareX * width + 1,
            y: squareY * height + 1,
            fill: "currentColor",
            strokeWidth: "0"
          },
          `${id2}-${iteration}`
        )) })
      ]
    }
  );
}

// registry:components/ui/animated-grid-pattern-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function AnimatedGridPatternDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-20", children: /* @__PURE__ */ jsx3(
    AnimatedGridPattern2,
    {
      numSquares: 30,
      maxOpacity: 0.1,
      duration: 3,
      repeatDelay: 1,
      className: cn(
        "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
      )
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AnimatedGridPatternDemo, {}) }) });
}
export {
  AnimatedGridPattern,
  Component as default
};
