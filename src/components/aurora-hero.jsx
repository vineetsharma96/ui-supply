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
// Adapted from https://www.vengenceui.com/components/aurora-hero
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/aurora-hero.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AuroraHero({
  title = "An awesome title",
  className,
  ...props
}) {
  const filterImageHref = "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'>
      <g>
        <rect width='1' height='1' fill='black' />
        <rect width='1' height='1' fill='url(#red)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#green)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#yellow)' style='mix-blend-mode:screen' />
      </g>
      <defs>
        <radialGradient id='yellow' cx='0' cy='0' r='1' >
          <stop stop-color='yellow' />
          <stop stop-color='yellow' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='green' cx='1' cy='0' r='1' >
          <stop stop-color='green' />
          <stop stop-color='green' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='red' cx='0' cy='1' r='1' >
          <stop stop-color='red' />
          <stop stop-color='red' offset='1' stop-opacity='0' />
        </radialGradient>
      </defs>
    </svg>
  `);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: cn("aurora-hero-wrapper w-full min-h-[400px] h-[500px] sm:h-[600px] relative overflow-hidden", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        .aurora-hero-wrapper {
          --stripe-color: #000;
          --bg-filter: blur(10px) opacity(50%) saturate(200%);
          background: var(--stripe-color);
          font-family: Inter, sans-serif;
        }
        :is(.dark) .aurora-hero-wrapper {
          --stripe-color: #fff;
          --bg-filter: blur(10px) invert(100%);
        }
        @keyframes smoothBg {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        .aurora-hero-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          --stripes: repeating-linear-gradient(
            100deg,
            var(--stripe-color) 0%,
            var(--stripe-color) 7%,
            transparent 10%,
            transparent 12%,
            var(--stripe-color) 16%
          );
          --rainbow: repeating-linear-gradient(
            100deg,
            #60a5fa 10%,
            #e879f9 15%,
            #60a5fa 20%,
            #5eead4 25%,
            #60a5fa 30%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: var(--bg-filter);
          mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
        }
        .aurora-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: smoothBg 60s linear infinite;
          background-attachment: fixed;
          mix-blend-mode: difference;
        }
        .aurora-content {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          place-content: center;
          place-items: center;
          flex-flow: column;
          gap: 4.5%;
          text-align: center;
          backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
          -webkit-backdrop-filter: contrast(0.9) blur(7px) url(#fluted);
          mix-blend-mode: difference;
          filter: invert(1);
        }
        .h1-scalingSize {
          font-size: calc(1rem - -5vw);
          position: relative;
          isolation: isolate;
          font-weight: 700;
        }
        .h1-scalingSize::first-letter {
          font-size: 300%;
        }
        .h1-scalingSize::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: white;
          text-shadow: 0 0 1px #ffffff;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-color: white;
          -webkit-mask: linear-gradient(#000 0 0) luminance;
          mask: linear-gradient(#000 0 0) luminance, alpha;
          backdrop-filter: blur(19px) brightness(12.5);
          -webkit-text-stroke: 1px white;
          display: flex;
          margin: auto;
          z-index: 1;
          pointer-events: none;
        }
      ` }),
        /* @__PURE__ */ jsx("div", { className: "aurora-hero-bg" }),
        /* @__PURE__ */ jsx("div", { className: "aurora-content", children: /* @__PURE__ */ jsx("h1", { className: "h1-scalingSize", "data-text": title, children: title }) }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            colorInterpolationFilters: "sRGB",
            style: { position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" },
            "aria-hidden": "true",
            focusable: "false",
            children: /* @__PURE__ */ jsxs("filter", { id: "fluted", primitiveUnits: "objectBoundingBox", children: [
              /* @__PURE__ */ jsx(
                "feImage",
                {
                  x: "0",
                  y: "0",
                  result: "image_0",
                  crossOrigin: "anonymous",
                  href: filterImageHref,
                  preserveAspectRatio: "none meet",
                  width: ".03",
                  height: "1"
                }
              ),
              /* @__PURE__ */ jsx("feTile", { in: "image_0", result: "tile_0" }),
              /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: ".0001", edgeMode: "none", in: "tile_0", result: "bar_smoothness", x: "0", y: "0" }),
              /* @__PURE__ */ jsx("feDisplacementMap", { scale: ".08", xChannelSelector: "R", yChannelSelector: "G", in: "SourceGraphic", in2: "bar_smoothness", result: "displacement_0" })
            ] })
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/aurora-hero-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AuroraHeroDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full h-full", children: /* @__PURE__ */ jsx2(AuroraHero, { title: "", className: "h-full min-h-[500px] sm:min-h-full" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AuroraHeroDemo, {}) }) });
}
export {
  AuroraHero,
  Component as default
};
