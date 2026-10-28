// Adapted from https://ui.aceternity.com/components/image-generation-loader
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/image-generation-loader.tsx
import React from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/image-generation-loader.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--color-blue-300)",
  "var(--color-blue-600)"
];
var TAU = Math.PI * 2;
var GLYPH_WIDTH = 5;
var GLYPH_HEIGHT = 7;
var PIXEL_FONT = {
  A: "01110/10001/10001/11111/10001/10001/10001",
  B: "11110/10001/10001/11110/10001/10001/11110",
  C: "01111/10000/10000/10000/10000/10000/01111",
  D: "11110/10001/10001/10001/10001/10001/11110",
  E: "11111/10000/10000/11110/10000/10000/11111",
  F: "11111/10000/10000/11110/10000/10000/10000",
  G: "01111/10000/10000/10111/10001/10001/01111",
  H: "10001/10001/10001/11111/10001/10001/10001",
  I: "11111/00100/00100/00100/00100/00100/11111",
  J: "00111/00010/00010/00010/10010/10010/01100",
  K: "10001/10010/10100/11000/10100/10010/10001",
  L: "10000/10000/10000/10000/10000/10000/11111",
  M: "10001/11011/10101/10101/10001/10001/10001",
  N: "10001/11001/10101/10011/10001/10001/10001",
  O: "01110/10001/10001/10001/10001/10001/01110",
  P: "11110/10001/10001/11110/10000/10000/10000",
  Q: "01110/10001/10001/10001/10101/10010/01101",
  R: "11110/10001/10001/11110/10100/10010/10001",
  S: "01111/10000/10000/01110/00001/00001/11110",
  T: "11111/00100/00100/00100/00100/00100/00100",
  U: "10001/10001/10001/10001/10001/10001/01110",
  V: "10001/10001/10001/10001/10001/01010/00100",
  W: "10001/10001/10001/10101/10101/10101/01010",
  X: "10001/10001/01010/00100/01010/10001/10001",
  Y: "10001/10001/01010/00100/00100/00100/00100",
  Z: "11111/00001/00010/00100/01000/10000/11111",
  "0": "01110/10001/10011/10101/11001/10001/01110",
  "1": "00100/01100/00100/00100/00100/00100/01110",
  "2": "01110/10001/00001/00010/00100/01000/11111",
  "3": "11110/00001/00001/01110/00001/00001/11110",
  "4": "00010/00110/01010/10010/11111/00010/00010",
  "5": "11111/10000/10000/11110/00001/00001/11110",
  "6": "01110/10000/10000/11110/10001/10001/01110",
  "7": "11111/00001/00010/00100/01000/01000/01000",
  "8": "01110/10001/10001/01110/10001/10001/01110",
  "9": "01110/10001/10001/01111/00001/00001/01110",
  "-": "00000/00000/00000/11111/00000/00000/00000",
  ".": "00000/00000/00000/00000/00000/01100/01100",
  ":": "00000/01100/01100/00000/01100/01100/00000",
  "?": "01110/10001/00001/00010/00100/00000/00100"
};
var randomFrom = (x, y, salt) => {
  const value = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719);
  return value * 43758.5453 - Math.floor(value * 43758.5453);
};
var EASING_CURVES = {
  linear: [0, 0, 1, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1]
};
var cubicCoordinate = (time, point1, point2) => {
  const inverseTime = 1 - time;
  return 3 * inverseTime * inverseTime * time * point1 + 3 * inverseTime * time * time * point2 + time * time * time;
};
var cubicDerivative = (time, point1, point2) => {
  const inverseTime = 1 - time;
  return 3 * inverseTime * inverseTime * point1 + 6 * inverseTime * time * (point2 - point1) + 3 * time * time * (1 - point2);
};
var createCubicBezier = (x1, y1, x2, y2) => {
  const safeX1 = Math.min(1, Math.max(0, x1));
  const safeX2 = Math.min(1, Math.max(0, x2));
  return (progress) => {
    let time = progress;
    for (let iteration = 0; iteration < 6; iteration++) {
      const difference = cubicCoordinate(time, safeX1, safeX2) - progress;
      const derivative = cubicDerivative(time, safeX1, safeX2);
      if (Math.abs(derivative) < 1e-4) break;
      time = Math.min(1, Math.max(0, time - difference / derivative));
    }
    return cubicCoordinate(time, y1, y2);
  };
};
var resolveEasing = (easing) => {
  if (typeof easing === "function") return easing;
  if (typeof easing !== "string") {
    return createCubicBezier(easing[0], easing[1], easing[2], easing[3]);
  }
  const preset = EASING_CURVES[easing];
  if (preset) return createCubicBezier(...preset);
  const match = easing.match(
    /^cubic-bezier\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)$/
  );
  if (!match) return (progress) => progress;
  return createCubicBezier(
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    Number(match[4])
  );
};
function ImageGenerationLoader({
  className,
  cellSize = 5,
  gap = 2,
  bandHeight = 48,
  duration = 4e3,
  effect = "shimmer",
  waveAmplitude = 12,
  scaleAmplitude = 0.75,
  colors = DEFAULT_COLORS,
  text,
  textLetterSpacing,
  textWordSpacing,
  overlayOpacity = 0.3,
  overlayExitDuration = 700,
  easing = "ease-in-out"
}) {
  const canvasRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const [fromColor, toColor] = colors;
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !overlay || !parent) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const colorProbe = document.createElement("span");
    colorProbe.hidden = true;
    parent.appendChild(colorProbe);
    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = 1;
    colorCanvas.height = 1;
    const colorContext = colorCanvas.getContext("2d", {
      willReadFrequently: true
    });
    const decodeColor = (color) => {
      colorProbe.style.color = color;
      const resolvedColor = window.getComputedStyle(colorProbe).color;
      colorContext?.clearRect(0, 0, 1, 1);
      if (colorContext) {
        colorContext.fillStyle = resolvedColor;
        colorContext.fillRect(0, 0, 1, 1);
      }
      const pixel = colorContext?.getImageData(0, 0, 1, 1).data;
      return [pixel?.[0] ?? 0, pixel?.[1] ?? 0, pixel?.[2] ?? 0];
    };
    const fromRgb = decodeColor(fromColor);
    const toRgb = decodeColor(toColor);
    colorProbe.remove();
    const rgba = (color, alpha) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
    let width = 0;
    let height = 0;
    let cells = [];
    let frameId = 0;
    let startTime = performance.now();
    let isVisible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pitch = Math.max(2, cellSize + gap);
    const easingFunction = resolveEasing(easing);
    const buildCells = () => {
      const columnCount = Math.ceil(width / pitch) + 1;
      const rowCount = Math.max(1, Math.floor((bandHeight + gap) / pitch));
      const nextCells = [];
      const textCells = /* @__PURE__ */ new Set();
      if (text && rowCount >= GLYPH_HEIGHT) {
        const characters = Array.from(text.trim().toUpperCase());
        const letterGapColumns = textLetterSpacing === void 0 ? 1 : Math.max(0, Math.round(textLetterSpacing / pitch));
        const wordGapColumns = textWordSpacing === void 0 ? 3 : Math.max(1, Math.round(textWordSpacing / pitch));
        const characterWidths = characters.map(
          (character) => character === " " ? wordGapColumns : GLYPH_WIDTH
        );
        const textWidth = characterWidths.reduce(
          (total, characterWidth) => total + characterWidth,
          0
        ) + Math.max(0, characters.length - 1) * letterGapColumns;
        const visibleColumnCount = Math.max(
          1,
          Math.floor((width + gap) / pitch)
        );
        const startColumn = Math.max(
          0,
          Math.floor((visibleColumnCount - textWidth) / 2)
        );
        const startRow = Math.floor((rowCount - GLYPH_HEIGHT) / 2);
        let glyphColumn = startColumn;
        characters.forEach((character, characterIndex) => {
          if (character === " ") {
            glyphColumn += wordGapColumns;
          } else {
            const glyph = (PIXEL_FONT[character] ?? PIXEL_FONT["?"]).split("/");
            for (let glyphRow = 0; glyphRow < GLYPH_HEIGHT; glyphRow++) {
              for (let glyphPixel = 0; glyphPixel < GLYPH_WIDTH; glyphPixel++) {
                if (glyph[glyphRow]?.[glyphPixel] === "1") {
                  textCells.add(
                    `${glyphColumn + glyphPixel}:${startRow + glyphRow}`
                  );
                }
              }
            }
            glyphColumn += GLYPH_WIDTH;
          }
          if (characterIndex < characters.length - 1) {
            glyphColumn += letterGapColumns;
          }
        });
      }
      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
          nextCells.push({
            column,
            row,
            opacity: 0.45 + randomFrom(column, row, 4) * 0.55,
            phase: randomFrom(column, row, 5) * TAU,
            scaleSeed: randomFrom(column, row, 6),
            isText: textCells.has(`${column}:${row}`)
          });
        }
      }
      cells = nextCells;
    };
    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildCells();
    };
    const draw = (now) => {
      context.clearRect(0, 0, width, height);
      const cycleDuration = Math.max(1, duration);
      const cycleElapsed = (now - startTime) % cycleDuration;
      const linearProgress = cycleElapsed / cycleDuration;
      const progress = reducedMotion.matches ? 0.5 : easingFunction(linearProgress);
      const centerY = -bandHeight + progress * (height + bandHeight * 2);
      const bandTop = Math.round(centerY - bandHeight / 2);
      const bandCenter = bandTop + bandHeight / 2;
      const revealEdge = Math.max(0, Math.min(height, bandTop));
      const exitWindow = Math.min(
        Math.max(1, overlayExitDuration),
        cycleDuration / 2
      );
      const exitAmount = reducedMotion.matches ? 1 : Math.min(1, (cycleDuration - cycleElapsed) / exitWindow);
      const easedExit = exitAmount * exitAmount * (3 - 2 * exitAmount);
      overlay.style.clipPath = `inset(0 0 ${height - revealEdge}px 0)`;
      overlay.style.opacity = `${overlayOpacity * easedExit}`;
      const rowCount = Math.max(1, Math.floor((bandHeight + gap) / pitch));
      const gridHeight = rowCount * cellSize + (rowCount - 1) * gap;
      const gridTop = bandTop + Math.round((bandHeight - gridHeight) / 2);
      const waveProgress = reducedMotion.matches ? 0.5 : (now - startTime) % 1800 / 1800;
      const waveX = -100 + waveProgress * (width + 200);
      const getBulge = (x) => {
        if (effect !== "wave" || reducedMotion.matches) return 0;
        const distance = x - waveX;
        return waveAmplitude * Math.exp(-(distance * distance) / (2 * 72 * 72));
      };
      const backgroundGradient = context.createLinearGradient(
        0,
        bandTop - waveAmplitude,
        0,
        bandTop + bandHeight + waveAmplitude
      );
      backgroundGradient.addColorStop(0, rgba(toRgb, 0.03));
      backgroundGradient.addColorStop(0.18, rgba(toRgb, 0.12));
      backgroundGradient.addColorStop(0.5, rgba(fromRgb, 0.2));
      backgroundGradient.addColorStop(0.82, rgba(toRgb, 0.12));
      backgroundGradient.addColorStop(1, rgba(toRgb, 0.03));
      context.fillStyle = backgroundGradient;
      if (effect === "wave" && !reducedMotion.matches) {
        context.beginPath();
        context.moveTo(0, bandTop - getBulge(0));
        for (let x = 4; x <= width; x += 4) {
          context.lineTo(x, bandTop - getBulge(x));
        }
        for (let x = width; x >= 0; x -= 4) {
          context.lineTo(x, bandTop + bandHeight + getBulge(x));
        }
        context.closePath();
        context.fill();
      } else {
        context.fillRect(0, bandTop, width, bandHeight);
      }
      if (effect === "shimmer") {
        const shineProgress = reducedMotion.matches ? 0.5 : (now - startTime) % 1400 / 1400;
        const shineX = -120 + shineProgress * (width + 240);
        const shineGradient = context.createLinearGradient(
          shineX - 120,
          0,
          shineX + 120,
          0
        );
        shineGradient.addColorStop(0, rgba(fromRgb, 0));
        shineGradient.addColorStop(0.5, rgba(fromRgb, 0.18));
        shineGradient.addColorStop(1, rgba(fromRgb, 0));
        context.fillStyle = shineGradient;
        context.fillRect(0, bandTop, width, bandHeight);
      }
      for (const cell of cells) {
        const x = cell.column * pitch;
        const baseY = gridTop + cell.row * pitch;
        const distanceFromCenter = baseY + cellSize / 2 - bandCenter;
        const stretch = 1 + getBulge(x + cellSize / 2) / (bandHeight / 2);
        const y = bandCenter + distanceFromCenter * stretch - cellSize / 2;
        if (y + cellSize < 0 || y > height) continue;
        const animatedColorMix = (Math.sin(now * 22e-4 + cell.phase) + 1) / 2;
        const colorMix = text ? cell.isText ? 0.82 + animatedColorMix * 0.18 : animatedColorMix * 0.35 : animatedColorMix;
        const red = Math.round(fromRgb[0] + (toRgb[0] - fromRgb[0]) * colorMix);
        const green = Math.round(
          fromRgb[1] + (toRgb[1] - fromRgb[1]) * colorMix
        );
        const blue = Math.round(
          fromRgb[2] + (toRgb[2] - fromRgb[2]) * colorMix
        );
        const pulse = 0.16 + (Math.sin(now * 45e-4 + cell.phase) + 1) / 2 * 0.84;
        const cellCenterX = x + cellSize / 2;
        let renderedSize = cellSize;
        if (effect === "scale-wave" && !reducedMotion.matches && cell.scaleSeed > 0.42) {
          const rowStagger = cell.row * 9;
          const distanceFromScaleWave = cellCenterX - (waveX - rowStagger);
          const scaleWaveInfluence = Math.exp(
            -(distanceFromScaleWave * distanceFromScaleWave) / (2 * 52 * 52)
          );
          const randomStrength = (cell.scaleSeed - 0.42) / 0.58;
          renderedSize = cellSize * (1 + scaleAmplitude * scaleWaveInfluence * (0.35 + randomStrength * 0.65));
        }
        const cellCenterY = y + cellSize / 2;
        if (text && cell.isText) {
          context.globalAlpha = 0.76 + pulse * 0.24;
          context.fillStyle = `rgb(${fromRgb[0]} ${fromRgb[1]} ${fromRgb[2]})`;
          context.fillRect(
            cellCenterX - renderedSize / 2,
            cellCenterY - renderedSize / 2,
            renderedSize,
            renderedSize
          );
          const innerSize = Math.max(1, renderedSize * 0.55);
          context.globalAlpha = 0.84 + pulse * 0.16;
          context.fillStyle = `rgb(${toRgb[0]} ${toRgb[1]} ${toRgb[2]})`;
          context.fillRect(
            cellCenterX - innerSize / 2,
            cellCenterY - innerSize / 2,
            innerSize,
            innerSize
          );
        } else {
          context.globalAlpha = text ? pulse * (0.32 + cell.opacity * 0.3) : pulse * (0.7 + cell.opacity * 0.3);
          context.fillStyle = `rgb(${red} ${green} ${blue})`;
          context.fillRect(
            cellCenterX - renderedSize / 2,
            cellCenterY - renderedSize / 2,
            renderedSize,
            renderedSize
          );
        }
      }
      context.globalAlpha = 1;
      if (!reducedMotion.matches && isVisible) {
        frameId = requestAnimationFrame(draw);
      }
    };
    const start = () => {
      cancelAnimationFrame(frameId);
      startTime = performance.now();
      frameId = requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) draw(performance.now());
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else cancelAnimationFrame(frameId);
    });
    const handleMotionPreference = () => start();
    resize();
    resizeObserver.observe(parent);
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener("change", handleMotionPreference);
    start();
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [
    bandHeight,
    cellSize,
    duration,
    easing,
    effect,
    fromColor,
    gap,
    overlayExitDuration,
    overlayOpacity,
    scaleAmplitude,
    text,
    textLetterSpacing,
    textWordSpacing,
    toColor,
    waveAmplitude
  ]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: overlayRef,
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 bg-(--loader-overlay-color) will-change-[clip-path,opacity]",
        style: {
          "--loader-overlay-color": toColor,
          clipPath: "inset(0 0 100% 0)",
          opacity: overlayOpacity
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        "aria-hidden": "true",
        className: cn(
          "pointer-events-none absolute inset-0 size-full",
          className
        )
      }
    )
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/image-generation-loader-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ImageGenerationLoaderDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "mx-auto w-full max-w-2xl px-6 py-10 sm:p-12", children: [
    /* @__PURE__ */ jsxs2("div", { className: "relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-900 outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10", children: [
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://assets.aceternity.com/components/vertical-sliding-loader-demo.webp",
          alt: "A project creation interface",
          className: "size-full object-cover dark:hidden"
        }
      ),
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://assets.aceternity.com/components/vertical-sliding-loader-demo-dark.webp",
          alt: "A project creation interface",
          className: "size-full object-cover not-dark:hidden"
        }
      ),
      /* @__PURE__ */ jsx2(
        ImageGenerationLoader,
        {
          effect: "scale-wave",
          easing: "ease-in-out",
          text: "Analysing",
          cellSize: 3,
          gap: 1,
          bandHeight: 48,
          colors: ["var(--color-blue-500)", "var(--color-blue-800)"]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "mt-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://assets.aceternity.com/avatars/manu.webp",
          alt: "Manu Arora",
          className: "size-9 rounded-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxs2("div", { className: "flex min-w-0 items-baseline gap-2", children: [
        /* @__PURE__ */ jsx2("p", { className: "shrink-0 text-base/7 font-medium sm:text-sm/6", children: "Manu Arora" }),
        /* @__PURE__ */ jsx2("p", { className: "truncate text-base/7 text-neutral-500 sm:text-sm/6 dark:text-neutral-400", children: "Multi cards empty state skeletons" })
      ] })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImageGenerationLoaderDemo, {}) }) });
}
export {
  ImageGenerationLoader,
  Component as default
};
