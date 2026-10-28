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
// Adapted from https://magicui.design/docs/components/icon-cloud
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/icon-cloud.tsx
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { renderToString } from "react-dom/server";

// registry:components/ui/button.tsx
import { cva } from "class-variance-authority";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/button.tsx
import { Slot } from "radix-ui";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// registry:components/ui/icon-cloud.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function IconCloud({
  icons,
  images,
  showControl = true
}) {
  const canvasRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(null);
  const animationFrameRef = useRef(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef([]);
  const imagesLoadedRef = useRef([]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
    const handleChange = (e) => {
      setIsPaused(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  useEffect(() => {
    if (!icons && !images) return;
    const items = icons ?? images ?? [];
    imagesLoadedRef.current = new Array(items.length).fill(false);
    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");
      if (offCtx) {
        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index];
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.beginPath();
            offCtx.arc(20, 20, 20, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();
            offCtx.drawImage(img, 0, 0, 40, 40);
            imagesLoadedRef.current[index] = true;
          };
        } else {
          offCtx.scale(0.4, 0.4);
          const svgString = renderToString(item);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });
    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);
  useEffect(() => {
    const items = icons ?? images ?? [];
    const newIcons = [];
    const numIcons = items.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);
  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;
      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );
        const duration = Math.min(2e3, Math.max(800, distance * 1e3));
        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration
        });
        return;
      }
    });
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 2e-3,
        y: rotationRef.current.y + deltaX * 2e-3
      };
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 3e-3 + distance / maxDistance * 0.01;
        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime;
          const progress = Math.min(1, elapsed / targetRotation.duration);
          const easedProgress = easeOutCubic(progress);
          rotationRef.current = {
            x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
            y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress
          };
          if (progress >= 1) {
            setTargetRotation(null);
          }
        } else if (!isDragging && !isPaused) {
          rotationRef.current = {
            x: rotationRef.current.x + dy / canvas.height * speed,
            y: rotationRef.current.y + dx / canvas.width * speed
          };
        }
        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x);
          const sinX = Math.sin(rotationRef.current.x);
          const cosY = Math.cos(rotationRef.current.y);
          const sinY = Math.sin(rotationRef.current.y);
          const rotatedX = icon.x * cosY - icon.z * sinY;
          const rotatedZ = icon.x * sinY + icon.z * cosY;
          const rotatedY = icon.y * cosX + rotatedZ * sinX;
          const scale = (rotatedZ + 200) / 300;
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));
          ctx.save();
          ctx.translate(
            canvas.width / 2 + rotatedX,
            canvas.height / 2 + rotatedY
          );
          ctx.scale(scale, scale);
          ctx.globalAlpha = opacity;
          if (icons || images) {
            if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
              ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
            }
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#4444ff";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "16px Arial";
            ctx.fillText(`${icon.id + 1}`, 0, 0);
          }
          ctx.restore();
        });
        const hasPendingAssets = Boolean(icons || images) && !imagesLoadedRef.current.every((loaded) => loaded);
        const shouldContinue = !isPaused || isDragging || targetRotation !== null || hasPendingAssets;
        if (shouldContinue) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animate();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    icons,
    images,
    iconPositions,
    isDragging,
    isPaused,
    mousePos,
    targetRotation
  ]);
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsx2(
      "canvas",
      {
        ref: canvasRef,
        width: 400,
        height: 400,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        className: "rounded-lg",
        "aria-label": "Interactive 3D Icon Cloud",
        role: "img"
      }
    ),
    showControl && /* @__PURE__ */ jsx2(
      Button,
      {
        variant: "outline",
        size: "icon",
        onClick: () => setIsPaused(!isPaused),
        "aria-label": isPaused ? "Play Animation" : "Pause Animation",
        className: "absolute top-2 right-2",
        children: isPaused ? /* @__PURE__ */ jsx2(Play, { size: 16 }) : /* @__PURE__ */ jsx2(Pause, { size: 16 })
      }
    )
  ] });
}

// entry.jsx
import React3 from "react";

