// Adapted from https://ui.aceternity.com/components/wavy-background
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/wavy-background.tsx
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { jsx, jsxs } from "react/jsx-runtime";
var WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 1e-3;
      case "fast":
        return 2e-3;
      default:
        return 1e-3;
    }
  };
  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function() {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };
  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee"
  ];
  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  let animationId;
  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };
  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
    );
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      ),
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            className: "absolute inset-0 z-0",
            ref: canvasRef,
            id: "canvas",
            style: {
              ...isSafari ? { filter: `blur(${blur}px)` } : {}
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-10", className), ...props, children })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/wavy-background-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function WavyBackgroundDemo() {
  return /* @__PURE__ */ jsxs2(WavyBackground, { className: "w-full max-w-4xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx2("p", { className: "text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center", children: "Hero waves are cool" }),
    /* @__PURE__ */ jsx2("p", { className: "text-base md:text-lg mt-4 text-white font-normal inter-var text-center", children: "Leverage the power of canvas to create a beautiful hero section" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(WavyBackgroundDemo, {}) }) });
}
export {
  WavyBackground,
  Component as default
};
