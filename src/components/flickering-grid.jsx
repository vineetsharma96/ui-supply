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
// Adapted from https://magicui.design/docs/components/flickering-grid
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/flickering-grid.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/flickering-grid.tsx
import { jsx } from "react/jsx-runtime";
var FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const memoizedColor = useMemo(() => {
    const toRGBA = (color2) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color2;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);
  const setupCanvas = useCallback(
    (canvas, width2, height2) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width2 * dpr;
      canvas.height = height2 * dpr;
      canvas.style.width = `${width2}px`;
      canvas.style.height = `${height2}px`;
      const cols = Math.ceil(width2 / (squareSize + gridGap));
      const rows = Math.ceil(height2 / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );
  const updateSquares = useCallback(
    (squares, deltaTime) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );
  const drawGrid = useCallback(
    (ctx, width2, height2, cols, rows, squares, dpr) => {
      ctx.clearRect(0, 0, width2, height2);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width2, height2);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let animationFrameId = null;
    let resizeObserver = null;
    let intersectionObserver = null;
    let gridParams = null;
    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth;
        const newHeight = height || container.clientHeight;
        setCanvasSize({ width: newWidth, height: newHeight });
        gridParams = setupCanvas(canvas, newWidth, newHeight);
      };
      updateCanvasSize();
      let lastTime = 0;
      const animate = (time) => {
        if (!isInView || !gridParams) return;
        const deltaTime = (time - lastTime) / 1e3;
        lastTime = time;
        updateSquares(gridParams.squares, deltaTime);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        );
        animationFrameId = requestAnimationFrame(animate);
      };
      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      resizeObserver.observe(container);
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);
      if (isInView) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn(`h-full w-full ${className}`),
      ...props,
      children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          className: "pointer-events-none",
          style: {
            width: canvasSize.width,
            height: canvasSize.height
          }
        }
      )
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:flickering-grid.tsx
import { useCallback as useCallback2, useEffect as useEffect2, useMemo as useMemo2, useRef as useRef2, useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var FlickeringGrid2 = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef2(null);
  const containerRef = useRef2(null);
  const [isInView, setIsInView] = useState2(false);
  const [canvasSize, setCanvasSize] = useState2({ width: 0, height: 0 });
  const memoizedColor = useMemo2(() => {
    const toRGBA = (color2) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color2;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);
  const setupCanvas = useCallback2(
    (canvas, width2, height2) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width2 * dpr;
      canvas.height = height2 * dpr;
      canvas.style.width = `${width2}px`;
      canvas.style.height = `${height2}px`;
      const cols = Math.ceil(width2 / (squareSize + gridGap));
      const rows = Math.ceil(height2 / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );
  const updateSquares = useCallback2(
    (squares, deltaTime) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );
  const drawGrid = useCallback2(
    (ctx, width2, height2, cols, rows, squares, dpr) => {
      ctx.clearRect(0, 0, width2, height2);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width2, height2);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );
  useEffect2(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let animationFrameId = null;
    let resizeObserver = null;
    let intersectionObserver = null;
    let gridParams = null;
    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth;
        const newHeight = height || container.clientHeight;
        setCanvasSize({ width: newWidth, height: newHeight });
        gridParams = setupCanvas(canvas, newWidth, newHeight);
      };
      updateCanvasSize();
      let lastTime = 0;
      const animate = (time) => {
        if (!isInView || !gridParams) return;
        const deltaTime = (time - lastTime) / 1e3;
        lastTime = time;
        updateSquares(gridParams.squares, deltaTime);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        );
        animationFrameId = requestAnimationFrame(animate);
      };
      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      resizeObserver.observe(container);
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);
      if (isInView) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref: containerRef,
      className: cn(`h-full w-full ${className}`),
      ...props,
      children: /* @__PURE__ */ jsx2(
        "canvas",
        {
          ref: canvasRef,
          className: "pointer-events-none",
          style: {
            width: canvasSize.width,
            height: canvasSize.height
          }
        }
      )
    }
  );
};

// registry:components/ui/flickering-grid-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function FlickeringGridDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "bg-background relative h-[500px] w-full overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsx3(
    FlickeringGrid2,
    {
      className: "absolute inset-0 z-0 size-full",
      squareSize: 4,
      gridGap: 6,
      color: "#6B7280",
      maxOpacity: 0.5,
      flickerChance: 0.1,
      height: 800,
      width: 800
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(FlickeringGridDemo, {}) }) });
}
export {
  FlickeringGrid,
  Component as default
};
