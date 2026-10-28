/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

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
// Adapted from https://www.vengenceui.com/components/animated-footer
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/animated-footer.tsx
import { useEffect as useEffect2, useMemo, useRef } from "react";
import gsap from "gsap";

// registry:next-themes
import { useState, useEffect } from "react";
function useTheme() {
  const [theme, set] = useState(document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-footer.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_ASCII_CHARS = "........:::=+xX#0369";
var HIGHLIGHT_LIFETIME = 300;
var CLUSTER_SIZE = 10;
var PARALLAX_EASE = 0.05;
function buildHandCells(image, columns, asciiChars) {
  const rows = Math.max(
    1,
    Math.round(columns / (image.naturalWidth / image.naturalHeight || 1))
  );
  const sampler = document.createElement("canvas");
  sampler.width = columns;
  sampler.height = rows;
  const sampleCtx = sampler.getContext("2d");
  const cells = /* @__PURE__ */ new Map();
  if (!sampleCtx) return { rows, cells };
  sampleCtx.drawImage(image, 0, 0, columns, rows);
  const pixels = sampleCtx.getImageData(0, 0, columns, rows).data;
  const backgroundCharIndex = asciiChars.lastIndexOf(".");
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const offset = (row * columns + col) * 4;
      const brightness = (pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114) / 255;
      const charIndex = Math.min(
        asciiChars.length - 1,
        Math.floor((1 - brightness) * asciiChars.length)
      );
      if (charIndex <= backgroundCharIndex) continue;
      cells.set(`${col},${row}`, {
        col,
        row,
        char: asciiChars[charIndex],
        highlightEndTime: 0
      });
    }
  }
  return { rows, cells };
}
function highlightCluster(cells, startCell) {
  const now = Date.now();
  startCell.highlightEndTime = now + HIGHLIGHT_LIFETIME;
  const steps = Math.floor(Math.random() * CLUSTER_SIZE) + 1;
  const litCells = [startCell];
  let current = startCell;
  for (let step = 0; step < steps; step++) {
    const neighbours = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const neighbour = cells.get(`${current.col + dx},${current.row + dy}`);
        if (neighbour && !litCells.includes(neighbour)) neighbours.push(neighbour);
      }
    }
    if (neighbours.length === 0) break;
    const next = neighbours[Math.floor(Math.random() * neighbours.length)];
    next.highlightEndTime = now + HIGHLIGHT_LIFETIME + step * 10;
    litCells.push(next);
    current = next;
  }
}
function getScrollParent(node) {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") return el;
    el = el.parentElement;
  }
  return null;
}
function AnimatedFooter({
  headingLines = ["VengeanceUI"],
  leftImage = "https://www.vengenceui.com/animated-footer/hand-left.jpg",
  rightImage = "https://www.vengenceui.com/animated-footer/hand-right.jpg",
  background,
  textColor,
  charColor,
  hoverColor,
  hoverCharColor,
  asciiChars = DEFAULT_ASCII_CHARS,
  columns = 80,
  cellSize = 20,
  fontSize = 18,
  parallaxStrength = 20,
  hoverRadius = 8,
  revealOnScroll = true,
  revealed,
  className
}) {
  const rootRef = useRef(null);
  const leftWrapRef = useRef(null);
  const rightWrapRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const animateInRef = useRef(() => {
  });
  const animateOutRef = useRef(() => {
  });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const cc = charColor ?? (isDark ? "#803500" : "#e6b093");
  const hc = hoverColor ?? "#ff6a00";
  const hcc = hoverCharColor ?? (isDark ? "#0f0f0f" : "#ffffff");
  const liveRef = useRef({ charColor: cc, hoverColor: hc, hoverCharColor: hcc, parallaxStrength, hoverRadius });
  useEffect2(() => {
    liveRef.current = { charColor: cc, hoverColor: hc, hoverCharColor: hcc, parallaxStrength, hoverRadius };
  }, [cc, hc, hcc, parallaxStrength, hoverRadius]);
  const sig = useMemo(
    () => JSON.stringify({
      leftImage,
      rightImage,
      columns,
      cellSize,
      fontSize,
      asciiChars,
      revealOnScroll,
      headingLines
    }),
    [leftImage, rightImage, columns, cellSize, fontSize, asciiChars, revealOnScroll, headingLines]
  );
  useEffect2(() => {
    const root = rootRef.current;
    const leftWrap = leftWrapRef.current;
    const rightWrap = rightWrapRef.current;
    if (!root || !leftWrap || !rightWrap) return;
    const hands = [];
    const wrappers = [leftWrap, rightWrap];
    const setupHand = (image, canvas, direction) => {
      const { rows, cells } = buildHandCells(image, columns, asciiChars);
      if (cells.size === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = columns * cellSize * dpr;
      canvas.height = rows * cellSize * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const metrics = ctx.measureText("X");
      const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baselineOffset = cellSize / 2 + glyphHeight / 2 - metrics.actualBoundingBoxDescent;
      hands.push({
        canvas,
        ctx,
        cells,
        cellList: [...cells.values()],
        rows,
        columns,
        cellSize,
        baselineOffset,
        direction
      });
    };
    const loadHand = (src, canvas, direction) => {
      if (!src) return;
      const image = new Image();
      image.crossOrigin = "anonymous";
      let initialized = false;
      const init = () => {
        if (initialized) return;
        initialized = true;
        setupHand(image, canvas, direction);
      };
      image.onload = init;
      image.src = src;
      if (image.complete && image.naturalWidth) init();
    };
    loadHand(leftImage, leftCanvasRef.current, 1);
    loadHand(rightImage, rightCanvasRef.current, -1);
    const renderHand = (hand, now) => {
      const { ctx, cellList, cellSize: cs, baselineOffset, columns: cols, rows } = hand;
      const { charColor: cc2, hoverColor: hc2, hoverCharColor: hcc2 } = liveRef.current;
      ctx.clearRect(0, 0, cols * cs, rows * cs);
      for (const cell of cellList) {
        const x = cell.col * cs;
        const y = cell.row * cs;
        const isHighlighted = cell.highlightEndTime > now;
        if (isHighlighted) {
          ctx.fillStyle = hc2;
          ctx.fillRect(x, y, cs, cs);
        }
        ctx.fillStyle = isHighlighted ? hcc2 : cc2;
        ctx.fillText(cell.char, x + cs / 2, y + baselineOffset);
      }
    };
    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const curtain = { offset: revealOnScroll ? 125 : 0 };
    const hoverHand = (hand, clientX, clientY) => {
      const rect = hand.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const mouseCol = (clientX - rect.left) / rect.width * hand.columns;
      const mouseRow = (clientY - rect.top) / rect.height * hand.rows;
      let closest = null;
      let closestDist = Infinity;
      for (const cell of hand.cellList) {
        const dx = mouseCol - cell.col;
        const dy = mouseRow - cell.row;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = cell;
        }
      }
      if (closest && closestDist <= liveRef.current.hoverRadius) {
        highlightCluster(hand.cells, closest);
      }
    };
    const onMouseMove = (event) => {
      const strength = liveRef.current.parallaxStrength;
      const rect = root.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;
      pointer.x = ((event.clientX - rect.left) / w - 0.5) * strength * 2;
      pointer.y = ((event.clientY - rect.top) / h - 0.5) * strength * 2;
      for (const hand of hands) hoverHand(hand, event.clientX, event.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    let rafId = 0;
    const frame = () => {
      const now = Date.now();
      for (const hand of hands) renderHand(hand, now);
      drift.x += (pointer.x - drift.x) * PARALLAX_EASE;
      drift.y += (pointer.y - drift.y) * PARALLAX_EASE;
      const strength = liveRef.current.parallaxStrength;
      const scale = 1 + strength * 2 / 200;
      wrappers.forEach((wrapper, i) => {
        const dir = i === 0 ? 1 : -1;
        const revealX = i === 0 ? -curtain.offset : curtain.offset;
        const x = drift.x * dir || 0;
        const y = -drift.y || 0;
        wrapper.style.transform = `translateX(${revealX}%) translate(${x}px, ${y}px) scale(${scale})`;
      });
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);
    const chars = gsap.utils.toArray(root.querySelectorAll("[data-af-char]"));
    const animateIn = () => {
      gsap.to(curtain, { offset: 0, duration: 1, ease: "power3.out", overwrite: true });
      gsap.to(chars, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.04, from: "center" },
        overwrite: true
      });
    };
    const animateOut = () => {
      gsap.to(curtain, { offset: 125, duration: 0.4, ease: "power2.in", overwrite: true });
      gsap.to(chars, {
        yPercent: 125,
        duration: 0.4,
        ease: "power2.in",
        stagger: { each: 0.01, from: "center" },
        overwrite: true
      });
    };
    animateInRef.current = animateIn;
    animateOutRef.current = animateOut;
    const maskAll = () => {
      gsap.set(chars, { yPercent: 125 });
    };
    const showAll = () => {
      gsap.set(chars, { yPercent: 0 });
    };
    let observer = null;
    if (revealed !== void 0) {
      curtain.offset = revealed ? 0 : 125;
      if (revealed) showAll();
      else maskAll();
    } else if (revealOnScroll) {
      maskAll();
      let isRevealed = false;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !isRevealed) {
              isRevealed = true;
              animateIn();
            } else if (!entry.isIntersecting && isRevealed) {
              isRevealed = false;
              animateOut();
            }
          }
        },
        { root: getScrollParent(root), threshold: 0.35 }
      );
      observer.observe(root);
    } else {
      showAll();
    }
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      observer?.disconnect();
      gsap.killTweensOf([curtain, ...chars]);
    };
  }, [sig]);
  useEffect2(() => {
    if (revealed === void 0) return;
    if (revealed) animateInRef.current();
    else animateOutRef.current();
  }, [revealed]);
  const startsHidden = revealed !== void 0 ? !revealed : revealOnScroll;
  const offEdge = startsHidden ? 125 : 0;
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      ref: rootRef,
      className: cn(
        "relative h-full w-full overflow-hidden",
        !background && "bg-white dark:bg-black",
        !textColor && "text-black dark:text-white",
        className
      ),
      style: { backgroundColor: background, color: textColor, containerType: "inline-size" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: leftWrapRef,
              className: "relative w-2/5 min-w-[200px] will-change-transform",
              style: { transform: `translateX(-${offEdge}%)` },
              children: /* @__PURE__ */ jsx("canvas", { ref: leftCanvasRef, className: "block h-auto w-full" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: rightWrapRef,
              className: "relative w-2/5 min-w-[200px] will-change-transform",
              style: { transform: `translateX(${offEdge}%)` },
              children: /* @__PURE__ */ jsx("canvas", { ref: rightCanvasRef, className: "block h-auto w-full" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 p-8", children: headingLines.map((word, wi) => /* @__PURE__ */ jsx(
          "h2",
          {
            "aria-label": word,
            className: "overflow-hidden font-medium leading-none tracking-tight pb-[0.15em] -mb-[0.15em]",
            style: { fontSize: "clamp(2rem, 13cqw, 11rem)" },
            children: Array.from(word).map((ch, ci) => /* @__PURE__ */ jsx(
              "span",
              {
                "data-af-char": true,
                "aria-hidden": "true",
                className: "inline-block",
                children: ch === " " ? "\xA0" : ch
              },
              ci
            ))
          },
          `${word}-${wi}`
        )) })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/animated-footer-demo.tsx
import { useLayoutEffect, useRef as useRef2, useState as useState2 } from "react";
import { ChevronDown } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AnimatedFooterDemo() {
  const scrollRef = useRef2(null);
  const revealerRef = useRef2(null);
  const [screen, setScreen] = useState2(0);
  const [revealed, setRevealed] = useState2(false);
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const measure = () => setScreen(scroller.clientHeight);
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scroller);
    const onScroll = () => {
      const revealer = revealerRef.current;
      if (!revealer) return;
      const top = revealer.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      const h = scroller.clientHeight || 1;
      setRevealed((prev) => top <= h * 0.5 ? true : top >= h * 0.85 ? false : prev);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);
  const full = screen || 560;
  return /* @__PURE__ */ jsxs2("div", { ref: scrollRef, className: "relative h-full min-h-[560px] w-full overflow-y-auto bg-white dark:bg-black", children: [
    /* @__PURE__ */ jsx2("div", { className: "sticky top-0 z-0 w-full", style: { height: full }, children: /* @__PURE__ */ jsx2(AnimatedFooter, { revealed }) }),
    /* @__PURE__ */ jsxs2("div", { className: "relative z-10 w-full", style: { marginTop: -full }, children: [
      /* @__PURE__ */ jsxs2(
        "section",
        {
          className: "flex w-full flex-col items-center justify-center gap-4 bg-white px-6 text-center text-black dark:bg-black dark:text-white",
          style: { height: full },
          children: [
            /* @__PURE__ */ jsx2("h3", { className: "max-w-lg text-2xl font-semibold sm:text-4xl", children: "Scroll down to reveal the footer" }),
            /* @__PURE__ */ jsx2(ChevronDown, { className: "mt-1 h-6 w-6 animate-bounce text-black/40 dark:text-white/40" })
          ]
        }
      ),
      /* @__PURE__ */ jsx2("div", { ref: revealerRef, "aria-hidden": true, style: { height: full } })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AnimatedFooterDemo, {}) }) });
}
export {
  AnimatedFooter,
  Component as default
};
