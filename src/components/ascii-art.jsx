// Adapted from https://ui.aceternity.com/components/ascii-art
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/ascii-art.tsx
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useId
} from "react";
import { motion, useInView } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/ascii-art.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var ASCII_CHARSETS = {
  standard: " .,:;i1tfLCG08@",
  blocks: " \u2591\u2592\u2593\u2588",
  binary: " 01",
  dots: " \xB7\u2022\u25CF",
  minimal: " .:\u2591\u2592",
  dense: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  arrows: " \u2190\u2191\u2192\u2193\u2194\u2195\u2196\u2197\u2198\u2199",
  stars: " \xB7\u2726\u2727\u2605",
  hash: " -=#",
  pipes: " |/\u2500\\\u2502",
  braille: " \u2801\u2803\u2807\u280F\u281F\u283F\u287F\u28FF",
  circles: " \u25CB\u25D4\u25D1\u25D5\u25CF",
  squares: " \u25A2\u25A3\u25A4\u25A5\u25A6\u25A7\u25A8\u25A9",
  hearts: " \u2661\u2665",
  math: " +-\xD7\xF7=\u2260\u2248\u221E"
};
var isCharsetPreset = (value) => {
  return value in ASCII_CHARSETS;
};
var resolveCharset = (charset) => {
  if (isCharsetPreset(charset)) {
    return ASCII_CHARSETS[charset];
  }
  return charset;
};
var resolveCssColor = (color, element) => {
  if (!color) return color;
  if (color.startsWith("var(")) {
    if (!element) return "#ffffff";
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    element.appendChild(tempDiv);
    const computedColor = getComputedStyle(tempDiv).color;
    element.removeChild(tempDiv);
    return computedColor || "#ffffff";
  }
  return color;
};
var MATRIX_CHARSET = "\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D";
var AsciiArt = ({
  src,
  resolution = 80,
  charset = "standard",
  color = "#ffffff",
  backgroundColor = "transparent",
  inverted = false,
  colored = false,
  animated = true,
  animationStyle = "fade",
  animationDuration = 1,
  fontFamily = "monospace",
  className,
  animateOnView = true,
  objectFit = "cover"
}) => {
  const uniqueId = useId();
  const [asciiData, setAsciiData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldStartAnimation = animated && animateOnView ? isInView : animated;
  const shouldShowStatic = !animated || animationStyle === "none";
  const resolvedCharset = resolveCharset(charset);
  const effectiveCharset = inverted ? resolvedCharset.split("").reverse().join("") : resolvedCharset;
  const defaultColor = inverted ? "#ffffff" : "#000000";
  const textColor = color || defaultColor;
  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (isCancelled) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas context not available");
        return;
      }
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgAspect = imgWidth / imgHeight;
      const charAspectRatio = 0.55;
      const cols = resolution;
      const rows = Math.floor(cols * charAspectRatio);
      canvas.width = cols;
      canvas.height = rows;
      const visualAspect = 1;
      let sx = 0, sy = 0, sw = imgWidth, sh = imgHeight;
      if (objectFit === "cover") {
        if (imgAspect > visualAspect) {
          sw = imgHeight * visualAspect;
          sx = (imgWidth - sw) / 2;
        } else {
          sh = imgWidth / visualAspect;
          sy = (imgHeight - sh) / 2;
        }
      } else if (objectFit === "contain") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, cols, rows);
        let dw, dh, dx, dy;
        if (imgAspect > visualAspect) {
          dw = cols;
          dh = cols / imgAspect * charAspectRatio;
          dx = 0;
          dy = (rows - dh) / 2;
        } else {
          dh = rows;
          dw = rows * imgAspect / charAspectRatio;
          dx = (cols - dw) / 2;
          dy = 0;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
      }
      if (objectFit !== "contain") {
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      }
      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, cols, rows);
      } catch {
        setError("Unable to read image data (CORS issue)");
        return;
      }
      const data = imageData.data;
      const result = [];
      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const adjustedBrightness = a === 0 ? 0 : brightness;
          const charIndex = Math.floor(
            adjustedBrightness * (effectiveCharset.length - 1)
          );
          const char = effectiveCharset[charIndex] || " ";
          row.push({ char, r, g, b });
        }
        result.push(row);
      }
      setAsciiData(result);
      setIsLoaded(true);
    };
    img.onerror = () => {
      if (isCancelled) return;
      setError("Failed to load image");
    };
    return () => {
      isCancelled = true;
    };
  }, [src, resolution, effectiveCharset, objectFit]);
  const drawCanvas = useCallback(
    (progress = 1, matrixProgress) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || asciiData.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      if (containerWidth === 0 || containerHeight === 0) return;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      ctx.scale(dpr, dpr);
      const resolvedBgColor = resolveCssColor(backgroundColor, container);
      const resolvedTextColor = resolveCssColor(textColor, container);
      if (resolvedBgColor !== "transparent") {
        ctx.fillStyle = resolvedBgColor;
        ctx.fillRect(0, 0, containerWidth, containerHeight);
      } else {
        ctx.clearRect(0, 0, containerWidth, containerHeight);
      }
      const rows = asciiData.length;
      const cols = asciiData[0]?.length || 0;
      if (cols === 0) return;
      const charWidth = containerWidth / cols;
      const charHeight = containerHeight / rows;
      const fontSize = Math.min(charWidth * 1.8, charHeight * 1.2);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      const totalChars = rows * cols;
      const revealedChars = Math.floor(progress * totalChars);
      let charIndex = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const pixel = asciiData[y][x];
          const cx = x * charWidth + charWidth / 2;
          const cy = y * charHeight;
          if (animationStyle === "typewriter" && charIndex >= revealedChars) {
            charIndex++;
            continue;
          }
          let displayChar = pixel.char;
          let displayColor = colored ? `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` : resolvedTextColor;
          if (animationStyle === "matrix" && matrixProgress !== void 0) {
            const charProgress = (x * 0.02 + y * 0.01) / 2;
            if (matrixProgress < charProgress) {
              charIndex++;
              continue;
            } else if (matrixProgress < charProgress + 0.15) {
              displayChar = MATRIX_CHARSET[Math.floor(Math.random() * MATRIX_CHARSET.length)];
              displayColor = "#00ff00";
              ctx.shadowColor = "#00ff00";
              ctx.shadowBlur = 5;
            } else {
              ctx.shadowBlur = 0;
            }
          }
          ctx.fillStyle = displayColor;
          ctx.globalAlpha = animationStyle === "fade" ? progress : 1;
          ctx.fillText(displayChar, cx, cy);
          charIndex++;
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    },
    [
      asciiData,
      backgroundColor,
      colored,
      textColor,
      fontFamily,
      animationStyle
    ]
  );
  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;
    const draw = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        requestAnimationFrame(draw);
        return;
      }
      if (shouldShowStatic || hasAnimated || !shouldStartAnimation) {
        drawCanvas(1);
        return;
      }
      const startTime = performance.now();
      const duration = animationStyle === "fade" ? animationDuration * 1e3 : animationStyle === "typewriter" ? asciiData.length * asciiData[0]?.length * 2 : animationStyle === "matrix" ? 3e3 : 1e3;
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        if (animationStyle === "matrix") {
          drawCanvas(1, progress);
        } else {
          drawCanvas(progress);
        }
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setHasAnimated(true);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    };
    const frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isLoaded,
    shouldStartAnimation,
    shouldShowStatic,
    hasAnimated,
    animationStyle,
    animationDuration,
    drawCanvas,
    asciiData
  ]);
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    drawCanvas(1);
  }, [isLoaded, asciiData, drawCanvas]);
  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) return;
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => {
      drawCanvas(1);
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isLoaded, asciiData, drawCanvas]);
  if (error) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex items-center justify-center text-red-500 text-sm font-mono",
          className
        ),
        children: [
          "Error: ",
          error
        ]
      }
    );
  }
  if (!isLoaded) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex items-center justify-center text-neutral-500 text-sm font-mono animate-pulse",
          className
        ),
        style: { backgroundColor },
        children: "Loading..."
      }
    );
  }
  const canvasElement = /* @__PURE__ */ jsx(
    "canvas",
    {
      id: `ascii-canvas-${uniqueId}`,
      ref: canvasRef,
      className: "block w-full h-full",
      "aria-label": "ASCII art rendering of image",
      role: "img"
    },
    uniqueId
  );
  if (animationStyle === "fade" && animated && !hasAnimated) {
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: containerRef,
        className: cn("overflow-hidden", className),
        style: { backgroundColor },
        initial: { opacity: 0 },
        animate: shouldStartAnimation ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: animationDuration * 0.3 },
        children: canvasElement
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("overflow-hidden", className),
      style: { backgroundColor },
      children: canvasElement
    }
  );
};
var AsciiArtStatic = (props) => {
  return /* @__PURE__ */ jsx(AsciiArt, { ...props, animated: false, animationStyle: "none" });
};

// entry.jsx
import React2 from "react";

// registry:components/ascii-art-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AsciiArtDemo() {
  return /* @__PURE__ */ jsx2(
    AsciiArt,
    {
      src: "https://assets.aceternity.com/avatars/manu.webp",
      resolution: 100,
      color: "var(--color-neutral-500)",
      animationStyle: "fade",
      animationDuration: 1.5,
      animateOnView: false,
      className: "mx-auto aspect-square w-full max-w-lg bg-neutral-950"
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AsciiArtDemo, {}) }) });
}
export {
  AsciiArt,
  AsciiArtStatic,
  Component as default
};
