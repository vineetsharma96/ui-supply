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
// Adapted from https://magicui.design/docs/components/particles
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/particles.tsx
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

// registry:components/ui/particles.tsx
import { jsx } from "react/jsx-runtime";
function MousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return mousePosition;
}
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = hexInt >> 16 & 255;
  const green = hexInt >> 8 & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}
var Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = MousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef(null);
  const resizeTimeout = useRef(null);
  const initCanvasRef = useRef(() => {
  });
  const onMouseMoveRef = useRef(() => {
  });
  const animateRef = useRef(() => {
  });
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvasRef.current();
    animateRef.current();
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvasRef.current();
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);
  useEffect(() => {
    onMouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y]);
  useEffect(() => {
    initCanvasRef.current();
  }, [refresh]);
  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };
  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };
  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };
  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism
    };
  };
  const rgb = hexToRgb(color);
  const drawCircle = (circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: size2, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size2, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) {
        circles.current.push(circle);
      }
    }
  };
  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };
  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };
  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };
  const animate = () => {
    clearContext();
    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        // distance from right edge
        circle.y + circle.translateY - circle.size,
        // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size
        // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);
      if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    rafID.current = window.requestAnimationFrame(animateRef.current);
  };
  initCanvasRef.current = initCanvas;
  onMouseMoveRef.current = onMouseMove;
  animateRef.current = animate;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("pointer-events-none", className),
      ref: canvasContainerRef,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "size-full" })
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/ui/particles-demo.tsx
import { useEffect as useEffect4, useState as useState4 } from "react";

// registry:next-themes
import { useState as useState2, useEffect as useEffect2 } from "react";
function useTheme() {
  const [theme, set] = useState2(document.documentElement.dataset.theme || "dark");
  useEffect2(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:particles.tsx
import {
  useEffect as useEffect3,
  useRef as useRef2,
  useState as useState3
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function MousePosition2() {
  const [mousePosition, setMousePosition] = useState3({
    x: 0,
    y: 0
  });
  useEffect3(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return mousePosition;
}
function hexToRgb2(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = hexInt >> 16 & 255;
  const green = hexInt >> 8 & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}
var Particles2 = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef2(null);
  const canvasContainerRef = useRef2(null);
  const context = useRef2(null);
  const circles = useRef2([]);
  const mousePosition = MousePosition2();
  const mouse = useRef2({ x: 0, y: 0 });
  const canvasSize = useRef2({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef2(null);
  const resizeTimeout = useRef2(null);
  const initCanvasRef = useRef2(() => {
  });
  const onMouseMoveRef = useRef2(() => {
  });
  const animateRef = useRef2(() => {
  });
  useEffect3(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvasRef.current();
    animateRef.current();
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvasRef.current();
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);
  useEffect3(() => {
    onMouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y]);
  useEffect3(() => {
    initCanvasRef.current();
  }, [refresh]);
  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };
  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };
  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };
  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism
    };
  };
  const rgb = hexToRgb2(color);
  const drawCircle = (circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: size2, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size2, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) {
        circles.current.push(circle);
      }
    }
  };
  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };
  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };
  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };
  const animate = () => {
    clearContext();
    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        // distance from right edge
        circle.y + circle.translateY - circle.size,
        // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size
        // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);
      if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    rafID.current = window.requestAnimationFrame(animateRef.current);
  };
  initCanvasRef.current = initCanvas;
  onMouseMoveRef.current = onMouseMove;
  animateRef.current = animate;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn("pointer-events-none", className),
      ref: canvasContainerRef,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsx2("canvas", { ref: canvasRef, className: "size-full" })
    }
  );
};

// registry:components/ui/particles-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState4("#ffffff");
  useEffect4(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3("span", { className: "pointer-events-none z-10 text-center text-8xl leading-none font-semibold whitespace-pre-wrap", children: "Particles" }),
    /* @__PURE__ */ jsx3(
      Particles2,
      {
        className: "absolute inset-0 z-0",
        quantity: 100,
        ease: 80,
        color,
        refresh: true
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(ParticlesDemo, {}) }) });
}
export {
  Particles,
  Component as default
};
