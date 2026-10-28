// Adapted from https://ui.aceternity.com/components/liquid-glass
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/liquid-glass.tsx
import {
  useEffect,
  useId,
  useRef,
  useState
} from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/liquid-glass.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function LiquidGlass({
  children,
  className,
  contentClassName,
  radius = 999,
  bevelDepth = 14,
  scale = 48,
  aberration = 4,
  frost = 0.4,
  tint = 0.12,
  style,
  ...rest
}) {
  const reactId = useId().replace(/:/g, "");
  const rootRef = useRef(null);
  const blobRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [filter, setFilter] = useState(
    null
  );
  const [mode, setMode] = useState("pending");
  useEffect(() => {
    if (prefersReducedTransparency()) setMode("opaque");
    else if (isSafariLike() || !supportsUrlBackdropFilter()) setMode("simple");
  }, []);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || mode !== "pending") return;
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const box = entry.borderBoxSize?.[0];
      const width = box?.inlineSize ?? entry.contentRect.width;
      const height = box?.blockSize ?? entry.contentRect.height;
      setSize({
        w: Math.max(1, Math.round(width)),
        h: Math.max(1, Math.round(height))
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode]);
  useEffect(() => {
    if (mode !== "pending" || size.w <= 1 || size.h <= 1) return;
    let cancelled = false;
    (async () => {
      const mapUrl = await generateDisplacementBlobUrl({
        width: size.w,
        height: size.h,
        radius: Math.min(radius, size.w / 2, size.h / 2),
        bevelDepth: Math.min(bevelDepth, Math.min(size.w, size.h) / 2),
        dpr: Math.min(window.devicePixelRatio || 1, 2)
      });
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = mapUrl;
      });
      if (cancelled) {
        URL.revokeObjectURL(mapUrl);
        return;
      }
      if (blobRef.current) URL.revokeObjectURL(blobRef.current);
      blobRef.current = mapUrl;
      const id = `lg-${reactId}-${size.w}x${size.h}-${Date.now().toString(36)}`;
      setFilter({
        id,
        svg: buildFilterSvg({
          id,
          mapUrl,
          width: size.w,
          height: size.h,
          scale,
          aberration,
          frost
        })
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, size.w, size.h, radius, bevelDepth, scale, aberration, frost, reactId]);
  useEffect(
    () => () => {
      if (blobRef.current) URL.revokeObjectURL(blobRef.current);
    },
    []
  );
  const backdrop = mode === "opaque" ? "none" : mode === "simple" ? "blur(20px) saturate(1.4)" : filter ? `url(#${filter.id}) blur(0.5px) saturate(1.85) brightness(1.02)` : "blur(10px) saturate(1.6) brightness(1.04)";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      "data-refract": mode === "pending" && filter ? "true" : "false",
      className: cn(
        "relative overflow-hidden",
        mode === "simple" && "bg-white/70 dark:bg-neutral-900/60",
        mode === "opaque" && "bg-white dark:bg-neutral-900",
        className
      ),
      style: {
        borderRadius: radius,
        backgroundColor: mode === "pending" ? `rgb(255 255 255 / ${tint})` : void 0,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        ...style
      },
      ...rest,
      children: [
        filter ? /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute size-0 overflow-hidden",
            dangerouslySetInnerHTML: { __html: filter.svg }
          },
          filter.id
        ) : null,
        contentClassName ? /* @__PURE__ */ jsx("div", { className: contentClassName, children }) : children
      ]
    }
  );
}
function supportsUrlBackdropFilter() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("backdrop-filter", "url(#x)") || CSS.supports("-webkit-backdrop-filter", "url(#x)");
}
function prefersReducedTransparency() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
}
function isSafariLike() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
}
function sdRoundedBox(px, py, halfW, halfH, r) {
  const qx = Math.abs(px) - halfW + r;
  const qy = Math.abs(py) - halfH + r;
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  const inside = Math.min(Math.max(qx, qy), 0);
  return inside + outside - r;
}
function bendFromDepth(x) {
  const u = 1 - Math.min(1, Math.max(0, x));
  const denom = (1 - u ** 4) ** 0.75;
  if (denom < 1e-6) return 0;
  const thetaI = Math.atan(Math.min(u ** 3 / denom, 8));
  const sinT = Math.sin(thetaI) / 1.5;
  if (sinT >= 1) return Math.sin(thetaI);
  return Math.sin(thetaI - Math.asin(sinT));
}
function buildPhiTable(bevelPx) {
  const n = Math.max(1, Math.ceil(bevelPx));
  const phi = new Float32Array(n + 1);
  for (let d = 1; d <= n; d++) phi[d] = phi[d - 1] + bendFromDepth(d / n);
  return phi;
}
function samplePhi(phi, depth) {
  const max = phi.length - 1;
  if (depth <= 0) return phi[0];
  if (depth >= max) return phi[max];
  const i = Math.floor(depth);
  const f = depth - i;
  return phi[i] * (1 - f) + phi[i + 1] * f;
}
function computeDisplacementData(opts) {
  const dpr = opts.dpr ?? 1;
  const gain = opts.gain ?? 1.35;
  const light = opts.light ?? { x: -0.55, y: -0.85 };
  const lightLen = Math.hypot(light.x, light.y) || 1;
  const lx = light.x / lightLen;
  const ly = light.y / lightLen;
  const W = Math.max(1, Math.round(opts.width * dpr));
  const H = Math.max(1, Math.round(opts.height * dpr));
  const halfW = W / 2;
  const halfH = H / 2;
  const r = Math.min(opts.radius * dpr, halfW, halfH);
  const bevel = Math.max(1, opts.bevelDepth * dpr);
  const phi = buildPhiTable(bevel);
  const field = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    const py = y - halfH + 0.5;
    for (let x = 0; x < W; x++) {
      const d = sdRoundedBox(x - halfW + 0.5, py, halfW, halfH, r);
      field[y * W + x] = d > 0 ? 0 : samplePhi(phi, Math.min(bevel, -d));
    }
  }
  const data = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    const py = y - halfH + 0.5;
    for (let x = 0; x < W; x++) {
      const px = x - halfW + 0.5;
      const i = y * W + x << 2;
      const d = sdRoundedBox(px, py, halfW, halfH, r);
      if (d > 0) {
        data[i] = data[i + 1] = data[i + 2] = 128;
        data[i + 3] = 0;
        continue;
      }
      const x0 = Math.max(0, x - 1);
      const x1 = Math.min(W - 1, x + 1);
      const y0 = Math.max(0, y - 1);
      const y1 = Math.min(H - 1, y + 1);
      const dPhiX = (field[y * W + x1] - field[y * W + x0]) / (x1 - x0 || 1);
      const dPhiY = (field[y1 * W + x] - field[y0 * W + x]) / (y1 - y0 || 1);
      const dx = Math.max(-1, Math.min(1, dPhiX * gain));
      const dy = Math.max(-1, Math.min(1, dPhiY * gain));
      let specular = 0;
      if (d >= -bevel) {
        const gx = sdRoundedBox(px + 1, py, halfW, halfH, r) - sdRoundedBox(px - 1, py, halfW, halfH, r);
        const gy = sdRoundedBox(px, py + 1, halfW, halfH, r) - sdRoundedBox(px, py - 1, halfW, halfH, r);
        const len = Math.hypot(gx, gy) || 1;
        const dot = gx / len * lx + gy / len * ly;
        const rim = 1 - Math.min(1, -d / bevel);
        specular = (Math.max(0, dot) + Math.max(0, -dot) * 0.35) * rim;
      }
      data[i] = 128 + dx * 127;
      data[i + 1] = 128 + dy * 127;
      data[i + 2] = Math.round(specular * 255);
      data[i + 3] = 255;
    }
  }
  return { data, width: W, height: H };
}
async function generateDisplacementBlobUrl(opts) {
  const { data, width, height } = computeDisplacementData(opts);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  const blob = await new Promise(
    (resolve) => canvas.toBlob(resolve, "image/png")
  );
  if (!blob) throw new Error("Failed to encode displacement map");
  return URL.createObjectURL(blob);
}
function buildFilterSvg({
  id,
  mapUrl,
  width,
  height,
  scale,
  aberration,
  frost
}) {
  const pad = Math.ceil(scale + aberration + 4);
  const px = pad / Math.max(1, width) * 100;
  const py = pad / Math.max(1, height) * 100;
  const region = `x="-${px.toFixed(3)}%" y="-${py.toFixed(3)}%" width="${(100 + 2 * px).toFixed(3)}%" height="${(100 + 2 * py).toFixed(3)}%"`;
  const map = `<feImage href="${mapUrl}" xlink:href="${mapUrl}" x="0" y="0" width="${width}" height="${height}" result="map" preserveAspectRatio="none"/>`;
  const displace = (s, result) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G" result="${result}"/>`;
  const body = aberration <= 0 ? `${displace(scale, "rgb")}` : `${displace(scale + aberration, "dispR")}
  <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
  ${displace(scale, "dispG")}
  <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
  ${displace(Math.max(0, scale - aberration), "dispB")}
  <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
  <feBlend in="red" in2="green" mode="screen" result="rg"/>
  <feBlend in="rg" in2="blue" mode="screen" result="rgb"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><filter id="${id}" color-interpolation-filters="sRGB" ${region}>
  ${map}
  ${body}
  <feGaussianBlur in="rgb" stdDeviation="${frost}"/>
</filter></svg>`;
}

