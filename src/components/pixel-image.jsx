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
// Adapted from https://magicui.design/docs/components/pixel-image
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/pixel-image.tsx
import { useEffect, useMemo, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/pixel-image.tsx
import { jsx } from "react/jsx-runtime";
var DEFAULT_GRIDS = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 }
};
var PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1e3,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const MIN_GRID = 1;
  const MAX_GRID = 16;
  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid2) => {
      if (!grid2) return false;
      const { rows: rows2, cols: cols2 } = grid2;
      return Number.isInteger(rows2) && Number.isInteger(cols2) && rows2 >= MIN_GRID && cols2 >= MIN_GRID && rows2 <= MAX_GRID && cols2 <= MAX_GRID;
    };
    return isValidGrid(customGrid) ? customGrid : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);
  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);
  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;
      const delay = Math.random() * maxAnimationDelay;
      return {
        clipPath,
        delay
      };
    });
  }, [rows, cols, maxAnimationDelay]);
  return /* @__PURE__ */ jsx("div", { className: "relative h-72 w-72 select-none md:h-96 md:w-96", children: pieces.map((piece, index) => /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute inset-0 transition-all ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      ),
      style: {
        clipPath: piece.clipPath,
        transitionDelay: `${piece.delay}ms`,
        transitionDuration: `${pixelFadeInDuration}ms`
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: `Pixel image piece ${index + 1}`,
          className: cn(
            "z-1 rounded-[2.5rem] object-cover",
            grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
          ),
          style: {
            transition: grayscaleAnimation ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none"
          },
          draggable: false
        }
      )
    },
    index
  )) });
};

// entry.jsx
import React from "react";

// registry:pixel-image.tsx
import { useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var DEFAULT_GRIDS2 = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 }
};
var PixelImage2 = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1e3,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid
}) => {
  const [isVisible, setIsVisible] = useState2(false);
  const [showColor, setShowColor] = useState2(false);
  const MIN_GRID = 1;
  const MAX_GRID = 16;
  const { rows, cols } = useMemo2(() => {
    const isValidGrid = (grid2) => {
      if (!grid2) return false;
      const { rows: rows2, cols: cols2 } = grid2;
      return Number.isInteger(rows2) && Number.isInteger(cols2) && rows2 >= MIN_GRID && cols2 >= MIN_GRID && rows2 <= MAX_GRID && cols2 <= MAX_GRID;
    };
    return isValidGrid(customGrid) ? customGrid : DEFAULT_GRIDS2[grid];
  }, [customGrid, grid]);
  useEffect2(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);
  const pieces = useMemo2(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;
      const delay = Math.random() * maxAnimationDelay;
      return {
        clipPath,
        delay
      };
    });
  }, [rows, cols, maxAnimationDelay]);
  return /* @__PURE__ */ jsx2("div", { className: "relative h-72 w-72 select-none md:h-96 md:w-96", children: pieces.map((piece, index) => /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        "absolute inset-0 transition-all ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      ),
      style: {
        clipPath: piece.clipPath,
        transitionDelay: `${piece.delay}ms`,
        transitionDuration: `${pixelFadeInDuration}ms`
      },
      children: /* @__PURE__ */ jsx2(
        "img",
        {
          src,
          alt: `Pixel image piece ${index + 1}`,
          className: cn(
            "z-1 rounded-[2.5rem] object-cover",
            grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
          ),
          style: {
            transition: grayscaleAnimation ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none"
          },
          draggable: false
        }
      )
    },
    index
  )) });
};

// registry:components/ui/pixel-image-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Home() {
  return /* @__PURE__ */ jsx3(
    PixelImage2,
    {
      src: "https://magicui.design/pixel-image-demo.jpg",
      customGrid: { rows: 4, cols: 6 },
      grayscaleAnimation: true
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Home, {}) }) });
}
export {
  PixelImage,
  Component as default
};