// registry:icon-cloud.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { Pause as Pause2, Play as Play2 } from "lucide-react";
import { renderToString as renderToString2 } from "react-dom/server";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function easeOutCubic2(t) {
  return 1 - Math.pow(1 - t, 3);
}
function IconCloud2({
  icons,
  images,
  showControl = true
}) {
  const canvasRef = useRef2(null);
  const [iconPositions, setIconPositions] = useState2([]);
  const [isDragging, setIsDragging] = useState2(false);
  const [isPaused, setIsPaused] = useState2(false);
  const [lastMousePos, setLastMousePos] = useState2({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState2({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState2(null);
  const animationFrameRef = useRef2(0);
  const rotationRef = useRef2({ x: 0, y: 0 });
  const iconCanvasesRef = useRef2([]);
  const imagesLoadedRef = useRef2([]);
  useEffect2(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
    const handleChange = (e) => {
      setIsPaused(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  useEffect2(() => {
    if (!icons && !images) return;
    const items = icons ?? images ?? [];
    imagesLoadedRef.current = new Array(items.length).fill(false);
    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");
      if (offCtx) {
        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index];
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.beginPath();
            offCtx.arc(20, 20, 20, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();
            offCtx.drawImage(img, 0, 0, 40, 40);
            imagesLoadedRef.current[index] = true;
          };
        } else {
          offCtx.scale(0.4, 0.4);
          const svgString = renderToString2(item);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });
    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);
  useEffect2(() => {
    const items = icons ?? images ?? [];
    const newIcons = [];
    const numIcons = items.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);
  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;
      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );
        const duration = Math.min(2e3, Math.max(800, distance * 1e3));
        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration
        });
        return;
      }
    });
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 2e-3,
        y: rotationRef.current.y + deltaX * 2e-3
      };
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect2(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 3e-3 + distance / maxDistance * 0.01;
        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime;
          const progress = Math.min(1, elapsed / targetRotation.duration);
          const easedProgress = easeOutCubic2(progress);
          rotationRef.current = {
            x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
            y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress
          };
          if (progress >= 1) {
            setTargetRotation(null);
          }
        } else if (!isDragging && !isPaused) {
          rotationRef.current = {
            x: rotationRef.current.x + dy / canvas.height * speed,
            y: rotationRef.current.y + dx / canvas.width * speed
          };
        }
        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x);
          const sinX = Math.sin(rotationRef.current.x);
          const cosY = Math.cos(rotationRef.current.y);
          const sinY = Math.sin(rotationRef.current.y);
          const rotatedX = icon.x * cosY - icon.z * sinY;
          const rotatedZ = icon.x * sinY + icon.z * cosY;
          const rotatedY = icon.y * cosX + rotatedZ * sinX;
          const scale = (rotatedZ + 200) / 300;
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));
          ctx.save();
          ctx.translate(
            canvas.width / 2 + rotatedX,
            canvas.height / 2 + rotatedY
          );
          ctx.scale(scale, scale);
          ctx.globalAlpha = opacity;
          if (icons || images) {
            if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
              ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
            }
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#4444ff";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "16px Arial";
            ctx.fillText(`${icon.id + 1}`, 0, 0);
          }
          ctx.restore();
        });
        const hasPendingAssets = Boolean(icons || images) && !imagesLoadedRef.current.every((loaded) => loaded);
        const shouldContinue = !isPaused || isDragging || targetRotation !== null || hasPendingAssets;
        if (shouldContinue) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animate();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    icons,
    images,
    iconPositions,
    isDragging,
    isPaused,
    mousePos,
    targetRotation
  ]);
  return /* @__PURE__ */ jsxs2("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsx3(
      "canvas",
      {
        ref: canvasRef,
        width: 400,
        height: 400,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        className: "rounded-lg",
        "aria-label": "Interactive 3D Icon Cloud",
        role: "img"
      }
    ),
    showControl && /* @__PURE__ */ jsx3(
      Button,
      {
        variant: "outline",
        size: "icon",
        onClick: () => setIsPaused(!isPaused),
        "aria-label": isPaused ? "Play Animation" : "Pause Animation",
        className: "absolute top-2 right-2",
        children: isPaused ? /* @__PURE__ */ jsx3(Play2, { size: 16 }) : /* @__PURE__ */ jsx3(Pause2, { size: 16 })
      }
    )
  ] });
}

// registry:components/ui/icon-cloud-demo.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma"
];
function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );
  return /* @__PURE__ */ jsx4("div", { className: "relative flex size-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx4(IconCloud2, { images }) });
}

// entry.jsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx5("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx5("div", { className: "vendor-content", children: /* @__PURE__ */ jsx5(IconCloudDemo, {}) }) });
}
export {
  IconCloud,
  Component as default
};