// entry.jsx
import React from "react";

// registry:components/liquid-glass-demo.tsx
import { useRef as useRef2 } from "react";
import { motion, useReducedMotion } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LiquidGlassDemo({
  shape = "circle",
  scale = 48,
  aberration = 14,
  bevelDepth = 37,
  frost = 0.4,
  tint = 0.12
}) {
  const constraintsRef = useRef2(null);
  const reduceMotion = useReducedMotion();
  const size = shape === "pill" ? { w: 320, h: 120 } : { w: 200, h: 200 };
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: constraintsRef,
      className: "relative h-[36rem] w-full overflow-hidden bg-neutral-900",
      children: [
        /* @__PURE__ */ jsx2(
          "img",
          {
            src: "https://assets.aceternity.com/screenshots/colourful-office.webp",
            alt: "",
            className: "absolute inset-0 size-full object-cover",
            draggable: false
          }
        ),
        /* @__PURE__ */ jsxs2("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 text-center select-none", children: [
          /* @__PURE__ */ jsxs2("p", { className: "text-6xl leading-[0.95] font-bold tracking-tighter text-white md:text-8xl", children: [
            "Bend the",
            /* @__PURE__ */ jsx2("br", {}),
            "light."
          ] }),
          /* @__PURE__ */ jsx2("div", { className: "mt-8 grid w-full max-w-md grid-cols-12 gap-1.5", children: Array.from({ length: 48 }).map((_, i) => /* @__PURE__ */ jsx2("span", { className: "h-1.5 rounded-full bg-white/80" }, i)) })
        ] }),
        /* @__PURE__ */ jsx2(
          motion.div,
          {
            drag: true,
            dragConstraints: constraintsRef,
            dragElastic: 0.1,
            whileDrag: reduceMotion ? void 0 : { scale: 1.04 },
            className: "absolute top-1/2 left-1/2 cursor-grab touch-none active:cursor-grabbing",
            style: {
              width: size.w,
              height: size.h,
              marginLeft: -size.w / 2,
              marginTop: -size.h / 2
            },
            children: /* @__PURE__ */ jsx2(
              LiquidGlass,
              {
                radius: size.h / 2,
                scale,
                aberration,
                bevelDepth,
                frost,
                tint,
                className: "size-full shadow-[0_12px_40px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.5)]"
              }
            )
          }
        )
      ]
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LiquidGlassDemo, {}) }) });
}
export {
  LiquidGlass,
  Component as default
};
